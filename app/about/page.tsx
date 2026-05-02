'use client';
import './about.css';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function AboutPage() {
  const cursorRafRef = useRef<number | null>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const teamMembers = [
    {
      id: 1,
      name: 'Gaurav Yadav',
      title: 'Founder & CEO',
      image: '/assets/Gaurav Yadav.jpg',
      bio: 'Visionary leader and innovator in AI-powered security systems. Gaurav founded ZeexAI with a mission to revolutionize how organizations approach safety and surveillance through cutting-edge artificial intelligence.',
      expertise: ['Artificial Intelligence', 'Computer Vision', 'Strategic Leadership', 'Product Innovation'],
      achievements: ['IIT Madras Incubated Startup', '13+ Awards & Recognitions', 'AI Impact Summit Winner 2026'],
      quote: 'Technology should protect people, not just monitor them.',
      linkedin: '#',
      email: 'gaurav@zeexai.com'
    },
    {
      id: 2,
      name: 'Nitesh Yadav',
      title: 'Co-founder, Business Lead',
      image: '/assets/Nitesh Yadav.jpg',
      bio: 'Strategic business leader driving ZeexAI\'s growth and market expansion. Nitesh brings deep expertise in business development, partnerships, and scaling technology companies in the AI and security sectors.',
      expertise: ['Business Development', 'Strategic Partnerships', 'Market Expansion', 'Operations Management'],
      achievements: ['Built partnerships with Fortune 500 companies', 'Led expansion into 3 new markets', 'Grew revenue by 300% in 2025'],
      quote: 'Great technology needs great execution to make real impact.',
      linkedin: '#',
      email: 'nitesh@zeexai.com'
    }
  ];

  const openModal = (member: any) => {
    setSelectedMember(member);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedMember(null);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    // simple parallax: translate layers by data-depth on scroll
    const layers = Array.from(document.querySelectorAll('[data-depth]')) as HTMLElement[];
    const onScroll = () => {
      const y = window.scrollY;
      layers.forEach(layer => {
        const depth = parseFloat(layer.dataset.depth || '0');
        const move = y * depth;
        layer.style.transform = `translateY(${move}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // reveal observer for sections
    const reveals = Array.from(document.querySelectorAll('.reveal')) as Element[];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });
    reveals.forEach(r => obs.observe(r));

    // team cards: pointer-based 3D tilt
    const teamCards = Array.from(document.querySelectorAll('.team-card')) as HTMLElement[];
    const teamCleanups: Array<() => void> = [];
    teamCards.forEach(card => {
      card.classList.add('tilt');
      let rafId: number | null = null;
      const onPointer = (e: PointerEvent | MouseEvent) => {
        const evt = e as PointerEvent;
        const rect = card.getBoundingClientRect();
        const x = (evt.clientX - rect.left) - rect.width / 2;
        const y = (evt.clientY - rect.top) - rect.height / 2;
        const tiltX = (y / rect.height) * 10;
        const tiltY = (x / rect.width) * -10;
        const transform = `translateY(-4px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => { card.style.transform = transform; });
      };
      const onLeave = () => { if (rafId) cancelAnimationFrame(rafId); rafId = requestAnimationFrame(() => { card.style.transform = ''; }); };
      card.addEventListener('pointermove', onPointer);
      card.addEventListener('pointerleave', onLeave);
      teamCleanups.push(() => card.removeEventListener('pointermove', onPointer));
      teamCleanups.push(() => card.removeEventListener('pointerleave', onLeave));
      teamCleanups.push(() => { if (rafId) cancelAnimationFrame(rafId); });
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      obs.disconnect();
      teamCleanups.forEach(fn => fn());
    };
  }, []);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const hero = document.querySelector('.about-hero') as HTMLElement | null;

    const onParallax = () => {
      if (!hero) return;
      const y = window.scrollY * 0.12;
      hero.style.setProperty('--about-parallax-y', `${y}px`);
    };
    window.addEventListener('scroll', onParallax, { passive: true });
    onParallax();

    const counters = Array.from(document.querySelectorAll('[data-counter]')) as HTMLElement[];
    const animateCounter = (el: HTMLElement) => {
      const target = Number(el.dataset.target || 0);
      const suffix = el.dataset.suffix || '';
      const decimal = el.dataset.decimal === 'true';
      const duration = 1400;
      const start = performance.now();

      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const raw = target * eased;
        el.textContent = decimal ? `${raw.toFixed(1)}${suffix}` : `${Math.floor(raw)}${suffix}`;
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

    let glow: HTMLDivElement | null = null;
    let glowRunning = false;
    let onMouseMove: ((e: MouseEvent) => void) | null = null;
    let onMouseEnter: (() => void) | null = null;
    let onMouseLeave: (() => void) | null = null;

    if (!isMobile) {
      glow = document.createElement('div');
      glow.className = 'cursor-glow';
      document.body.appendChild(glow);
      glow.style.opacity = '1';

      const renderGlow = () => {
        if (glow) {
          glow.style.left = `${mousePosRef.current.x}px`;
          glow.style.top = `${mousePosRef.current.y}px`;
        }
        cursorRafRef.current = requestAnimationFrame(renderGlow);
      };

      onMouseMove = (e: MouseEvent) => {
        mousePosRef.current = { x: e.clientX, y: e.clientY };
        if (!glowRunning) {
          glowRunning = true;
          cursorRafRef.current = requestAnimationFrame(renderGlow);
        }
      };
      onMouseEnter = () => { if (glow) glow.style.opacity = '1'; };
      onMouseLeave = () => { if (glow) glow.style.opacity = '0'; };

      window.addEventListener('mousemove', onMouseMove, { passive: true });
      window.addEventListener('mouseenter', onMouseEnter);
      window.addEventListener('mouseleave', onMouseLeave);
    }

    return () => {
      window.removeEventListener('scroll', onParallax);
      counterObserver.disconnect();
      if (onMouseMove) window.removeEventListener('mousemove', onMouseMove);
      if (onMouseEnter) window.removeEventListener('mouseenter', onMouseEnter);
      if (onMouseLeave) window.removeEventListener('mouseleave', onMouseLeave);
      if (cursorRafRef.current) cancelAnimationFrame(cursorRafRef.current);
      if (glow) glow.remove();
    };
  }, []);

  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-inner">
          <div className="parallax-layer" data-depth="0.04" aria-hidden>
            <div className="hero-grid-overlay" />
          </div>
          
          <div className="parallax-layer" data-depth="0.12">
            <h1 className="about-title">Pioneering AI Security for a Smarter, Safer World</h1>
            
            <p className="about-lead">
              ZeexAI is redefining how modern security systems operate—moving beyond passive monitoring to intelligent, real-time decision-making systems.
            </p>
            
            <p className="about-lead" style={{ marginTop: '-20px' }}>
              <strong style={{ color: '#00e5ff', fontSize: '1.2rem' }}>Our AI doesn't just detect threats.</strong><br />
              It predicts risks, analyzes behavior, and acts instantly—before incidents occur.
            </p>
            
            <p className="about-lead" style={{ marginTop: '-16px', fontStyle: 'italic', opacity: 0.85 }}>
              From surveillance to intelligence. From reaction to prevention.
            </p>
          </div>
          
          <div className="parallax-layer" data-depth="0.22">
            <div className="hero-card">
              <h3>Our Vision</h3>
              <p>At ZeexAI, we transform traditional systems into intelligent ecosystems. Our platform understands context, detects anomalies, predicts risks, and triggers automated responses—creating a proactive security infrastructure.</p>
              <ul>
                <li>Understand context</li>
                <li>Detect anomalies</li>
                <li>Predict risks</li>
                <li>Trigger automated responses</li>
              </ul>
              <Link href="/" className="btn btn-primary">Explore our approach</Link>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="about-mission reveal" style={{ padding: '80px 24px', background: 'linear-gradient(135deg, rgba(0,229,255,0.05) 0%, rgba(6,21,48,0.9) 100%)', textAlign: 'center' }}>
        <div className="section-inner" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: '24px' }}>Our Mission</h2>
          <p style={{ fontSize: '1.3rem', color: 'rgba(255,255,255,0.9)', lineHeight: '1.8', fontStyle: 'italic' }}>
            "To build intelligent systems that proactively protect people, assets, and environments by turning data into actionable intelligence."
          </p>
        </div>
      </section>

      {/* PROBLEM WE SOLVE */}
      <section className="about-problem reveal" style={{ padding: '80px 24px', background: '#0a1e3a' }}>
        <div className="section-inner">
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: '50px', textAlign: 'center' }}>Problem We Solve</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', color: '#00e5ff', marginBottom: '20px' }}>🚨 Current Challenges</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ padding: '12px 0', color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>❌ Passive monitoring systems</li>
                <li style={{ padding: '12px 0', color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>❌ High human dependency</li>
                <li style={{ padding: '12px 0', color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>❌ Delayed response times</li>
                <li style={{ padding: '12px 0', color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem' }}>❌ Missed threats & anomalies</li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', color: '#ff6b6b', marginBottom: '20px' }}>⚠️ Impact</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ padding: '12px 0', color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>• Security breaches</li>
                <li style={{ padding: '12px 0', color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>• Operational inefficiencies</li>
                <li style={{ padding: '12px 0', color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>• Increased risk exposure</li>
                <li style={{ padding: '12px 0', color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem' }}>• Financial losses</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* OUR SOLUTION */}
      <section className="about-solution reveal" style={{ padding: '80px 24px', background: 'linear-gradient(180deg, #061530 0%, #0a1e3a 100%)' }}>
        <div className="section-inner">
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: '50px', textAlign: 'center' }}>Our Solution</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
            <div className="feature-card" style={{ padding: '30px', textAlign: 'center', transition: 'all 0.3s ease' }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🔍</div>
              <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '10px' }}>Real-Time Threat Detection</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>AI-powered instant identification of security threats</p>
            </div>
            <div className="feature-card" style={{ padding: '30px', textAlign: 'center', transition: 'all 0.3s ease' }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🧠</div>
              <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '10px' }}>Pattern Recognition</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>Advanced algorithms detect unusual behavior patterns</p>
            </div>
            <div className="feature-card" style={{ padding: '30px', textAlign: 'center', transition: 'all 0.3s ease' }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>⚡</div>
              <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '10px' }}>Instant Alerts</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>Real-time notifications to security teams</p>
            </div>
            <div className="feature-card" style={{ padding: '30px', textAlign: 'center', transition: 'all 0.3s ease' }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🤖</div>
              <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '10px' }}>Automated Response</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>Proactive actions before incidents escalate</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW ZEE X AI WORKS */}
      <section className="about-process reveal" style={{ padding: '80px 24px', background: '#0a1e3a' }}>
        <div className="section-inner">
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: '50px', textAlign: 'center' }}>How ZeexAI Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #00e5ff, #4f46e5)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '2rem', color: '#fff', fontWeight: 'bold', boxShadow: '0 0 30px rgba(0,229,255,0.3)' }}>1</div>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '10px' }}>Data Capture</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>Collect video feeds & sensor data</p>
            </div>
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #00e5ff, #4f46e5)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '2rem', color: '#fff', fontWeight: 'bold', boxShadow: '0 0 30px rgba(0,229,255,0.3)' }}>2</div>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '10px' }}>AI Processing</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>Deep learning analysis in real-time</p>
            </div>
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #00e5ff, #4f46e5)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '2rem', color: '#fff', fontWeight: 'bold', boxShadow: '0 0 30px rgba(0,229,255,0.3)' }}>3</div>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '10px' }}>Intelligence Layer</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>Threat assessment & prediction</p>
            </div>
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #00e5ff, #4f46e5)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '2rem', color: '#fff', fontWeight: 'bold', boxShadow: '0 0 30px rgba(0,229,255,0.3)' }}>4</div>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '10px' }}>Action Layer</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>Automated response deployment</p>
            </div>
          </div>
        </div>
      </section>

      {/* ENHANCED METRICS SECTION */}
      <section className="about-stats reveal">
        <div className="section-inner">
          <div className="about-stats-grid">
            <article className="about-stat-card">
              <div className="about-stat-value" data-counter data-target="10" data-suffix="K+">0</div>
              <div className="about-stat-label">Active Users</div>
            </article>
            <article className="about-stat-card">
              <div className="about-stat-value" data-counter data-target="99.9" data-decimal="true" data-suffix="%">0</div>
              <div className="about-stat-label">Detection Accuracy</div>
            </article>
            <article className="about-stat-card">
              <div className="about-stat-value" data-counter data-target="24" data-suffix="/7">0</div>
              <div className="about-stat-label">Monitoring</div>
            </article>
            <article className="about-stat-card">
              <div className="about-stat-value" style={{ fontSize: '1.2rem' }}>Real-Time</div>
              <div className="about-stat-label">AI Engine</div>
            </article>
          </div>
        </div>
      </section>

      <section className="about-story reveal">
        <div className="section-inner">
          <h3>Our Journey</h3>
          <p className="muted">Milestones in our mission to revolutionize security technology</p>
          <ol className="timeline">
            <li>
              <strong>2024</strong>
              <div>ZeexAI Founded — Founded by Gaurav Yadav with a vision to revolutionize security systems using artificial intelligence.</div>
            </li>
            <li>
              <strong>2024</strong>
              <div>Incubated in IIT Madras — Selected for pre-incubation at the prestigious institute of IIT Madras, under the Nirmaan program.</div>
            </li>
            <li>
              <strong>Present</strong>
              <div>Leading Innovation — Today, ZeexAI continues to pioneer advancements in AI-powered security, protecting thousands of locations worldwide.</div>
            </li>
          </ol>
        </div>
      </section>

      <section className="about-team reveal">
        <div className="section-inner">
          <h3>Our People</h3>
          <p className="muted">Meet Our Leadership — A team of visionaries and experts driving innovation in AI security</p>
          <div className="team-grid">
            {teamMembers.map((member) => (
              <article 
                key={member.id} 
                className="team-card"
                onClick={() => openModal(member)}
                style={{ cursor: 'pointer' }}
              >
                <div className="team-card-image-wrapper">
                  <img src={member.image} alt={member.name} />
                  <div className="team-card-overlay">
                    <span className="view-profile-text">View Profile</span>
                  </div>
                </div>
                <h4>{member.name}</h4>
                <small>{member.title}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Team Member Modal */}
      {modalOpen && selectedMember && (
        <div className="team-modal-overlay" onClick={closeModal}>
          <div className="team-modal" onClick={(e) => e.stopPropagation()}>
            <button className="team-modal-close" onClick={closeModal}>
              <span>&times;</span>
            </button>
            
            <div className="team-modal-header">
              <img src={selectedMember.image} alt={selectedMember.name} className="team-modal-image" />
              <div className="team-modal-header-info">
                <h2>{selectedMember.name}</h2>
                <p className="team-modal-title">{selectedMember.title}</p>
              </div>
            </div>

            <div className="team-modal-body">
              <div className="team-modal-section">
                <h3>About</h3>
                <p>{selectedMember.bio}</p>
              </div>

              <div className="team-modal-section">
                <h3>Expertise</h3>
                <div className="team-modal-tags">
                  {selectedMember.expertise.map((skill: string, idx: number) => (
                    <span key={idx} className="team-modal-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="team-modal-section">
                <h3>Key Achievements</h3>
                <ul className="team-modal-achievements">
                  {selectedMember.achievements.map((achievement: string, idx: number) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              </div>

              <div className="team-modal-section team-modal-quote-section">
                <blockquote className="team-modal-quote">
                  "{selectedMember.quote}"
                </blockquote>
              </div>

              <div className="team-modal-section team-modal-contact">
                <h3>Connect</h3>
                <div className="team-modal-contact-links">
                  <a href={selectedMember.linkedin} className="team-modal-contact-link">
                    <span>LinkedIn</span>
                  </a>
                  <a href={`mailto:${selectedMember.email}`} className="team-modal-contact-link">
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OUR APPROACH */}
      <section className="about-approach reveal" style={{ padding: '80px 24px', background: 'linear-gradient(180deg, #0a1e3a 0%, #061530 100%)' }}>
        <div className="section-inner">
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: '50px', textAlign: 'center' }}>Our Approach</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
            <div className="feature-card" style={{ padding: '40px 30px', textAlign: 'center' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '20px' }}>👁️</div>
              <h3 style={{ fontSize: '1.5rem', color: '#00e5ff', marginBottom: '15px' }}>Perception</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.7' }}>Advanced sensors and cameras capture comprehensive environmental data in real-time</p>
            </div>
            <div className="feature-card" style={{ padding: '40px 30px', textAlign: 'center' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '20px' }}>🧠</div>
              <h3 style={{ fontSize: '1.5rem', color: '#00e5ff', marginBottom: '15px' }}>Understanding</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.7' }}>AI processes and analyzes patterns to understand context and detect anomalies</p>
            </div>
            <div className="feature-card" style={{ padding: '40px 30px', textAlign: 'center' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '20px' }}>⚡</div>
              <h3 style={{ fontSize: '1.5rem', color: '#00e5ff', marginBottom: '15px' }}>Action</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.7' }}>Automated responses deployed instantly to mitigate threats before they escalate</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY ZEEX AI */}
      <section className="about-why reveal" style={{ padding: '80px 24px', background: '#0a1e3a' }}>
        <div className="section-inner">
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: '50px', textAlign: 'center' }}>Why ZeexAI?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', maxWidth: '1200px', margin: '0 auto' }}>
            {[
              { icon: '✅', title: 'Proactive Detection', desc: 'Identify threats before they occur' },
              { icon: '✅', title: 'Real-Time Decisions', desc: 'Instant AI-powered responses' },
              { icon: '✅', title: 'High Accuracy', desc: '99.9% threat detection rate' },
              { icon: '✅', title: 'Scalable', desc: 'From single sites to enterprise deployments' },
              { icon: '✅', title: 'Easy Integration', desc: 'Works with existing infrastructure' },
              { icon: '✅', title: 'Cost Effective', desc: 'Reduce operational costs by 60%' }
            ].map((item, idx) => (
              <div key={idx} className="feature-card" style={{ padding: '25px', display: 'flex', alignItems: 'flex-start', gap: '15px', transition: 'all 0.3s ease' }}>
                <span style={{ fontSize: '1.8rem', minWidth: '40px' }}>{item.icon}</span>
                <div>
                  <h4 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '8px' }}>{item.title}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES WE IMPACT */}
      <section className="about-industries reveal" style={{ padding: '80px 24px', background: 'linear-gradient(180deg, #061530 0%, #0a1e3a 100%)' }}>
        <div className="section-inner">
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: '50px', textAlign: 'center' }}>Industries We Impact</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '25px', maxWidth: '1200px', margin: '0 auto' }}>
            {[
              { icon: '🏙️', name: 'Smart Cities' },
              { icon: '🏭', name: 'Industrial Safety' },
              { icon: '🛍️', name: 'Retail Security' },
              { icon: '🏦', name: 'Banking' },
              { icon: '🏛️', name: 'Public Infrastructure' }
            ].map((industry, idx) => (
              <div key={idx} className="feature-card" style={{ padding: '35px 25px', textAlign: 'center', transition: 'all 0.3s ease' }}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{industry.icon}</div>
                <h4 style={{ fontSize: '1.2rem', color: '#fff' }}>{industry.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY STACK */}
      <section className="about-tech reveal" style={{ padding: '80px 24px', background: '#0a1e3a' }}>
        <div className="section-inner">
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: '50px', textAlign: 'center' }}>Technology Stack</h2>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '20px', 
            justifyContent: 'center', 
            alignItems: 'center',
            maxWidth: '1000px', 
            margin: '0 auto',
            minHeight: '200px'
          }}>
            {['Computer Vision', 'Deep Learning', 'Video Analytics', 'Edge Computing', 'Cloud Systems', 'APIs', 'Neural Networks', 'IoT Integration'].map((tech, idx) => (
              <div 
                key={idx} 
                className="feature-card tech-bubble"
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px 32px', 
                  background: 'rgba(0,229,255,0.1)', 
                  border: '1px solid rgba(0,229,255,0.3)', 
                  borderRadius: '999px', 
                  color: '#00e5ff', 
                  fontSize: '1rem', 
                  fontWeight: '600', 
                  transition: 'all 0.3s ease',
                  minHeight: '80px',
                  minWidth: '160px'
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY & PRIVACY */}
      <section className="about-security reveal" style={{ padding: '80px 24px', background: '#0a1e3a' }}>
        <div className="section-inner">
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: '50px', textAlign: 'center' }}>Security & Privacy</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
            {[
              { icon: '🔒', title: 'Data Encryption', desc: 'End-to-end encryption for all data' },
              { icon: '🛡️', title: 'Privacy-First AI', desc: 'Built with privacy at the core' },
              { icon: '📋', title: 'GDPR Compliant', desc: 'Following global privacy standards' },
              { icon: '⚖️', title: 'Ethical AI', desc: 'Responsible and transparent AI practices' }
            ].map((item, idx) => (
              <div key={idx} className="feature-card security-card" style={{ 
                padding: '36px 28px', 
                textAlign: 'center', 
                background: 'rgba(255, 255, 255, 0.05)', 
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '18px' }}>{item.icon}</div>
                <h4 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '12px', fontWeight: '600' }}>{item.title}</h4>
                <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FUTURE VISION */}
      <section className="about-vision reveal" style={{ padding: '80px 24px', background: 'linear-gradient(135deg, rgba(0,229,255,0.1) 0%, #061530 100%)', textAlign: 'center' }}>
        <div className="section-inner" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: '30px' }}>Future Vision</h2>
          <p style={{ fontSize: '1.3rem', color: 'rgba(255,255,255,0.9)', lineHeight: '1.8', marginBottom: '40px' }}>
            We're building towards a future where security is <strong style={{ color: '#00e5ff' }}>autonomous, intelligent, and predictive</strong>.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px' }}>
            <div style={{ padding: '25px', background: 'rgba(0,229,255,0.1)', borderRadius: '12px', border: '1px solid rgba(0,229,255,0.3)' }}>
              <h4 style={{ color: '#00e5ff', fontSize: '1.3rem', marginBottom: '10px' }}>🤖 Autonomous Security</h4>
              <p style={{ color: 'rgba(255,255,255,0.8)' }}>Self-learning systems that adapt and evolve</p>
            </div>
            <div style={{ padding: '25px', background: 'rgba(0,229,255,0.1)', borderRadius: '12px', border: '1px solid rgba(0,229,255,0.3)' }}>
              <h4 style={{ color: '#00e5ff', fontSize: '1.3rem', marginBottom: '10px' }}>🏙️ Smart Cities</h4>
              <p style={{ color: 'rgba(255,255,255,0.8)' }}>Connected urban safety ecosystems</p>
            </div>
            <div style={{ padding: '25px', background: 'rgba(0,229,255,0.1)', borderRadius: '12px', border: '1px solid rgba(0,229,255,0.3)' }}>
              <h4 style={{ color: '#00e5ff', fontSize: '1.3rem', marginBottom: '10px' }}>🔮 Predictive AI</h4>
              <p style={{ color: 'rgba(255,255,255,0.8)' }}>Anticipate threats before they materialize</p>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERSHIPS */}
      <section className="about-partners reveal" style={{ padding: '80px 24px', background: '#0a1e3a' }}>
        <div className="section-inner">
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: '50px', textAlign: 'center' }}>Partnerships</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
            <div className="feature-card" style={{ padding: '30px', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🏛️</div>
              <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '10px' }}>Government</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>Collaborating with public sector organizations</p>
            </div>
            <div className="feature-card" style={{ padding: '30px', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🏙️</div>
              <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '10px' }}>Smart Cities</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>Building intelligent urban infrastructure</p>
            </div>
            <div className="feature-card" style={{ padding: '30px', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🏢</div>
              <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '10px' }}>Enterprises</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>Securing Fortune 500 companies worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* ENHANCED CTA SECTION */}
      <section className="about-cta reveal" style={{ padding: '100px 24px', background: 'linear-gradient(135deg, #00e5ff 0%, #4f46e5 100%)', textAlign: 'center' }}>
        <div className="section-inner" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#fff', marginBottom: '20px', fontWeight: '800' }}>Join the Future of Intelligent Security</h2>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.95)', marginBottom: '40px' }}>Partner with ZeexAI and experience the next generation of AI-powered security solutions.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            <Link href="/contact" className="btn" style={{ padding: '16px 40px', background: '#fff', color: '#0a1e3a', fontSize: '1.1rem', fontWeight: '700', borderRadius: '8px', textDecoration: 'none', transition: 'all 0.3s ease', boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}>Request Demo</Link>
            <Link href="/contact" className="btn" style={{ padding: '16px 40px', background: 'transparent', color: '#fff', fontSize: '1.1rem', fontWeight: '700', borderRadius: '8px', textDecoration: 'none', border: '2px solid #fff', transition: 'all 0.3s ease' }}>Schedule Consultation</Link>
            <Link href="/contact" className="btn" style={{ padding: '16px 40px', background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '1.1rem', fontWeight: '700', borderRadius: '8px', textDecoration: 'none', border: '2px solid rgba(255,255,255,0.5)', transition: 'all 0.3s ease' }}>Explore Collaboration</Link>
          </div>
        </div>
      </section>

      <footer className="site-footer reveal">
        <div className="footer-grid">
          <div className="footer-section">
            <h4>ZeexAI</h4>
            <p>Harnessing the power of data and artificial intelligence, Zeex AI empowers organizations to predict risks, ensure safety, and optimize daily operations—before issues escalate.</p>
          </div>
          <div className="footer-section footer-links">
            <h4>Quick Links</h4>
            <Link href="/">Home</Link>
            <Link href="/about">About Us</Link>
            <Link href="/services">Services</Link>
            <Link href="/solutions">Solutions</Link>
            <Link href="/blogs">Blog</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="footer-section footer-links">
            <h4>Our Services</h4>
            <a href="#services">Retail & High-Risk Shop Security</a>
            <a href="#services">Bank & ATM Security Solutions</a>
            <a href="#services">Industrial Safety Monitoring</a>
            <a href="#services">Smart City Surveillance</a>
          </div>
          <div className="footer-section footer-links">
            <h4>Contact Us</h4>
            <a href="tel:+918709221636">+91 8709221636</a>
            <a href="mailto:admin@zeexai.com">admin@zeexai.com</a>
            <span>Nirmaan, CFI, IIT Madras</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 ZeexAI. All rights reserved.</span>
          <span><a href="#privacy">Privacy Policy</a> • <a href="#terms">Terms of Service</a></span>
        </div>
      </footer>
    </main>
  );
}

