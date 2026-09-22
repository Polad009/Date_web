import { APP_CONFIG } from '../config';
import { DatePlan } from '../types';

export async function sendDateNotification(
  plan: DatePlan,
  customChatId?: string,
  senderName?: string,
  recipientName?: string
): Promise<{ success: boolean; message: string }> {
  const targetChatId = customChatId || APP_CONFIG.telegram.chatId;
  const fromWho = senderName || APP_CONFIG.yourName;
  const toWho = recipientName || APP_CONFIG.recipientNickName;

  const telegramMessage = `
💖 *YENİ DATE CAVABI GƏLDİ!* 💖
━━━━━━━━━━━━━━━━━━
✨ *Kimdən:* ${toWho}
💌 *Qərar:* BƏLİ, DATE TƏKLİFİNİ QƏBUL ETDİ! 🥰

📅 *Tarix:* ${plan.selectedDate}
⏰ *Saat:* ${plan.selectedTime}
🍽️ *Məkan / Yemək:* ${plan.foodPlace}
🎡 *Plan:* ${plan.activity}
🍰 *Desert:* ${plan.dessert || 'Seçilməyib'}

💌 *Xüsusi Qeydi / Mahnı:*
"${plan.specialNote || 'Xüsusi qeyd yazılmadı'}"
━━━━━━━━━━━━━━━━━━
👤 *Dəvət edən:* ${fromWho}
🕒 *Göndərilmə vaxtı:* ${new Date().toLocaleString('az-AZ')}
  `.trim();

  let sentSuccessfully = false;

  // Send via Telegram Bot API to the specific target chat ID
  if (APP_CONFIG.telegram.enabled && APP_CONFIG.telegram.botToken && targetChatId) {
    try {
      const url = `https://api.telegram.org/bot${APP_CONFIG.telegram.botToken}/sendMessage`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: targetChatId,
          text: telegramMessage,
          parse_mode: 'Markdown',
        }),
      });

      if (response.ok) {
        sentSuccessfully = true;
        console.log(`✅ Telegram notification sent successfully to ${targetChatId}!`);
      } else {
        console.warn('Telegram API error:', await response.text());
      }
    } catch (err) {
      console.error('Error sending Telegram message:', err);
    }
  }

  // Local storage backup
  try {
    localStorage.setItem('last_date_plan', JSON.stringify({ ...plan, submittedAt: new Date().toISOString() }));
  } catch (e) {
    // ignore
  }

  return {
    success: true,
    message: sentSuccessfully ? 'Bildiriş göndərildi' : 'Yadda saxlanıldı',
  };
}
