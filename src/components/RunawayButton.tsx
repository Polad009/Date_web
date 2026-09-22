import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface RunawayButtonProps {
  onAccept?: () => void;
}

const FUNNY_MESSAGES = [
  'Xeyr 🙈',
  'Səhv basdın 😜',
  'Tuta bilməzsən 🏃‍♀️',
  'O tərəfə bax 👉',
  'Yenə qaçdım 💨',
  'Boşuna cəhd etmə 🌹',
  'Məcbur razılaşacaqsan 😉',
  'Bəli düyməsi o tərəfdədir ✨',
  'Yorulmadın? 😂',
];

export const RunawayButton: React.FC<RunawayButtonProps> = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [messageIndex, setMessageIndex] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const dodge = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

    // Defined safe jump sectors that NEVER overlap with the "Bəli" button
    // In mobile layout: "Bəli" is directly above (y ≈ -70px).
    // In desktop layout: "Bəli" is to the left (x ≈ -180px).
    const safeZones = isMobile
      ? [
          { x: 50, y: 40 },
          { x: -50, y: 45 },
          { x: 70, y: 70 },
          { x: -60, y: 75 },
          { x: 80, y: 20 },
          { x: -70, y: 30 },
          { x: 30, y: 80 },
          { x: -30, y: 85 },
        ]
      : [
          { x: 90, y: 40 },
          { x: 80, y: -45 },
          { x: 120, y: 20 },
          { x: 100, y: -60 },
          { x: 70, y: 65 },
          { x: 110, y: -30 },
          { x: 60, y: -70 },
        ];

    const pick = safeZones[Math.floor(Math.random() * safeZones.length)];
    const jitterX = (Math.random() - 0.5) * 20;
    const jitterY = (Math.random() - 0.5) * 20;

    setCoords({
      x: pick.x + jitterX,
      y: pick.y + jitterY,
    });
    setMessageIndex((prev) => (prev + 1) % FUNNY_MESSAGES.length);
  };

  return (
    <motion.button
      ref={buttonRef}
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
      className="px-5 py-3.5 sm:px-6 sm:py-3.5 bg-white/95 hover:bg-rose-50/90 text-slate-700 font-semibold rounded-2xl shadow-md border border-rose-200 backdrop-blur-md select-none cursor-pointer text-sm sm:text-base transition-colors duration-150 inline-flex items-center justify-center min-w-[130px] sm:min-w-[140px] touch-none active:scale-95 z-20"
      style={{ touchAction: 'none' }}
    >
      <span>{FUNNY_MESSAGES[messageIndex]}</span>
    </motion.button>
  );
};
