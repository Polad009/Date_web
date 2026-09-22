import React from 'react';
import { Calendar, Utensils, Send } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
}

const STEP_ICONS = [
  { label: 'Tarix & Saat', icon: Calendar },
  { label: 'Məkan & Plan', icon: Utensils },
  { label: 'Son Qeyd', icon: Send },
];

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  if (currentStep < 2 || currentStep > 4) return null;

  const activeIndex = currentStep - 2; // 0, 1, 2

  return (
    <div className="w-full max-w-sm mx-auto mb-5 px-4">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2 h-1 bg-rose-100 -z-0 rounded-full" />
        
        <div
          className="absolute left-3 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-rose-400 to-pink-500 -z-0 rounded-full transition-all duration-500"
          style={{ width: `${(activeIndex / 2) * 88}%` }}
        />

        {STEP_ICONS.map((step, idx) => {
          const Icon = step.icon;
          const isCompleted = idx < activeIndex;
          const isCurrent = idx === activeIndex;

          return (
            <div key={idx} className="flex flex-col items-center z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 text-xs font-semibold ${
                  isCurrent
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-300/50 scale-110 ring-4 ring-rose-100'
                    : isCompleted
                    ? 'bg-rose-400 text-white scale-95'
                    : 'bg-white text-rose-300 border-2 border-rose-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span
                className={`text-[10px] mt-1 font-medium transition-colors hidden sm:block ${
                  isCurrent ? 'text-rose-600 font-semibold' : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
