import React from 'react';
import { Code2, Megaphone, Cpu, Smartphone } from 'lucide-react';
import MagneticCard from './motion/MagneticCard';
import ScrollReveal from './motion/ScrollReveal';

const services = [
  {
    icon: <Code2 size={26} />,
    title: 'Web Development',
    desc: 'Custom high-performance websites built with React, Node.js, and the full MERN stack. Java-powered backends, blazing-fast frontends.',
    color: '#00d4ff',
    glow: 'rgba(0,212,255,0.12)',
    border: 'rgba(0,212,255,0.25)',
    tag: 'React · Node.js · MERN',
  },
  {
    icon: <Megaphone size={26} />,
    title: 'Digital Marketing',
    desc: 'Meta Ads, Facebook Page growth, and comprehensive digital strategies to boost your online presence and ROI.',
    color: '#ff006e',
    glow: 'rgba(255,0,110,0.12)',
    border: 'rgba(255,0,110,0.25)',
    tag: 'Meta Ads · Facebook · Growth',
  },
  {
    icon: <Smartphone size={26} />,
    title: 'Mobile Applications',
    desc: 'Performance-driven cross-platform mobile apps built with Flutter for both iOS and Android — concept to App Store.',
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.12)',
    border: 'rgba(168,85,247,0.25)',
    tag: 'Flutter · Dart · Firebase',
  },
  {
    icon: <Cpu size={26} />,
    title: 'Social Media Management',
    desc: 'Building and managing your brand presence across all major social media platforms with data-driven content strategies.',
    color: '#06ffa5',
    glow: 'rgba(6,255,165,0.12)',
    border: 'rgba(6,255,165,0.25)',
    tag: 'Instagram · TikTok · Strategy',
  },
];

function ServiceCard({ service }) {
  return (
    <MagneticCard
      glowColor={service.color}
      data-cursor-color={service.color}
      tiltStrength={15}
      scaleHover={1.03}
      zDepth={25}
      style={{ height: '100%' }}
    >
      <div
        style={{
          background: 'rgba(5,5,20,0.75)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${service.border}`,
          borderRadius: '22px',
          padding: '32px 28px',
          position: 'relative',
          overflow: 'hidden',
          transformStyle: 'preserve-3d',
          transition: 'box-shadow 0.4s ease, border-color 0.3s ease',
          height: '100%',
        }}
        className="service-card-3d"
      >
        {/* Scan line */}
        <div className="scan-line" style={{ '--sc': service.color }} />

        {/* BG glow */}
        <div style={{
          position: 'absolute', top: '-25%', right: '-15%',
          width: '160px', height: '160px',
          background: `radial-gradient(circle, ${service.glow} 0%, transparent 70%)`,
          borderRadius: '50%', pointerEvents: 'none',
        }} />

        {/* Corner accents */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: '50px', height: '50px',
          borderTop: `2px solid ${service.color}`,
          borderRight: `2px solid ${service.color}`,
          borderRadius: '0 22px 0 0', opacity: 0.45,
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          width: '36px', height: '36px',
          borderBottom: `2px solid ${service.color}`,
          borderLeft: `2px solid ${service.color}`,
          borderRadius: '0 0 0 22px', opacity: 0.25,
        }} />

        {/* Icon */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '52px', height: '52px', borderRadius: '14px',
          background: service.glow, border: `1px solid ${service.border}`,
          color: service.color, marginBottom: '20px',
          boxShadow: `0 0 18px ${service.glow}`,
        }}>{service.icon}</div>

        {/* Tag */}
        <div style={{
          fontSize: '0.67rem', color: service.color, fontWeight: '700',
          letterSpacing: '0.07em', marginBottom: '10px',
          textTransform: 'uppercase', opacity: 0.8,
        }}>{service.tag}</div>

        {/* Title */}
        <h3 className="outfit" style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '10px', color: '#fff' }}>
          {service.title}
        </h3>

        {/* Desc */}
        <p style={{ color: 'rgba(255,255,255,0.52)', fontSize: '0.9rem', lineHeight: '1.65' }}>
          {service.desc}
        </p>

        {/* Bottom CTA */}
        <div style={{
          marginTop: '24px', display: 'flex', alignItems: 'center', gap: '8px',
          color: service.color, fontSize: '0.8rem', fontWeight: '600',
        }}>
          <span>Learn more</span>
          <span className="arrow-line" style={{
            display: 'inline-block', width: '22px', height: '1px',
            background: service.color, transition: 'width 0.3s ease',
          }} />
        </div>
      </div>
    </MagneticCard>
  );
}

const Services = () => (
  <section id="services" style={{ position: 'relative', zIndex: 2 }}>
    {/* Header */}
    <ScrollReveal direction="up">
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <div style={{
          display: 'inline-block', padding: '6px 16px', borderRadius: '100px',
          border: '1px solid rgba(99,102,241,0.3)', color: '#6366f1',
          fontSize: '0.76rem', fontWeight: '700', letterSpacing: '0.12em',
          textTransform: 'uppercase', marginBottom: '18px', background: 'rgba(99,102,241,0.07)',
        }}>◈ What We Offer</div>
        <h2 className="outfit" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: '800', marginBottom: '14px', color: '#fff' }}>
          Our Professional{' '}
          <span style={{
            background: 'linear-gradient(135deg, #6366f1, #00d4ff)',
            backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Services</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '560px', margin: '0 auto', lineHeight: '1.7', fontSize: '0.95rem' }}>
          A comprehensive range of digital solutions tailored to your business needs — from web to your customers' pockets.
        </p>
      </div>
    </ScrollReveal>

    {/* Grid */}
    <ScrollReveal
      direction="up"
      stagger={0.12}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
        gap: '24px',
      }}
    >
      {services.map((service) => (
        <ServiceCard key={service.title} service={service} />
      ))}
    </ScrollReveal>

    <style>{`
      .scan-line {
        position: absolute; top: -100%; left: 0; width: 100%; height: 2px;
        background: linear-gradient(90deg, transparent, var(--sc, #6366f1), transparent);
        opacity: 0; pointer-events: none;
      }
      .service-card-3d:hover .scan-line { animation: scan 3.5s ease-in-out; opacity: 1; }
      @keyframes scan {
        0% { top: -5%; opacity: 0; }
        20% { opacity: 0.6; }
        100% { top: 110%; opacity: 0; }
      }
      .service-card-3d:hover { box-shadow: 0 24px 50px rgba(0,0,0,0.5); }
      .service-card-3d:hover .arrow-line { width: 38px !important; }
      @media (max-width: 600px) {
        .service-card-3d { transform: none !important; }
      }
    `}</style>
  </section>
);

export default Services;
