import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  swayOffset: number;
  swaySpeed: number;
  color: string;
}

interface Sparkle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

const PETAL_COLORS = [
  'rgba(255, 182, 193, 0.65)', // Light Pink
  'rgba(255, 192, 203, 0.55)', // Pink
  'rgba(254, 205, 214, 0.70)', // Rose 200
  'rgba(251, 113, 142, 0.45)', // Rose 400
  'rgba(244, 63, 110, 0.35)',  // Rose 500
];

export const FloatingHearts: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize fluttering rose petals
    const petalCount = window.innerWidth < 640 ? 22 : 36;
    const petals: Petal[] = Array.from({ length: petalCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 12 + 8,
      speedX: Math.random() * 0.8 - 0.4,
      speedY: Math.random() * 0.9 + 0.6,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      opacity: Math.random() * 0.4 + 0.4,
      swayOffset: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.02 + 0.01,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    }));

    // Initialize fairy dust sparkles
    const sparkleCount = window.innerWidth < 640 ? 25 : 45;
    const sparkles: Sparkle[] = Array.from({ length: sparkleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      opacity: Math.random(),
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    // Draw single petal shape
    const drawPetal = (p: Petal, time: number) => {
      ctx.save();
      const currentSway = Math.sin(time * p.swaySpeed + p.swayOffset) * 1.8;
      ctx.translate(p.x + currentSway * 10, p.y);
      ctx.rotate(p.rotation + currentSway * 0.2);

      ctx.beginPath();
      // Draw organic petal bezier curve
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size, p.size / 3, 0, p.size);
      ctx.bezierCurveTo(p.size, p.size / 3, p.size / 2, -p.size / 2, 0, 0);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
      ctx.restore();
    };

    // Draw sparkle star
    const drawSparkle = (s: Sparkle, time: number) => {
      const currentOpacity = (Math.sin(time * s.twinkleSpeed + s.twinkleOffset) + 1) / 2;
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.beginPath();
      ctx.arc(0, 0, s.size, 0, Math.PI * 2);
      ctx.fillStyle = '#fde047'; // soft golden sparkle
      ctx.globalAlpha = currentOpacity * 0.7;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#fb7185';
      ctx.fill();
      ctx.restore();
    };

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Render sparkles
      sparkles.forEach((s) => {
        drawSparkle(s, time);
      });

      // Render & update falling petals
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        // Wrap around smoothly when exiting screen
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) {
          p.x = -20;
        } else if (p.x < -20) {
          p.x = width + 20;
        }

        drawPetal(p, time);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Soft Ambient glowing aurora blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-rose-300/35 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-300/25 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2.5s' }} />
      <div className="absolute -bottom-32 left-1/4 w-[30rem] h-[30rem] bg-pink-300/30 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '5s' }} />

      {/* 60fps Canvas for smooth natural petals and fairy sparkles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
