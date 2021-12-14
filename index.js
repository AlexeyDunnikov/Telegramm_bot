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


const start = () => {
  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    
    Route.command("/start", MainController, "start", bot, chatId);

    Router.getInstance().middleware(text);
//      else if (text === "/info") {
//       await route.command("/info", MainController, "info");
//     } else if (text === "/laravel") {
//       return bot.sendMessage(
//         chatId,
//         `Инструкция по поднятию большинство проектов по Laravel:
// 1. Делаем клон git репозитория:
// - git clone https://Pavel@bitbucket.org/kedalo/movie.git
//  (https://Pavel@bitbucket.org/kedalo/movie.git)* Ссылку подставляем свою

// 2. После того как мы скачали проект, делаем копию файла .env.example с названием .env

// 3. Подставляем свои значения к базе данных и к другим важным переменным в .env

// 4. Дальше подгружаем библиотеки
// - composer install
// * Если нужно обновить - composer update

// 5. После делаем миграции:
// - php artisan migrate:fresh —seed (два тире -)
// * Данная команда удаляет все таблицы из бд, после загружает их заново и подгружает все сиды.
// * Для подгрузки новых миграций, достаточно написать php artisan migrate

// 6. Для запуска сайта достаточно написать:
// - php artisan serve
// * Если есть возможность разметить на апаче или на nginx, то лучше разместить их там.`
//       );
//     } else if (text === "/game") {
//       return startGame(chatId);
//     } else {
//       return bot.sendMessage(chatId, "Я тебя не понимаю, попробуй еще раз)");
//     }
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
