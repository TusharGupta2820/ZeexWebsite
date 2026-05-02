"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from 'next/dynamic';
import useParallax from '../../components/animations/useParallax';
import AIVisionDemo from './AIVisionDemo';
import { LazyMotion, animate, domAnimation, m, stagger } from "framer-motion";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import type { Group } from "three";

type LandingProps = { onNavigate?: (route: string) => void };
type CardModalData = {
  section: string;
  title: string;
  description: string;
  side: "left" | "right";
};

function FloatingCluster() {
  const groupRef = useRef<Group | null>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.06;
  });

  return (
    <group ref={groupRef} position={[1.4, 0.1, -0.5]}>
      <Float speed={1.1} rotationIntensity={0.5} floatIntensity={0.9}>
        <mesh position={[0, 0.05, 0]}>
          <icosahedronGeometry args={[0.78, 1]} />
          <meshStandardMaterial color="#2a75ff" emissive="#164ea8" emissiveIntensity={0.8} roughness={0.22} metalness={0.25} />
        </mesh>
      </Float>

      <Float speed={1.4} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh position={[1.45, 0.6, -0.7]} scale={0.46}>
          <torusKnotGeometry args={[0.78, 0.2, 120, 24]} />
          <meshStandardMaterial color="#00d8ff" emissive="#008ab5" emissiveIntensity={0.95} roughness={0.26} metalness={0.35} />
        </mesh>
      </Float>
    </group>
  );
}

// Dynamically load a dedicated HeroScene component (client-side only)
const HeroSceneDynamic = dynamic(() => import('../../components/3d/HeroScene'), { ssr: false });

function HeroThreeBackground() {
  // kept as a lightweight fallback for environments that can't lazy-load
  return (
    <div style={{ width: '100%', height: '100%' }} aria-hidden>
      <Sparkles count={36} scale={[6, 3.5, 2]} size={1.4} speed={0.35} color="#66d6ff" opacity={0.22} />
    </div>
  );
}

export default function Landing({ onNavigate }: LandingProps) {
  const cursorGlowRef = useRef<HTMLDivElement | null>(null);
  const counterAnimatedRef = useRef(false);
  const [modalData, setModalData] = useState<CardModalData | null>(null);

  useEffect(() => {
    // Make landing page visible immediately on mount
    const landingPage = document.querySelector('.landing-page') as HTMLElement;
    if (landingPage) {
      landingPage.classList.add('visible');
    }

    // ═════════════════════════════════════════════════════════════
    // ENHANCEMENT: Advanced Cursor Effects (Glow + Trail + Velocity)
    // ═════════════════════════════════════════════════════════════
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (!isMobile) {
      // Cursor Glow
      const glowDiv = document.createElement('div');
      glowDiv.className = 'cursor-glow-magnetic';
      document.body.appendChild(glowDiv);
      cursorGlowRef.current = glowDiv;

      // Trail manager
      const trailContainer = document.createElement('div');
      trailContainer.className = 'cursor-trail';
      document.body.appendChild(trailContainer);

      // Scroll velocity glow
      const velocityGlow = document.createElement('div');
      velocityGlow.className = 'scroll-velocity-glow';
      document.body.appendChild(velocityGlow);

      // Spotlight effect
      const spotlight = document.createElement('div');
      spotlight.className = 'spotlight';
      document.body.appendChild(spotlight);

      let lastX = 0;
      let lastY = 0;
      let scrollVelocity = 0;
      let lastScrollY = 0;

      let animationFrameId: number;

      const handleMouseMove = (e: MouseEvent) => {
        animationFrameId = requestAnimationFrame(() => {
          const x = e.clientX;
          const y = e.clientY;

          // Update main glow
          if (cursorGlowRef.current) {
            cursorGlowRef.current.style.left = `${x}px`;
            cursorGlowRef.current.style.top = `${y}px`;
            cursorGlowRef.current.classList.add('active');

            // Magnetic effect - slight delay
            const dx = x - lastX;
            const dy = y - lastY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 50) {
              // Create trail particle
              const particle = document.createElement('div');
              particle.className = 'cursor-trail-particle';
              particle.style.left = `${lastX}px`;
              particle.style.top = `${lastY}px`;
              trailContainer.appendChild(particle);

              setTimeout(() => particle.remove(), 1200);
            }
          }

          // Update spotlight
          spotlight.style.left = `${x}px`;
          spotlight.style.top = `${y}px`;
          spotlight.classList.add('active');

          lastX = x;
          lastY = y;
        });
      };

      const handleMouseLeave = () => {
        if (cursorGlowRef.current) {
          cursorGlowRef.current.classList.remove('active');
        }
        spotlight.classList.remove('active');
      };

      const handleScroll = () => {
        const currentScroll = window.scrollY;
        scrollVelocity = Math.abs(currentScroll - lastScrollY);
        lastScrollY = currentScroll;

        // Create velocity pulse
        if (scrollVelocity > 5) {
          const pulseSingle = velocityGlow.cloneNode(true) as HTMLElement;
          pulseSingle.style.left = `${lastX}px`;
          pulseSingle.style.top = `${lastY}px`;
          pulseSingle.classList.add('active');
          document.body.appendChild(pulseSingle);

          setTimeout(() => pulseSingle.remove(), 600);
        }
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
        window.removeEventListener('scroll', handleScroll);
        cancelAnimationFrame(animationFrameId);

        if (cursorGlowRef.current && cursorGlowRef.current.parentNode) {
          cursorGlowRef.current.parentNode.removeChild(cursorGlowRef.current);
        }
        if (trailContainer.parentNode) {
          trailContainer.parentNode.removeChild(trailContainer);
        }
        if (velocityGlow.parentNode) {
          velocityGlow.parentNode.removeChild(velocityGlow);
        }
        if (spotlight.parentNode) {
          spotlight.parentNode.removeChild(spotlight);
        }
      };
    }
  }, []);

  // Lightweight premium cursor glow (disabled on touch/mobile)
  useEffect(() => {
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isCoarsePointer || isMobile) return;

    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    document.body.appendChild(glow);

    let rafId: number | null = null;
    let mouseX = 0;
    let mouseY = 0;

    const render = () => {
      rafId = null;
      glow.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      glow.classList.add("active");
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (rafId) return;
      rafId = requestAnimationFrame(render);
    };

    const onLeave = () => glow.classList.remove("active");

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (rafId) cancelAnimationFrame(rafId);
      glow.remove();
    };
  }, []);

  // ═════════════════════════════════════════════════════════════
  // ENHANCEMENT 7: Data stream line scroll progress
  // ═════════════════════════════════════════════════════════════
  useEffect(() => {
    let rafId: number | null = null;
    const setProgress = () => {
      rafId = null;
      const doc = document.documentElement;
      const hero = document.querySelector(".landing-page") as HTMLElement | null;
      const footer = document.querySelector(".site-footer") as HTMLElement | null;
      const start = hero ? hero.offsetTop + hero.offsetHeight : 0;
      const end = footer ? footer.offsetTop : doc.scrollHeight;
      const height = Math.max(1, end - start);

      doc.style.setProperty("--stream-start", `${start}px`);
      doc.style.setProperty("--stream-height", `${height}px`);

      const progress = Math.max(0, Math.min(1, (window.scrollY - start) / height));
      doc.style.setProperty("--stream-progress", progress.toString());
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(setProgress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    setProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // ═════════════════════════════════════════════════════════════
  // ENHANCEMENT 9: Alternate sections around stream line
  // ═════════════════════════════════════════════════════════════
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll(".stats-section, .home-section")
    ) as HTMLElement[];

    sections.forEach((section, idx) => {
      section.classList.add("stream-section");
      section.classList.add(idx % 2 === 0 ? "stream-left" : "stream-right");
    });

    return () => {
      sections.forEach((section) => {
        section.classList.remove("stream-section", "stream-left", "stream-right");
      });
    };
  }, []);

  // ═════════════════════════════════════════════════════════════
  // ENHANCEMENT 11: Card detail modal (empty video placeholder)
  // ═════════════════════════════════════════════════════════════
  useEffect(() => {
    const cardSelector = ".feature-card, .service-card, .method-card, .blog-card, .partner-card";
    const cards = Array.from(document.querySelectorAll(cardSelector)) as HTMLElement[];
    if (!cards.length) return;

    const openModalFromCard = (card: HTMLElement) => {
      const titleEl = card.querySelector("h3, h4") as HTMLElement | null;
      const descriptionEl = card.querySelector(".card-text, p") as HTMLElement | null;
      const sectionEl = card.closest(".home-section, .stats-section") as HTMLElement | null;
      const sectionLabelEl = sectionEl?.querySelector(".section-eyebrow") as HTMLElement | null;

      // Use stream line position when available; fallback to viewport center.
      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const streamLine = document.querySelector(".data-stream-line") as HTMLElement | null;
      const streamLineRect = streamLine?.getBoundingClientRect();
      const lineCenterX = streamLineRect ? (streamLineRect.left + streamLineRect.right) / 2 : window.innerWidth / 2;
      const isCardOnRight = cardCenterX > lineCenterX;
      const side: "left" | "right" = isCardOnRight ? "left" : "right";

      const title = titleEl?.textContent?.trim() || card.textContent?.trim().slice(0, 60) || "Details";
      const description =
        descriptionEl?.textContent?.trim() ||
        "Detailed information will be added here. Video slot is ready for future content.";
      const section = sectionLabelEl?.textContent?.trim() || "Home";

      setModalData({ section, title, description, side });
    };

    const onCardClick = (e: Event) => {
      const card = e.currentTarget as HTMLElement | null;
      if (!card) return;
      e.preventDefault();
      openModalFromCard(card);
    };

    const onCardKeyDown = (e: Event) => {
      const evt = e as KeyboardEvent;
      if (evt.key !== "Enter" && evt.key !== " ") return;
      evt.preventDefault();
      const card = evt.currentTarget as HTMLElement | null;
      if (!card) return;
      openModalFromCard(card);
    };

    cards.forEach((card) => {
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.classList.add("clickable-detail-card");
      card.addEventListener("click", onCardClick);
      card.addEventListener("keydown", onCardKeyDown);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("click", onCardClick);
        card.removeEventListener("keydown", onCardKeyDown);
      });
    };
  }, []);

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalData(null);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalData ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalData]);

  // ═════════════════════════════════════════════════════════════
  // ENHANCEMENT 10: Stream-side content reveal on scroll
  // ═════════════════════════════════════════════════════════════
  useEffect(() => {
    const blocks = Array.from(
      document.querySelectorAll(".stream-section .section-inner, .stream-section .stats-grid")
    ) as HTMLElement[];
    if (!blocks.length) return;

    blocks.forEach((block) => block.classList.add("stream-content-reveal"));

    let unlockedIndex = 0;
    const seen = new Set<number>();

    const observer = new IntersectionObserver((entries, obs) => {
      const sorted = [...entries].sort((a, b) => {
        const ai = blocks.indexOf(a.target as HTMLElement);
        const bi = blocks.indexOf(b.target as HTMLElement);
        return ai - bi;
      });

      sorted.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const idx = blocks.indexOf(entry.target as HTMLElement);
        if (idx === -1 || seen.has(idx)) return;
        if (idx > unlockedIndex) return;

        entry.target.classList.add("stream-content-visible");
        seen.add(idx);
        unlockedIndex = Math.max(unlockedIndex, idx + 1);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.35, rootMargin: "0px 0px -80px 0px" });

    blocks.forEach((block) => observer.observe(block));

    return () => {
      observer.disconnect();
    };
  }, []);

  // ═════════════════════════════════════════════════════════════
  // ENHANCEMENT 8: Mouse-wheel section scrolling (desktop)
  // ═════════════════════════════════════════════════════════════
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    if (isMobile) return;

    const sections = Array.from(
      document.querySelectorAll(".landing-page, .stats-section, .home-section")
    ) as HTMLElement[];
    if (sections.length < 2) return;

    let isAnimating = false;
    let lastWheelAt = 0;

    const getCurrentSectionIndex = () => {
      const viewportMid = window.scrollY + window.innerHeight / 2;
      let closestIdx = 0;
      let closestDist = Number.POSITIVE_INFINITY;
      sections.forEach((section, idx) => {
        const sectionMid = section.offsetTop + section.offsetHeight / 2;
        const dist = Math.abs(sectionMid - viewportMid);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = idx;
        }
      });
      return closestIdx;
    };

    const onWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (isAnimating || now - lastWheelAt < 500) return;
      if (Math.abs(e.deltaY) < 12) return;

      const currentIdx = getCurrentSectionIndex();
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIdx = Math.max(0, Math.min(sections.length - 1, currentIdx + direction));
      if (nextIdx === currentIdx) return;

      e.preventDefault();
      isAnimating = true;
      lastWheelAt = now;
      sections[nextIdx].scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => {
        isAnimating = false;
      }, 750);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  // ═════════════════════════════════════════════════════════════
  // ENHANCEMENT 2: Parallax Scrolling (wired to gsap ScrollTrigger via useParallax)
  // Uses the lazy helper to avoid importing GSAP at SSR/build time.
  // ═════════════════════════════════════════════════════════════
  useEffect(() => {
    let cancelFn: (() => void) | null = null;
    let mounted = true;

    (async () => {
      try {
        const cleanup = await useParallax('.landing-video-wrap', { speed: 0.06, scrub: true });
        if (!mounted && cleanup) cleanup();
        cancelFn = cleanup;
      } catch (e) {
        // silent fallback: keep native parallax (no-op)
      }
    })();

    return () => {
      mounted = false;
      try { if (cancelFn) cancelFn(); } catch (e) {}
    };
  }, []);

  // ═════════════════════════════════════════════════════════════
  // ENHANCEMENT 3: Animated Counters on Scroll (Intersection Observer)
  // ═════════════════════════════════════════════════════════════
  useEffect(() => {
    const statsSection = document.querySelector('.stats-section') as HTMLElement;
    if (!statsSection) return;

    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !counterAnimatedRef.current) {
          counterAnimatedRef.current = true;
          animateCounters();
        }
      });
    }, observerOptions);

    observer.observe(statsSection);

    const animateCounters = () => {
      const statNumbers = document.querySelectorAll('.stat-number');
      statNumbers.forEach((element) => {
        const baseText = element.textContent || "";
        const target = parseFloat(element.getAttribute('data-target') || '0');
        const decimals = Number(element.getAttribute("data-decimals") || (Number.isInteger(target) ? 0 : 1));
        const prefix = element.getAttribute("data-prefix") || "";
        const fallbackSuffix = baseText.replace(/[\d.,\s]/g, "");
        const suffix = element.getAttribute("data-suffix") || fallbackSuffix;
        const duration = 2000; // 2 seconds
        const startTime = performance.now();

        const count = () => {
          const elapsed = performance.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const current = progress * target;
          const value =
            decimals > 0
              ? current.toLocaleString(undefined, {
                  minimumFractionDigits: progress >= 1 ? decimals : 0,
                  maximumFractionDigits: decimals,
                })
              : Math.floor(current).toLocaleString();

          element.textContent = `${prefix}${value}${suffix ? ` ${suffix}` : ''}`;

          if (progress < 1) {
            requestAnimationFrame(count);
          }
        };

        count();
      });
    };

    return () => observer.disconnect();
  }, []);

  // ═════════════════════════════════════════════════════════════
  // ENHANCEMENT 4: Reveal on Scroll + 3D Card Hover + Floating
  // ═════════════════════════════════════════════════════════════
  useEffect(() => {
    // Add floating and reveal classes to cards
    const cards = Array.from(document.querySelectorAll('.feature-card, .service-card, .method-card, .blog-card')) as HTMLElement[];
    const stats = Array.from(document.querySelectorAll('.stat-item')) as HTMLElement[];
    const sections = Array.from(document.querySelectorAll('.home-section')) as HTMLElement[];

    // Add reveal class and stagger delays
    cards.forEach((card, idx) => {
      card.classList.add('reveal-on-scroll');
      if (idx < 4) {
        card.classList.add(`stagger-${idx + 1}`);
      }
      card.classList.add('floating-element');
      card.classList.add(`delay-${(idx % 4) + 1}`);
      card.classList.add('tilt-enhanced');
    });

    stats.forEach((stat, idx) => {
      stat.classList.add('reveal-on-scroll');
      stat.classList.add(`stagger-${Math.min(idx + 1, 4)}`);
    });

    // Intersection Observer for reveal animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    cards.forEach(card => revealObserver.observe(card));
    stats.forEach(stat => revealObserver.observe(stat));

    // 3D perspective mouse tracking on cards
    const cardRaf = new WeakMap<HTMLElement, number>();
    const handleCardPointerMove = (e: Event) => {
      const evt = e as PointerEvent;
      const card = evt.currentTarget as HTMLElement | null;
      if (!card) return;

      const prev = cardRaf.get(card);
      if (prev) cancelAnimationFrame(prev);

      const rafId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const mouseX = evt.clientX - rect.left;
        const mouseY = evt.clientY - rect.top;

        const rotateX = (mouseY - centerY) / 12;
        const rotateY = (centerX - mouseX) / 12;

        const mx = Math.max(0, Math.min(100, (mouseX / rect.width) * 100));
        const my = Math.max(0, Math.min(100, (mouseY / rect.height) * 100));

        card.style.setProperty('--mx', `${mx}%`);
        card.style.setProperty('--my', `${my}%`);
        card.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      });
      cardRaf.set(card, rafId);
    };

    const handleCardPointerLeave = (e: Event) => {
      const card = (e.currentTarget as HTMLElement | null);
      if (!card) return;
      const prev = cardRaf.get(card);
      if (prev) cancelAnimationFrame(prev);
      const rafId = requestAnimationFrame(() => {
        card.style.transform = 'perspective(1100px) rotateX(0) rotateY(0) translateZ(0)';
      });
      cardRaf.set(card, rafId);
    };

    cards.forEach(card => {
      card.addEventListener('pointermove', handleCardPointerMove);
      card.addEventListener('pointerleave', handleCardPointerLeave);
    });

    // subtle scroll depth on sections (very minimal)
    let depthRaf: number | null = null;
    const updateSectionDepth = () => {
      depthRaf = null;
      const vh = Math.max(1, window.innerHeight);
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const t = (mid - vh / 2) / (vh / 2);
        const tilt = Math.max(-1, Math.min(1, t)) * -1.25; // degrees
        section.style.setProperty('--section-tilt', `${tilt}`);
      });
    };
    const onDepthScroll = () => {
      if (depthRaf) return;
      depthRaf = requestAnimationFrame(updateSectionDepth);
    };
    window.addEventListener('scroll', onDepthScroll, { passive: true });
    window.addEventListener('resize', onDepthScroll);
    updateSectionDepth();

    return () => {
      revealObserver.disconnect();
      cards.forEach(card => {
        card.removeEventListener('pointermove', handleCardPointerMove);
        card.removeEventListener('pointerleave', handleCardPointerLeave);
      });
      window.removeEventListener('scroll', onDepthScroll);
      window.removeEventListener('resize', onDepthScroll);
      if (depthRaf) cancelAnimationFrame(depthRaf);
    };
  }, []);

  useEffect(() => {
    // Get all sections and content that should be revealed on scroll
    const sections = document.querySelectorAll('.home-section, .stats-section');
    const allRevealElements = document.querySelectorAll('[data-scroll-reveal]');

    // Add scroll-reveal class to sections
    sections.forEach((section, idx) => {
      if (!section.classList.contains('scroll-reveal')) {
        section.classList.add('section-scroll-reveal');
      }
    });

    // Setup intersection observer with custom reveal animations
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -80px 0px', // Trigger when element is 80px from bottom of viewport
    };

    const scrollRevealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting && !entry.target.classList.contains('revealed')) {
          // Add staggered animation delays based on element position
          const delay = idx * 0.05;
          (entry.target as HTMLElement).style.transitionDelay = `${delay}s`;

          // Add appropriate reveal class
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    // Observe all revealable content
    sections.forEach(el => scrollRevealObserver.observe(el));
    allRevealElements.forEach(el => scrollRevealObserver.observe(el));

    // Apply reveal animation styles to cards
    const allCards = document.querySelectorAll('.feature-card, .service-card, .method-card, .blog-card');
    allCards.forEach((card, idx) => {
      if (!card.classList.contains('card-scroll-reveal')) {
        card.classList.add('card-scroll-reveal');
      }
      scrollRevealObserver.observe(card);
    });

    return () => {
      scrollRevealObserver.disconnect();
    };
  }, []);

  // ═════════════════════════════════════════════════════════════
  // ENHANCEMENT 5: Text Skew on Scroll
  // ═════════════════════════════════════════════════════════════
  useEffect(() => {
    let lastScrollY = 0;
    let skewAmount = 0;

    const handleSkewScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;
      skewAmount = Math.max(-5, Math.min(5, diff * 0.5));

      const headings = document.querySelectorAll('.section-title, h1, h2, h3');
      headings.forEach(heading => {
        if (heading instanceof HTMLElement) {
          heading.style.transform = `skewY(${skewAmount}deg)`;
        }
      });

      lastScrollY = currentScrollY;

      // Reset skew over time
      setTimeout(() => {
        headings.forEach(heading => {
          if (heading instanceof HTMLElement) {
            heading.style.transform = 'skewY(0deg)';
          }
        });
      }, 100);
    };

    window.addEventListener('scroll', handleSkewScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleSkewScroll);
  }, []);

  // ═════════════════════════════════════════════════════════════
  // ENHANCEMENT 6: Framer Motion staggered card reveal
  // ═════════════════════════════════════════════════════════════
  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll('.feature-card, .service-card, .method-card, .blog-card')
    ) as HTMLElement[];

    if (!cards.length) return;

    cards.forEach((card) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(28px) rotateX(6deg)';
      card.style.transformStyle = 'preserve-3d';
    });

    const runningAnimations: Array<{ stop: () => void }> = [];
    const triggerBatchAnimation = () => {
      const controls = animate(
        cards,
        { opacity: 1, y: 0, rotateX: 0 },
        {
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
          delay: stagger(0.08),
        }
      );
      runningAnimations.push(controls);
    };

    const observer = new IntersectionObserver((entries, obs) => {
      const hasVisibleCard = entries.some((entry) => entry.isIntersecting);
      if (hasVisibleCard) {
        triggerBatchAnimation();
        cards.forEach((card) => obs.unobserve(card));
      }
    }, { threshold: 0.2, rootMargin: '0px 0px -60px 0px' });

    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
      runningAnimations.forEach((animation) => animation.stop());
    };
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <>
        <div className="data-stream-line" aria-hidden>
          <div className="data-stream-track" />
          <div className="data-stream-progress" />
          <div className="data-stream-node" />
        </div>
        <section className="landing-page" id="hero">
          {/* ── Existing video background — kept as-is ── */}
          <div className="landing-video-wrap">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/assets/z-tracs-poster.jpg"
              className="landing-bg-video"
              src="/assets/Z-Tracs by Zeex AI.mp4"
            />
            <div className="hero-three-layer" aria-hidden="true">
              <HeroSceneDynamic />
            </div>
            <div className="landing-overlay" />
            {/* Extra cinematic red-dark tint + vignette on top */}
            <div className="hero-cinematic-overlay" aria-hidden="true" />
            <div className="hero-vignette"            aria-hidden="true" />
          </div>

          {/* ── Top-left brand mark ── */}
          <div className="hero-brand-tl">
            <div className="hero-brand-name-tl">ZEEX AI</div>
            <div className="hero-brand-tag-tl">AI. DATA. IMPACT.</div>
          </div>

          {/* ── Left content column ── */}
          <div className="hero-left-col">
            <m.h1 className="hero-h1-main"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
              TRANSFORMING<br />INSIGHTS<br />INTO ACTION
            </m.h1>
            <m.p className="hero-desc-main"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
              From prevention to performance, Zeex AI turns everyday data into
              actionable intelligence for safer, smarter management.
            </m.p>
            <m.div className="hero-btns-row"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}>
              <a id="hero-btn-demo" className="btn-hero-primary" href="#contact"
                onClick={(e) => { e.preventDefault(); onNavigate?.('home'); window.location.hash = 'contact'; }}>
                Get a Demo
              </a>
              <a id="hero-btn-explore" className="btn-hero-outline" href="#solutions"
                onClick={(e) => { e.preventDefault(); onNavigate?.('home'); window.location.hash = 'solutions'; }}>
                Explore Solutions
              </a>
            </m.div>
          </div>

          {/* ── Right side AI Vision Pipeline Demo ── */}
          <AIVisionDemo />

        </section>

        {/* STATS SECTION - Enhancement */}
        <m.section
          className="stats-section"
          data-scroll-reveal
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number" data-target="10000">10000</div>
              <div className="stat-label">+ Active Users</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-target="99">99</div>
              <div className="stat-label">% Accuracy Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-target="24">24</div>
              <div className="stat-label">/7 Monitoring</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-target="50">50</div>
              <div className="stat-label">+ Countries</div>
            </div>
          </div>
        </m.section>

        {/* FEATURES SECTION */}
        <section className="home-section features-section" data-scroll-reveal>
          <div className="section-inner">
            <div className="section-headline" data-scroll-reveal>
              <span className="section-eyebrow">Core Features</span>
              <h2 className="section-title">Transforming Safety & Workflows with AI + Data</h2>
              <p className="section-copy">Zeex AI bridges safety and efficiency, delivering predictive insights that secure environments and streamline operations.</p>
            </div>

            <div className="card-grid">
              <div className="feature-card">
                <div className="card-header">
                  <h3 className="card-title">Predictive Safety Monitoring & AI-Driven Work Management</h3>
                </div>
                <div className="card-content">
                  <p className="card-text">Our AI-powered threat detection system continuously monitors and identifies potential security risks before they become problems.</p>
                </div>
              </div>

              <div className="feature-card">
                <div className="card-header">
                  <h3 className="card-title">AI-Visual Data Analytics</h3>
                </div>
                <div className="card-content">
                  <p className="card-text">Intelligent video analysis detects unusual patterns while ensuring privacy and compliance.</p>
                </div>
              </div>

              <div className="feature-card">
                <div className="card-header">
                  <h3 className="card-title">Real-Time Alerts & Insights</h3>
                </div>
                <div className="card-content">
                  <p className="card-text">Instant notifications with contextual information delivered to your preferred devices.</p>
                </div>
              </div>

              <div className="feature-card">
                <div className="card-header">
                  <h3 className="card-title">Seamless System Integration</h3>
                </div>
                <div className="card-content">
                  <p className="card-text">Easy setup, multi-device support, and customizable dashboard.</p>
                </div>
              </div>
            </div>
            <div className="section-actions" style={{ marginTop: '24px' }}>
              <a className="btn btn-outline" href="#">Explore all features</a>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="home-section services-section" data-scroll-reveal>
          <div className="section-inner">
            <div className="section-headline" data-scroll-reveal>
              <span className="section-eyebrow">Industry Services</span>
              <h2 className="section-title">AI Security for Every Environment</h2>
              <p className="section-copy">Transforming workplaces and cities with intelligent safety and management powered by AI and data.</p>
            </div>

            <div className="card-grid">
              <div className="service-card">
                <h3 className="card-title">Shops & Supermarkets</h3>
                <p className="card-text">Retail security solutions with theft prevention and customer behavior analytics.</p>
                <a className="small-btn" href="#">Explore solution</a>
              </div>
              <div className="service-card">
                <h3 className="card-title">Traffic Monitoring</h3>
                <p className="card-text">AI-powered traffic management with real-time analytics and violation detection.</p>
                <a className="small-btn" href="#">Explore solution</a>
              </div>
              <div className="service-card">
                <h3 className="card-title">Corporate & Residential</h3>
                <p className="card-text">Surveillance for homes and offices with intelligent alerts and remote access.</p>
                <a className="small-btn" href="#">Explore solution</a>
              </div>
              <div className="service-card">
                <h3 className="card-title">Industrial Surveillance</h3>
                <p className="card-text">Surveillance systems for factories and warehouses to ensure safety.</p>
                <a className="small-btn" href="#">Explore solution</a>
              </div>
            </div>
            <div className="section-actions" style={{ marginTop: '24px' }}>
              <a className="btn btn-outline" href="#">View all services</a>
            </div>
          </div>
        </section>

        {/* METHODOLOGY SECTION */}
        <section className="home-section methodology-section" data-scroll-reveal>
          <div className="section-inner">
            <div className="section-headline" data-scroll-reveal>
              <span className="section-eyebrow">Our Methodology</span>
              <h2 className="section-title">Precision Implementation Process</h2>
              <p className="section-copy">A meticulously crafted 5-phase approach ensuring flawless integration of our AI surveillance solutions.</p>
            </div>

            <div className="method-grid">
              <div className="method-card">
                <div className="phase">PHASE 01</div>
                <h4 className="method-title">Discovery Audit</h4>
                <p className="card-text">Analyze current setup and define surveillance goals.</p>
              </div>
              <div className="method-card">
                <div className="phase">PHASE 02</div>
                <h4 className="method-title">Solution Architecture</h4>
                <p className="card-text">Design a tailored, AI-ready surveillance blueprint.</p>
              </div>
              <div className="method-card">
                <div className="phase">PHASE 03</div>
                <h4 className="method-title">Precision Deployment</h4>
                <p className="card-text">Hardware/software installation with zero downtime.</p>
              </div>
              <div className="method-card">
                <div className="phase">PHASE 04</div>
                <h4 className="method-title">Validation Testing</h4>
                <p className="card-text">Test performance, accuracy, and system stability.</p>
              </div>
              <div className="method-card">
                <div className="phase">PHASE 05</div>
                <h4 className="method-title">Ongoing Excellence</h4>
                <p className="card-text">Provide 24/7 monitoring, updates, and support.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="home-section">
          <div className="section-inner">
            <div className="cta-panel">
              <div className="cta-copy">
                <h2>Ready to Enhance Your Security?</h2>
                <p>Our team is ready to help you implement the perfect security solution for your needs.</p>
              </div>
              <div className="cta-actions">
                <a className="btn btn-primary" href="#">Request a Consultation</a>
              </div>
            </div>
          </div>
        </section>

        {/* INSIGHTS SECTION */}
        <section className="home-section latest-insights" data-scroll-reveal>
          <div className="section-inner">
            <div className="section-headline" data-scroll-reveal>
              <span className="section-eyebrow">Latest Insights</span>
              <h2 className="section-title">Stay updated with the latest in AI security technology</h2>
              <a className="btn btn-outline" href="#" style={{ alignSelf: 'flex-start' }}>View all blog posts</a>
            </div>

            <div className="card-grid">
              <div className="blog-card">
                <time>April 15, 2025</time>
                <h3>AI Advancements in Modern Surveillance</h3>
                <p className="card-text">Explore how artificial intelligence is revolutionizing surveillance systems and improving security outcomes.</p>
                <a href="#" style={{ color: 'var(--cyan)', fontWeight: 'bold' }}>Read more</a>
              </div>
              <div className="blog-card">
                <time>April 8, 2025</time>
                <h3>Balancing Privacy with Security in AI Surveillance</h3>
                <p className="card-text">How modern AI-powered security systems protect privacy while enhancing safety measures.</p>
                <a href="#" style={{ color: 'var(--cyan)', fontWeight: 'bold' }}>Read more</a>
              </div>
              <div className="blog-card">
                <time>April 1, 2025</time>
                <h3>5 Future Trends in AI Security for 2025</h3>
                <p className="card-text">Discover emerging trends in AI security technology and how they will shape the future of surveillance.</p>
                <a href="#" style={{ color: 'var(--cyan)', fontWeight: 'bold' }}>Read more</a>
              </div>
            </div>
          </div>
        </section>

        {/* PARTNERSHIPS SECTION */}
        <section className="home-section trusted-partners" data-scroll-reveal>
          <div className="section-inner">
            <div className="section-headline" data-scroll-reveal>
              <span className="section-eyebrow">Trusted Partnerships</span>
              <h2 className="section-title">Supported by Industry Leaders</h2>
              <p className="section-copy">Our technology is recognized and supported by premier institutions and industry leaders.</p>
            </div>

            <div className="partner-list">
              <div className="partner-card">IIT Madras</div>
              <div className="partner-card">Nirmaan (Pre-Incubator, IITM)</div>
              <div className="partner-card">AWS for Startups</div>
              <div className="partner-card">NVIDIA Inception</div>
            </div>
          </div>
        </section>

        <div
          className={`feature-modal ${modalData ? "visible" : ""} ${modalData?.side === "left" ? "stream-modal-left" : "stream-modal-right"
            }`}
          aria-hidden={!modalData}
        >
          <div className="feature-modal-backdrop" onClick={() => setModalData(null)} />
          <div className="feature-modal-card" role="dialog" aria-modal="true" aria-label="Card detail modal">
            <button className="modal-close" onClick={() => setModalData(null)} aria-label="Close details">
              ×
            </button>
            <div className="modal-header">
              <span className="modal-label">{modalData?.section || "Home"}</span>
              <h2>{modalData?.title || "Details"}</h2>
              <p>{modalData?.description || "Detailed information will appear here."}</p>
            </div>
            <div className="modal-video">
              <div className="modal-video-placeholder">Video placeholder (add video later)</div>
            </div>
            <div className="modal-footer">
              <button className="small-btn" onClick={() => setModalData(null)}>Close</button>
            </div>
          </div>
        </div>

        {/* FOOTER SECTION */}
        <footer className="site-footer">
          <div className="footer-grid">
            <div className="footer-section">
              <div className="landing-logo" style={{ marginBottom: '18px' }}>
                <img src="/assets/Zeex-AI logo .png" alt="Zeex AI" style={{ width: '32px' }} />
                <span className="brand-mark" style={{ color: '#001f3f' }}>ZeexAI</span>
              </div>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'rgba(0,31,63,0.8)' }}>
                Harnessing the power of data and artificial intelligence, Zeex AI empowers organizations to predict risks, ensure safety, and optimize Daily operations—before issues escalate.
              </p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <div className="footer-links">
                <a href="/home">Home</a>
                <a href="/about">About Us</a>
                <a href="/services">Services</a>
                <a href="/solutions">Solutions</a>
                <a href="/blogs">Blog</a>
                <a href="/contact">Contact</a>
              </div>
            </div>
            <div className="footer-section">
              <h4>Our Services</h4>
              <div className="footer-links">
                <a href="#">Retail & High-Risk Shop Security</a>
                <a href="#">Bank & ATM Security Solutions</a>
                <a href="#">Industrial Safety Monitoring</a>
                <a href="#">Smart City Surveillance</a>
              </div>
            </div>
            <div className="footer-section">
              <h4>Contact Us</h4>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.8', color: 'rgba(0,31,63,0.8)' }}>
                +91 8709221636<br />
                admin@zeexai.com<br />
                Nirmaan, CFI, IIT Madras
              </p>
            </div>
          </div>
        </footer>
      </>
    </LazyMotion>
  );
}
