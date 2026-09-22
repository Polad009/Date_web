export interface DatePlan {
  agreed: boolean;
  selectedDate: string; // e.g. "2026-09-25"
  selectedTime: string; // e.g. "19:00"
  foodPlace: string;    // e.g. "KFC", "McDonald's", "Popeyes", etc.
  activity: string;     // e.g. "Sakit Gəzinti", "Bowling", "Kino", "Qəhvə & Söhbət"
  dessert?: string;     // e.g. "Dondurma", "Cheesecake", "Waffle", "İstəmirəm"
  specialNote: string;
  submittedAt?: string;
}

export interface RestaurantItem {
  id: string;
  title: string;
  logo: string;
  bgColor?: string;
}

export const RESTAURANT_OPTIONS: RestaurantItem[] = [
  {
    id: 'kfc',
    title: 'KFC',
    logo: 'https://upload.wikimedia.org/wikipedia/sco/b/bf/KFC_logo.svg',
    bgColor: '#ffffff',
  },
  {
    id: 'mcdonalds',
    title: "McDonald's",
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/36/McDonald%27s_Golden_Arches.svg',
    bgColor: '#ffffff',
  },
  {
    id: 'popeyes',
    title: 'Popeyes',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Popeyes_Louisiana_Kitchen_logo.svg',
    bgColor: '#ffffff',
  },
  {
    id: 'paul',
    title: 'Paul / Cozy Kafe',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Paul_Bakery_Logo.svg',
    bgColor: '#000000',
  },
  {
    id: 'mado',
    title: 'MADO',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Mado_logo.svg',
    bgColor: '#ffffff',
  },
  {
    id: 'pizza',
    title: 'Pizza / İtalyan',
    logo: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=120&q=80',
    bgColor: '#fff1f2',
  },
  {
    id: 'sushi',
    title: 'Suşi Restoranı',
    logo: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=120&q=80',
    bgColor: '#fff1f2',
  },
  {
    id: 'surprise',
    title: 'Sürpriz Məkan ✨',
    logo: '',
    bgColor: '#fff1f2',
  },
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
