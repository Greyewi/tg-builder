# 🤖TG Builder

#### tg-builder provides an intuitive builder pattern that allows developers to:
- Combine Multiple Bots: Run and manage several bots from a single codebase, each with their individual or shared functionalities.
- Shared Logic: Easily reuse logic across different bots, making your code more DRY (Don't Repeat Yourself).
- Modularity: Break down complex bot functionalities into manageable pieces, ensuring clean and readable code.
- Scalability: As your bot ecosystem grows, tg-builder scales with you, making it effortless to add or modify existing bots.
#### By adopting the builder pattern, tg-builder ensures your bots are more maintainable, organized, and efficient.

## 📦 Installation
Using npm:

`npm install tg-builder`

Using yarn:

`yarn add tg-builder`

## ⚙️ Configuration

Before you start, you need to create a configuration file named tg.json in your project's root. This file should contain the token and name of the bot you want to set up.

<pre>
{
  "bots": [
    {
      "token": "xxxxxxxxxxxxxxxxxxxx",
      "name": "GreyewiRogueBot"
    },
    {
      "token": "xxxxxxxxxxxxxxxxxxxx",
      "name": "GreyewiRogueBot"
    }
  ]
}
</pre>

Replace xxxxxxxxxxxxxxxxxxxx with your actual bot tokens.

#### 🛑 Remember, always keep your bot tokens secret and never expose them in publicly accessible places or repositories.

## 📖 Getting Started

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

# 🚀 Example

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

## 📄 Definitions

### 1. Command

<table><thead><tr><th>Property</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>command</td><td><code>string</code></td><td>The command name to be recognized by the bot.</td></tr><tr><td>callback</td><td><code>(ctx: Context) =&gt; void</code></td><td>The callback function executed when the command is called.</td></tr><tr><td>botName</td><td><code>string</code></td><td>Name of the bot the command belongs to.</td></tr></tbody></table>

### 2. Action

<table><thead><tr><th>Property</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>action</td><td><code>string</code></td><td>The action identifier.</td></tr><tr><td>callback</td><td><code>(ctx: Context) =&gt; void</code></td><td>The callback function executed when the action is triggered.</td></tr><tr><td>botName</td><td><code>string</code></td><td>Name of the bot the action belongs to.</td></tr></tbody></table>

With tg-builder, bot development becomes a structured, readable, and maintainable endeavor. Dive in to explore more functionalities and elevate your bot development journey!