# 💖 Romantic Date Proposal & Planner Web

Möhtəşəm, interaktiv, vizual olaraq estetik və qarşı tərəfi heyran qoyacaq xüsusi **Date Təklifi və Planlama Vebsaytı**.

---

## ✨ Əsas Xüsusiyyətlər

1. **Qaçağan "Xeyr" Düyməsi (Slippery Button):**
   - Qarşı tərəf "Xeyr" düyməsinə toxunmaq və ya klikləmək istədikdə, düymə sürüşərək ekrandan qaçır və hər dəfə maraqlı/şirin mesajlar göstərir (*"Səhv basdın deyəsən 😜"*, *"Məcbur Bəli deyəcəksən 🥰"*, *"Tapa bilməzsən 🏃‍♀️"*).
   - "Xeyr" seçmək qeyri-mümkündür, yalnız və yalnız **"Bəli, əlbəttə! 🥰"** seçilə bilir!

2. **Gözoxşayan İnteraktiv Date Planlama Addımları:**
   - 📅 **Tarix & Saat:** Bu həftəsonu, sabah, gələn həftə və ya xüsusi gün + Qürub çağı / Axşam / Günorta.
   - 🍝 **Restoran & Mətbəx:** İtalyan romantikası, Suşi & Asiya, Şəhər mənzərəli Fine Dining, Cozy Kafe, Burger & Street Food, Sürpriz seçim.
   - 🎡 **Aktivliklər:** Dənizkənarı axşam gəzintisi, Romantik kino, Baku Eye şəhər panoraması, Sərgi & Muzey, Bowling & Əyləncə, Sakit səmimi söhbət.
   - 🍰 **Desert & Geyim Tərzi:** San Sebastian, İtalyan Gelato, Waffle, Şokoladlı Çiyələklər + Smart Casual, Şıq və s.
   - 💌 **Xüsusi Mesaj & Mahnı İstəyi:** Qarşı tərəfin sənə göndərəcəyi xüsusi qeyd və ya sevdiyi mahnı.

3. **Mesajların Birbaşa Sənə Gəlməsi (Telegram Bot & WhatsApp):**
   - Qız saytı doldurub "Təsdiqlə və Göndər" düyməsini basdıqda, seçdiyi bütün detallar anında **sənin Telegram-ına şəxsi mesaj** olaraq gəlir!
   - Həmçinin WhatsApp ilə birbaşa yönləndirmə və Formspree / Email dəstəyi var.

4. **VIP Date Dəvətnaməsi & Konfeti Şousu (Celebration Ticket):**
   - Sonda adınız yazılmış estetik **"VIP Date Invitation"** bileti və konfeti animasiyası açılır.

5. **Romantik Fon Musiqisi & Üzən Ürəklər:**
   - Ekranda üzən ürəklər və istəyə uyğun qoşula bilən incə arxa plan romantik musiqisi.

---

## 🚀 1. Telegram Bot ilə Mesajları Özünə Bağlamaq (Cəmi 1 Dəqiqə)

Cavabların anında Telegram-ına gəlməsi üçün:

1. Telegram-da **[@BotFather](https://t.me/BotFather)**-ə daxil ol və `/newbot` yaz.
2. Botuna ad ver (məs: *DatePlanBot*). Sənə bir **API Token** verəcək (məs: `7123456789:AAH...`).
3. Telegram-da **[@userinfobot](https://t.me/userinfobot)**-a `/start` göndər və sənin şəxsi **Id** rəqəmini götür (məs: `123456789`).
4. Hazırladığın bota Telegram-da daxil olub bir dəfə **/start** düyməsinə bas (ki, bot sənə mesaj ata bilsin).
5. Layihədəki `src/config.ts` faylını aç və bu məlumatları qeyd et:
   ```ts
   telegram: {
     enabled: true,
     botToken: "SENIN_BOT_TOKENIN",
     chatId: "SENIN_TELEGRAM_ID",
   }
   ```
   *Və ya Vercel-də `VITE_TELEGRAM_BOT_TOKEN` və `VITE_TELEGRAM_CHAT_ID` kimi əlavə edə bilərsən.*

---

## 🌐 2. Vercel-də Saytı Yayılamaq (Pulsuz və Sadə)

1. Bu layihəni **GitHub** hesabına yüklə (push et).
2. [Vercel.com](https://vercel.com) saytına daxil ol və GitHub ilə giriş et.
3. **"Add New..." -> "Project"** seçib bu repozitoriyanı seç.
4. **Deploy** düyməsinə bas!
5. 30 saniyə ərzində sənə xüsusi link (məs: `date-proposal-seninad.vercel.app`) veriləcək.
6. İstəsən Vercel parametrlərindən öz xüsusi domenini də pulsuz bağlaya bilərsən.

---

## 🛠️ Lokal Olaraq Kompüterdə Yoxlamaq

```bash
# Paketləri quraşdır:
npm install

# Layihəni başlat:
npm run dev
```
Brauzerdə `http://localhost:5173` ünvanında açılacaq.
