"use client";
import './achievements.css';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Achievements3DScene = dynamic(() => import('./Achievements3DScene'), {
  ssr: false,
  loading: () => <div className="ach-3d-scene-placeholder" />,
});

/* ══════════════════════════
   ACHIEVEMENT DATA
══════════════════════════ */
interface Achievement {
  id: number;
  number: string;
  title: string;
  tag: string;
  tagClass: string;
  year: string;
  shortSummary: string;
  fullDescription: string;
  bullets: string[];
  images: string[];
}

const achievements: Achievement[] = [
  {
    id: 1,
    number: '01',
    title: '1st Prize – AI Impact Summit 2026 India (YUVAI Category)',
    tag: 'International Award • 2026',
    tagClass: 'award-tag--international',
    year: '2026',
    shortSummary: 'Won 1st Prize at the prestigious AI Impact Summit 2026 India in the YUVAI category — emerging as the International Winner among Top 8 young innovators globally.',
    fullDescription: 'ZEEX AI (Z-TRACS) won 1st Prize at the prestigious AI Impact Summit 2026 India in the YUVAI category. From being selected among the Top 8 young innovators globally to emerging as the International Winner in the Final Round, this achievement marks a significant milestone in ZEEX AI\'s journey of revolutionizing security with real-time AI-powered surveillance.',
    bullets: [
      'Recognized by Hon\'ble Minister Ashwini Vaishnaw and Union Minister of State Jitin Prasada',
      'Recognized by Abhishek Singh, CEO of IndiaAI',
      'Affirms commitment to strengthening India\'s AI ecosystem',
    ],
    images: [
      '/assets/1/1.1.jpg',
      '/assets/1/1.2.jpg',
      '/assets/1/1.3.jpg',
      '/assets/1/1.4.jpg',
    ],
  },
  {
    id: 2,
    number: '02',
    title: 'Best Startup in AI-Enabled Monitoring System Award',
    tag: 'International Conference Award • 2026',
    tagClass: 'award-tag--international',
    year: '2026',
    shortSummary: 'Recognized as the Best Startup in AI-Enabled Monitoring System at AI-HSE 2026, Hyderabad.',
    fullDescription: 'Recognized as the Best Startup in AI-Enabled Monitoring System at the International Conference & Exhibition on Artificial Intelligence in Health, Safety & Environment (AI-HSE 2026), Hyderabad. This award validates ZEEX AI\'s innovation in building AI-enabled Monitoring & Surveillance Systems designed to transform safety infrastructure across industries and smart environments.',
    bullets: [
      'Awarded for innovation in building an AI-enabled Monitoring & Surveillance System',
      'Designed to transform safety infrastructure across industries and smart environments',
      'Met national and international leaders, founders, and safety experts',
    ],
    images: [
      '/assets/2/2.1.jpg',
      '/assets/2/2.2.jpg',
      '/assets/2/2.3.jpg',
      '/assets/2/2.4.jpg',
    ],
  },
  {
    id: 3,
    number: '03',
    title: '1st Prize – AI & DeepTech Bootcamp, E-Summit IIT Madras',
    tag: 'Institutional Competition • 2025',
    tagClass: 'award-tag--institutional',
    year: '2025',
    shortSummary: 'Won 1st Prize at the AI & DeepTech Bootcamp during E-Summit at IIT Madras — validating the full-stack AI product direction.',
    fullDescription: 'Won 1st Prize at the AI & DeepTech Bootcamp during E-Summit at Indian Institute of Technology, Madras — a strong validation of the problem being solved and direction being built. ZEEX AI demonstrated a completed end-to-end product stack including own AI models, in-house hardware, and fully integrated proprietary software, establishing itself as a full-stack AI company ready for real-world deployments.',
    bullets: [
      'Completed end-to-end product stack: Own AI models, in-house hardware, fully integrated proprietary software',
      'Recognized as a full-stack AI company ready for real-world deployments',
    ],
    images: [
      '/assets/3/3.1.jpg',
      '/assets/3/3.2.jpg',
      '/assets/3/3.3.jpg',
    ],
  },
  {
    id: 4,
    number: '04',
    title: 'Best Pitch & E-Awards – E-Summit IIT Madras (2nd Place Overall)',
    tag: 'Institutional Competition • 2025',
    tagClass: 'award-tag--institutional',
    year: '2025',
    shortSummary: 'Won Best Pitch and E-Awards at E-Summit, securing 2nd place overall — reaffirming commitment to AI-driven solutions.',
    fullDescription: 'Won Best Pitch and E-Awards at the prestigious E-Summit, securing 2nd place overall — a significant milestone reaffirming commitment to building cutting-edge AI-driven solutions in safety, surveillance, and business innovation. The event was supported by sponsors Masters\' Union and WestBridge Capital, and organized by IIT Madras and E-Cell IIT Madras.',
    bullets: [
      'Supported by event sponsors Masters\' Union and WestBridge Capital',
      'Organized by IIT Madras and E-Cell IIT Madras',
    ],
    images: [
      '/assets/4/4.1.jpg',
      '/assets/4/4.2.jpg',
      '/assets/4/4.3.jpg',
    ],
  },
  {
    id: 5,
    number: '05',
    title: 'EO GSEA Jaipur – Global Student Entrepreneurship Award',
    tag: 'Entrepreneurship Award • 2025',
    tagClass: 'award-tag--entrepreneurship',
    year: '2025',
    shortSummary: 'Founder Gaurav Yadav won the EO GSEA Jaipur — reflecting the collective effort and execution behind Zeex AI.',
    fullDescription: 'Founder Gaurav Yadav won the EO GSEA Jaipur (Global Student Entrepreneurship Award), reflecting the collective effort, belief, and execution behind Zeex AI. The award was mentored by Rahul Singhi, Chair – EO GSEA Jaipur and Co-Founder of Poornima University, with support from NIRMAAN IITM and IIT Madras BS in Data Science Programme.',
    bullets: [
      'Mentored by Rahul Singhi, Chair – EO GSEA Jaipur and Co-Founder of Poornima University',
      'Supported by NIRMAAN IITM and IIT Madras BS in Data Science Programme',
    ],
    images: [
      '/assets/5/5.1.jpg',
      '/assets/5/5.2.jpg',
      '/assets/5/5.3.jpg',
      '/assets/5/5.4.jpg',
    ],
  },
  {
    id: 6,
    number: '06',
    title: 'AI Industry–Academia Collaboration Excellence Award – TechXConf 2025',
    tag: 'Industry Award • 2025',
    tagClass: 'award-tag--industry',
    year: '2025',
    shortSummary: 'Received the AI Industry–Academia Collaboration Excellence Award at TechXConf 2025 — Asia\'s largest AI & Cloud Conference.',
    fullDescription: 'Gaurav Yadav from Zeex AI received the AI Industry–Academia Collaboration Excellence Award at TechXConf AI Awards 2025 — Asia\'s largest AI & Cloud Conference. Honored for outstanding contributions in bridging the gap between research and real-world AI innovation, fostering impactful partnerships that drive technological progress and societal benefit.',
    bullets: [
      'Honored for outstanding contributions in bridging the gap between research and real-world AI innovation',
      'Fostering impactful partnerships that drive technological progress and societal benefit',
      'Heartfelt thanks to NIRMAAN IITM and IIT Madras for nurturing Zeex AI',
    ],
    images: [
      '/assets/6/6.1.jpg',
      '/assets/6/6.2.jpg',
      '/assets/6/6.3.jpg',
    ],
  },
  {
    id: 7,
    number: '07',
    title: 'Selected Among Top 9 Teams – MinT-athon, IIT Madras',
    tag: 'Prototype Development Grant • March 2026',
    tagClass: 'award-tag--incubation',
    year: 'March 27–28, 2026',
    shortSummary: 'Selected among the Top 9 teams at the MinT-athon at IIT Madras — backed by Bosch Mobility for prototype funding.',
    fullDescription: 'ZEEX AI selected among the Top 9 teams at the MinT-athon for Students & Industry Professionals at Indian Institute of Technology, Madras. Selected for prototype development stage along with 8 other outstanding teams, receiving funding support to build and scale the solution. Backed by Bosch Mobility — providing prototype funding and enabling future government collaboration opportunities.',
    bullets: [
      'Selected for prototype development stage along with 8 other outstanding teams',
      'Received funding support to build and scale the solution',
      'Backed by Bosch Mobility — providing prototype funding and enabling future government collaboration opportunities',
      'Validation of vision for real-world testing and scalability of innovations',
    ],
    images: [
      '/assets/input1.png',
      '/assets/input2.png',
      '/assets/input3.png',
    ],
  },
  {
    id: 8,
    number: '08',
    title: 'Selected by NIRMAAN IITM – Pre-Incubator of IIT Madras',
    tag: 'Incubation • 2025',
    tagClass: 'award-tag--incubation',
    year: '2025',
    shortSummary: 'Selected by NIRMAAN IITM, the prestigious pre-incubator of IIT Madras — closer to the vision of revolutionizing security.',
    fullDescription: 'ZEEX AI selected by NIRMAAN IITM, the prestigious pre-incubator of Indian Institute of Technology, Madras — bringing Zeex AI closer to the vision of Revolutionizing Security With Real-Time AI-Powered Surveillance. Access to world-class mentorship from experts who understand challenges of building impactful ventures, state-of-the-art workspace designed to nurture creativity and collaboration, and funding and resources to turn bold ideas into reality.',
    bullets: [
      'Access to world-class mentorship from experts who understand challenges of building impactful ventures',
      'State-of-the-art workspace designed to nurture creativity and collaboration',
      'Funding and resources to turn bold ideas into reality',
    ],
    images: [
      '/assets/8/8.1.jpg',
      '/assets/8/8.2.jpg',
      '/assets/8/8.3.jpg',
    ],
  },
  {
    id: 9,
    number: '09',
    title: 'Top 5 AI Corporate-Startup Companies – TNGSS 2025',
    tag: 'Summit Recognition • October 2025',
    tagClass: 'award-tag--summit',
    year: 'October 2025',
    shortSummary: 'Selected among Top 5 AI Corporate-Startup Companies at the Tamil Nadu Global Startup Summit 2025.',
    fullDescription: 'ZEEX AI selected among Top 5 AI Corporate-Startup Companies at the Tamil Nadu Global Startup Summit (TNGSS) 2025. Pitched vision and AI-powered solutions to an audience of 30+ country investors, industry leaders, and corporate partners. Showcased how Zeex AI is driving the future of smart safety, infrastructure intelligence, and data-driven city management. Platform inaugurated by Hon\'ble Chief Minister of Tamil Nadu, M.K. Stalin.',
    bullets: [
      'Pitched vision and AI-powered solutions to an audience of 30+ country investors, industry leaders, and corporate partners',
      'Showcased how Zeex AI is driving the future of smart safety, infrastructure intelligence, and data-driven city management',
      'Platform inaugurated by Hon\'ble Chief Minister of Tamil Nadu, M.K. Stalin',
    ],
    images: [
      '/assets/9/9.1.jpg',
      '/assets/9/9.2.jpg',
      '/assets/9/9.3.jpg',
      '/assets/9/9.4.jpg',
    ],
  },
  {
    id: 10,
    number: '10',
    title: 'Presentation to Union Minister Jitin Prasada – Trial in Shahjahanpur, UP',
    tag: 'Government Engagement • 2025',
    tagClass: 'award-tag--government',
    year: '2025',
    shortSummary: 'Invited for a trial opportunity in Shahjahanpur, UP — to transform urban safety and traffic management through AI.',
    fullDescription: 'Following a meeting with Shri Jitin Prasada, Hon\'ble Union Minister, ZEEX AI was invited for a trial opportunity in Shahjahanpur, Uttar Pradesh — to transform urban safety and traffic management through AI-powered solutions. Met City SP and Traffic Administrator; toured the city to assess problem areas and demonstrated real-time computer vision, AI analytics, predictive insights, violation detection, traffic flow optimization, and emergency response improvements.',
    bullets: [
      'Met City SP and Traffic Administrator; toured the city to assess problem areas',
      'Demonstrated: real-time computer vision, AI analytics, predictive insights, violation detection, traffic flow optimization, and emergency response improvements',
      'Invited to explore control room operations and potential interventions',
    ],
    images: [
      '/assets/input1.png',
      '/assets/input2.png',
      '/assets/input3.png',
    ],
  },
  {
    id: 11,
    number: '11',
    title: 'Meeting with Hon\'ble Governor of Jharkhand, Shri Santosh Gangwar',
    tag: 'Government Engagement • 2025',
    tagClass: 'award-tag--government',
    year: '2025',
    shortSummary: 'Met with the Hon\'ble Governor of Jharkhand to present Zeex AI\'s vision for transforming urban infrastructure and public safety.',
    fullDescription: 'ZEEX AI had the distinguished honour of meeting with the Hon\'ble Governor of Jharkhand to present Zeex AI\'s vision for transforming urban infrastructure and public safety through cutting-edge AI solutions. Highlighted smart surveillance, real-time traffic monitoring, AI-powered violation detection, and predictive analytics. Explored possibilities of collaboration to bring AI-led innovation to urban governance and smart city development in Jharkhand.',
    bullets: [
      'Highlighted smart surveillance, real-time traffic monitoring, AI-powered violation detection, and predictive analytics',
      'Explored possibilities of collaboration to bring AI-led innovation to urban governance and smart city development in Jharkhand',
      'Governor provided encouraging interaction and valuable insights',
    ],
    images: [
      '/assets/input2.png',
      '/assets/input3.png',
      '/assets/input1.png',
    ],
  },
  {
    id: 12,
    number: '12',
    title: 'Tamil Nadu Global Startup Summit (TNGSS) 2025',
    tag: 'Summit Participation • October 2025',
    tagClass: 'award-tag--summit',
    year: 'October 9–10, 2025',
    shortSummary: 'Presented and showcased AI-powered solutions at TNGSS 2025 — a global platform bringing together investors and innovators from 30+ countries.',
    fullDescription: 'ZEEX AI presented and showcased AI-powered solutions for safety and management at the Tamil Nadu Global Startup Summit — a global platform bringing together investors and innovators from over 30 countries. Connected with potential clients and partners who showed deep interest in Zeex AI\'s vision of making cities, industries, and public spaces smarter, safer, and more efficient through AI and data-driven intelligence.',
    bullets: [
      'Connected with potential clients and partners who showed deep interest in Zeex AI\'s vision',
      'Goal: make cities, industries, and public spaces smarter, safer, and more efficient through AI and data-driven intelligence',
    ],
    images: [
      '/assets/input3.png',
      '/assets/input1.png',
      '/assets/input2.png',
    ],
  },
  {
    id: 13,
    number: '13',
    title: 'AWS Summit Bengaluru 2025 – KTPO Exhibition Center, Whitefield',
    tag: 'Industry Summit • 2025',
    tagClass: 'award-tag--exhibition',
    year: '2025',
    shortSummary: 'Attended AWS Summit Bengaluru 2025 — engaging with keynotes on cloud-driven innovation, AI/ML, and LLMs.',
    fullDescription: 'Attended AWS Summit Bengaluru 2025 — featuring global AWS partners to trailblazing startups driving innovation through cloud and AI technologies. Engaged with keynotes on cloud-driven innovation, AI/ML, Bedrock, LLMs, and more. Participated in AWS GameDay, Generative AI Hub, and LLM League. Insights applied to Zeex AI\'s journey — especially in real-time surveillance, traffic safety, and sustainability.',
    bullets: [
      'Engaged with keynotes on cloud-driven innovation, AI/ML, Bedrock, LLMs, and more',
      'Participated in AWS GameDay, Generative AI Hub, and LLM League',
      'Insights applied to Zeex AI\'s journey — especially in real-time surveillance, traffic safety, and sustainability',
    ],
    images: [
      '/assets/input1.png',
      '/assets/input2.png',
      '/assets/input3.png',
    ],
  },
  {
    id: 14,
    number: '14',
    title: 'Startup Expo at E-Summit, IIT Madras',
    tag: 'Exhibition • 2025',
    tagClass: 'award-tag--exhibition',
    year: '2025',
    shortSummary: 'Participated in the Startup Expo at E-Summit, IIT Madras — connecting with investors, customers, and innovators.',
    fullDescription: 'ZEEX AI participated in the Startup Expo at E-Summit, IIT Madras — connecting with professionals, investors, potential customers, and innovators. Engaged with investors and government safety agencies who showed great interest in Zeex AI Safety & Surveillance solutions. Met enthusiastic AI talent from multiple colleges eager to contribute to Zeex AI\'s journey.',
    bullets: [
      'Engaged with investors and government safety agencies who showed great interest in Zeex AI Safety & Surveillance solutions',
      'Met enthusiastic AI talent from multiple colleges eager to contribute to Zeex AI\'s journey',
      'Connected with technology-driven startups for potential collaboration synergies',
    ],
    images: [
      '/assets/input2.png',
      '/assets/input3.png',
      '/assets/input1.png',
    ],
  },
  {
    id: 15,
    number: '15',
    title: 'Multiple Industry Events – Best Pitch Fest & E-Awards at E-Summit',
    tag: 'Industry Recognition • 2025',
    tagClass: 'award-tag--recognition',
    year: '2025',
    shortSummary: 'Presented AI-driven Safety & Surveillance solutions at multiple industry events, winning Best Pitch Fest & E-Awards.',
    fullDescription: 'ZEEX AI presented AI-driven Safety & Surveillance solutions at multiple industry events, engaging with business leaders, investors, and technology experts. Recognized for Innovation – Winning Best Pitch Fest & E-Awards at the E-Summit. Enhanced AI models for real-time surveillance, risk detection, and incident prevention, while connecting with key stakeholders to explore collaboration and pilot programs.',
    bullets: [
      'Recognized for Innovation – Winning Best Pitch Fest & E-Awards at the E-Summit',
      'Technology Validation – AI-powered security solutions showcasing received insightful feedback',
      'Industry Engagement – Connected with key stakeholders to explore collaboration and pilot programs',
      'Product Advancements – Enhanced AI models for real-time surveillance, risk detection, and incident prevention',
    ],
    images: [
      '/assets/input3.png',
      '/assets/input1.png',
      '/assets/input2.png',
    ],
  },
];

export default function AchievementsPage() {
  const countersAnimated = useRef(false);
  const featureVideoRef = useRef<HTMLVideoElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Ensure feature video plays
  useEffect(() => {
    const video = featureVideoRef.current;
    if (video) {
      video.play().catch(err => {
        console.log('Video autoplay prevented:', err);
        setTimeout(() => {
          video.play().catch(() => console.log('Video play failed'));
        }, 1000);
      });
    }
  }, []);

  const openModal = (ach: Achievement) => {
    setSelectedAchievement(ach);
    setActiveImageIdx(0);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedAchievement(null);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    // ── 3D Card Tilt: Add glare div + event listeners dynamically ──
    const tiltCards = Array.from(document.querySelectorAll('.award-card, .glance-card, .capability-card'));
    tiltCards.forEach((card) => {
      if (!card.querySelector('.card-glare')) {
        const glare = document.createElement('div');
        glare.className = 'card-glare';
        card.appendChild(glare);
      }
      card.addEventListener('mousemove', (e: Event) => {
        const evt = e as MouseEvent;
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = evt.clientX - rect.left;
        const y = evt.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        (card as HTMLElement).style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        const glare = card.querySelector('.card-glare') as HTMLElement;
        if (glare) {
          glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,229,255,0.15) 0%, transparent 60%)`;
          glare.style.opacity = '1';
        }
      });
      card.addEventListener('mouseleave', () => {
        (card as HTMLElement).style.transform = '';
        const glare = card.querySelector('.card-glare') as HTMLElement;
        if (glare) glare.style.opacity = '0';
      });
    });

    // ── 3D Orbit Rings around section numbers ──
    const sectionNumbers = Array.from(document.querySelectorAll('.ach-section-number'));
    sectionNumbers.forEach((sn) => {
      if (!sn.querySelector('.orbit-ring')) {
        const ring = document.createElement('div');
        ring.className = 'orbit-ring';
        sn.appendChild(ring);
      }
      if (!sn.querySelector('.orbit-ring-2')) {
        const ring2 = document.createElement('div');
        ring2.className = 'orbit-ring-2';
        sn.appendChild(ring2);
      }
    });

    // Reveal observer
    const revealSelectors = '.ach-reveal, .ach-stagger-children, .ach-slide-left, .ach-slide-right, .ach-scale-in';
    const reveals = Array.from(document.querySelectorAll(revealSelectors));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(r => obs.observe(r));

    // Counter animation
    const counters = Array.from(document.querySelectorAll('[data-counter]')) as HTMLElement[];
    const animateCounter = (el: HTMLElement) => {
      const target = Number(el.dataset.target || 0);
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = `${Math.floor(target * eased)}${suffix}`;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.45 });
    counters.forEach(counter => counterObserver.observe(counter));

    return () => {
      obs.disconnect();
      counterObserver.disconnect();
    };
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (modalOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [modalOpen]);

  const section1 = achievements.slice(0, 6);
  const section2 = achievements.slice(6, 9);
  const section3 = achievements.slice(9, 11);
  const section4 = achievements.slice(11, 15);

  return (
    <>
      <main className="achievements-page">
        {/* HERO SECTION */}
        <section className="achievements-hero">
          {/* Video Background */}
          <video
            ref={featureVideoRef}
            className="ach-hero-video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="/achievements/achievements-bg.mp4" type="video/mp4" />
          </video>
          <div className="ach-hero-video-overlay" />
          {/* <Achievements3DScene /> */}
          <div className="ach-particles">
            <div className="ach-particle" />
            <div className="ach-particle" />
            <div className="ach-particle" />
            <div className="ach-particle" />
            <div className="ach-particle" />
            <div className="ach-particle" />
          </div>
          <div className="achievements-hero-inner">
            <div className="achievements-hero-badge">
              <span className="badge-dot" />
              Achievements &amp; Milestones 
            </div>
            <h1 className="achievements-title">Achievements</h1>
            <p className="achievements-copy">
              Celebrating our growth, industry recognition, and the impact we&apos;ve made in AI-driven safety and operations.
            </p>
            <div className="achievements-hero-meta">
              <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', marginBottom: '6px', fontWeight: 500 }}>
                Compiled 2025–2026 &nbsp;|&nbsp; IIT Madras Incubated Startup
              </p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
                Founder &amp; CEO: Gaurav Yadav &nbsp;|&nbsp; Student at IIT Madras
              </p>
            </div>
          </div>
          {/* Video Container - Right Side */}
          <div className="ach-hero-video-container">
            <video
              ref={featureVideoRef}
              className="ach-hero-feature-video"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src="/achievements/achievements-bg.mp4" type="video/mp4" />
            </video>
          </div>
        </section>

        {/* MISSION */}
        <div className="ach-reveal" style={{ textAlign: 'center', padding: '0 24px 20px', maxWidth: '800px', margin: '0 auto' }}>
          <br></br>
          <p style={{ fontSize: '1.15rem', color: 'var(--cyan)', fontWeight: 600, letterSpacing: '0.06em' }}>
            Mission: Revolutionizing Security With Real-Time AI-Powered Surveillance
          </p>
        </div>

        <div className="gradient-divider" />

        {/* COMPANY AT A GLANCE */}
        <section className="glance-section ach-reveal">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="ach-section-number">⚙</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', marginBottom: '8px' }}>Company at a Glance</h2>
          </div>
          <div className="glance-grid ach-stagger-children">
            <div className="glance-card">
              <div className="glance-label">Founded / Incubated</div>
              <div className="glance-value">NIRMAAN IITM – Pre-incubator of IIT Madras</div>
            </div>
            <div className="glance-card">
              <div className="glance-label">Product</div>
              <div className="glance-value">Full-stack AI Company – AI Models, In-house Hardware, Proprietary Software</div>
            </div>
            <div className="glance-card">
              <div className="glance-label">Focus Area</div>
              <div className="glance-value">Safety, Surveillance, Smart Cities, Traffic Management</div>
            </div>
            <div className="glance-card">
              <div className="glance-label">Recognition</div>
              <div className="glance-value">13+ Awards &amp; Milestones (2025–2026)</div>
            </div>
            <div className="glance-card">
              <div className="glance-label">Key Partners</div>
              <div className="glance-value">Bosch Mobility, AWS, IndiaAI, StartupTN</div>
            </div>
            <div className="glance-card">
              <div className="glance-label">Government Engagements</div>
              <div className="glance-value">UP Administration, Jharkhand Governor, Union Minister Jitin Prasada</div>
            </div>
            <div className="glance-card">
              <div className="glance-label">Top Platforms</div>
              <div className="glance-value">IIT Madras E-Summit, AI Impact Summit 2026, TechXConf 2025, TNGSS 2025</div>
            </div>
          </div>
        </section>

        {/* SECTION 1: AWARDS & COMPETITION WINS */}
        <section className="ach-section">
          <div className="ach-section-inner">
            <div className="ach-section-header ach-reveal">
              <div className="ach-section-number">1</div>
              <h2 className="ach-section-title">Awards &amp; Competition Wins</h2>
              <p className="ach-section-subtitle">International &amp; Institutional Recognition</p>
            </div>
            <div className="awards-grid ach-stagger-children">
              {section1.map(ach => (
                <article className="award-card" key={ach.id}>
                  <div className="award-card-top">
                    <span className={`award-tag ${ach.tagClass}`}>{ach.tag}</span>
                  </div>
                  <div className="award-card-body">
                    <h3 className="award-title">{ach.title}</h3>
                    <div className="award-year">{ach.year}</div>
                    <p className="award-short-summary">{ach.shortSummary}</p>
                    <button className="know-more-btn" onClick={() => openModal(ach)}>
                      <span className="know-more-icon">→</span>
                      Click here to know more
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: INCUBATION & INSTITUTIONAL RECOGNITION */}
        <section className="ach-section">
          <div className="ach-section-inner">
            <div className="ach-section-header ach-reveal">
              <div className="ach-section-number">2</div>
              <h2 className="ach-section-title">Incubation &amp; Institutional Recognition</h2>
              <p className="ach-section-subtitle">Backing from premier institutions &amp; programs</p>
            </div>
            <div className="awards-grid ach-stagger-children">
              {section2.map(ach => (
                <article className="award-card" key={ach.id}>
                  <div className="award-card-top">
                    <span className={`award-tag ${ach.tagClass}`}>{ach.tag}</span>
                  </div>
                  <div className="award-card-body">
                    <h3 className="award-title">{ach.title}</h3>
                    <div className="award-year">{ach.year}</div>
                    <p className="award-short-summary">{ach.shortSummary}</p>
                    <button className="know-more-btn" onClick={() => openModal(ach)}>
                      <span className="know-more-icon">→</span>
                      Click here to know more
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: GOVERNMENT & POLICY ENGAGEMENTS */}
        <section className="ach-section">
          <div className="ach-section-inner">
            <div className="ach-section-header ach-reveal">
              <div className="ach-section-number">3</div>
              <h2 className="ach-section-title">Government &amp; Policy Engagements</h2>
              <p className="ach-section-subtitle">Engaging with leaders shaping India&apos;s future</p>
            </div>
            <div className="awards-grid ach-stagger-children">
              {section3.map(ach => (
                <article className="award-card" key={ach.id}>
                  <div className="award-card-top">
                    <span className={`award-tag ${ach.tagClass}`}>{ach.tag}</span>
                  </div>
                  <div className="award-card-body">
                    <h3 className="award-title">{ach.title}</h3>
                    <div className="award-year">{ach.year}</div>
                    <p className="award-short-summary">{ach.shortSummary}</p>
                    <button className="know-more-btn" onClick={() => openModal(ach)}>
                      <span className="know-more-icon">→</span>
                      Click here to know more
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: KEY EVENTS, SUMMITS & EXHIBITIONS */}
        <section className="ach-section">
          <div className="ach-section-inner">
            <div className="ach-section-header ach-reveal">
              <div className="ach-section-number">4</div>
              <h2 className="ach-section-title">Key Events, Summits &amp; Exhibitions</h2>
              <p className="ach-section-subtitle">Showcasing innovation on global platforms</p>
            </div>
            <div className="awards-grid ach-stagger-children">
              {section4.map(ach => (
                <article className="award-card" key={ach.id}>
                  <div className="award-card-top">
                    <span className={`award-tag ${ach.tagClass}`}>{ach.tag}</span>
                  </div>
                  <div className="award-card-body">
                    <h3 className="award-title">{ach.title}</h3>
                    <div className="award-year">{ach.year}</div>
                    <p className="award-short-summary">{ach.shortSummary}</p>
                    <button className="know-more-btn" onClick={() => openModal(ach)}>
                      <span className="know-more-icon">→</span>
                      Click here to know more
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: PRODUCT & TECHNOLOGY CAPABILITIES */}
        <section className="ach-section">
          <div className="ach-section-inner">
            <div className="ach-section-header ach-reveal">
              <div className="ach-section-number">5</div>
              <h2 className="ach-section-title">Product &amp; Technology Capabilities</h2>
              <p className="ach-section-subtitle">Full-stack AI — from models to hardware to software</p>
            </div>
            <p className="ach-reveal" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, fontSize: '1.02rem' }}>
              ZEEX AI has developed a complete, end-to-end full-stack AI product — making it no longer just an idea or a prototype, but a company ready for real-world deployments.
            </p>
            <div className="capabilities-grid ach-stagger-children">
              <div className="capability-card">
                <div className="capability-icon">🧠</div>
                <h4 className="capability-title">Own AI Models</h4>
                <p className="capability-desc">Proprietary AI models built in-house for safety, surveillance, and traffic intelligence</p>
              </div>
              <div className="capability-card">
                <div className="capability-icon">🔧</div>
                <h4 className="capability-title">In-House Hardware Devices</h4>
                <p className="capability-desc">Custom hardware designed and manufactured by the Zeex AI team</p>
              </div>
              <div className="capability-card">
                <div className="capability-icon">💻</div>
                <h4 className="capability-title">Proprietary Software</h4>
                <p className="capability-desc">Fully integrated software platform for monitoring, analytics, and insights</p>
              </div>
              <div className="capability-card">
                <div className="capability-icon">👁</div>
                <h4 className="capability-title">Real-Time Computer Vision</h4>
                <p className="capability-desc">Instant violation detection, traffic flow analysis, and threat identification</p>
              </div>
              <div className="capability-card">
                <div className="capability-icon">📊</div>
                <h4 className="capability-title">Predictive Analytics</h4>
                <p className="capability-desc">Actionable intelligence for administration and law enforcement</p>
              </div>
              <div className="capability-card">
                <div className="capability-icon">🏙</div>
                <h4 className="capability-title">Smart City Solutions</h4>
                <p className="capability-desc">Making cities, industries, and public spaces smarter, safer, and more efficient</p>
              </div>
            </div>
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="closing-section ach-scale-in">
          <div className="closing-inner">
            <h2 className="closing-tagline">The Journey Has Just Begun.</h2>
            <p className="closing-sub">
              Building a Safer, Smarter, AI-Powered India — Using Indigenous Technology.
            </p>
            <div className="closing-brands">
              <span>ZEEX AI</span>
              <span>IIT Madras</span>
              <span>zeexai.com</span>
            </div>
          </div>
        </section>
      </main>

      {/* ═══════ MODAL ═══════ */}
      {modalOpen && selectedAchievement && (
        <div className="ach-modal-overlay" onClick={closeModal}>
          <div className="ach-modal" onClick={(e) => e.stopPropagation()}>
            <button className="ach-modal-close" onClick={closeModal} aria-label="Close">
              ✕
            </button>

            <div className="ach-modal-tag-row">
              <span className={`award-tag ${selectedAchievement.tagClass}`}>
                {selectedAchievement.tag}
              </span>
            </div>

            <h2 className="ach-modal-title">{selectedAchievement.title}</h2>
            <div className="ach-modal-year">{selectedAchievement.year}</div>

            {/* Image Gallery */}
            <div className="ach-modal-gallery">
              <div className="ach-modal-main-image">
                <img
                  src={selectedAchievement.images[activeImageIdx]}
                  alt={`${selectedAchievement.title} - Image ${activeImageIdx + 1}`}
                />
              </div>
              <div className="ach-modal-thumbnails">
                {selectedAchievement.images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`ach-modal-thumb ${idx === activeImageIdx ? 'active' : ''}`}
                    onClick={() => setActiveImageIdx(idx)}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Content */}
            <div className="ach-modal-content">
              <p className="ach-modal-description">{selectedAchievement.fullDescription}</p>
              <ul className="ach-modal-bullets">
                {selectedAchievement.bullets.map((bullet, idx) => (
                  <li key={idx}>
                    <span className="ach-modal-bullet-icon">✦</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER SECTION */}
      <footer className="site-footer" style={{ marginTop: 'auto' }}>
        <div className="footer-grid">
          <div className="footer-section">
            <div className="landing-logo" style={{marginBottom: '18px'}}>
              <img src="/assets/Zeex-AI logo .png" alt="Zeex AI" style={{width: '32px'}} />
              <span className="brand-mark" style={{color: '#fff'}}>ZeexAI</span>
            </div>
            <p style={{fontSize: '0.9rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.7)'}}>
              Harnessing the power of data and artificial intelligence, Zeex AI empowers organizations to predict risks, ensure safety, and optimize Daily operations—before issues escalate.
            </p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <div className="footer-links">
              <Link href="/home">Home</Link>
              <Link href="/about">About Us</Link>
              <Link href="/services">Services</Link>
              <Link href="/solutions">Solutions</Link>
              <Link href="/blogs">Blog</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
          <div className="footer-section">
            <h4>Our Services</h4>
            <div className="footer-links">
              <a href="#">Retail &amp; High-Risk Shop Security</a>
              <a href="#">Bank &amp; ATM Security Solutions</a>
              <a href="#">Industrial Safety Monitoring</a>
              <a href="#">Smart City Surveillance</a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p style={{fontSize: '0.9rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.7)'}}>
              +91 8709221636<br/>
              admin@zeexai.com<br/>
              Nirmaan, CFI, IIT Madras
            </p>
          </div>
        </div>
        <div className="section-inner" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '40px', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>&copy; 2026 ZeexAI. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>Privacy Policy</a>
            <a href="#" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>Terms of Service</a>
          </div>
        </div>
      </footer>
    </>
  );
}
