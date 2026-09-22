import { APP_CONFIG } from '../config';
import { DatePlan } from '../types';

export async function sendDateNotification(plan: DatePlan): Promise<{ success: boolean; message: string }> {
  const phoneText = plan.phoneNumber ? `📱 *WhatsApp Nömrəsi:* ${plan.phoneNumber}` : `📱 *WhatsApp:* Qeyd etmədi`;

  const telegramMessage = `
💖 *YENİ DATE CAVABI GƏLDİ!* 💖
━━━━━━━━━━━━━━━━━━
💌 *Qərar:* BƏLİ, DATE TƏKLİFİNİ QƏBUL ETDİ! 🥰

📅 *Tarix:* ${plan.selectedDate}
⏰ *Saat:* ${plan.selectedTime}
🍽️ *Məkan / Yemək:* ${plan.foodPlace}
🎡 *Plan:* ${plan.activity}
🍰 *Desert:* ${plan.dessert || 'Seçilməyib'}

${phoneText}

💌 *Xüsusi Qeydi / Mahnı:*
"${plan.specialNote || 'Xüsusi qeyd yazılmadı'}"
━━━━━━━━━━━━━━━━━━
🕒 *Göndərilmə vaxtı:* ${new Date().toLocaleString('az-AZ')}
  `.trim();

  let sentSuccessfully = false;

  // 1. Send via Telegram Bot API
  if (APP_CONFIG.telegram.enabled && APP_CONFIG.telegram.botToken && APP_CONFIG.telegram.chatId) {
    try {
      const url = `https://api.telegram.org/bot${APP_CONFIG.telegram.botToken}/sendMessage`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: APP_CONFIG.telegram.chatId,
          text: telegramMessage,
          parse_mode: 'Markdown',
        }),
      });

      if (response.ok) {
        sentSuccessfully = true;
        console.log('✅ Telegram notification sent successfully!');
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
