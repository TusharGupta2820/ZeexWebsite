// Optional small helper to attach a simple cursor glow element.
export default function attachCursorGlow() {
  const isMobile = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  if (isMobile) return () => {};

  const glow = document.createElement('div');
  glow.className = 'cursor-glow-lite';
  document.body.appendChild(glow);

  const onMove = (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
    glow.classList.add('active');
  };
  const onLeave = () => glow.classList.remove('active');

  window.addEventListener('mousemove', onMove, { passive: true });
  document.addEventListener('mouseleave', onLeave);

  return () => {
    window.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseleave', onLeave);
    glow.remove();
  };
}
