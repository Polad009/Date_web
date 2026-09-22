import { useState, useEffect } from 'react';
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
import { CreateInvitePage } from './components/CreateInvitePage';
import { DatePlan, RESTAURANT_OPTIONS, ACTIVITY_OPTIONS, DESSERT_QUICK_OPTIONS } from './types';
import { sendDateNotification } from './services/notificationService';
import { decodeInvite, InviteData } from './utils/token';

export function App() {
  const [step, setStep] = useState(0); // Starts with opening welcome screen
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [inviteMeta, setInviteMeta] = useState<InviteData | null>(null);

  // Check URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pathname = window.location.pathname;

    // Check if in creator mode (/create or ?create)
    if (pathname.includes('/create') || params.has('create')) {
      setIsCreateMode(true);
      return;
    }

    // Check if custom invite ref is present
    const refToken = params.get('ref');
    if (refToken) {
      const decoded = decodeInvite(refToken);
      if (decoded) {
        setInviteMeta(decoded);
      }
    }
  }, []);

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
      await sendDateNotification(
        datePlan,
        inviteMeta?.chatId,
        inviteMeta?.senderName,
        inviteMeta?.recipientName
      );
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
      {!isCreateMode && (
        <header className="pt-2 sm:pt-4 z-10">
          <ProgressBar currentStep={step} />
        </header>
      )}

      {/* Main interactive card */}
      <main className="flex-1 flex items-center justify-center z-10 my-3">
        <AnimatePresence mode="wait">
          {isCreateMode ? (
            <CreateInvitePage
              key="create"
              onBackToHome={() => {
                setIsCreateMode(false);
                window.history.replaceState({}, '', '/');
              }}
            />
          ) : (
            <>
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
                  onUpdateNote={(note) => setDatePlan((prev) => ({ ...prev, specialNote: note }))}
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
            </>
          )}
        </AnimatePresence>
      </main>

      {/* Subtle Romantic Footer with hidden Link Creator access */}
      <footer className="text-center py-2 text-[11px] text-rose-400/80 select-none z-10 flex flex-col items-center gap-1">
        <span>Gözəl xatirələr üçün hazırlandı ✨</span>
        {!isCreateMode && (
          <button
            onClick={() => setIsCreateMode(true)}
            className="text-[10px] text-rose-300 hover:text-rose-500 underline underline-offset-2 transition cursor-pointer"
          >
            Öz dəvət linkini yarat 💌
          </button>
        )}
      </footer>
    </div>
  );
}

export default App;
