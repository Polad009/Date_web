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

export interface CardOptionItem {
  id: string;
  title: string;
  image: string;
}

export const RESTAURANT_OPTIONS: CardOptionItem[] = [
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

export const ACTIVITY_OPTIONS: CardOptionItem[] = [
  {
    id: 'walk',
    title: 'Dənizkənarı Gəzinti',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'bowling',
    title: 'Bowling / Əyləncə',
    image: 'https://images.unsplash.com/photo-1538388184544-d830b561e1fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'cinema',
    title: 'Kino / Film',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'coffee_talk',
    title: 'Sakit Qəhvə Söhbəti',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80',
  },
];

export const DESSERT_QUICK_OPTIONS: CardOptionItem[] = [
  {
    id: 'icecream',
    title: 'Dondurma 🍦',
    image: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'cheesecake',
    title: 'Cheesecake 🍰',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'waffle',
    title: 'Waffle 🧇',
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'none',
    title: 'Yalnız yemək kifayətdir 😋',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80',
  },
];
