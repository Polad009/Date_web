import { useEffect, useRef } from 'react';

// High quality romantic acoustic / lofi background track
const ROMANTIC_MUSIC_URL = 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3';

export const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(ROMANTIC_MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.55;
    audioRef.current = audio;

    const playAudio = () => {
      if (audio.paused) {
        audio.play().catch(() => {
          // Autoplay was prevented; will play on first touch/click
        });
      }
    };

    // Attempt autoplay immediately
    playAudio();

    // Fallback: start immediately on first user touch/click/scroll anywhere
    const handleFirstGesture = () => {
      playAudio();
    };

    window.addEventListener('click', handleFirstGesture, { passive: true });
    window.addEventListener('touchstart', handleFirstGesture, { passive: true });
    window.addEventListener('pointerdown', handleFirstGesture, { passive: true });

    // Stop when tab changes, user minimizes or leaves page
    const handleVisibility = () => {
      if (document.hidden) {
        audio.pause();
      } else {
        audio.play().catch(() => {});
      }
    };

    const handlePageHide = () => {
      audio.pause();
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('blur', handlePageHide);
    window.addEventListener('focus', handleVisibility);

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('pointerdown', handleFirstGesture);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('blur', handlePageHide);
      window.removeEventListener('focus', handleVisibility);

      audio.pause();
      audio.src = '';
    };
  }, []);

  return null;
};
