'use client';

import { useEffect } from 'react';

export default function Splash() {
  useEffect(() => {
    // Burst dots
    const logoArea = document.querySelector('.logo-area');
    if (logoArea) {
      for (let i = 0; i < 20; i++) {
        const dot = document.createElement('div');
        dot.className = 'burst-dot';
        dot.style.left = `${Math.random() * 200 + 10}px`;
        dot.style.top = `${Math.random() * 200 + 10}px`;
        dot.style.animationDelay = `${Math.random() * 0.5 + 2.0}s`;
        logoArea.appendChild(dot);
      }
    }

    // Percentage counter
    const pct = document.getElementById('pct');
    if (pct) {
      let percent = 0;
      const interval = setInterval(() => {
        percent += Math.random() * 10;
        if (percent >= 100) {
          percent = 100;
          clearInterval(interval);
        }
        pct.textContent = Math.floor(percent) + '%';
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div id="splash" className="splash">
      <div className="logo-area">
        <div className="ring ring-1"></div>
        <div className="ring ring-2"></div>
        <div className="ring ring-3"></div>
        <div className="radar-sweep"></div>
        <div className="bracket tl"></div>
        <div className="bracket tr"></div>
        <div className="bracket bl"></div>
        <div className="bracket br"></div>
        <div className="logo-img-wrap">
          <img src="/assets/Zeex-AI logo .png" alt="Zeex AI" className="logo-base" />
          <img src="/assets/Zeex-AI logo .png" alt="Zeex AI" className="logo-color" />
        </div>
      </div>
      <div className="brand">
       
        <div className="brand-divider"></div>
        <p className="brand-sub">FUTURE OF SURVEILLANCE</p>
      </div>
      <div className="status-row">
        <div className="status-tag"><span className="status-dot"></span>ONLINE</div>
        <div className="status-tag"><span className="status-dot"></span>SECURE</div>
        <div className="status-tag"><span className="status-dot"></span>ACTIVE</div>
      </div>
      <div className="loader-wrap">
        <div className="loader-header">
          <span>INITIALIZING</span>
          <span id="pct">0%</span>
        </div>
        <div className="loader-track">
          <div className="loader-fill"></div>
        </div>
      </div>
    </div>
  );
}
