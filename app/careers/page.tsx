"use client";
import './careers.css';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface JobPosition {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  level: string;
  shortDesc: string;
  fullDescription: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  duration?: string;
  stipend?: string;
}

export default function CareersPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);

  const openModal = (job: JobPosition) => {
    setSelectedJob(job);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedJob(null);
    document.body.style.overflow = '';
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (modalOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [modalOpen]);

  // 3D Card Tilt Effect + Scroll Animations
  useEffect(() => {
    // 3D Tilt on career cards
    const careerCards = Array.from(document.querySelectorAll('.career-card'));
    careerCards.forEach((card) => {
      if (!card.querySelector('.card-glare')) {
        const glare = document.createElement('div');
        glare.className = 'card-glare';
        glare.style.cssText = 'position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:0;z-index:10;mix-blend-mode:overlay;';
        card.appendChild(glare);
      }
      card.addEventListener('mousemove', (e: Event) => {
        const evt = e as MouseEvent;
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = evt.clientX - rect.left;
        const y = evt.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        (card as HTMLElement).style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.03)`;
        const glare = card.querySelector('.card-glare') as HTMLElement;
        if (glare) {
          glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,229,255,0.2) 0%, transparent 60%)`;
          glare.style.opacity = '1';
        }
      });
      card.addEventListener('mouseleave', () => {
        (card as HTMLElement).style.transform = '';
        const glare = card.querySelector('.card-glare') as HTMLElement;
        if (glare) glare.style.opacity = '0';
      });
    });

    // Scroll reveal animations
    const revealElements = Array.from(document.querySelectorAll('.career-reveal'));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealElements.forEach(el => obs.observe(el));

    return () => obs.disconnect();
  }, []);
  const whyWorkWithUs = [
    { title: "Innovation First", desc: "Work on cutting-edge AI technologies and be part of groundbreaking innovations." },
    { title: "Global Impact", desc: "Your work will help businesses worldwide leverage the power of AI." },
    { title: "Great Team", desc: "Join a diverse team of experts who are passionate about technology and innovation." },
  ];

  const openPositions: JobPosition[] = [
    {
      id: 1,
      title: "Marketing Intern",
      department: "Marketing",
      location: "Remote / Chennai",
      type: "Internship",
      level: "Student / Fresher",
      shortDesc: "Assist in digital marketing campaigns, social media management, and brand outreach for Zeex AI.",
      fullDescription: "Join our marketing team to help build and execute digital marketing strategies for Zeex AI's AI-powered safety and surveillance solutions. You'll work on social media campaigns, content creation, brand awareness initiatives, and market research to drive engagement and growth.",
      responsibilities: [
        "Develop and manage social media content across platforms",
        "Assist in creating marketing collateral and promotional materials",
        "Conduct market research on AI and surveillance industry trends",
        "Support email marketing campaigns and newsletter creation",
        "Track and analyze marketing metrics and campaign performance",
        "Collaborate with design team on visual content",
      ],
      requirements: [
        "Currently pursuing or recently completed degree in Marketing, Communications, or related field",
        "Strong written and verbal communication skills",
        "Familiarity with social media platforms and marketing tools",
        "Basic understanding of digital marketing concepts",
        "Creative thinking and attention to detail",
        "Self-motivated with ability to work independently",
      ],
      benefits: [
        "Hands-on experience with real-world marketing campaigns",
        "Mentorship from industry professionals",
        "Certificate of internship upon completion",
        "Flexible working hours",
        "Potential for full-time opportunity",
      ],
      duration: "3-6 months",
      stipend: "₹10,000 - ₹15,000/month",
    },
    {
      id: 2,
      title: "Video Editing Intern",
      department: "Media",
      location: "Remote / Chennai",
      type: "Internship",
      level: "Student / Fresher",
      shortDesc: "Support the creation and editing of promotional, training, and product videos for Zeex AI.",
      fullDescription: "We're looking for a creative video editing intern to produce high-quality video content for Zeex AI. You'll work on product demos, training videos, promotional content, and social media videos that showcase our AI-powered solutions.",
      responsibilities: [
        "Edit and produce professional video content for various platforms",
        "Create product demonstration and tutorial videos",
        "Develop engaging social media video content",
        "Add motion graphics, transitions, and visual effects",
        "Collaborate with marketing team on video strategy",
        "Maintain organized video asset library",
      ],
      requirements: [
        "Proficiency in video editing software (Adobe Premiere Pro, Final Cut Pro, or DaVinci Resolve)",
        "Basic knowledge of motion graphics (After Effects preferred)",
        "Strong visual storytelling skills",
        "Understanding of video formats and optimization for different platforms",
        "Portfolio of previous video work",
        "Attention to detail and ability to meet deadlines",
      ],
      benefits: [
        "Build professional video production portfolio",
        "Work with cutting-edge AI technology content",
        "Flexible remote work options",
        "Certificate and recommendation letter",
        "Opportunity to work on diverse projects",
      ],
      duration: "3-6 months",
      stipend: "₹12,000 - ₹18,000/month",
    },
    {
      id: 3,
      title: "Computer Vision Intern",
      department: "Engineering",
      location: "Remote / Chennai",
      type: "Internship",
      level: "Student / Fresher",
      shortDesc: "Work on computer vision projects, data collection, and model evaluation for Zeex AI's products.",
      fullDescription: "Join our engineering team to work on cutting-edge computer vision applications for safety and surveillance. You'll contribute to developing AI models for object detection, tracking, and real-time video analytics that power Zeex AI's solutions.",
      responsibilities: [
        "Develop and train computer vision models for object detection and tracking",
        "Collect, annotate, and preprocess image/video datasets",
        "Evaluate model performance and optimize accuracy",
        "Implement real-time video processing pipelines",
        "Research and experiment with latest CV techniques",
        "Collaborate with team on model deployment",
      ],
      requirements: [
        "Currently pursuing or recently completed degree in Computer Science, AI/ML, or related field",
        "Strong programming skills in Python",
        "Experience with OpenCV, TensorFlow, or PyTorch",
        "Understanding of deep learning and neural networks",
        "Knowledge of object detection algorithms (YOLO, SSD, etc.)",
        "Strong problem-solving and analytical skills",
      ],
      benefits: [
        "Work on real-world AI applications",
        "Access to IIT Madras resources and mentorship",
        "Hands-on experience with production AI systems",
        "Certificate and potential full-time opportunity",
        "Exposure to industry-leading AI technologies",
      ],
      duration: "6 months",
      stipend: "₹15,000 - ₹25,000/month",
    },
    {
      id: 4,
      title: "Data Annotation/Analytics Intern",
      department: "Data",
      location: "Remote / Chennai",
      type: "Internship",
      level: "Student / Fresher",
      shortDesc: "Assist in annotating, cleaning, and analyzing data for AI model training and validation.",
      fullDescription: "Support our data science team in preparing high-quality datasets for AI model training. You'll work on data annotation, cleaning, quality assurance, and basic analytics to ensure our AI models are trained on accurate, reliable data.",
      responsibilities: [
        "Annotate and label image/video datasets for AI training",
        "Clean and preprocess raw data from multiple sources",
        "Perform quality checks on annotated data",
        "Conduct basic data analysis and visualization",
        "Maintain documentation of data processing workflows",
        "Collaborate with ML engineers on data requirements",
      ],
      requirements: [
        "Currently pursuing degree in Data Science, Statistics, or related field",
        "Attention to detail and accuracy",
        "Basic knowledge of Python and pandas",
        "Familiarity with data annotation tools",
        "Understanding of data quality principles",
        "Ability to work systematically and meet deadlines",
      ],
      benefits: [
        "Learn industry-standard data annotation practices",
        "Gain experience with AI/ML data pipelines",
        "Flexible working schedule",
        "Certificate upon completion",
        "Mentorship from data science professionals",
      ],
      duration: "3-6 months",
      stipend: "₹8,000 - ₹12,000/month",
    },
    {
      id: 5,
      title: "Business Development Intern",
      department: "Business",
      location: "Remote / Chennai",
      type: "Internship",
      level: "Student / Fresher",
      shortDesc: "Support the business team in lead generation, market research, and client outreach.",
      fullDescription: "Help drive Zeex AI's growth by identifying new business opportunities, conducting market research, and supporting client outreach efforts. You'll work closely with our business development team to expand our presence in the AI surveillance market.",
      responsibilities: [
        "Research and identify potential clients and partners",
        "Conduct market analysis on AI surveillance industry",
        "Assist in preparing sales presentations and proposals",
        "Support client outreach and follow-up activities",
        "Maintain CRM database and track leads",
        "Analyze competitor offerings and market trends",
      ],
      requirements: [
        "Currently pursuing or recently completed degree in Business, MBA, or related field",
        "Strong communication and interpersonal skills",
        "Analytical thinking and problem-solving abilities",
        "Proficiency in MS Office and CRM tools",
        "Self-motivated with entrepreneurial mindset",
        "Interest in AI and technology sector",
      ],
      benefits: [
        "Direct exposure to B2B sales and business strategy",
        "Networking opportunities with industry leaders",
        "Performance-based incentives",
        "Certificate and recommendation letter",
        "Potential conversion to full-time role",
      ],
      duration: "3-6 months",
      stipend: "₹10,000 - ₹15,000/month + incentives",
    },
    {
      id: 6,
      title: "AI Intern",
      department: "Engineering",
      location: "Remote / Chennai",
      type: "Internship",
      level: "Student / Fresher",
      shortDesc: "Contribute to AI model development, testing, and deployment for Zeex AI's core products.",
      fullDescription: "Work directly with our AI engineering team to develop, test, and deploy machine learning models for Zeex AI's safety and surveillance products. You'll gain hands-on experience with production AI systems and cutting-edge technologies.",
      responsibilities: [
        "Develop and train machine learning models for safety applications",
        "Implement AI algorithms for real-time video analytics",
        "Test and validate model performance on real-world data",
        "Optimize models for edge deployment",
        "Research and implement latest AI/ML techniques",
        "Collaborate on model integration with hardware systems",
      ],
      requirements: [
        "Currently pursuing or recently completed degree in Computer Science, AI/ML, or related field",
        "Strong programming skills in Python",
        "Experience with TensorFlow, PyTorch, or similar frameworks",
        "Understanding of machine learning algorithms and neural networks",
        "Knowledge of computer vision and video analytics",
        "Strong mathematical foundation in statistics and linear algebra",
      ],
      benefits: [
        "Work on production AI systems at scale",
        "Mentorship from experienced AI engineers",
        "Access to IIT Madras resources and network",
        "Certificate and strong recommendation",
        "High potential for full-time conversion",
      ],
      duration: "6 months",
      stipend: "₹20,000 - ₹30,000/month",
    },
    {
      id: 7,
      title: "Backend Intern",
      department: "Engineering",
      location: "Remote / Chennai",
      type: "Internship",
      level: "Student / Fresher",
      shortDesc: "Assist in building and maintaining scalable backend services and APIs for Zeex AI's platform.",
      fullDescription: "Join our backend engineering team to build robust, scalable services that power Zeex AI's platform. You'll work on API development, database design, cloud infrastructure, and system architecture.",
      responsibilities: [
        "Design and develop RESTful APIs and microservices",
        "Implement database schemas and optimize queries",
        "Build cloud-based infrastructure on AWS/GCP",
        "Write unit tests and ensure code quality",
        "Monitor and troubleshoot production systems",
        "Collaborate with frontend team on integration",
      ],
      requirements: [
        "Currently pursuing or recently completed degree in Computer Science or related field",
        "Proficiency in Python, Node.js, or Java",
        "Experience with databases (PostgreSQL, MongoDB)",
        "Understanding of REST APIs and microservices architecture",
        "Familiarity with cloud platforms (AWS, GCP, or Azure)",
        "Knowledge of version control (Git) and agile methodologies",
      ],
      benefits: [
        "Work on scalable production systems",
        "Learn industry best practices in backend development",
        "Flexible remote work options",
        "Certificate and mentorship",
        "Opportunity for full-time position",
      ],
      duration: "6 months",
      stipend: "₹15,000 - ₹25,000/month",
    },
    {
      id: 8,
      title: "Frontend Intern",
      department: "Engineering",
      location: "Remote / Chennai",
      type: "Internship",
      level: "Student / Fresher",
      shortDesc: "Work on user interface development using React and modern web technologies.",
      fullDescription: "Help build beautiful, responsive user interfaces for Zeex AI's web applications. You'll work with React, TypeScript, and modern frontend technologies to create intuitive dashboards and monitoring tools.",
      responsibilities: [
        "Develop responsive web applications using React and TypeScript",
        "Implement UI components and design systems",
        "Integrate frontend with backend APIs",
        "Optimize application performance and user experience",
        "Write clean, maintainable code with proper documentation",
        "Collaborate with designers on UI/UX implementation",
      ],
      requirements: [
        "Currently pursuing or recently completed degree in Computer Science or related field",
        "Strong proficiency in JavaScript/TypeScript and React",
        "Experience with HTML5, CSS3, and responsive design",
        "Understanding of state management (Redux, Context API)",
        "Familiarity with version control (Git)",
        "Eye for design and attention to detail",
      ],
      benefits: [
        "Work on modern frontend stack",
        "Build portfolio with real-world projects",
        "Flexible working hours",
        "Certificate and recommendation",
        "Learning opportunities from senior developers",
      ],
      duration: "3-6 months",
      stipend: "₹12,000 - ₹20,000/month",
    },
    {
      id: 9,
      title: "Full Stack Intern",
      department: "Engineering",
      location: "Remote / Chennai",
      type: "Internship",
      level: "Student / Fresher",
      shortDesc: "Gain hands-on experience in both frontend and backend development for Zeex AI's products.",
      fullDescription: "Get comprehensive experience across the entire technology stack. You'll work on both frontend interfaces and backend services, gaining valuable full-stack development skills while building real-world AI-powered applications.",
      responsibilities: [
        "Develop full-stack features from database to UI",
        "Build RESTful APIs and integrate with frontend",
        "Design and implement database schemas",
        "Create responsive user interfaces with React",
        "Deploy and maintain applications on cloud platforms",
        "Participate in code reviews and agile sprints",
      ],
      requirements: [
        "Currently pursuing or recently completed degree in Computer Science or related field",
        "Proficiency in JavaScript/TypeScript and React",
        "Experience with backend languages (Python, Node.js, or Java)",
        "Understanding of databases and API design",
        "Familiarity with cloud deployment",
        "Strong problem-solving skills and self-motivation",
      ],
      benefits: [
        "Comprehensive full-stack development experience",
        "Work on end-to-end feature development",
        "Mentorship from experienced engineers",
        "Certificate and strong portfolio building",
        "High potential for full-time conversion",
      ],
      duration: "6 months",
      stipend: "₹15,000 - ₹25,000/month",
    },
    {
      id: 10,
      title: "Cloud Engineering Intern",
      department: "Engineering",
      location: "Remote / Chennai",
      type: "Internship",
      level: "Student / Fresher",
      shortDesc: "Support the deployment and management of cloud infrastructure for Zeex AI's scalable solutions.",
      fullDescription: "Join our cloud engineering team to build and maintain scalable cloud infrastructure that powers Zeex AI's AI surveillance solutions. You'll work with AWS, containerization, CI/CD pipelines, and infrastructure automation.",
      responsibilities: [
        "Design and deploy cloud infrastructure on AWS/GCP",
        "Implement containerization with Docker and Kubernetes",
        "Set up CI/CD pipelines for automated deployments",
        "Monitor system performance and optimize costs",
        "Implement security best practices and compliance",
        "Automate infrastructure provisioning with Terraform",
      ],
      requirements: [
        "Currently pursuing or recently completed degree in Computer Science or related field",
        "Understanding of cloud platforms (AWS preferred)",
        "Familiarity with containerization (Docker, Kubernetes)",
        "Basic knowledge of Linux and networking",
        "Experience with scripting languages (Python, Bash)",
        "Understanding of DevOps principles and practices",
      ],
      benefits: [
        "Work with cutting-edge cloud technologies",
        "Hands-on experience with production infrastructure",
        "AWS/GCP certification support",
        "Flexible remote work",
        "Certificate and career growth opportunities",
      ],
      duration: "6 months",
      stipend: "₹18,000 - ₹28,000/month",
    },
  ];

  const benefits = [
    { title: "Campus Access", desc: "Get access to IIT Madras campus during working hours" },
    { title: "Professional Network", desc: "Build a strong network with industry leaders and peers" },
    { title: "Certificate", desc: "Receive a certificate of internship or employment" },
    { title: "Industry Skills", desc: "Gain hands-on experience with real-world projects and tools" },
    { title: "Cloud Tech", desc: "Work on software like AWS, GCP, and other industry platforms" },
    { title: "Career Growth", desc: "Clear career progression and mentorship" },
    { title: "Remote Work", desc: "Flexible work from anywhere policy" },
    { title: "Team Events", desc: "Regular team building and social events" },
  ];

  return (
    <>
      <main className="careers-page">
        
        {/* HERO SECTION */}
        <section className="home-section careers-hero-3d" style={{ paddingTop: '160px', paddingBottom: '60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          {/* Floating Particles */}
          <div className="careers-particles" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
            {[...Array(20)].map((_, i) => (
              <div key={i} className="career-particle" style={{
                position: 'absolute',
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                background: 'rgba(0, 229, 255, 0.6)',
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `floatParticle${i % 3} ${Math.random() * 10 + 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }} />
            ))}
          </div>
          
          <div className="section-inner" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2, perspective: '1000px' }}>
            <span className="section-eyebrow career-reveal" style={{ transform: 'translateZ(20px)' }}>Careers at Zeex AI</span>
            <h1 className="section-title career-reveal" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', marginBottom: '20px', maxWidth: '100%', textAlign: 'center', transform: 'translateZ(40px)', textShadow: '0 4px 30px rgba(0, 229, 255, 0.3)' }}>Join Our Team</h1>
            <p className="section-copy career-reveal" style={{ fontSize: '1.2rem', marginBottom: '30px', textAlign: 'center', transform: 'translateZ(30px)' }}>
              Build the future of AI with us. We're looking for passionate individuals who want to make a difference.
            </p>
            <a href="#open-positions" className="btn btn-primary career-reveal" style={{ padding: '0 32px', transform: 'translateZ(25px)', boxShadow: '0 8px 30px rgba(0, 229, 255, 0.3)' }}>Apply Now</a>
          </div>
        </section>

        {/* WHY WORK WITH US */}
        <section className="home-section" style={{ paddingBottom: '80px', background: 'transparent' }}>
          <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '40px', width: '100%' }}>
              <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '10px', textAlign: 'center', margin: '0 auto 20px auto', width: '100%' }}>Why Work With Us?</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              {whyWorkWithUs.map((item, idx) => (
                <div key={idx} className="feature-card career-why-card career-reveal" style={{ padding: '30px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', transition: 'all 0.6s cubic-bezier(0.2, 0.9, 0.2, 1)' }}>
                  <span className="ui-marker ui-marker--lg" aria-hidden />
                  <h3 style={{ fontSize: '1.3rem', color: '#fff', fontWeight: '600' }}>{item.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OPEN POSITIONS */}
        <section id="open-positions" className="home-section" style={{ paddingBottom: '80px', background: 'transparent' }}>
          <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '40px', width: '100%' }}>
              <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '10px', textAlign: 'center', margin: '0 auto 20px auto', width: '100%' }}>Open Positions</h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '30px' }}>
              {openPositions.map((job, idx) => (
                <div key={idx} className="feature-card career-card career-reveal" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '15px', cursor: 'pointer', transition: 'all 0.3s ease' }} onClick={() => openModal(job)}>
                  <h3 style={{ fontSize: '1.4rem', color: '#fff', fontWeight: '600' }}>{job.title}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '4px 12px', borderRadius: '999px' }}>
                      {job.department} • {job.location}
                    </span>
                    <span style={{ fontSize: '0.8rem', background: 'rgba(79, 70, 229, 0.2)', color: '#a5b4fc', padding: '4px 12px', borderRadius: '999px' }}>
                      {job.type}
                    </span>
                    <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', padding: '4px 12px', borderRadius: '999px' }}>
                      {job.level}
                    </span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', flexGrow: 1 }}>{job.shortDesc}</p>
                  <button className="btn" style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#fff', textAlign: 'center', marginTop: '10px', background: 'transparent', cursor: 'pointer', padding: '12px 24px', borderRadius: '8px', fontSize: '0.95rem', fontWeight: 600, transition: 'all 0.3s ease' }} onClick={(e) => { e.stopPropagation(); openModal(job); }}>
                    View Details & Apply
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS & PERKS */}
        <section className="home-section" style={{ paddingBottom: '100px', background: 'transparent' }}>
          <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '40px', width: '100%' }}>
              <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '10px', textAlign: 'center', margin: '0 auto 20px auto', width: '100%' }}>Benefits & Perks</h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px' }}>
              {benefits.map((perk, idx) => (
                <div key={idx} className="feature-card career-reveal" style={{ padding: '25px', display: 'flex', alignItems: 'flex-start', gap: '15px', transition: 'all 0.6s cubic-bezier(0.2, 0.9, 0.2, 1)' }}>
                  <span className="ui-marker ui-marker--md" aria-hidden />
                  <div>
                    <h3 style={{ fontSize: '1.1rem', color: '#fff', fontWeight: '600', marginBottom: '5px' }}>{perk.title}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: '1.5' }}>{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* JOB DETAIL MODAL */}
      {modalOpen && selectedJob && (
        <div className="career-modal-overlay" onClick={closeModal} style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'rgba(2, 10, 24, 0.9)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          overflow: 'auto',
        }}>
          <div className="career-modal" onClick={(e) => e.stopPropagation()} style={{
            position: 'relative',
            background: 'linear-gradient(180deg, #0a1e3a 0%, #061530 100%)',
            border: '1px solid rgba(0, 229, 255, 0.3)',
            borderRadius: '24px',
            maxWidth: '900px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            padding: '40px',
            boxShadow: '0 40px 100px rgba(0, 0, 0, 0.6), 0 0 60px rgba(0, 229, 255, 0.1)',
          }}>
            {/* Close Button */}
            <button onClick={closeModal} style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff',
              fontSize: '1.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
            }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
              ✕
            </button>

            {/* Modal Header */}
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '2.2rem', color: '#fff', marginBottom: '16px', paddingRight: '50px' }}>{selectedJob.title}</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
                <span style={{ fontSize: '0.9rem', background: 'rgba(0, 229, 255, 0.15)', color: '#00e5ff', padding: '6px 16px', borderRadius: '999px', fontWeight: 600 }}>
                  {selectedJob.department}
                </span>
                <span style={{ fontSize: '0.9rem', background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '6px 16px', borderRadius: '999px' }}>
                  {selectedJob.location}
                </span>
                <span style={{ fontSize: '0.9rem', background: 'rgba(79, 70, 229, 0.2)', color: '#a5b4fc', padding: '6px 16px', borderRadius: '999px', fontWeight: 600 }}>
                  {selectedJob.type}
                </span>
                <span style={{ fontSize: '0.9rem', background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', padding: '6px 16px', borderRadius: '999px' }}>
                  {selectedJob.level}
                </span>
              </div>
              {selectedJob.duration && (
                <p style={{ color: 'rgba(255,255,255,0.7)', margin: '8px 0', fontSize: '1rem' }}>
                  <strong style={{ color: '#00e5ff' }}>Duration:</strong> {selectedJob.duration}
                </p>
              )}
            </div>

            {/* Full Description */}
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '1.4rem', color: '#00e5ff', marginBottom: '12px' }}>About This Role</h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: '1.8', fontSize: '1.05rem' }}>{selectedJob.fullDescription}</p>
            </div>

            {/* Responsibilities */}
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '1.4rem', color: '#00e5ff', marginBottom: '12px' }}>Key Responsibilities</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {selectedJob.responsibilities.map((resp, idx) => (
                  <li key={idx} style={{ color: 'rgba(255,255,255,0.85)', lineHeight: '1.8', fontSize: '1rem', padding: '8px 0', paddingLeft: '24px', position: 'relative' }}>
                    <span className="ui-bullet" style={{ position: 'absolute', left: 0, top: '0.5em' }} aria-hidden />
                    {resp}
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '1.4rem', color: '#00e5ff', marginBottom: '12px' }}>Requirements</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {selectedJob.requirements.map((req, idx) => (
                  <li key={idx} style={{ color: 'rgba(255,255,255,0.85)', lineHeight: '1.8', fontSize: '1rem', padding: '8px 0', paddingLeft: '24px', position: 'relative' }}>
                    <span className="ui-bullet" style={{ position: 'absolute', left: 0, top: '0.5em' }} aria-hidden />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '1.4rem', color: '#00e5ff', marginBottom: '12px' }}>What You'll Get</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {selectedJob.benefits.map((benefit, idx) => (
                  <li key={idx} style={{ color: 'rgba(255,255,255,0.85)', lineHeight: '1.8', fontSize: '1rem', padding: '8px 0', paddingLeft: '24px', position: 'relative' }}>
                    <span className="ui-bullet" style={{ position: 'absolute', left: 0, top: '0.5em' }} aria-hidden />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Apply Button */}
            <div style={{ textAlign: 'center', paddingTop: '20px', borderTop: '1px solid rgba(0, 229, 255, 0.2)' }}>
              <a href={`mailto:admin@zeexai.com?subject=Application for ${selectedJob.title}&body=Hi Zeex AI Team,%0A%0AI am interested in applying for the ${selectedJob.title} position.%0A%0APlease find my details below:%0A%0AName:%0AEmail:%0APhone:%0AResume (attach):%0A%0AThank you!`} 
                 style={{
                   display: 'inline-block',
                   padding: '16px 48px',
                   background: 'linear-gradient(135deg, #00e5ff 0%, #4a90e8 100%)',
                   color: '#061530',
                   borderRadius: '12px',
                   fontSize: '1.1rem',
                   fontWeight: 700,
                   textDecoration: 'none',
                   transition: 'all 0.3s ease',
                   boxShadow: '0 8px 30px rgba(0, 229, 255, 0.3)',
                 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.transform = 'translateY(-2px)';
                   e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 229, 255, 0.4)';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.transform = 'translateY(0)';
                   e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 229, 255, 0.3)';
                 }}>
                Apply for this Position
              </a>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginTop: '16px' }}>
                Or email your resume to: <a href="mailto:admin@zeexai.com" style={{ color: '#00e5ff', textDecoration: 'none' }}>admin@zeexai.com</a>
              </p>
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

