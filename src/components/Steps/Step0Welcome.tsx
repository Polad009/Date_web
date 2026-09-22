import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Step0WelcomeProps {
  onOpen: () => void;
}

export const Step0Welcome: React.FC<Step0WelcomeProps> = ({ onOpen }) => {
  const handleOpenClick = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fda4af', '#f43f6e', '#fde047', '#ffffff'],
    });

    onOpen();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 25 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -25 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-xl border border-rose-200/90 rounded-3xl p-6 sm:p-9 shadow-2xl shadow-rose-200/50 text-center relative"
    >
      {/* Decorative top badge */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/80 text-rose-700 text-xs font-medium mb-4">
        <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-spin" style={{ animationDuration: '8s' }} />
        <span>Sənə özəl</span>
      </div>

      {/* Animated Glowing Mystery Gift Box / Envelope */}
      <div className="relative my-4 flex justify-center items-center">
        <motion.div
          animate={{
            y: [0, -8, 0],
            rotate: [0, -1.5, 1.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-rose-400 via-pink-400 to-rose-500 flex items-center justify-center text-white shadow-xl shadow-rose-400/40 border border-white/40"
        >
          <Mail className="w-14 h-14 sm:w-16 sm:h-16 text-white animate-pulse" />

          {/* Floating heart badge */}
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-rose-500 shadow-md flex items-center justify-center"
          >
            <Heart className="w-4 h-4 fill-rose-500" />
          </motion.div>
        </motion.div>
      </div>

      {/* Mystery Title */}
      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight leading-snug my-3">
        Sənə mesajım var ✨
      </h1>

      <p className="text-slate-600 text-xs sm:text-sm max-w-xs mx-auto mb-6 sm:mb-8 font-normal leading-relaxed">
        Bu kiçik sürprizi açmaq üçün aşağıdakı düyməyə kliklə...
      </p>

      {/* Open Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpenClick}
        className="w-full py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-semibold rounded-2xl shadow-lg shadow-rose-400/40 flex items-center justify-center gap-2.5 text-base sm:text-lg transition-all duration-300 ring-2 ring-rose-300/50 cursor-pointer"
      >
        <span>Məktubu Aç 💌</span>
      </motion.button>
    </motion.div>
  );
};
