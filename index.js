const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const TOKEN = process.env.BOT_TOKEN;
const ADMIN_ID = Number(process.env.ADMIN_ID);

if (!TOKEN || !ADMIN_ID) {
  console.error('يرجى ضبط المتغيرين BOT_TOKEN و ADMIN_ID في إعدادات الاستضافة');
  process.exit(1);
}

const bot = new TelegramBot(TOKEN, { polling: true });

// سيرفر بسيط لإبقاء الخدمة نشطة (مطلوب لبعض الاستضافات المجانية)
const app = express();
app.get('/', (req, res) => res.send('Bot is running ✅'));
app.listen(process.env.PORT || 3000);

// رسالة الترحيب عند /start
bot.onText(/^\/start/, (msg) => {
  if (msg.chat.id === ADMIN_ID) return;
  bot.sendMessage(
    msg.chat.id,
    'مرحباً بك 👋\nأرسل رسالتك وسيتم الرد عليك في أقرب وقت.'
  );
});

bot.on('message', async (msg) => {
  // تجاهل أمر /start لأنه معالج فوق
  if (msg.text && msg.text.startsWith('/start')) return;

  // حالة 1: أنت (الأدمن) ترد على رسالة محوّلة من شخص -> نرسل ردك له
  if (msg.chat.id === ADMIN_ID) {
    if (msg.reply_to_message && msg.reply_to_message.forward_from) {
      const targetId = msg.reply_to_message.forward_from.id;
      try {
        await bot.copyMessage(targetId, msg.chat.id, msg.message_id);
      } catch (e) {
        bot.sendMessage(
          ADMIN_ID,
          '⚠️ تعذر إرسال الرد (ربما المستخدم حظر البوت). التفاصيل: ' + e.message
        );
      }
    }
    return;
  }

  // حالة 2: أي شخص آخر يرسل رسالة -> تُحوَّل لك
  try {
    await bot.forwardMessage(ADMIN_ID, msg.chat.id, msg.message_id);
  } catch (e) {
    console.log('forward error:', e.message);
  }
});

console.log('Bot started ✅');