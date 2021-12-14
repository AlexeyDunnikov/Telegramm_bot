class MainController {
    static async start({bot, msg}) {
        await bot.sendSticker(
            msg.chat.id,
            "https://tlgrm.ru/_/stickers/bf9/f83/bf9f8313-a8d2-44cd-a06e-c351668543d6/2.webp"
        );
        bot.sendMessage(msg.chat.id, "Добро пожаловать в телеграмм бот");
    }

    static async info({bot, msg}) {
        await bot.sendMessage(
            msg.chat.id,
            `Тебя зовут: ${msg.from.first_name} ${msg.from.last_name}`
        );
    }
}

module.exports = MainController;
