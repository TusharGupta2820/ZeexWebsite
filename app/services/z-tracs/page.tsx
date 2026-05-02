"use client";

import React from 'react';
import Link from 'next/link';

export default function ZTracsPage() {
  return (
    <>
      <main className="service-page ztracs-page">
        {/* HERO SECTION */}
        <section className="ztracs-hero" style={{ paddingTop: '160px', paddingBottom: '80px', textAlign: 'center', minHeight: '60vh', background: 'linear-gradient(135deg, #0a1e3a 0%, #061530 100%)' }}>
          <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
            <h1 style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', marginBottom: '20px', background: 'linear-gradient(135deg, #ffffff 0%, #00e5ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Z-Tracs
            </h1>
            <p style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.9)', marginBottom: '32px', maxWidth: '800px', margin: '0 auto 32px' }}>
              AI-Driven Dynamic Traffic Intelligence for Emergency Response & Smart City Management
            </p>
            <Link className="btn btn-primary" href="/services">Back to Services</Link>
          </div>
        </section>

        {/* THE PROBLEM SECTION */}
        <section style={{ padding: '80px 24px', background: '#061530' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '40px', textAlign: 'center' }}>
              The Problem with Traditional Traffic Systems
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
              <div style={{ padding: '24px', background: 'rgba(0, 229, 255, 0.05)', border: '1px solid rgba(0, 229, 255, 0.2)', borderRadius: '12px' }}>
                <p style={{ color: '#fff', fontSize: '1.1rem', margin: 0 }}>• Fixed-timer traffic signals</p>
              </div>
              <div style={{ padding: '24px', background: 'rgba(0, 229, 255, 0.05)', border: '1px solid rgba(0, 229, 255, 0.2)', borderRadius: '12px' }}>
                <p style={{ color: '#fff', fontSize: '1.1rem', margin: 0 }}>• No dynamic green corridor for emergency vehicles</p>
              </div>
              <div style={{ padding: '24px', background: 'rgba(0, 229, 255, 0.05)', border: '1px solid rgba(0, 229, 255, 0.2)', borderRadius: '12px' }}>
                <p style={{ color: '#fff', fontSize: '1.1rem', margin: 0 }}>• Delayed response in critical situations</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', border: '2px solid rgba(0, 229, 255, 0.3)' }}>
                <img src="/assets/input1.png" alt="Outdated Traffic Control" style={{ width: '100%', height: 'auto', display: 'block' }} />
                <div style={{ padding: '16px', background: 'rgba(0,0,0,0.7)' }}>
                  <p style={{ color: '#fff', margin: 0, fontSize: '0.95rem' }}>Outdated & Non-Adaptive Traffic Control</p>
                </div>
              </div>
              <div style={{ borderRadius: '12px', overflow: 'hidden', border: '2px solid rgba(0, 229, 255, 0.3)' }}>
                <img src="/assets/input2.png" alt="No Real-Time Coordination" style={{ width: '100%', height: 'auto', display: 'block' }} />
                <div style={{ padding: '16px', background: 'rgba(0,0,0,0.7)' }}>
                  <p style={{ color: '#fff', margin: 0, fontSize: '0.95rem' }}>No Real-Time Coordination: CCTV, traffic signals, transport data & emergency system</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THE ZTRACS SOLUTION */}
        <section style={{ padding: '80px 24px', background: 'linear-gradient(180deg, #061530 0%, #0a1e3a 100%)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '40px', textAlign: 'center' }}>
              The ZTracs Solution
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
              <div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ padding: '16px 0', borderBottom: '1px solid rgba(0, 229, 255, 0.2)', color: '#fff', fontSize: '1.1rem' }}>
                    <strong style={{ color: '#00e5ff' }}>ZTracs enables</strong> AI-driven dynamic traffic intelligence for emergency response.
                  </li>
                  <li style={{ padding: '16px 0', color: '#fff', fontSize: '1.1rem' }}>
                    Ensuring faster, safer passage for emergency vehicles through real-time intelligence.
                  </li>
                </ul>
              </div>
              <div style={{ borderRadius: '12px', overflow: 'hidden', border: '2px solid rgba(0, 229, 255, 0.3)' }}>
                <img src="/assets/input3.png" alt="ZTracs Solution" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </div>
          </div>
        </section>

        {/* WHAT Z-TRACS DELIVERS */}
        <section style={{ padding: '80px 24px', background: '#0a1e3a' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '50px', textAlign: 'center' }}>
              What Z-Tracs Delivers
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
              <div style={{ padding: '30px', background: 'rgba(0, 229, 255, 0.05)', border: '1px solid rgba(0, 229, 255, 0.2)', borderRadius: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🕐</div>
                <h3 style={{ color: '#00e5ff', fontSize: '1.3rem', marginBottom: '12px' }}>Real-time AI-driven traffic intelligence</h3>
              </div>
              <div style={{ padding: '30px', background: 'rgba(0, 229, 255, 0.05)', border: '1px solid rgba(0, 229, 255, 0.2)', borderRadius: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🚑</div>
                <h3 style={{ color: '#00e5ff', fontSize: '1.3rem', marginBottom: '12px' }}>Priority movement for emergency vehicles</h3>
              </div>
              <div style={{ padding: '30px', background: 'rgba(0, 229, 255, 0.05)', border: '1px solid rgba(0, 229, 255, 0.2)', borderRadius: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🚦</div>
                <h3 style={{ color: '#00e5ff', fontSize: '1.3rem', marginBottom: '12px' }}>Adaptive signal control based on live data</h3>
              </div>
              <div style={{ padding: '30px', background: 'rgba(0, 229, 255, 0.05)', border: '1px solid rgba(0, 229, 255, 0.2)', borderRadius: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📊</div>
                <h3 style={{ color: '#00e5ff', fontSize: '1.3rem', marginBottom: '12px' }}>Centralised monitoring and alerts</h3>
              </div>
            </div>
          </div>
        </section>

        {/* 3-LAYER INTELLIGENT ARCHITECTURE */}
        <section style={{ padding: '80px 24px', background: 'linear-gradient(180deg, #0a1e3a 0%, #061530 100%)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '50px', textAlign: 'center' }}>
              Z-Tracs: 3-Layer Intelligent Architecture
            </h2>
            <div style={{ display: 'grid', gap: '40px' }}>
              {/* Layer 1 */}
              <div style={{ padding: '40px', background: 'rgba(0, 229, 255, 0.08)', border: '2px solid rgba(0, 229, 255, 0.3)', borderRadius: '20px' }}>
                <div style={{ display: 'inline-block', padding: '8px 20px', background: '#00e5ff', color: '#061530', borderRadius: '999px', fontWeight: 700, marginBottom: '20px', fontSize: '1.2rem' }}>1</div>
                <h3 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '16px' }}>Developing Multi-AI / ML Models</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0' }}>
                  <li style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', padding: '8px 0' }}>• Purpose-built AI models for safety & management</li>
                  <li style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', padding: '8px 0' }}>• Runs directly on organisational data</li>
                </ul>
                <div style={{ padding: '20px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', textAlign: 'center' }}>
                  <p style={{ color: '#00e5ff', margin: 0, fontSize: '1rem' }}>RAW DATA → AI/ML MODELS → SAFETY MANAGEMENT</p>
                </div>
              </div>

              {/* Layer 2 */}
              <div style={{ padding: '40px', background: 'rgba(0, 229, 255, 0.08)', border: '2px solid rgba(0, 229, 255, 0.3)', borderRadius: '20px' }}>
                <div style={{ display: 'inline-block', padding: '8px 20px', background: '#00e5ff', color: '#061530', borderRadius: '999px', fontWeight: 700, marginBottom: '20px', fontSize: '1.2rem' }}>2</div>
                <h3 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '16px' }}>On-Premise AI Hardware (Edge)</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0' }}>
                  <li style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', padding: '8px 0' }}>• GPU-based hardware with AI & ML models</li>
                  <li style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', padding: '8px 0' }}>• Processes data on-site</li>
                  <li style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', padding: '8px 0' }}>• Low latency, high reliability, reduced cloud dependency</li>
                  <li style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', padding: '8px 0' }}>• Operating temperature range: -4°C to 40°C</li>
                </ul>
                <div style={{ textAlign: 'center' }}>
                  <img src="/assets/input1.png" alt="Edge Hardware" style={{ maxWidth: '300px', width: '100%', borderRadius: '12px' }} />
                </div>
              </div>

              {/* Layer 3 */}
              <div style={{ padding: '40px', background: 'rgba(0, 229, 255, 0.08)', border: '2px solid rgba(0, 229, 255, 0.3)', borderRadius: '20px' }}>
                <div style={{ display: 'inline-block', padding: '8px 20px', background: '#00e5ff', color: '#061530', borderRadius: '999px', fontWeight: 700, marginBottom: '20px', fontSize: '1.2rem' }}>3</div>
                <h3 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '16px' }}>Unified Multi-Software Platform</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', padding: '8px 0' }}>• Centralised dashboards</li>
                  <li style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', padding: '8px 0' }}>• AI model control & customisation</li>
                  <li style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', padding: '8px 0' }}>• Alerts, analytics & predictive intelligence</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ padding: '80px 24px', background: '#061530' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '50px', textAlign: 'center' }}>
              How It Works
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
              <div>
                <div style={{ marginBottom: '30px' }}>
                  <div style={{ display: 'inline-block', padding: '6px 16px', background: '#00e5ff', color: '#061530', borderRadius: '999px', fontWeight: 700, marginRight: '12px' }}>1</div>
                  <span style={{ color: '#fff', fontSize: '1.2rem' }}>Connect existing cameras AI</span>
                </div>
                <div style={{ marginBottom: '30px' }}>
                  <div style={{ display: 'inline-block', padding: '6px 16px', background: '#00e5ff', color: '#061530', borderRadius: '999px', fontWeight: 700, marginRight: '12px' }}>2</div>
                  <span style={{ color: '#fff', fontSize: '1.2rem' }}>Analyzes video in real time</span>
                </div>
                <div style={{ marginBottom: '30px' }}>
                  <div style={{ display: 'inline-block', padding: '6px 16px', background: '#00e5ff', color: '#061530', borderRadius: '999px', fontWeight: 700, marginRight: '12px' }}>3</div>
                  <span style={{ color: '#fff', fontSize: '1.2rem' }}>Alerts & Insights delivered instantly</span>
                </div>
                <div style={{ marginTop: '40px', padding: '24px', background: 'rgba(0, 229, 255, 0.1)', border: '1px solid rgba(0, 229, 255, 0.3)', borderRadius: '12px' }}>
                  <p style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 600, margin: 0 }}>No hardware replacement</p>
                  <p style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 600, margin: '8px 0 0 0' }}>No operational disruption</p>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '300px', height: '300px', margin: '0 auto', borderRadius: '50%', background: 'conic-gradient(#00e5ff 0deg 120deg, #4a90e8 120deg 240deg, #00e5ff 240deg 360deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ width: '200px', height: '200px', borderRadius: '50%', background: '#061530', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
                    <p style={{ color: '#fff', margin: 0, fontSize: '1rem' }}>AI Analyzes Video in Real Time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHERE ZEEX AI IS USED */}
        <section style={{ padding: '80px 24px', background: 'linear-gradient(180deg, #061530 0%, #0a1e3a 100%)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '50px', textAlign: 'center' }}>
              Where Zeex AI Is Used
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
              <div style={{ borderRadius: '16px', overflow: 'hidden', border: '2px solid rgba(0, 229, 255, 0.3)' }}>
                <img src="/assets/input1.png" alt="Smart Cities" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: '20px', background: 'rgba(0, 229, 255, 0.05)' }}>
                  <h3 style={{ color: '#00e5ff', margin: '0 0 8px 0', fontSize: '1.2rem' }}>Smart Cities & Traffic Management</h3>
                </div>
              </div>
              <div style={{ borderRadius: '16px', overflow: 'hidden', border: '2px solid rgba(0, 229, 255, 0.3)' }}>
                <img src="/assets/input2.png" alt="Industrial Safety" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: '20px', background: 'rgba(0, 229, 255, 0.05)' }}>
                  <h3 style={{ color: '#00e5ff', margin: '0 0 8px 0', fontSize: '1.2rem' }}>Industrial Safety & Smart Factories</h3>
                </div>
              </div>
              <div style={{ borderRadius: '16px', overflow: 'hidden', border: '2px solid rgba(0, 229, 255, 0.3)' }}>
                <img src="/assets/input3.png" alt="Retail" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: '20px', background: 'rgba(0, 229, 255, 0.05)' }}>
                  <h3 style={{ color: '#00e5ff', margin: '0 0 8px 0', fontSize: '1.2rem' }}>Retail, Warehouses & High Risk Shops</h3>
                </div>
              </div>
              <div style={{ borderRadius: '16px', overflow: 'hidden', border: '2px solid rgba(0, 229, 255, 0.3)' }}>
                <img src="/assets/input1.png" alt="Banks" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: '20px', background: 'rgba(0, 229, 255, 0.05)' }}>
                  <h3 style={{ color: '#00e5ff', margin: '0 0 8px 0', fontSize: '1.2rem' }}>Banks, ATMs, & Financial Institutions</h3>
                </div>
              </div>
              <div style={{ borderRadius: '16px', overflow: 'hidden', border: '2px solid rgba(0, 229, 255, 0.3)', gridColumn: 'span 2' }}>
                <img src="/assets/input2.png" alt="Campuses" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: '20px', background: 'rgba(0, 229, 255, 0.05)' }}>
                  <h3 style={{ color: '#00e5ff', margin: '0 0 8px 0', fontSize: '1.2rem' }}>Campuses & Enterprise Infrastructure</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MEASURABLE ROI */}
        <section style={{ padding: '80px 24px', background: '#0a1e3a' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '20px', textAlign: 'center' }}>
              Measurable ROI with Zeex AI
            </h2>
            <p style={{ fontSize: '1.3rem', color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: '50px' }}>
              From surveillance to intelligence that delivers real business impact.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
              <div style={{ padding: '30px', background: 'rgba(0, 229, 255, 0.05)', border: '1px solid rgba(0, 229, 255, 0.2)', borderRadius: '16px' }}>
                <h3 style={{ color: '#00e5ff', fontSize: '1.5rem', marginBottom: '16px' }}>1. Reduced Incidents. Lower Losses.</h3>
                <img src="/assets/input1.png" alt="Live CCTV Monitoring" style={{ width: '100%', borderRadius: '12px', marginBottom: '16px' }} />
              </div>
              <div style={{ padding: '30px', background: 'rgba(0, 229, 255, 0.05)', border: '1px solid rgba(0, 229, 255, 0.2)', borderRadius: '16px' }}>
                <h3 style={{ color: '#00e5ff', fontSize: '1.5rem', marginBottom: '16px' }}>2. Smarter Operations. Better Efficiency.</h3>
                <img src="/assets/input2.png" alt="Centralized Alert Dashboard" style={{ width: '100%', borderRadius: '12px', marginBottom: '16px' }} />
              </div>
              <div style={{ padding: '30px', background: 'rgba(0, 229, 255, 0.05)', border: '1px solid rgba(0, 229, 255, 0.2)', borderRadius: '16px', gridColumn: 'span 2' }}>
                <h3 style={{ color: '#00e5ff', fontSize: '1.5rem', marginBottom: '16px' }}>3. Insights That Drive Business Decisions.</h3>
                <img src="/assets/input3.png" alt="Analytics Dashboard" style={{ width: '100%', borderRadius: '12px' }} />
              </div>
            </div>
          </div>
        </section>

        {/* THE IMPACT */}
        <section style={{ padding: '80px 24px', background: 'linear-gradient(180deg, #0a1e3a 0%, #061530 100%)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '50px', textAlign: 'center' }}>
              The Impact
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
              <div style={{ padding: '30px', background: 'rgba(0, 229, 255, 0.08)', border: '2px solid rgba(0, 229, 255, 0.3)', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#00e5ff', flexShrink: 0 }}></div>
                <p style={{ color: '#fff', fontSize: '1.2rem', margin: 0 }}>Faster incident response</p>
              </div>
              <div style={{ padding: '30px', background: 'rgba(0, 229, 255, 0.08)', border: '2px solid rgba(0, 229, 255, 0.3)', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#00e5ff', flexShrink: 0 }}></div>
                <p style={{ color: '#fff', fontSize: '1.2rem', margin: 0 }}>Reduced risks and losses</p>
              </div>
              <div style={{ padding: '30px', background: 'rgba(0, 229, 255, 0.08)', border: '2px solid rgba(0, 229, 255, 0.3)', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#00e5ff', flexShrink: 0 }}></div>
                <p style={{ color: '#fff', fontSize: '1.2rem', margin: 0 }}>Improved safety and compliance</p>
              </div>
              <div style={{ padding: '30px', background: 'rgba(0, 229, 255, 0.08)', border: '2px solid rgba(0, 229, 255, 0.3)', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#00e5ff', flexShrink: 0 }}></div>
                <p style={{ color: '#fff', fontSize: '1.2rem', margin: 0 }}>Smarter, data-driven decisions</p>
              </div>
            </div>
          </div>
        </section>

        {/* CONNECT WITH ZEEX AI */}
        <section style={{ padding: '80px 24px', background: '#061530' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '40px' }}>
              Connect with Zeex AI
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ marginBottom: '30px' }}>
                  <img src="/assets/input1.png" alt="QR Code" style={{ width: '200px', height: '200px', borderRadius: '12px', marginBottom: '16px' }} />
                  <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>Scan to explore ZTracs</p>
                </div>
                <div style={{ color: '#fff' }}>
                  <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}><strong>Zeex AI</strong></p>
                  <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '4px' }}>SSIH, CFI, Nirmaan IIT Madras</p>
                  <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '4px' }}>Campus Chennai – 600036</p>
                  <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '4px' }}>Email: admin@zeexai.com</p>
                  <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)' }}>Phone: +91 87092 21636 | +91 80804 16016</p>
                </div>
              </div>
              <div>
                <h3 style={{ color: '#00e5ff', fontSize: '1.5rem', marginBottom: '24px' }}>Backed By / Supported By</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                  <div style={{ padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', textAlign: 'center' }}>
                    <p style={{ color: '#fff', margin: 0, fontSize: '0.9rem' }}>IIT Madras</p>
                  </div>
                  <div style={{ padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', textAlign: 'center' }}>
                    <p style={{ color: '#fff', margin: 0, fontSize: '0.9rem' }}>NVIDIA</p>
                  </div>
                  <div style={{ padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', textAlign: 'center' }}>
                    <p style={{ color: '#fff', margin: 0, fontSize: '0.9rem' }}>AWS Startups</p>
                  </div>
                  <div style={{ padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', textAlign: 'center' }}>
                    <p style={{ color: '#fff', margin: 0, fontSize: '0.9rem' }}>AI Impact Summit</p>
                  </div>
                  <div style={{ padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', textAlign: 'center' }}>
                    <p style={{ color: '#fff', margin: 0, fontSize: '0.9rem' }}>NIRMAAN</p>
                  </div>
                  <div style={{ padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', textAlign: 'center' }}>
                    <p style={{ color: '#fff', margin: 0, fontSize: '0.9rem' }}>INDIAai</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
