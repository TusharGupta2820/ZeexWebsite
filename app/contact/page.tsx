"use client";
import './contact.css';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { question: "What AI safety solutions does Zeex AI offer?", answer: "Zeex AI offers advanced video analytics, real-time threat detection, and intelligent monitoring for retail, industrial, and public safety applications." },
    { question: "How can I integrate Zeex AI's surveillance technology?", answer: "Our solutions seamlessly integrate with your existing IP cameras and video management systems via our secure API and edge devices." },
    { question: "Does Zeex AI support cloud and on-premise deployment?", answer: "Yes, we offer flexible deployment options tailored to your specific privacy, compliance, and infrastructure needs." },
    { question: "Can Zeex AI solutions be customized for my needs?", answer: "Absolutely. Our team works closely with you to train and deploy models specific to your operating environment and risk profile." },
    { question: "What are the technical requirements for integration?", answer: "Most standard RTSP-enabled IP cameras are supported. For edge computing, specific hardware guidelines will be provided based on your camera feed volume." }
  ];

  return (
    <>
      <main className="contact-page">
        {/* HERO SECTION */}
        <section className="home-section" style={{ paddingTop: '160px', paddingBottom: '60px', textAlign: 'center' }}>
          <div className="section-inner" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span className="section-eyebrow">Contact Us</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', marginBottom: '20px', maxWidth: '100%' }}>Let's Connect</h1>
            <p className="section-copy" style={{ fontSize: '1.2rem' }}>
              Our team is ready to help you with any questions about our AI solutions.
            </p>
          </div>
        </section>

        {/* CONTACT FORM & INFO SECTION */}
        <section className="home-section" style={{ paddingBottom: '80px', background: 'transparent' }}>
          <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '40px', alignItems: 'start' }}>
            
            {/* Left Info Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div className="feature-card" style={{ padding: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                  <span style={{ fontSize: '1.5rem' }}>⏱️</span>
                  <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>Response Time</h3>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>Typically replies within 2 business hours</p>
              </div>

              <div className="feature-card" style={{ padding: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                  <span style={{ fontSize: '1.5rem' }}>💬</span>
                  <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>Pre-sales Questions?</h3>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>Contact our sales team at<br/><a href="mailto:admin@zeexai.com" style={{ color: '#a5b4fc', textDecoration: 'none' }}>admin@zeexai.com</a></p>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="feature-card" style={{ padding: '50px 40px' }}>
              <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '10px' }}>Send us a message</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '30px' }}>Fill out the form and our team will get back to you within 24 hours.</p>
              
              <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ color: '#fff', fontSize: '0.9rem', fontWeight: '500' }}>Full Name</label>
                  <input type="text" placeholder="Your name" style={{ padding: '14px 20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '1rem', outline: 'none' }} />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ color: '#fff', fontSize: '0.9rem', fontWeight: '500' }}>Email Address</label>
                  <input type="email" placeholder="your@email.com" style={{ padding: '14px 20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '1rem', outline: 'none' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ color: '#fff', fontSize: '0.9rem', fontWeight: '500' }}>Your Message</label>
                  <textarea placeholder="How can we help you?" rows={5} style={{ padding: '14px 20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '1rem', outline: 'none', resize: 'vertical' }}></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '10px', padding: '12px 32px' }}>Send Message</button>
              </form>
            </div>
          </div>
        </section>

        {/* QUICK CONTACT BLOCKS */}
        <section className="home-section" style={{ paddingBottom: '80px', background: 'transparent' }}>
          <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div className="feature-card" style={{ padding: '40px 30px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
              <span style={{ fontSize: '2.5rem', background: 'rgba(79, 70, 229, 0.1)', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>✉️</span>
              <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>Email Us</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>Get in touch via email for general inquiries</p>
              <a href="mailto:admin@zeexai.com" style={{ color: '#a5b4fc', fontSize: '1.1rem', fontWeight: '600', textDecoration: 'none', marginTop: 'auto' }}>admin@zeexai.com</a>
            </div>
            
            <div className="feature-card" style={{ padding: '40px 30px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
              <span style={{ fontSize: '2.5rem', background: 'rgba(79, 70, 229, 0.1)', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>📞</span>
              <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>Call Us</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>Speak directly with our support team</p>
              <a href="tel:+918709221636" style={{ color: '#a5b4fc', fontSize: '1.1rem', fontWeight: '600', textDecoration: 'none', marginTop: 'auto' }}>+91 8709221636</a>
            </div>
            
            <div className="feature-card" style={{ padding: '40px 30px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
              <span style={{ fontSize: '2.5rem', background: 'rgba(79, 70, 229, 0.1)', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>📍</span>
              <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>Visit Us</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>Schedule a visit to our headquarters</p>
              <span style={{ color: '#fff', fontSize: '1rem', fontWeight: '500', marginTop: 'auto' }}>Nirmaan, CFI, IIT Madras, Chennai, India 600036</span>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="home-section" style={{ paddingBottom: '80px', background: 'transparent' }}>
          <div className="section-inner" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Frequently Asked Questions</h2>
              <p className="section-copy">Find answers to common questions about our products and services</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {faqs.map((faq, index) => (
                <div key={index} className="feature-card" style={{ padding: '20px 30px', cursor: 'pointer' }} onClick={() => toggleFaq(index)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.1rem', color: '#fff', fontWeight: '500', margin: 0 }}>{faq.question}</h3>
                    <span style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.5)', transform: openFaq === index ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s ease' }}>+</span>
                  </div>
                  {openFaq === index && (
                    <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MAP/LOCATION SECTION */}
        <section className="home-section" style={{ paddingBottom: '100px', background: 'transparent' }}>
          <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Our Location</h2>
              <p className="section-copy">Visit our headquarters or connect with our global offices</p>
            </div>
            
            <div className="feature-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              {/* Map Placeholder */}
              <div style={{ height: '400px', background: 'rgba(0,0,0,0.5)', width: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '1.2rem' }}>Interactive Map View</span>
              </div>
              <div style={{ padding: '30px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '5px' }}>Zeex AI Workplace</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)' }}>Sudha & Shankar Innovation Hub, IIT Madras, Chennai</p>
                </div>
                <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="btn btn-primary">Get Directions</a>
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

