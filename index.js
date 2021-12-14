const TelegramApi = require("node-telegram-bot-api");
const Router = require("./Router/Router");

require('./routes');
const router = Router.getInstance();

const bot = new TelegramApi("5072730209:AAGCgOzOIx-Z4bd8fTEPznNEw4O2kryDVNY", {
  polling: true,
});

bot.setMyCommands(router.routes.map(res => ({
  command: res.url,
  description: res.description
})));

bot.on("message", async (msg) => Router.getInstance().middleware(msg.text, { bot, msg }));