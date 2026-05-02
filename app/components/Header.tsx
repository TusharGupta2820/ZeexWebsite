'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type Props = {
  onNavigate?: (route: string) => void;
};

export default function Header({ onNavigate }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (route: string) => {
    setMobileMenuOpen(false);
    onNavigate?.(route);
  };

  return (
    <header className="landing-header">
      <div className="landing-logo">
        <img src="/assets/Zeex-AI logo .png" alt="Zeex AI logo" />
        <span className="brand-mark">ZeexAI</span>
      </div>

      {/* Mobile menu toggle */}
      <button 
        className="mobile-menu-toggle" 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      <nav className={`landing-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <Link href="/home" onClick={() => handleNavClick('home')}>Home</Link>
        <Link href="/about" onClick={() => handleNavClick('about')}>About</Link>
        <Link href="/solutions" onClick={() => handleNavClick('solutions')}>Solutions</Link>
        
        {/* Services Dropdown */}
        <div className="nav-dropdown-container">
          <Link href="/services" className="nav-dropdown-trigger" onClick={() => handleNavClick('services')}>Services <span className="dropdown-arrow"></span></Link>
          <div className="nav-dropdown-menu">
            <div className="dropdown-grid">
              <Link href="/services/z-tracs" className="dropdown-item" onClick={() => handleNavClick('services')}>
                <span className="dropdown-icon" aria-hidden />
                <div className="dropdown-text">
                  <span className="dropdown-title">Z-tracs</span>
                  <span className="dropdown-desc">Tracking & Monitoring</span>
                </div>
              </Link>
              <Link href="/services/z-factory" className="dropdown-item" onClick={() => handleNavClick('services')}>
                <span className="dropdown-icon" aria-hidden />
                <div className="dropdown-text">
                  <span className="dropdown-title">Z-factory</span>
                  <span className="dropdown-desc">Smart Manufacturing</span>
                </div>
              </Link>
              <Link href="/services/z-market" className="dropdown-item" onClick={() => handleNavClick('services')}>
                <span className="dropdown-icon" aria-hidden />
                <div className="dropdown-text">
                  <span className="dropdown-title">Z-Market</span>
                  <span className="dropdown-desc">Retail & Wholesale</span>
                </div>
              </Link>
              <Link href="/services/z-support" className="dropdown-item" onClick={() => handleNavClick('services')}>
                <span className="dropdown-icon" aria-hidden />
                <div className="dropdown-text">
                  <span className="dropdown-title">Z-support</span>
                  <span className="dropdown-desc">Customer Assistance</span>
                </div>
              </Link>
              <Link href="/services/z-audit" className="dropdown-item" onClick={() => handleNavClick('services')}>
                <span className="dropdown-icon" aria-hidden />
                <div className="dropdown-text">
                  <span className="dropdown-title">Z-audit</span>
                  <span className="dropdown-desc">Compliance & Review</span>
                </div>
              </Link>
              <Link href="/services/z-drone" className="dropdown-item" onClick={() => handleNavClick('services')}>
                <span className="dropdown-icon" aria-hidden />
                <div className="dropdown-text">
                  <span className="dropdown-title">Z-Drone</span>
                  <span className="dropdown-desc">Aerial Surveillance</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <Link href="/achievements" onClick={() => handleNavClick('achievements')}>Achievements</Link>
        <Link href="/blogs" onClick={() => handleNavClick('blogs')}>Blogs</Link>
        <Link href="/contact" onClick={() => handleNavClick('contact')}>Contact</Link>
        <Link href="/careers" onClick={() => handleNavClick('careers')}>Careers</Link>
      </nav>
      <Link className="btn-nav" href="/home#get-demo" onClick={() => handleNavClick('home')}>Get Demo</Link>
    </header>
  );
}
