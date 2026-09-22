import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Sparkles, Cake, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { RESTAURANT_OPTIONS, ACTIVITY_OPTIONS, DESSERT_QUICK_OPTIONS } from '../../types';

interface Step3FoodAndActivityProps {
  selectedFood: string;
  selectedActivity: string;
  selectedDessert: string;
  onUpdate: (data: { foodPlace: string; activity: string; dessert: string }) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step3FoodAndActivity: React.FC<Step3FoodAndActivityProps> = ({
  selectedFood,
  selectedActivity,
  selectedDessert,
  onUpdate,
  onNext,
  onBack,
}) => {
  const [food, setFood] = useState(selectedFood || RESTAURANT_OPTIONS[0].title);
  const [activity, setActivity] = useState(selectedActivity || ACTIVITY_OPTIONS[0].title);
  const [dessert, setDessert] = useState(selectedDessert || DESSERT_QUICK_OPTIONS[0].title);

  const handleFoodSelect = (title: string) => {
    setFood(title);
    onUpdate({ foodPlace: title, activity, dessert });
  };

  const handleActivitySelect = (title: string) => {
    setActivity(title);
    onUpdate({ foodPlace: food, activity: title, dessert });
  };

  const handleDessertSelect = (title: string) => {
    setDessert(title);
    onUpdate({ foodPlace: food, activity, dessert: title });
  };

  const handleNextClick = () => {
    onUpdate({ foodPlace: food, activity, dessert });
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -25 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-xl mx-auto bg-white/90 backdrop-blur-xl border border-rose-200/90 rounded-3xl p-5 sm:p-7 shadow-2xl shadow-rose-200/50"
    >
      <div className="text-center mb-5">
        <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-rose-100 text-rose-600 mb-2">
          <Utensils className="w-5 h-5" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800">
          Məkan və Plan Seçimi
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Ürəyincə olan seçimləri et ✨
        </p>
      </div>

      {/* 1. Only 5 Restaurants with Full-Cover Images & Badges */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Utensils className="w-3.5 h-3.5 text-rose-500" />
          <span>Hara gedək? / Yemək seçimi:</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {RESTAURANT_OPTIONS.map((item) => {
            const isSelected = food === item.title;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleFoodSelect(item.title)}
                className={`relative h-24 sm:h-28 rounded-2xl overflow-hidden border-2 transition-all duration-300 text-left flex flex-col justify-end p-2.5 group cursor-pointer ${
                  isSelected
                    ? 'border-rose-500 ring-4 ring-rose-300/60 shadow-lg scale-102'
                    : 'border-slate-200 hover:border-rose-300 opacity-90 hover:opacity-100'
                }`}
              >
                {/* Full-Cover Background Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />

                {/* Dark Gradient Overlay for readability */}
                <div className={`absolute inset-0 transition-opacity ${
                  isSelected ? 'bg-gradient-to-t from-rose-950/90 via-rose-900/40 to-transparent' : 'bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent'
                }`} />

                {/* Selection Checkmark */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}

                {/* Title */}
                <span className="relative z-10 text-white font-bold text-sm sm:text-base drop-shadow-md">
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Activity Choices */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>Görüşdə nə edək?</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {ACTIVITY_OPTIONS.map((item) => {
            const isSelected = activity === item.title;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleActivitySelect(item.title)}
                className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'border-rose-400 bg-rose-500 text-white shadow-sm font-semibold'
                    : 'border-slate-200 bg-white/80 text-slate-700 hover:border-rose-200'
                }`}
              >
                <span className="text-lg">{item.emoji}</span>
                <div className="truncate">
                  <div className="text-xs font-medium">{item.title}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Simple Dessert Choice */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Cake className="w-3.5 h-3.5 text-rose-500" />
          <span>Şirniyyat / Desert:</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {DESSERT_QUICK_OPTIONS.map((item) => {
            const isSelected = dessert === item.title;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleDessertSelect(item.title)}
                className={`p-2.5 rounded-xl border text-center transition text-xs font-medium cursor-pointer ${
                  isSelected
                    ? 'border-rose-400 bg-rose-500 text-white shadow-sm font-semibold'
                    : 'border-slate-200 bg-white/80 text-slate-700 hover:border-rose-200'
                }`}
              >
                {item.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-3 pt-4 border-t border-rose-100">
        <button
          onClick={onBack}
          type="button"
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 text-xs sm:text-sm font-medium transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Geri</span>
        </button>

        <button
          onClick={handleNextClick}
          type="button"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white flex items-center gap-1.5 text-xs sm:text-sm font-semibold shadow-md shadow-rose-300/50 transition cursor-pointer"
        >
          <span>Növbəti: Son Qeyd</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
