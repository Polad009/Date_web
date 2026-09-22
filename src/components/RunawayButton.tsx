import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface RunawayButtonProps {
  onAccept: () => void;
}

const FUNNY_MESSAGES = [
  'Xeyr 🙈',
  'Səhv basdın 😜',
  'Tuta bilməzsən 🏃‍♀️',
  'O tərəfə bax 👉',
  'Yenə qaçdım 💨',
  'Boşuna cəhd etmə 🌹',
  'Məcbur razılaşacaqsan 😉',
  'Bəli düyməsi daha qəşəngdir ✨',
  'Yorulmadın? 😂',
];

export const RunawayButton: React.FC<RunawayButtonProps> = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [messageIndex, setMessageIndex] = useState(0);

  const dodge = () => {
    // Jump away when cursor enters or when touched
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const rangeX = isMobile ? 100 : 140;
    const rangeY = isMobile ? 90 : 120;

    // Generate random offset within nearby card area
    const randomX = (Math.random() - 0.5) * (rangeX * 2);
    const randomY = (Math.random() - 0.5) * (rangeY * 2);

    setCoords({ x: randomX, y: randomY });
    setMessageIndex((prev) => (prev + 1) % FUNNY_MESSAGES.length);
  };

  return (
    <motion.button
      animate={{
        x: coords.x,
        y: coords.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 450,
        damping: 24,
      }}
      onMouseEnter={dodge}
      onPointerEnter={dodge}
      onTouchStart={(e) => {
        e.preventDefault();
        dodge();
      }}
      onClick={(e) => {
        e.preventDefault();
        dodge();
      }}
      className="px-5 py-3.5 sm:px-6 sm:py-3.5 bg-white/95 hover:bg-rose-50/90 text-slate-700 font-semibold rounded-2xl shadow-md border border-rose-200 backdrop-blur-md select-none cursor-pointer text-sm sm:text-base transition-colors duration-150 inline-flex items-center justify-center min-w-[130px] sm:min-w-[140px] touch-none active:scale-95"
      style={{ touchAction: 'none' }}
    >
      <span>{FUNNY_MESSAGES[messageIndex]}</span>
    </motion.button>
  );
};
