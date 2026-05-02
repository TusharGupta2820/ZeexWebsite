'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ParticleCanvas from './components/ParticleCanvas';
import Splash from './components/Splash';

export default function RootSplash() {
  const router = useRouter();

  useEffect(() => {
    // Navigate to home after splash completes
    const t = setTimeout(() => {
      router.push('/home');
    }, 6000);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <>
      <ParticleCanvas />

      {/* Grid overlay */}
      <div className="grid-overlay"></div>

      {/* Horizontal scan line */}
      <div className="scan-line"></div>

      {/* HUD Corners */}
      <div className="hud-corner hud-tl"></div>
      <div className="hud-corner hud-tr"></div>
      <div className="hud-corner hud-bl"></div>
      <div className="hud-corner hud-br"></div>

      {/* Floating data labels */}
      <div className="data-label tl">SYS_VER: 2.4.1</div>
      <div className="data-label tr">CONN: SECURE</div>
      <div className="data-label bl">LAT: 28.6139°N</div>
      <div className="data-label br">THREAT_LVL: NONE</div>

      <Splash />
    </>
  );
}
