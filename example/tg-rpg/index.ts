import { BotsLoader, CommandBuilder, ActionBuilder } from '../../src'

const name = 'TRPG'

export const gameCommands = (botName: string) =>
  new CommandBuilder(botName).setNewCommand('start', async (ctx) => {
    try {
      await ctx.reply(`You are welcome in super <b>text tg rpg game!</b>:`, {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Start',
                callback_data: 'new-game',
              },
              {
                text: 'Continue',
                callback_data: 'loading',
              },
              {
                text: 'Options',
                callback_data: 'settings',
              },
            ],
          ],
        },
      })
    } catch (e: any) {
      console.error(e)
      return ctx.reply(e.message)
    }
  })

export const gameActions = (botName: string) =>
  new ActionBuilder(botName)
    .setNewAction('new-game', async (ctx: any) => {
      return ctx.reply('Coming soon')
    })
    .setNewAction('loading', async (ctx: any) => {
      return ctx.reply('Coming soon')
    })
    .setNewAction('settings', async (ctx: any) => {
      return ctx.reply('Coming soon')
    })

const loader = new BotsLoader()
loader.addBot(name, gameCommands, gameActions)

loader.launch((err) => {
  if (!err) {
    console.log(`${name} is working`)
  } else {
    console.error(err)
  }
})
