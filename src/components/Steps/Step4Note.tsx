import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Heart, MessageSquare, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import { DatePlan } from '../../types';

interface Step4NoteProps {
  plan: DatePlan;
  onUpdateNote: (note: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export const Step4Note: React.FC<Step4NoteProps> = ({
  plan,
  onUpdateNote,
  onSubmit,
  onBack,
  isSubmitting,
}) => {
  const [note, setNote] = useState(plan.specialNote || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateNote(note.trim());
    onSubmit();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -25 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-lg mx-auto bg-white/90 backdrop-blur-xl border border-rose-200/90 rounded-3xl p-5 sm:p-7 shadow-2xl shadow-rose-200/50"
    >
      <div className="text-center mb-5">
        <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-rose-100 text-rose-600 mb-2">
          <Heart className="w-5 h-5 fill-rose-500" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800">
          Son toxunuş... ✨
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Planımız demək olar ki, hazırdır!
        </p>
      </div>

      {/* Clean Mini Summary Box */}
      <div className="bg-rose-50/70 border border-rose-200/70 rounded-2xl p-3.5 mb-5 text-xs text-slate-700 space-y-1.5">
        <div className="font-semibold text-rose-700 uppercase tracking-wider mb-1 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Plan İcmalı:</span>
        </div>
        <div className="flex justify-between py-1 border-b border-rose-200/40">
          <span className="text-slate-500">Tarix & Saat:</span>
          <span className="font-semibold text-slate-800">{plan.selectedDate} • {plan.selectedTime}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-rose-200/40">
          <span className="text-slate-500">Məkan:</span>
          <span className="font-semibold text-slate-800">{plan.foodPlace}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-rose-200/40">
          <span className="text-slate-500">Plan:</span>
          <span className="font-semibold text-slate-800">{plan.activity}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-slate-500">Desert:</span>
          <span className="font-semibold text-slate-800">{plan.dessert || 'Seçilməyib'}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Message / Song input */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5 text-rose-500" />
            <span>Mənə bir qeyd, arzu və ya sevdiyin mahnını yaz:</span>
          </label>
          <textarea
            rows={3}
            placeholder="Məsələn: 'Görüşümüz üçün sevdiyim mahnı...' və ya hər hansı bir qeyd 🎵"
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
              onUpdateNote(e.target.value);
            }}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-rose-100">
          <button
            onClick={onBack}
            type="button"
            disabled={isSubmitting}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 text-xs sm:text-sm font-medium transition cursor-pointer disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Geri</span>
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold shadow-lg shadow-rose-400/40 transition cursor-pointer disabled:opacity-75"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Göndərilir...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Təsdiqlə və Göndər 💌</span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};
