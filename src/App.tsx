import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FloatingHearts } from './components/FloatingHearts';
import { AudioPlayer } from './components/AudioPlayer';
import { ProgressBar } from './components/ProgressBar';
import { Step0Welcome } from './components/Steps/Step0Welcome';
import { Step1Proposal } from './components/Steps/Step1Proposal';
import { Step2CalendarTime } from './components/Steps/Step2CalendarTime';
import { Step3FoodAndActivity } from './components/Steps/Step3FoodAndActivity';
import { Step4Note } from './components/Steps/Step4Note';
import { StepSuccess } from './components/Steps/StepSuccess';
import { DatePlan, RESTAURANT_OPTIONS, ACTIVITY_OPTIONS, DESSERT_QUICK_OPTIONS } from './types';
import { sendDateNotification } from './services/notificationService';

export function App() {
  const [step, setStep] = useState(0); // Starts with opening welcome screen
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Tomorrow as default
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split('T')[0];

  const [datePlan, setDatePlan] = useState<DatePlan>({
    agreed: true,
    selectedDate: defaultDate,
    selectedTime: '19:00',
    foodPlace: RESTAURANT_OPTIONS[0].title,
    activity: ACTIVITY_OPTIONS[0].title,
    dessert: DESSERT_QUICK_OPTIONS[0].title,
    specialNote: '',
  });

  const handleStep1Accept = () => {
    setDatePlan((prev) => ({ ...prev, agreed: true }));
    setStep(2);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      await sendDateNotification(datePlan);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
      setStep(5); // Show VIP date invitation ticket
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between p-3 sm:p-6 overflow-x-hidden">
      {/* Background Floating Petals & Aurora Glow */}
      <FloatingHearts />

      {/* Romantic Auto-playing audio on interaction */}
      <AudioPlayer />

      {/* Stepped Progress Bar (steps 2 to 4) */}
      <header className="pt-2 sm:pt-4 z-10">
        <ProgressBar currentStep={step} />
      </header>

      {/* Main interactive card */}
      <main className="flex-1 flex items-center justify-center z-10 my-3">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <Step0Welcome key="step0" onOpen={() => setStep(1)} />
          )}

          {step === 1 && (
            <Step1Proposal key="step1" onAccept={handleStep1Accept} />
          )}

          {step === 2 && (
            <Step2CalendarTime
              key="step2"
              selectedDate={datePlan.selectedDate}
              selectedTime={datePlan.selectedTime}
              onUpdate={(data) => setDatePlan((prev) => ({ ...prev, ...data }))}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <Step3FoodAndActivity
              key="step3"
              selectedFood={datePlan.foodPlace}
              selectedActivity={datePlan.activity}
              selectedDessert={datePlan.dessert || ''}
              onUpdate={(data) => setDatePlan((prev) => ({ ...prev, ...data }))}
              onNext={() => setStep(4)}
              onBack={() => setStep(2)}
            />
          )}

          {step === 4 && (
            <Step4Note
              key="step4"
              plan={datePlan}
              isSubmitting={isSubmitting}
              onUpdateNote={(data) => setDatePlan((prev) => ({ ...prev, ...data }))}
              onSubmit={handleFinalSubmit}
              onBack={() => setStep(3)}
            />
          )}

          {step === 5 && (
            <StepSuccess
              key="step5"
              plan={datePlan}
              onReset={() => setStep(0)}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Subtle Romantic Footer */}
      <footer className="text-center py-2 text-[11px] text-rose-400/80 select-none z-10">
        <span>Gözəl xatirələr üçün hazırlandı ✨</span>
      </footer>
    </div>
  );
}

export default App;
