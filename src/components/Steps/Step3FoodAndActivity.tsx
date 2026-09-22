import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Sparkles, Cake, Check, Edit3, ArrowRight, ArrowLeft } from 'lucide-react';
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
  const [customFood, setCustomFood] = useState('');

  const [activity, setActivity] = useState(selectedActivity || ACTIVITY_OPTIONS[0].title);
  const [customActivity, setCustomActivity] = useState('');

  const [dessert, setDessert] = useState(selectedDessert || DESSERT_QUICK_OPTIONS[0].title);
  const [customDessert, setCustomDessert] = useState('');

  const getEffectiveFood = (f = food, cf = customFood) => {
    if (f === 'Digər ✨') {
      return cf.trim() ? `Digər (${cf.trim()})` : 'Digər';
    }
    return f;
  };

  const getEffectiveActivity = (a = activity, ca = customActivity) => {
    if (a === 'Digər ✨') {
      return ca.trim() ? `Digər (${ca.trim()})` : 'Digər';
    }
    return a;
  };

  const getEffectiveDessert = (d = dessert, cd = customDessert) => {
    if (d === 'Digər ✨') {
      return cd.trim() ? `Digər (${cd.trim()})` : 'Digər';
    }
    return d;
  };

  const handleFoodSelect = (title: string) => {
    setFood(title);
    onUpdate({
      foodPlace: getEffectiveFood(title, customFood),
      activity: getEffectiveActivity(),
      dessert: getEffectiveDessert(),
    });
  };

  const handleActivitySelect = (title: string) => {
    setActivity(title);
    onUpdate({
      foodPlace: getEffectiveFood(),
      activity: getEffectiveActivity(title, customActivity),
      dessert: getEffectiveDessert(),
    });
  };

  const handleDessertSelect = (title: string) => {
    setDessert(title);
    onUpdate({
      foodPlace: getEffectiveFood(),
      activity: getEffectiveActivity(),
      dessert: getEffectiveDessert(title, customDessert),
    });
  };

  const handleNextClick = () => {
    onUpdate({
      foodPlace: getEffectiveFood(),
      activity: getEffectiveActivity(),
      dessert: getEffectiveDessert(),
    });
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

      {/* 1. Restaurants */}
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
                className={`relative h-20 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 text-left flex flex-col justify-end p-2.5 group cursor-pointer bg-slate-800 ${
                  isSelected
                    ? 'border-rose-500 ring-4 ring-rose-300/60 shadow-lg scale-102'
                    : 'border-slate-200 hover:border-rose-300 opacity-90 hover:opacity-100'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className={`absolute inset-0 transition-opacity ${
                  isSelected ? 'bg-gradient-to-t from-rose-950/90 via-rose-900/40 to-transparent' : 'bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent'
                }`} />

                {isSelected && (
                  <div className="absolute top-2 right-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                )}

                <span className="relative z-10 text-white font-bold text-xs sm:text-sm drop-shadow-md">
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Custom food input if 'Digər' is chosen */}
        <AnimatePresence>
          {food === 'Digər ✨' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2.5"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="İstədiyin məkanı və ya yeməyi yaz (könüllü)..."
                  value={customFood}
                  onChange={(e) => {
                    setCustomFood(e.target.value);
                    onUpdate({
                      foodPlace: getEffectiveFood(food, e.target.value),
                      activity: getEffectiveActivity(),
                      dessert: getEffectiveDessert(),
                    });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-rose-300 bg-rose-50/40 text-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 pl-9"
                />
                <Edit3 className="w-4 h-4 text-rose-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. Activities */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>Görüşdə nə edək?</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {ACTIVITY_OPTIONS.map((item) => {
            const isSelected = activity === item.title;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleActivitySelect(item.title)}
                className={`relative h-20 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 text-left flex flex-col justify-end p-2.5 group cursor-pointer bg-slate-800 ${
                  isSelected
                    ? 'border-rose-500 ring-4 ring-rose-300/60 shadow-lg scale-102'
                    : 'border-slate-200 hover:border-rose-300 opacity-90 hover:opacity-100'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className={`absolute inset-0 transition-opacity ${
                  isSelected ? 'bg-gradient-to-t from-rose-950/90 via-rose-900/40 to-transparent' : 'bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent'
                }`} />

                {isSelected && (
                  <div className="absolute top-2 right-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                )}

                <span className="relative z-10 text-white font-bold text-xs sm:text-sm drop-shadow-md">
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Custom activity input if 'Digər' is chosen */}
        <AnimatePresence>
          {activity === 'Digər ✨' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2.5"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ağlındakı planı və ya aktivliyi yaz (könüllü)..."
                  value={customActivity}
                  onChange={(e) => {
                    setCustomActivity(e.target.value);
                    onUpdate({
                      foodPlace: getEffectiveFood(),
                      activity: getEffectiveActivity(activity, e.target.value),
                      dessert: getEffectiveDessert(),
                    });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-rose-300 bg-rose-50/40 text-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 pl-9"
                />
                <Edit3 className="w-4 h-4 text-rose-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Desserts */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Cake className="w-3.5 h-3.5 text-rose-500" />
          <span>Şirniyyat / Desert:</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {DESSERT_QUICK_OPTIONS.map((item) => {
            const isSelected = dessert === item.title;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleDessertSelect(item.title)}
                className={`relative h-20 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 text-left flex flex-col justify-end p-2.5 group cursor-pointer bg-slate-800 ${
                  isSelected
                    ? 'border-rose-500 ring-4 ring-rose-300/60 shadow-lg scale-102'
                    : 'border-slate-200 hover:border-rose-300 opacity-90 hover:opacity-100'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className={`absolute inset-0 transition-opacity ${
                  isSelected ? 'bg-gradient-to-t from-rose-950/90 via-rose-900/40 to-transparent' : 'bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent'
                }`} />

                {isSelected && (
                  <div className="absolute top-2 right-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                )}

                <span className="relative z-10 text-white font-bold text-xs sm:text-sm drop-shadow-md">
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Custom dessert input if 'Digər' is chosen */}
        <AnimatePresence>
          {dessert === 'Digər ✨' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2.5"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Sevdiyin şirniyyatı və ya deserti yaz (könüllü)..."
                  value={customDessert}
                  onChange={(e) => {
                    setCustomDessert(e.target.value);
                    onUpdate({
                      foodPlace: getEffectiveFood(),
                      activity: getEffectiveActivity(),
                      dessert: getEffectiveDessert(dessert, e.target.value),
                    });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-rose-300 bg-rose-50/40 text-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 pl-9"
                />
                <Edit3 className="w-4 h-4 text-rose-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
