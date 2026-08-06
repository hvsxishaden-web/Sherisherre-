import TelegramBot from 'node-telegram-bot-api';

const token = process.env.BOT_TOKEN;
const ADMIN_ID = 1351518213;

console.log("Bot is starting...");
console.log("Token exists:", !!token);

const bot = new TelegramBot(token, { polling: true });

// عرض أخطاء Telegram
bot.on("polling_error", (err) => {
  console.error("Polling Error:", err.message);
});

// حفظ الربط بين رسالة الأدمن والمستخدم
const replies = new Map();

// عند وصول أي رسالة
bot.on("message", async (msg) => {
  console.log("وصلت رسالة من:", msg.chat.id, msg.text);

  const chatId = msg.chat.id;

  // إذا كانت الرسالة منك
  if (chatId === ADMIN_ID) {
    if (msg.reply_to_message) {
      const targetId = replies.get(msg.reply_to_message.message_id);

      if (targetId) {
        await bot.sendMessage(targetId, msg.text);
        console.log("تم إرسال الرد للمستخدم");
      }
    }
    return;
  }

  // رسالة الترحيب
  await bot.sendMessage(
    chatId,
    `أهلًا وسهلًا 🌷

اكتب استفسارك، وبإذن الله سأرد عليك في أقرب وقت.`
  );

  // تحويل الرسالة لك
  const forwarded = await bot.sendMessage(
    ADMIN_ID,
    `📩 رسالة جديدة

👤 الاسم: ${msg.from.first_name || "بدون اسم"}
🆔 ID: ${chatId}

💬 الرسالة:
${msg.text || "[ليست رسالة نصية]"}`
  );

  // حفظ الربط
  replies.set(forwarded.message_id, chatId);

  console.log("تم تحويل الرسالة للأدمن");
});

console.log("Bot is running...");