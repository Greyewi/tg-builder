# TG Builder

`tg-builder` offers a streamlined approach to building and launching Telegram bots. Through a structured setup of commands and actions, it simplifies bot development and deployment.

## 📦 Installation
Using npm:

`npm install tg-builder`

Using yarn:

`yarn add tg-builder`

## 🔍 Getting Started

### 1. Importing Modules
   Begin by importing the essential modules:

`import { BotsLoader, CommandBuilder, ActionBuilder } from 'tg-builder'`

### 2. Defining Commands

Leverage the CommandBuilder to define the commands for your bot:

<pre>
const gameCommands = (botName: string) =>
new CommandBuilder(botName).setNewCommand('start', async (ctx) => {
    //... command logic here ...
});
</pre>
### 3. Defining Actions

Utilize the ActionBuilder to define telegram callback actions:
<pre>
const gameActions = (botName: string) =>
    new ActionBuilder(botName)
    .setNewAction('new-game', async (ctx: any) => {
        //... action logic here ...
});
</pre>
### 4. Loading and Launching the Bot

Make use of BotsLoader to add your bot and get it running:

<pre>
const loader = new BotsLoader();
loader.addBot(name, gameCommands, gameActions);

loader.launch((err) => {
    if (!err) {
        console.log(`${name} is working`);
    } else {
        console.error(err);
    }
});
</pre>

# 📖 Example

Here's a glimpse of a bot providing a text-based RPG game experience:

<pre>
import { BotsLoader, CommandBuilder, ActionBuilder } from 'tg-builder'

const name = "GreyewiRogueBot"
const gameCommands = (botName: string) =>
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

const gameActions = (botName: string) =>
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

</pre>

#### With tg-builder, bot development becomes a structured, readable, and maintainable endeavor. Dive in to explore more functionalities and elevate your bot development journey!