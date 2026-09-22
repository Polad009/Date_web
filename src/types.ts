export interface DatePlan {
  agreed: boolean;
  selectedDate: string; // e.g. "2026-09-25"
  selectedTime: string; // e.g. "19:00"
  foodPlace: string;    // e.g. "KFC", "McDonald's", "Paul Kafe", etc.
  activity: string;     // e.g. "Sakit Gəzinti", "Bowling", "Kino", "Qəhvə & Söhbət"
  dessert?: string;     // e.g. "Dondurma", "Cheesecake", "Waffle", "İstəmirəm"
  specialNote: string;  // e.g. "Görüşümüz üçün mesaj və ya sevdiyin mahnı"
  submittedAt?: string;
}

export const RESTAURANT_OPTIONS = [
  { id: 'kfc', title: 'KFC', emoji: '🍗', desc: 'Dadlı toyuq və stripslər' },
  { id: 'mcdonalds', title: "McDonald's", emoji: '🍔', desc: 'Klassik burger və fri' },
  { id: 'cafe_coffee', title: 'Kafe & Qəhvə (Paul / Coffee Moffie)', emoji: '☕', desc: 'İsti qəhvə və sakit söhbət' },
  { id: 'mado', title: 'MADO / Şirniyyat evi', emoji: '🍰', desc: 'Şirniyyat, dondurma və çay' },
  { id: 'pizza', title: 'Pizza / İtalyan Məkanı', emoji: '🍕', desc: 'İsti pizza və rahat məkan' },
  { id: 'sushi', title: 'Suşi Restoranı', emoji: '🍣', desc: 'Suşi və Asiya ləzzətləri' },
  { id: 'surprise', title: 'Sürpriz Məkan ✨', emoji: '🎁', desc: 'Seçimi sənə buraxıram' },
];

export const ACTIVITY_OPTIONS = [
  { id: 'walk', title: 'Dənizkənarı Gəzinti', emoji: '🌊', desc: 'Təmiz hava və xoş söhbət' },
  { id: 'bowling', title: 'Bowling / Əyləncə', emoji: '🎳', desc: 'Gülüş və şən rəqabət' },
  { id: 'cinema', title: 'Kino / Film', emoji: '🎬', desc: 'Maraqlı bir film və popkorn' },
  { id: 'coffee_talk', title: 'Sakit Qəhvə Söhbəti', emoji: '☕', desc: 'Bir-birimizi tanımaq üçün' },
];

export const DESSERT_QUICK_OPTIONS = [
  { id: 'icecream', title: 'Dondurma 🍦' },
  { id: 'cheesecake', title: 'Cheesecake 🍰' },
  { id: 'waffle', title: 'Waffle 🧇' },
  { id: 'none', title: 'Yalnız yemək kifayətdir 😋' },
];
