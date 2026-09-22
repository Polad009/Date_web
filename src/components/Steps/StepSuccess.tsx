import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, CheckCircle2, Calendar, Utensils, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DatePlan } from '../../types';

interface StepSuccessProps {
  plan: DatePlan;
  onReset: () => void;
}

export const StepSuccess: React.FC<StepSuccessProps> = ({ plan, onReset }) => {
  useEffect(() => {
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f43f6e', '#fb718e', '#fda4af', '#e879f9', '#fde047'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f43f6e', '#fb718e', '#fda4af', '#e879f9', '#fde047'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full max-w-lg mx-auto text-center"
    >
      <div className="mb-5">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-xl shadow-rose-400/50 mb-2 animate-bounce">
          <Heart className="w-7 h-7 fill-white" />
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800">
          Təbriklər, Görüş Təsdiqləndi! 🎉💖
        </h1>
        <p className="font-romantic text-2xl sm:text-3xl text-rose-600 mt-1">
          Gözəl və unudulmaz bir gün bizi gözləyir ✨
        </p>
      </div>

      {/* Aesthetic VIP DATE TICKET / PASS */}
      <div className="relative bg-white/95 backdrop-blur-xl border-2 border-dashed border-rose-300 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-rose-200/60 text-left overflow-hidden mb-5">
        <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-rose-50 rounded-full border-r border-rose-300" />
        <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-rose-50 rounded-full border-l border-rose-300" />

        <div className="flex items-center justify-between pb-3 border-b border-rose-100">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-rose-500 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>DATE INVITATION PASS</span>
            </div>
            <div className="font-serif font-bold text-base sm:text-lg text-slate-800">
              Görüş Biletiniz 🎟️
            </div>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-400 text-rose-600 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 -rotate-3">
            <CheckCircle2 className="w-3 h-3" />
            <span>Təsdiqləndi</span>
          </div>
        </div>

        <div className="py-3.5 space-y-2.5 text-xs sm:text-sm text-slate-700">
          <div className="flex items-start gap-2.5">
            <Calendar className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 text-[11px] block">Tarix və Saat:</span>
              <span className="font-semibold text-slate-800">{plan.selectedDate} • {plan.selectedTime}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Utensils className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 text-[11px] block">Məkan:</span>
              <span className="font-semibold text-slate-800">{plan.foodPlace}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Compass className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 text-[11px] block">Plan:</span>
              <span className="font-semibold text-slate-800">{plan.activity}</span>
            </div>
          </div>

          {plan.specialNote && (
            <div className="bg-rose-50/80 rounded-xl p-2.5 border border-rose-100 mt-2">
              <span className="text-rose-600 text-[11px] font-semibold block">Qeyd / Mahnı:</span>
              <p className="italic text-slate-700 text-xs mt-0.5">"{plan.specialNote}"</p>
            </div>
          )}
        </div>

        <div className="pt-2.5 border-t border-rose-100 flex items-center justify-between text-slate-400 text-[10px]">
          <div className="font-mono tracking-widest text-slate-500">DATE-{Math.floor(100000 + Math.random() * 900000)}</div>
          <div className="text-rose-600 font-medium">Hazırlaş, görüşürük! 🥰</div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={onReset}
          className="text-xs text-rose-600/80 hover:text-rose-700 underline underline-offset-4 font-medium transition cursor-pointer"
        >
          Planı yenidən nəzərdən keçir 🔄
        </button>
      </div>
    </motion.div>
  );
};
