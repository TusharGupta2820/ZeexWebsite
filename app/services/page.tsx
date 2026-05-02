"use client";
import './services.css';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ServicesPage() {
  const [selectedUseCase, setSelectedUseCase] = useState<{ title: string; serviceTitle: string } | null>(null);

  const servicesMap = [
    {
      id: "residential",
      title: "Residential Security",
      desc: "Comprehensive AI-powered security systems designed specifically for homes and residential properties. Our service integrates seamlessly with your existing smart home setup, providing unparalleled protection for your family and property.",
      benefits: [
        "Smart perimeter protection",
        "Family facial recognition",
        "Mobile app monitoring",
        "Integration with existing security systems",
        "Custom alert settings"
      ],
      useCases: [
        "Detecting unknown individuals approaching your property",
        "Distinguishing family members from visitors",
        "Monitoring entrance points and vulnerable areas",
        "Receiving alerts when children arrive home from school",
        "Identifying package delivery personnel"
      ]
    },
    {
      id: "commercial",
      title: "Commercial Surveillance",
      desc: "Enterprise-grade security solutions designed for businesses of all sizes. Our commercial surveillance system combines AI analytics with scalable infrastructure to protect your assets, employees, and customers around the clock.",
      benefits: [
        "Multi-site monitoring",
        "Employee access management",
        "Theft prevention",
        "Business intelligence gathering",
        "Regulatory compliance"
      ],
      useCases: [
        "Retail loss prevention with product recognition",
        "Office building access control",
        "Warehouse inventory and security management",
        "Banking and financial institution security",
        "Retail customer behavior analysis"
      ]
    },
    {
      id: "public-safety",
      title: "Public Safety",
      desc: "Advanced surveillance solutions for public spaces that enhance safety while respecting privacy. Our public safety systems help identify potential threats before they escalate, enabling proactive security measures.",
      benefits: [
        "Crowd anomaly detection",
        "Privacy-focused monitoring",
        "Emergency situation recognition",
        "Integration with emergency services",
        "Scalable deployment options"
      ],
      useCases: [
        "Transportation hub security",
        "Public event monitoring",
        "Parks and recreation area safety",
        "School and campus security",
        "Emergency response coordination"
      ]
    },
    {
      id: "retail",
      title: "Retail Security",
      desc: "Specialized AI surveillance for retail environments that prevents theft while enhancing customer experience. Our retail security solutions provide real-time analytics and automated threat detection.",
      benefits: [
        "Theft prevention and detection",
        "Customer behavior analytics",
        "Inventory monitoring",
        "Queue management",
        "Loss prevention reporting"
      ],
      useCases: [
        "Shoplifting detection and prevention",
        "Customer flow analysis",
        "Employee theft monitoring",
        "Queue length optimization",
        "Product placement insights"
      ]
    },
    {
      id: "industrial",
      title: "Industrial Security",
      desc: "Robust security solutions for industrial facilities and manufacturing plants. Our industrial security systems ensure worker safety and protect valuable equipment and processes.",
      benefits: [
        "Worker safety monitoring",
        "Equipment protection",
        "Process compliance",
        "Hazard detection",
        "24/7 facility monitoring"
      ],
      useCases: [
        "Safety protocol compliance monitoring",
        "Equipment malfunction detection",
        "Unauthorized access prevention",
        "Emergency evacuation coordination",
        "Quality control monitoring"
      ]
    },
    {
      id: "traffic",
      title: "Traffic Management",
      desc: "Intelligent traffic monitoring and management systems for cities and highways. Our traffic solutions reduce congestion, improve safety, and provide real-time traffic analytics.",
      benefits: [
        "Traffic flow optimization",
        "Accident detection",
        "Congestion monitoring",
        "Signal timing optimization",
        "Traffic pattern analysis"
      ],
      useCases: [
        "Real-time traffic monitoring",
        "Accident detection and response",
        "Traffic signal optimization",
        "Congestion prediction",
        "Emergency vehicle routing"
      ]
    }
  ];

  return (
    <>
      <main className="services-page">
        {/* HERO SECTION */}
        <section className="home-section" style={{ paddingTop: '160px', paddingBottom: '60px', textAlign: 'center' }}>
          <div className="section-inner" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="section-eyebrow">AI Security Services</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', marginBottom: '20px', maxWidth: '100%', textAlign: 'center' }}>Tailored Security Services</h1>
            <p className="section-copy" style={{ fontSize: '1.2rem', marginBottom: '30px', textAlign: 'center' }}>
              AI-powered surveillance systems designed specifically for your environment and security needs
            </p>
            <a href="#overview" className="btn btn-primary" style={{ padding: '0 32px' }}>Get Started</a>
          </div>
        </section>

        {/* SERVICES OVERVIEW GRID */}
        <section id="overview" className="home-section" style={{ paddingBottom: '80px', background: 'transparent' }}>
          <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '50px', width: '100%' }}>
              <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '10px', textAlign: 'center', margin: '0 auto 20px auto', width: '100%' }}>
                Security Tailored to Your Environment
              </h2>
              <p className="section-copy" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                Every security challenge is unique. Our AI-powered services are designed to adapt to specific environments and security needs.
              </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '30px' }}>
              {servicesMap.map((service) => (
                <div key={service.id + '-overview'} className="feature-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <h3 style={{ fontSize: '1.4rem', color: '#fff', fontWeight: '600', marginBottom: '15px' }}>{service.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', marginBottom: '20px', flexGrow: 1 }}>{service.desc}</p>
                  <a href={`#${service.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#a5b4fc', textDecoration: 'none', fontWeight: '500' }}>
                    Learn more <span>→</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DEEP DIVES FOR EACH SERVICE */}
        {servicesMap.map((service, index) => (
          <section key={service.id} id={service.id} className="home-section" style={{ paddingTop: '80px', paddingBottom: '80px', background: index % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
            <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
              
              {/* Core Description & Benefits */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
                <div>
                  <span className="section-eyebrow" style={{ marginBottom: '10px', display: 'inline-block' }}>{service.title}</span>
                  <h2 style={{ fontSize: '2.5rem', color: '#fff', fontWeight: '600', marginBottom: '20px', lineHeight: '1.2' }}>
                    {service.title}
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', fontSize: '1.1rem', marginBottom: '30px' }}>
                    {service.desc}
                  </p>
                  <a href="/contact" className="btn btn-primary" style={{ padding: '0 32px' }}>Learn More</a>
                </div>

                <div className="feature-card" style={{ padding: '40px 30px' }}>
                  <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '25px' }}>Key Benefits</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {service.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '15px', color: 'rgba(255,255,255,0.8)' }}>
                        <span className="ui-bullet" style={{ marginTop: '4px' }} aria-hidden />
                        <span style={{ lineHeight: '1.4' }}>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Use Cases Horizontal Scroll/Grid */}
              <div style={{ marginTop: '20px' }}>
                <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '30px', textAlign: 'center' }}>
                  How {service.title} Works in Practice
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                  {service.useCases.map((useCase, ucIdx) => (
                    <div 
                      key={ucIdx} 
                      className="feature-card" 
                      onClick={() => setSelectedUseCase({ title: useCase, serviceTitle: service.title })}
                      style={{ flex: '1 1 200px', maxWidth: '300px', padding: '25px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', transition: 'transform 0.2s', ...{ ':hover': { transform: 'translateY(-5px)' } } as any }}
                    >
                      <span style={{ 
                        width: '40px', 
                        height: '40px', 
                        background: 'rgba(79, 70, 229, 0.1)', 
                        color: 'var(--accent)', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontSize: '1.2rem', 
                        fontWeight: '600', 
                        marginBottom: '15px' 
                      }}>
                        {ucIdx + 1}
                      </span>
                      <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Use Case</span>
                      <h4 style={{ color: '#fff', fontSize: '1rem', lineHeight: '1.5', fontWeight: '500', marginBottom: '15px' }}>{useCase}</h4>
                      <button style={{
                        marginTop: 'auto',
                        background: 'none',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: '#fff',
                        padding: '8px 16px',
                        borderRadius: '999px',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                      }}>
                        Click here to know more
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>
        ))}

        {/* CTA SECTION */}
        <section className="home-section" style={{ paddingBottom: '100px', paddingTop: '60px', background: 'transparent' }}>
          <div className="section-inner feature-card" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', padding: '60px 40px' }}>
            <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '15px', maxWidth: '100%', margin: '0 auto 15px auto' }}>Ready to Explore the Right Service?</h2>
            <p className="section-copy" style={{ marginBottom: '40px', fontSize: '1.1rem' }}>
              Our team of security experts is ready to help you find the perfect AI surveillance service for your needs.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <a href="/contact" className="btn btn-primary" style={{ padding: '0 32px' }}>Schedule a Consultation</a>
              <a href="/solutions" className="btn" style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '0 32px' }}>Learn About Our Solutions</a>
            </div>
          </div>
        </section>
      </main>

      {/* USE CASE MODAL */}
      {selectedUseCase && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.85)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          backdropFilter: 'blur(5px)'
        }} onClick={() => setSelectedUseCase(null)}>
          <div className="feature-card" style={{
            background: '#0f172a',
            width: '100%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '40px',
            position: 'relative'
          }} onClick={e => e.stopPropagation()}>
            <button style={{
              position: 'absolute', top: '20px', right: '20px',
              background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff',
              fontSize: '1.2rem', cursor: 'pointer',
              width: '40px', height: '40px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }} onClick={() => setSelectedUseCase(null)}>✕</button>
            
            <span style={{ fontSize: '0.85rem', color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', display: 'block' }}>
              {selectedUseCase.serviceTitle} - Use Case
            </span>
            <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '20px', lineHeight: '1.3' }}>{selectedUseCase.title}</h2>
            
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', marginBottom: '30px', fontSize: '1.1rem' }}>
              Detailed information and capabilities regarding <strong>{selectedUseCase.title.toLowerCase()}</strong> in standard operating environments. 
              This use case demonstrates how our AI infrastructure predicts anomalies, coordinates real-time responses, and maintains 
              uninterrupted safety protocols without human intervention.
            </p>

            <div style={{
              width: '100%',
              aspectRatio: '16/9',
              backgroundColor: 'rgba(0,0,0,0.5)',
              border: '2px dashed rgba(255,255,255,0.2)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '15px'
            }}>
              <span className="ui-marker ui-marker--xl" aria-hidden style={{ borderColor: 'rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.06)' }} />
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem' }}>Video Placeholder (Coming Soon)</span>
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
        
        <div className="section-inner" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '40px', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>© 2026 ZeexAI. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Terms of Service</a>
          </div>
        </div>
      </footer>
    </>
  );
}

