import TelegramBot from 'node-telegram-bot-api';

const token = process.env.BOT_TOKEN;
const ADMIN_ID = 1351518213;

const bot = new TelegramBot(token, { polling: true });

// حفظ ربط رسالة الأدمن بالمستخدم
const replies = new Map();

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  // إذا كانت الرسالة منك (الأدمن)
  if (chatId === ADMIN_ID) {
    if (msg.reply_to_message) {
      const targetId = replies.get(msg.reply_to_message.message_id);

      if (targetId) {
        bot.sendMessage(targetId, msg.text);
      }
    }
    return;
  }

  // رسالة الترحيب
  bot.sendMessage(
    chatId,
    `أهلًا وسهلًا

اكتب استفسارك، وبإذن الله سأرد عليك في أقرب وقت.`
  );

  // إرسال الرسالة لك
  const forwarded = await bot.sendMessage(
    ADMIN_ID,
    `📩 رسالة جديدة

👤 الاسم: ${msg.from.first_name || "بدون اسم"}
🆔 ID: ${chatId}

💬 الرسالة:
${msg.text || "[ليست رسالة نصية]"}`
  );

  // حفظ الربط بين رسالة الأدمن والمستخدم
  replies.set(forwarded.message_id, chatId);
});

console.log("Bot is running...");
