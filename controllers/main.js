class MainController {
  static async start([bot, chatId]) {
    await bot.sendSticker(
      chatId,
      "https://tlgrm.ru/_/stickers/bf9/f83/bf9f8313-a8d2-44cd-a06e-c351668543d6/2.webp"
    );
    bot.sendMessage(chatId, "Добро пожаловать в телеграмм бот");
  }

  static async info(bot, chatId){
    await bot.sendMessage(
      chatId,
      `Тебя зовут: ${msg.from.first_name} ${msg.from.last_name}`
    );
  }
}

module.exports = MainController;
