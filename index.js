import TelegramBot from 'node-telegram-bot-api';

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `أهلًا وسهلًا 

اكتب استفسارك، بإذن الله سأرد عليك في أقرب وقت.`
  );
});

console.log('Bot is running...');
