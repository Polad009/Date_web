// ============================================================================
// 💖 DATE WEB - TƏNZİMLƏMƏLƏR VƏ PARAMETRLƏR
// ============================================================================

export const APP_CONFIG = {
  // 1. Sənin adın və qarşı tərəfə müraciət:
  yourName: "Elşən",             // Sənin adın
  recipientNickName: "Gözəlim",  // Saytda qız üçün müraciət (Məs: "Şahzadəm", "Gözəlim", "Əzizim")
  
  // 2. Telegram Bot Tənzimləməsi (Artıq tam qoşuldu! ✅):
  telegram: {
    enabled: true,
    botToken: "8218641380:AAGbJACtFbf2g19Nf0URghMCAltCikDILCc",
    chatId: "1449636139",
  },

  // 3. Ehtiyat olaraq WhatsApp bildirişi:
  whatsapp: {
    enabled: true,
    phoneNumber: "994500000000",
  },

  // 4. Formspree (Könüllü):
  formspree: {
    formId: "",
  },

  // 5. Discord Webhook (Könüllü):
  discordWebhookUrl: "",
};
