"use client";

import React, { useEffect } from "react";

export default function LenisProvider() {
  useEffect(() => {
    let lenis;
    let rafId = 0;
    let gsap;
    let ScrollTrigger;

    const start = async () => {
      const [{ default: Lenis }, _gsap] = await Promise.all([
        import('lenis'),
        import('gsap')
      ]);
      gsap = _gsap.default || _gsap;
      try {
        ScrollTrigger = (await import('gsap/dist/ScrollTrigger')).default || (gsap && gsap.ScrollTrigger);
      } catch (e) {
        ScrollTrigger = gsap && gsap.ScrollTrigger;
      }

      if (gsap && ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
      }

      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
      });

      const raf = (time) => {
        lenis.raf(time);
        if (ScrollTrigger) ScrollTrigger.update();
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };

    start();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      try { if (lenis) lenis.destroy(); } catch (e) {}
    };
  }, []);

  return null;
}
