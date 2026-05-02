'use client';

import { useEffect } from 'react';

export default function ParticleCanvas() {
  useEffect(() => {
    const canvas = document.getElementById('particle-canvas') as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      // ensure canvas matches viewport and CSS sizing
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      canvas!.style.width = `${window.innerWidth}px`;
      canvas!.style.height = `${window.innerHeight}px`;
      // defensive: ensure transparent background
      canvas!.style.background = 'transparent';
    }

    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; color: string }[] = [];
    const colors = ['#4a90e8', '#00e5ff', '#ffffff'];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let raf = 0;
    function animate() {
      // clear to transparent to avoid residual fill from CSS or previous frames
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.save();
      ctx!.globalCompositeOperation = 'source-over';
      ctx!.fillStyle = 'rgba(0,0,0,0)';
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      ctx!.restore();
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas!.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas!.height) p.vy *= -1;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.fill();
      });
      raf = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas id="particle-canvas" />;
}
