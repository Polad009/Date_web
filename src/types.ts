export interface DatePlan {
  agreed: boolean;
  selectedDate: string;
  selectedTime: string;
  foodPlace: string;
  activity: string;
  dessert?: string;
  specialNote: string;
  submittedAt?: string;
}

export interface RestaurantItem {
  id: string;
  title: string;
  image: string;
}

export const RESTAURANT_OPTIONS: RestaurantItem[] = [
  {
    id: 'kfc',
    title: 'KFC',
    image: 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'mcdonalds',
    title: "McDonald's",
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'popeyes',
    title: 'Popeyes',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'pizza',
    title: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'sushi',
    title: 'Suşi',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80',
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
