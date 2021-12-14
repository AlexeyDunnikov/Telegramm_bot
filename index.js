const { gameOptions, againOptions } = require("./options");
const Router = require("./Router/Router");
const Route = require("./Router/Route");
const MainController = require("./controllers/main");

const TelegramApi = require("node-telegram-bot-api");

const token = "5072730209:AAGCgOzOIx-Z4bd8fTEPznNEw4O2kryDVNY";

const router = new Router();

const bot = new TelegramApi(token, {
  polling: true,
});

const chats = {};

bot.setMyCommands([
  {
    command: "/start",
    description: "Начальное приветствие",
  },
  {
    command: "/info",
    description: "Информация о пользователе",
  },
  {
    command: "/game",
    description: "Игра угадай число",
  },
  {
    command: "/laravel",
    description: "Инструкция по поднятию большинство проектов по Laravel",
  },
]);

const startGame = async (chatId) => {
  await bot.sendMessage(
    chatId,
    "Я сейчас загадаю цифру от 0 до 9, а ты должен ее угадать"
  );
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = {
    rndNum: randomNumber,
    isFirstMove: true,
  };

  await bot.sendMessage(chatId, "Отгадывай)", gameOptions);
};

Route.command("/info", MainController, "info");
Route.command("/start", MainController, 'start');

const start = () => {
  bot.on("message", async (msg) => {
    const text = msg.text;

    Router.getInstance().middleware(text, { bot, msg });
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data === "/again") {
      return startGame(chatId);
    }

    if (chats[chatId].rndNum == data && chats[chatId].isFirstMove) {
      chats[chatId].isFirstMove = false;
      return await bot.sendMessage(
        chatId,
        `Поздравляю, ты угадал цифру ${chats[chatId].rndNum}`,
        againOptions
      );
    }

    if (chats[chatId].rndNum != data && chats[chatId].isFirstMove) {
      chats[chatId].isFirstMove = false;
      return await bot.sendMessage(
        chatId,
        `К сожалению ты не угадал, бот загадал цифру ${chats[chatId].rndNum}`,
        againOptions
      );
    }
  });
};

start();
