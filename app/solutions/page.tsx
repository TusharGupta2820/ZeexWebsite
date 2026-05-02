"use client";
import './solutions.css';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function SolutionsPage() {
  const cursorRafRef = useRef<number | null>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const root = document.querySelector('.solutions-page') as HTMLElement | null;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const onParallax = () => {
      if (!root) return;
      const y = window.scrollY * 0.12;
      root.style.setProperty('--solutions-parallax-y', `${y}px`);
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
    let running = false;
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
        if (!running) {
          running = true;
          cursorRafRef.current = requestAnimationFrame(renderGlow);
        }
      };
      onMouseEnter = () => { if (glow) glow.style.opacity = '1'; };
      onMouseLeave = () => { if (glow) glow.style.opacity = '0'; };

      window.addEventListener('mousemove', onMouseMove, { passive: true });
      window.addEventListener('mouseenter', onMouseEnter);
      window.addEventListener('mouseleave', onMouseLeave);
    }

    const revealElements = Array.from(
      document.querySelectorAll(
        '.solutions-page .home-section, .solutions-page .feature-card, .solutions-page .method-card, .solutions-page .cta-panel'
      )
    ) as HTMLElement[];
    revealElements.forEach((el) => el.classList.add('reveal-on-scroll'));

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });
    revealElements.forEach((el) => revealObserver.observe(el));

    return () => {
      window.removeEventListener('scroll', onParallax);
      counterObserver.disconnect();
      revealObserver.disconnect();
      if (onMouseMove) window.removeEventListener('mousemove', onMouseMove);
      if (onMouseEnter) window.removeEventListener('mouseenter', onMouseEnter);
      if (onMouseLeave) window.removeEventListener('mouseleave', onMouseLeave);
      if (cursorRafRef.current) cancelAnimationFrame(cursorRafRef.current);
      if (glow) glow.remove();
    };
  }, []);

  return (
    <>
      <main className="solutions-page">
        {/* HERO SECTION */}
        <section className="home-section" style={{ paddingTop: '160px', paddingBottom: '80px', textAlign: 'center' }}>
          <div className="section-inner" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span className="section-eyebrow">AI Security Solutions</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', marginBottom: '20px' }}>Advanced Security Solutions</h1>
            <p className="section-copy" style={{ fontSize: '1.2rem', marginBottom: '32px' }}>
              Cutting-edge surveillance solutions powered by artificial intelligence to protect what matters most
            </p>
            <a className="btn btn-primary" href="#demo">Request a Demo</a>
          </div>
        </section>

        <section className="home-section solutions-stats">
          <div className="solutions-stats-grid">
            <article className="solutions-stat-card">
              <div className="solutions-stat-value" data-counter data-target="10" data-suffix="K+">0</div>
              <div className="solutions-stat-label">Users</div>
            </article>
            <article className="solutions-stat-card">
              <div className="solutions-stat-value" data-counter data-target="99.9" data-decimal="true" data-suffix="%">0</div>
              <div className="solutions-stat-label">Accuracy</div>
            </article>
            <article className="solutions-stat-card">
              <div className="solutions-stat-value" data-counter data-target="24" data-suffix="/7">0</div>
              <div className="solutions-stat-label">Monitoring</div>
            </article>
          </div>
        </section>

        {/* SOLUTIONS GRID */}
        <section className="home-section">
          <div className="section-inner">
            <div className="section-headline" style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 className="section-title" style={{ maxWidth: '100%', margin: '0 auto' }}>Comprehensive Security Solutions</h2>
              <p className="section-copy" style={{ margin: '0 auto' }}>
                Our complete suite of AI-powered security solutions designed to protect your assets and provide peace of mind.
              </p>
            </div>

            <div className="card-grid">
              {/* Card 1 */}
              <div className="feature-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="card-header" style={{ marginBottom: '16px' }}>
                  <h3 className="card-title">Advanced Threat Detection</h3>
                </div>
                <div className="card-content" style={{ flexGrow: 1 }}>
                  <p className="card-text">Our AI-powered threat detection system continuously monitors and identifies potential security risks before they become problems.</p>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', color: 'var(--cyan)' }}>Key Features</h4>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '24px' }}>
                    <li>24/7 continuous monitoring</li>
                    <li>AI-powered anomaly detection</li>
                    <li>Real-time risk assessment</li>
                    <li>Automated threat classification</li>
                    <li>Historical pattern analysis</li>
                  </ul>
                </div>
                <a className="btn btn-outline" style={{ marginTop: 'auto', width: '100%', textAlign: 'center' }} href="#">Get Started</a>
              </div>

              {/* Card 2 */}
              <div className="feature-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="card-header" style={{ marginBottom: '16px' }}>
                  <h3 className="card-title">AI-Visual Surveillance Analytics</h3>
                </div>
                <div className="card-content" style={{ flexGrow: 1 }}>
                  <p className="card-text">Intelligent video analysis detects unusual patterns while ensuring privacy and compliance.</p>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', color: 'var(--cyan)' }}>Key Features</h4>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '24px' }}>
                    <li>Real-time video processing</li>
                    <li>Privacy-preserving analytics</li>
                    <li>Custom detection rules</li>
                    <li>Multi-camera tracking</li>
                    <li>Behavioral analysis</li>
                  </ul>
                </div>
                <a className="btn btn-outline" style={{ marginTop: 'auto', width: '100%', textAlign: 'center' }} href="#">Get Started</a>
              </div>

              {/* Card 3 */}
              <div className="feature-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="card-header" style={{ marginBottom: '16px' }}>
                  <h3 className="card-title">Multi-Layered Smart Alert System</h3>
                </div>
                <div className="card-content" style={{ flexGrow: 1 }}>
                  <p className="card-text">Configure alert priorities and customize who gets notified—ensuring the right people respond at the right time.</p>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', color: 'var(--cyan)' }}>Key Features</h4>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '24px' }}>
                    <li>Add multiple notification recipients</li>
                    <li>Multi-channel alerts via SMS, WhatsApp, Email</li>
                    <li>Alert-level customization</li>
                    <li>Real-time escalation protocols</li>
                    <li>Easy configuration from dashboard</li>
                  </ul>
                </div>
                <a className="btn btn-outline" style={{ marginTop: 'auto', width: '100%', textAlign: 'center' }} href="#">Get Started</a>
              </div>

              {/* Card 4 */}
              <div className="feature-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="card-header" style={{ marginBottom: '16px' }}>
                  <h3 className="card-title">Mobile-Based App Services</h3>
                </div>
                <div className="card-content" style={{ flexGrow: 1 }}>
                  <p className="card-text">Access and control your security ecosystem from anywhere.</p>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', color: 'var(--cyan)' }}>Key Features</h4>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '24px' }}>
                    <li>Real-time security alerts</li>
                    <li>Live camera feed access</li>
                    <li>User-based access permissions</li>
                    <li>Instant incident notifications</li>
                    <li>Seamless mobile experience</li>
                  </ul>
                </div>
                <a className="btn btn-outline" style={{ marginTop: 'auto', width: '100%', textAlign: 'center' }} href="#">Get Started</a>
              </div>

              {/* Card 5 */}
              <div className="feature-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="card-header" style={{ marginBottom: '16px' }}>
                  <h3 className="card-title">Web-Based AI Dashboard</h3>
                </div>
                <div className="card-content" style={{ flexGrow: 1 }}>
                  <p className="card-text">Monitor, manage, and analyze operations through our AI-powered control center.</p>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', color: 'var(--cyan)' }}>Key Features</h4>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '24px' }}>
                    <li>Real-time activity tracking</li>
                    <li>AI model control panel</li>
                    <li>Incident logs & analytics</li>
                    <li>Multi-location support</li>
                    <li>Visual heatmaps & trends</li>
                  </ul>
                </div>
                <a className="btn btn-outline" style={{ marginTop: 'auto', width: '100%', textAlign: 'center' }} href="#">Get Started</a>
              </div>

              {/* Card 6 */}
              <div className="feature-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="card-header" style={{ marginBottom: '16px' }}>
                  <h3 className="card-title">Integrated Device Health Check</h3>
                </div>
                <div className="card-content" style={{ flexGrow: 1 }}>
                  <p className="card-text">Stay informed with automated hardware diagnostics and alerts.</p>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', color: 'var(--cyan)' }}>Key Features</h4>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '24px' }}>
                    <li>Offline device detection</li>
                    <li>Thermal & battery diagnostics</li>
                    <li>Predictive maintenance alerts</li>
                    <li>Health metrics dashboard</li>
                    <li>Scheduled status reporting</li>
                  </ul>
                </div>
                <a className="btn btn-outline" style={{ marginTop: 'auto', width: '100%', textAlign: 'center' }} href="#">Get Started</a>
              </div>

              {/* Card 7 */}
              <div className="feature-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="card-header" style={{ marginBottom: '16px' }}>
                  <h3 className="card-title">Cloud & On-Premise Deployment</h3>
                </div>
                <div className="card-content" style={{ flexGrow: 1 }}>
                  <p className="card-text">Choose the infrastructure that fits your enterprise—flexible and secure.</p>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', color: 'var(--cyan)' }}>Key Features</h4>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '24px' }}>
                    <li>Scalable cloud hosting</li>
                    <li>On-premise AI integration</li>
                    <li>Encrypted data processing</li>
                    <li>Edge computing capabilities</li>
                    <li>Full control & data ownership</li>
                  </ul>
                </div>
                <a className="btn btn-outline" style={{ marginTop: 'auto', width: '100%', textAlign: 'center' }} href="#">Get Started</a>
              </div>

              {/* Card 8 */}
              <div className="feature-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="card-header" style={{ marginBottom: '16px' }}>
                  <h3 className="card-title">Custom AI Model Allocation</h3>
                </div>
                <div className="card-content" style={{ flexGrow: 1 }}>
                  <p className="card-text">Deploy and manage different AI models for specific camera locations.</p>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', color: 'var(--cyan)' }}>Key Features</h4>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '24px' }}>
                    <li>Assign AI models per camera</li>
                    <li>Location-specific intelligence</li>
                    <li>Real-time model switching</li>
                    <li>Unified dashboard insights</li>
                    <li>Efficient resource usage</li>
                  </ul>
                </div>
                <a className="btn btn-outline" style={{ marginTop: 'auto', width: '100%', textAlign: 'center' }} href="#">Get Started</a>
              </div>

              {/* Card 9 */}
              <div className="feature-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="card-header" style={{ marginBottom: '16px' }}>
                  <h3 className="card-title">Real-Time Analytics Dashboard</h3>
                </div>
                <div className="card-content" style={{ flexGrow: 1 }}>
                  <p className="card-text">Visualize and compare AI insights across customer behavior, safety, and metrics.</p>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', color: 'var(--cyan)' }}>Key Features</h4>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '24px' }}>
                    <li>Real-time graphs</li>
                    <li>Activity heatmaps</li>
                    <li>Category-wise breakdown</li>
                    <li>Location performance trends</li>
                    <li>AI-backed forecasting</li>
                  </ul>
                </div>
                <a className="btn btn-outline" style={{ marginTop: 'auto', width: '100%', textAlign: 'center' }} href="#">Get Started</a>
              </div>

              {/* Card 10 */}
              <div className="feature-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="card-header" style={{ marginBottom: '16px' }}>
                  <h3 className="card-title">Smart Data Protection</h3>
                </div>
                <div className="card-content" style={{ flexGrow: 1 }}>
                  <p className="card-text">Secure storage and encryption of all your surveillance data.</p>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', color: 'var(--cyan)' }}>Key Features</h4>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '24px' }}>
                    <li>Military-grade encryption</li>
                    <li>Role-based access controls</li>
                    <li>Automated retention policies</li>
                    <li>Tamper-proof audit logs</li>
                    <li>Geofenced data storage</li>
                  </ul>
                </div>
                <a className="btn btn-outline" style={{ marginTop: 'auto', width: '100%', textAlign: 'center' }} href="#">Get Started</a>
              </div>

              {/* Card 11 */}
              <div className="feature-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="card-header" style={{ marginBottom: '16px' }}>
                  <h3 className="card-title">Remote Access Control</h3>
                </div>
                <div className="card-content" style={{ flexGrow: 1 }}>
                  <p className="card-text">Manage and control your security system from anywhere securely.</p>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', color: 'var(--cyan)' }}>Key Features</h4>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '24px' }}>
                    <li>Mobile app control</li>
                    <li>Biometric authentication</li>
                    <li>Temporary access grants</li>
                    <li>Usage analytics</li>
                    <li>Emergency lockdown</li>
                  </ul>
                </div>
                <a className="btn btn-outline" style={{ marginTop: 'auto', width: '100%', textAlign: 'center' }} href="#">Get Started</a>
              </div>

              {/* Card 12 */}
              <div className="feature-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="card-header" style={{ marginBottom: '16px' }}>
                  <h3 className="card-title">Network Security</h3>
                </div>
                <div className="card-content" style={{ flexGrow: 1 }}>
                  <p className="card-text">Protect your surveillance network from cyber threats.</p>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', color: 'var(--cyan)' }}>Key Features</h4>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '24px' }}>
                    <li>Intrusion prevention</li>
                    <li>Device authentication</li>
                    <li>Encrypted communications</li>
                    <li>Vulnerability scanning</li>
                    <li>Anomaly detection</li>
                  </ul>
                </div>
                <a className="btn btn-outline" style={{ marginTop: 'auto', width: '100%', textAlign: 'center' }} href="#">Get Started</a>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="home-section">
          <div className="section-inner">
            <div className="section-headline" style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 className="section-title" style={{ maxWidth: '100%', margin: '0 auto' }}>Why Choose Our Security Solutions</h2>
              <p className="section-copy" style={{ margin: '0 auto' }}>
                Integrated features that work together to provide complete protection for your property
              </p>
            </div>
            
            <div className="method-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
              <div className="method-card">
                <div className="phase" style={{ color: 'var(--cyan)' }}>01</div>
                <h4 className="method-title">AI-Powered Protection</h4>
                <p className="card-text">Advanced machine learning algorithms detect and prevent threats before they occur.</p>
              </div>
              <div className="method-card">
                <div className="phase" style={{ color: 'var(--cyan)' }}>02</div>
                <h4 className="method-title">24/7 Monitoring</h4>
                <p className="card-text">Continuous surveillance with real-time alerts for any suspicious activity.</p>
              </div>
              <div className="method-card">
                <div className="phase" style={{ color: 'var(--cyan)' }}>03</div>
                <h4 className="method-title">Secure Data Storage</h4>
                <p className="card-text">Encrypted cloud storage with military-grade protection for all your footage.</p>
              </div>
              <div className="method-card">
                <div className="phase" style={{ color: 'var(--cyan)' }}>04</div>
                <h4 className="method-title">Access Control</h4>
                <p className="card-text">Manage permissions and access from anywhere with our secure platform.</p>
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
      </main>

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
              <a href="#">Retail & High-Risk Shop Security</a>
              <a href="#">Bank & ATM Security Solutions</a>
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
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>© 2026 ZeexAI. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>Privacy Policy</a>
            <a href="#" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>Terms of Service</a>
          </div>
        </div>
      </footer>
    </>
  );
}

