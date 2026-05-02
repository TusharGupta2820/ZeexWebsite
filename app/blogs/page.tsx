"use client";
import './blogs.css';

import React, { useState } from 'react';
import Link from 'next/link';

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Technology', 'Trends', 'Case Studies'];

  const articles = [
    {
      title: "AI Advancements in Modern Surveillance",
      date: "April 15, 2025",
      category: "Technology",
      excerpt: "Explore how artificial intelligence is revolutionizing surveillance systems and improving security outcomes.",
      link: "#"
    },
    {
      title: "Balancing Privacy with Security in AI Surveillance",
      date: "April 8, 2025",
      category: "Privacy",
      excerpt: "How modern AI-powered security systems protect privacy while enhancing safety measures.",
      link: "#"
    },
    {
      title: "5 Future Trends in AI Security for 2025",
      date: "April 1, 2025",
      category: "Trends",
      excerpt: "Discover emerging trends in AI security technology and how they will shape the future of surveillance.",
      link: "#"
    },
    {
      title: "Facial Recognition: Myths and Realities",
      date: "March 25, 2025",
      category: "Technology",
      excerpt: "Debunking common myths about facial recognition technology and explaining how it actually works.",
      link: "#"
    },
    {
      title: "Integrating AI Security into Your Smart Home",
      date: "March 18, 2025",
      category: "Residential",
      excerpt: "A comprehensive guide on how to enhance your smart home with AI security solutions.",
      link: "#"
    },
    {
      title: "Case Study: How ZeexAI Protected a Major Retail Chain",
      date: "March 10, 2025",
      category: "Case Study",
      excerpt: "An in-depth look at how our AI surveillance solutions reduced theft by 65% for a national retail company.",
      link: "#"
    }
  ];

  return (
    <>
      <main className="blogs-page">
        {/* HERO SECTION */}
        <section className="home-section" style={{ paddingTop: '160px', paddingBottom: '60px', textAlign: 'center' }}>
          <div className="section-inner" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span className="section-eyebrow">Latest Insights</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', marginBottom: '20px', maxWidth: '100%' }}>Blog & Insights</h1>
            <p className="section-copy" style={{ fontSize: '1.2rem' }}>
              Stay updated with the latest in AI security technology, industry trends, and expert perspectives from the ZeexAI team.
            </p>
          </div>
        </section>

        {/* ARTICLES CONTENT */}
        <section className="home-section" style={{ paddingBottom: '80px', background: 'transparent' }}>
          <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '40px', width: '100%' }}>
              <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '10px', textAlign: 'center', margin: '0 auto 10px auto', width: '100%' }}>Latest Articles</h2>
              <p className="section-copy" style={{ textAlign: 'center', margin: '0 auto', width: '100%' }}>Discover our latest insights and updates</p>
            </div>

            {/* Sub-Navigation Categories */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '50px', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '8px 24px', 
                    borderRadius: '999px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: activeCategory === cat ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Articles Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '30px', marginBottom: '60px' }}>
              {articles.map((article, idx) => (
                <div key={idx} className="feature-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>{article.date}</span>
                    <span style={{ 
                      fontSize: '0.8rem', 
                      background: 'rgba(79, 70, 229, 0.2)', 
                      color: '#a5b4fc', 
                      padding: '4px 12px', 
                      borderRadius: '999px' 
                    }}>
                      {article.category}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '15px', color: '#fff', lineHeight: '1.4' }}>
                    {article.title}
                  </h3>
                  <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', marginBottom: '25px', flexGrow: 1 }}>
                    {article.excerpt}
                  </p>
                  <a href={article.link} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a5b4fc', textDecoration: 'none', fontWeight: '500', transition: 'gap 0.2s' }}>
                    Read more <span>→</span>
                  </a>
                </div>
              ))}
            </div>

            {/* Pagination Placeholder */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
              <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>Previous</button>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--accent)', borderRadius: '50%', color: '#fff' }}>1</span>
                <span style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', color: '#fff', cursor: 'pointer' }}>2</span>
                <span style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', color: '#fff', cursor: 'pointer' }}>3</span>
              </div>
              <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>Next</button>
            </div>
          </div>
        </section>

        {/* NEWSLETTER SECTION */}
        <section className="home-section" style={{ paddingBottom: '100px' }}>
          <div className="section-inner feature-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '60px 40px' }}>
            <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '15px' }}>Stay in the Loop</h2>
            <p className="section-copy" style={{ marginBottom: '30px' }}>
              Sign up for our newsletter to get the latest AI security news, insights, and exclusive updates. No spam, ever.
            </p>
            <form style={{ display: 'flex', gap: '15px', maxWidth: '500px', margin: '0 auto' }} onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email" 
                style={{ 
                  flex: 1, 
                  padding: '14px 24px', 
                  borderRadius: '999px', 
                  border: '1px solid rgba(255,255,255,0.2)', 
                  background: 'rgba(0,0,0,0.3)', 
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none'
                }} 
              />
              <button className="btn btn-primary" type="submit" style={{ padding: '0 32px' }}>Subscribe</button>
            </form>
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

