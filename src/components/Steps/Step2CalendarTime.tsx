import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';

interface Step2CalendarTimeProps {
  selectedDate: string;
  selectedTime: string;
  onUpdate: (data: { selectedDate: string; selectedTime: string }) => void;
  onNext: () => void;
  onBack: () => void;
}

const MONTH_NAMES_AZ = [
  'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun',
  'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
];

const WEEKDAYS_AZ = ['B.e', 'Ç.a', 'Ç', 'C.a', 'C', 'Ş', 'B'];

const QUICK_TIMES = ['16:00', '17:30', '18:30', '19:30', '20:30'];

export const Step2CalendarTime: React.FC<Step2CalendarTimeProps> = ({
  selectedDate,
  selectedTime,
  onUpdate,
  onNext,
  onBack,
}) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // Default to tomorrow if not set
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = selectedDate || tomorrow.toISOString().split('T')[0];

  const [pickedDate, setPickedDate] = useState<string>(defaultDateStr);
  const [pickedTime, setPickedTime] = useState<string>(selectedTime || '19:00');

  // Calendar generation logic
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Day of week index (Monday = 0, Sunday = 6)
  let startDayOfWeek = firstDayOfMonth.getDay() - 1;
  if (startDayOfWeek === -1) startDayOfWeek = 6;

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleSelectDay = (dayNumber: number) => {
    const formattedMonth = String(currentMonth + 1).padStart(2, '0');
    const formattedDay = String(dayNumber).padStart(2, '0');
    const dateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;
    setPickedDate(dateStr);
    onUpdate({ selectedDate: dateStr, selectedTime: pickedTime });
  };

  const handleTimeChange = (time: string) => {
    setPickedTime(time);
    onUpdate({ selectedDate: pickedDate, selectedTime: time });
  };

  const handleNextClick = () => {
    onUpdate({ selectedDate: pickedDate, selectedTime: pickedTime });
    onNext();
  };

  // Format date display for badge
  const displayDateObj = new Date(pickedDate + 'T00:00:00');
  const formattedNiceDate = !isNaN(displayDateObj.getTime())
    ? `${displayDateObj.getDate()} ${MONTH_NAMES_AZ[displayDateObj.getMonth()]} ${displayDateObj.getFullYear()}`
    : pickedDate;

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
          <CalendarIcon className="w-5 h-5" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800">
          Görüş vaxtını seçək 📅
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Sənə ən uyğun olan günü təqvimdən qeyd et
        </p>
      </div>

      {/* Interactive Calendar Card */}
      <div className="bg-rose-50/50 border border-rose-200/70 rounded-2xl p-4 mb-5">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="font-semibold text-slate-800 text-sm sm:text-base">
            {MONTH_NAMES_AZ[currentMonth]} {currentYear}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={prevMonth}
              type="button"
              className="p-1.5 rounded-lg hover:bg-rose-200/50 text-slate-600 transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextMonth}
              type="button"
              className="p-1.5 rounded-lg hover:bg-rose-200/50 text-slate-600 transition cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
          {WEEKDAYS_AZ.map((day, idx) => (
            <span key={idx} className="text-[11px] font-semibold text-rose-500/80">
              {day}
            </span>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: startDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="h-8 sm:h-9" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const formattedMonth = String(currentMonth + 1).padStart(2, '0');
            const formattedDay = String(dayNum).padStart(2, '0');
            const thisDateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;

            const isSelected = pickedDate === thisDateStr;
            const thisDate = new Date(currentYear, currentMonth, dayNum);
            const isPast = thisDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());

            return (
              <button
                key={dayNum}
                type="button"
                disabled={isPast}
                onClick={() => handleSelectDay(dayNum)}
                className={`h-8 sm:h-9 rounded-xl text-xs sm:text-sm font-medium transition flex items-center justify-center cursor-pointer ${
                  isSelected
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-400/40 font-bold scale-105'
                    : isPast
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'text-slate-700 hover:bg-rose-200/50 hover:text-rose-700 bg-white/70'
                }`}
              >
                {dayNum}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Date Summary Badge */}
      <div className="text-center mb-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/70 text-rose-700 text-xs font-medium">
          <span>Seçilən gün:</span>
          <strong>{formattedNiceDate}</strong>
        </span>
      </div>

      {/* Time Picker */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-rose-500" />
          <span>Görüş Saatı:</span>
        </label>
        <div className="flex flex-wrap items-center gap-2 mb-2.5">
          {QUICK_TIMES.map((time) => {
            const isSelected = pickedTime === time;
            return (
              <button
                key={time}
                type="button"
                onClick={() => handleTimeChange(time)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                  isSelected
                    ? 'border-rose-400 bg-rose-500 text-white shadow-sm'
                    : 'border-slate-200 bg-white/80 text-slate-700 hover:border-rose-300'
                }`}
              >
                {time}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">və ya istədiyin saat:</span>
          <input
            type="time"
            value={pickedTime}
            onChange={(e) => handleTimeChange(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-rose-400"
          />
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
          <span>Növbəti: Məkan və Plan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
