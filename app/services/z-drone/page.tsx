"use client";

import React from 'react';
import Link from 'next/link';

export default function ZDronePage() {
  return (
    <>
      <main className="service-page">
        {/* HERO SECTION */}
        <section className="home-section" style={{ paddingTop: '160px', paddingBottom: '80px', textAlign: 'center', minHeight: '60vh' }}>
          <div className="section-inner" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span className="section-eyebrow">Service</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', marginBottom: '20px' }}>Z-Drone</h1>
            <p className="section-copy" style={{ fontSize: '1.2rem', marginBottom: '32px' }}>
              Next-generation aerial surveillance and intelligent drone fleet safety monitoring.
            </p>
            <Link className="btn btn-primary" href="/home">Back to Home</Link>
          </div>
        </section>
      </main>
    </>
  );
}