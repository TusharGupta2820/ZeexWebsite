// Lightweight helper to apply a GSAP-based parallax to a ref or selector
export default async function useParallax(target, opts = {}) {
  if (!target) return () => {};
  const { default: gsap } = await import('gsap');
  let ScrollTrigger;
  try {
    ScrollTrigger = (await import('gsap/dist/ScrollTrigger')).default || gsap.ScrollTrigger;
  } catch (e) {
    ScrollTrigger = gsap.ScrollTrigger;
  }
  if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  const el = typeof target === 'string' ? document.querySelector(target) : (target.current || target);
  if (!el) return () => {};

  const tween = gsap.to(el, {
    y: () => (window.innerHeight * (opts.speed || 0.08)),
    ease: 'none',
    scrollTrigger: {
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: opts.scrub ?? true,
    },
  });

  return () => {
    try { tween.kill(); } catch (e) {}
  };
}
