import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RunawayButton } from '../RunawayButton';

interface Step1ProposalProps {
  onAccept: () => void;
}

export const Step1Proposal: React.FC<Step1ProposalProps> = ({ onAccept }) => {
  const handleAcceptClick = () => {
    confetti({
      particleCount: 110,
      spread: 85,
      origin: { y: 0.6 },
      colors: ['#f43f6e', '#ec4899', '#fbcfe8', '#fda4af', '#facc15', '#ffffff'],
    });

    setTimeout(() => {
      onAccept();
    }, 350);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: -20 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="w-full max-w-lg mx-auto bg-white/95 backdrop-blur-xl border border-rose-200/90 rounded-3xl p-5 sm:p-9 shadow-2xl shadow-rose-200/50 text-center relative"
    >
      {/* Decorative top badge */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/80 text-rose-700 text-xs font-medium mb-2 sm:mb-3">
        <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-spin" style={{ animationDuration: '8s' }} />
        <span>Sənə kiçik bir sualım var</span>
      </div>

      {/* Pure Vector Animated Shy Teddy Bear holding a Rose (100% offline & instant) */}
      <div className="relative my-2 sm:my-3 flex justify-center items-center">
        <motion.div
          animate={{
            y: [0, -6, 0],
            rotate: [0, -1.5, 1.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center select-none"
        >
          {/* Soft ambient background glow */}
          <div className="absolute inset-0 bg-rose-200/45 rounded-full blur-xl animate-pulse-glow" />

          {/* SVG Character */}
          <svg viewBox="0 0 160 160" className="w-full h-full relative z-10 drop-shadow-md">
            {/* Bear Ears */}
            <motion.circle
              animate={{ rotate: [-2, 4, -2] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              cx="45" cy="45" r="18" fill="#d97706"
            />
            <circle cx="45" cy="45" r="11" fill="#fde68a" />

            <motion.circle
              animate={{ rotate: [2, -4, 2] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              cx="115" cy="45" r="18" fill="#d97706"
            />
            <circle cx="115" cy="45" r="11" fill="#fde68a" />

            {/* Bear Head */}
            <circle cx="80" cy="78" r="44" fill="#f59e0b" />

            {/* Muzzle */}
            <ellipse cx="80" cy="90" rx="22" ry="16" fill="#fef3c7" />
            <ellipse cx="80" cy="83" rx="7" ry="5" fill="#78350f" />
            <path d="M 80 88 Q 75 96 70 93 M 80 88 Q 85 96 90 93" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Rosy Blushing Cheeks */}
            <ellipse cx="52" cy="88" rx="8" ry="5" fill="#f43f5e" opacity="0.65" />
            <ellipse cx="108" cy="88" rx="8" ry="5" fill="#f43f5e" opacity="0.65" />

            {/* Sparkling Eyes */}
            <circle cx="62" cy="73" r="5" fill="#451a03" />
            <circle cx="60.5" cy="71" r="2" fill="#ffffff" />
            <circle cx="98" cy="73" r="5" fill="#451a03" />
            <circle cx="96.5" cy="71" r="2" fill="#ffffff" />

            {/* Bear Paws holding the Rose */}
            <ellipse cx="58" cy="116" rx="10" ry="8" fill="#d97706" />
            <ellipse cx="102" cy="116" rx="10" ry="8" fill="#d97706" />

            {/* The Rose Stem and Leaves */}
            <path d="M 80 135 Q 78 120 80 108" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <ellipse cx="73" cy="122" rx="6" ry="3" fill="#22c55e" transform="rotate(-30 73 122)" />
            <ellipse cx="88" cy="118" rx="6" ry="3" fill="#22c55e" transform="rotate(30 88 118)" />

            {/* The Blooming Red Rose Petals */}
            <circle cx="80" cy="106" r="9" fill="#e11d48" />
            <circle cx="76" cy="103" r="7" fill="#f43f5e" />
            <circle cx="84" cy="103" r="7" fill="#fb7185" />
            <circle cx="80" cy="101" r="5" fill="#ffe4e6" />
          </svg>

          {/* Floating tiny sparkles */}
          <motion.span
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6], y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-1 right-2 text-yellow-400 text-base z-20"
          >
            ✨
          </motion.span>
          <motion.span
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5], y: [0, -3, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: 0.8 }}
            className="absolute bottom-2 left-2 text-rose-400 text-sm z-20"
          >
            💖
          </motion.span>
        </motion.div>
      </div>

      {/* Polite & Charming Title */}
      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight leading-snug my-2">
        Salam! ✨
      </h1>

      <p className="font-romantic text-2xl sm:text-3xl text-rose-600 font-semibold my-2 px-1">
        Birlikdə bir qəhvə içib söhbət etməyə necə baxırsan? ☕✨
      </p>

      <p className="text-slate-600 text-xs sm:text-sm max-w-xs sm:max-w-sm mx-auto mb-6 sm:mb-8 font-normal leading-relaxed px-2">
        Səni daha yaxından tanımaq çox xoş olardı. Gəl birlikdə xoş və maraqlı bir gün keçirək! 😊
      </p>

      {/* Buttons container */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mt-2 min-h-[110px] sm:min-h-[60px]">
        {/* Yes Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAcceptClick}
          className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-semibold rounded-2xl shadow-lg shadow-rose-400/40 flex items-center justify-center gap-2 text-sm sm:text-base transition-all duration-300 ring-2 ring-rose-300/50 cursor-pointer"
        >
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-white animate-pulse" />
          <span>Bəli, əlbəttə! 🥰</span>
        </motion.button>

        {/* Nearby Dodging No Button */}
        <RunawayButton onAccept={handleAcceptClick} />
      </div>
    </motion.div>
  );
};
