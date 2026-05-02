'use client';

import { useEffect, useRef } from 'react';

type Props = {
  src?: string;
  onComplete: () => void;
};

export default function TransitionVideo({ src = '/assets/Zeex AI start.mp4', onComplete }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const handleEnded = () => onComplete();
    const tryPlay = async () => {
      try {
        await v.play();
      } catch (e) {
        // autoplay may be blocked; try again after interaction
      }
    };

    v.addEventListener('ended', handleEnded);
    v.addEventListener('loadeddata', tryPlay);

    // ensure play is attempted
    const t = setTimeout(tryPlay, 150);

    return () => {
      v.removeEventListener('ended', handleEnded);
      v.removeEventListener('loadeddata', tryPlay);
      clearTimeout(t);
    };
  }, [onComplete]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <video
        ref={ref}
        src={src}
        playsInline
        muted
        autoPlay
        preload="auto"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
}
