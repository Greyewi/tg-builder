import { Telegraf, Context } from 'telegraf'
import fs from 'fs';
import path from 'path';

export interface Command {
  command: string
  callback: (ctx: Context) => void
  botName: string
}

export interface Action {
  action: string
  callback: (ctx: Context) => void
  botName: string
}

interface Bot {
  token: string;
  name: string;
}

interface BotDataSchema {
  bots: Bot[];
}

export class BotDataManager {
  botData: BotDataSchema;

  constructor() {
    this.botData = { bots: [] };
  }

  loadBotData(filePath: string = 'tg.json', defModel: BotDataSchema = { bots: [] }): void {
    const fullPath = path.resolve(filePath);
    if (fs.existsSync(fullPath)) {
      const fileContent = fs.readFileSync(fullPath, 'utf-8');
      this.botData = JSON.parse(fileContent) as BotDataSchema;
    } else {
      this.botData = defModel;
      this.saveBotData(fullPath);
    }
  }

  saveBotData(filePath: string): void {
    fs.writeFileSync(filePath, JSON.stringify(this.botData, null, 2), 'utf-8');
  }

}

export class TgBuilder {
  private token: string | undefined
  private bot: Telegraf | undefined
  private commands: Command[]
  private actions: Action[]
  private botName: string | undefined

  constructor() {
    this.commands = []
    this.actions = []
  }

  setUniqToken(token: string): TgBuilder {
    this.token = token
    return this
  }

  setBotName(name: string): TgBuilder {
    this.botName = name
    return this
  }

  setNewCommand(
    botName: string,
    command: string,
    callback: (ctx: Context) => Promise<void>,
  ): TgBuilder {
    this.commands.push({
      command,
      callback: async (ctx: Context) => {
        try {
          await callback(ctx)
        } catch (err) {
          if ((err as any).code === 403) {
            console.log('User has blocked the bot.')
          } else {
            throw err
          }
        }
      },
      botName,
    })
    return this
  }

  addCommandGroup(botName: string, commandGroup: CommandBuilder): TgBuilder {
    const newCommands = commandGroup
      .getCommands()
      .map(({ command, callback }) => {
        return {
          command,
          callback: async (ctx: Context) => {
            try {
              await callback(ctx)
            } catch (err) {
              if ((err as any).code === 403) {
                console.log('User has blocked the bot.')
              } else {
                throw err
              }
            }
          },
          botName,
        }
      })
    this.commands.push(...newCommands)
    return this
  }

  addActionGroup(botName: string, actionGroup: ActionBuilder): TgBuilder {
    const newActions = actionGroup.getActions().map(({ action, callback }) => {
      return {
        action,
        callback: async (ctx: Context) => {
          try {
            await callback(ctx)
          } catch (err) {
            if ((err as any).code === 403) {
              console.log('User has blocked the bot.')
            } else {
              throw err
            }
          }
        },
        botName,
      }
    })
    this.actions.push(...newActions)
    return this
  }

  build(): Telegraf {
    if (!this.token) {
      throw new Error('Bot token is not set')
    }

    this.bot = new Telegraf(this.token)

    if (this.commands.length) {
      this.commands.forEach((command) => {
        if (command.botName === this.botName) {
          this.bot?.command(command.command, command.callback)
        }
      })
    }

    if (this.actions.length) {
      this.actions.forEach((action) => {
        if (action.botName === this.botName) {
          this.bot?.action(action.action, action.callback)
        }
      })
    }

    this.bot.use((ctx, next) => {
      ctx.state.botId = this.token
      return next()
    })

    this.bot.catch((err: any, ctx: Context) => {
      console.log(`Encountered an error for ${ctx.updateType}`, err)
    })

    return this.bot
  }
}

export class CommandBuilder {
  /**
   *  This particular Command builder contains all commands
   *  https://core.telegram.org/constructor/botCommand
   */

  private readonly commands: Command[]
  botName: string
  constructor(botName: string) {
    this.commands = []
    this.botName = botName
  }

  setNewCommand(
    command: string,
    callback: (ctx: Context) => void,
  ): CommandBuilder {
    this.commands.push({ command, callback, botName: this.botName })
    return this
  }

  getCommands(): Command[] {
    return this.commands
  }
}

export class ActionBuilder {
  /**
   *  This particular Action builder contains all actions
   *  https://core.telegram.org/bots/api#sendchataction
   */

  private readonly actions: Action[]
  botName: string
  constructor(botName: string) {
    this.actions = []
    this.botName = botName
  }

  setNewAction(
    action: string,
    callback: (ctx: Context) => void,
  ): ActionBuilder {
    this.actions.push({ action, callback, botName: this.botName })
    return this
  }

  getActions(): Action[] {
    return this.actions
  }
}

export class BotsLoader {
  botData: BotDataSchema
  builders: any[] = []
  constructor(path?: string, defModel?: BotDataSchema) {
    const manager = new BotDataManager();
    manager.loadBotData(path, defModel);
    this.botData = manager.botData
  }

  addBot(
    botName: string,
    commands: (name: string) => CommandBuilder,
    actions: (name: string) => ActionBuilder,
  ): void {
    const newBot = this.botData.bots.filter((f) => f.name === botName)
    if (newBot.length) {
      newBot.forEach((bot) => {
        const botBuilder = new TgBuilder()
        botBuilder
          .setUniqToken(bot?.token || '')
          .setBotName(botName)
          .addCommandGroup(botName, commands(botName))
          .addActionGroup(botName, actions(botName))
        this.builders.push(botBuilder)
      })
    }
  }

  launch(cb: (err?: Error) => void): void {
    const bots = this.builders.map((builder) => builder.build())

    Promise.all(bots.map((bot) => bot.launch()))
      .then(() => {
        console.log('All bots launched')
      })
      .then(() => {
        cb()
      })
      .catch((err) => {
        cb(err)
      })
  }
}
