import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import MagneticCard from './motion/MagneticCard';
import ScrollReveal from './motion/ScrollReveal';

const projects = [
  {
    title: 'WEB DEVELOPMENT',
    category: 'Web Development',
    image: '/images/web-dev.jpg',
    link: '#',
    tags: ['Java', 'React', 'Node.js', 'MERN'],
    color: '#00d4ff',
    glow: 'rgba(0,212,255,0.18)',
    desc: 'Full-stack web solutions with blazing-fast performance and modern UI.',
  },
  {
    title: 'DIGITAL MEDIA MARKETING',
    category: 'Digital Marketing',
    image: '/images/digital-media-marketing.png',
    link: '#',
    tags: ['Meta Ads', 'Facebook', 'Growth'],
    color: '#ff006e',
    glow: 'rgba(255,0,110,0.18)',
    desc: 'Data-driven campaigns that transform clicks into loyal customers.',
  },
  {
    title: 'MOBILE APP DEVELOPMENT',
    category: 'Mobile Application',
    image: '/images/app-dev-ui.jpg',
    link: '#',
    tags: ['Flutter', 'Dart', 'Firebase'],
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.18)',
    desc: 'Cross-platform apps that delight users on every device.',
  },
];

const categories = ['All', 'Web Development', 'Digital Marketing', 'Mobile Application'];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" style={{ position: 'relative', zIndex: 2 }}>
      {/* Header */}
      <ScrollReveal direction="up">
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            display: 'inline-block', padding: '6px 16px', borderRadius: '100px',
            border: '1px solid rgba(168,85,247,0.3)', color: '#a855f7',
            fontSize: '0.76rem', fontWeight: '700', letterSpacing: '0.12em',
            textTransform: 'uppercase', marginBottom: '18px', background: 'rgba(168,85,247,0.07)',
          }}>◎ Galaxy Portfolio</div>

          <h2 className="outfit" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: '800', marginBottom: '14px', color: '#fff' }}>
            Featured{' '}
            <span style={{
              background: 'linear-gradient(135deg, #a855f7, #00d4ff)',
              backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Projects</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '560px', margin: '0 auto 36px', lineHeight: '1.7', fontSize: '0.95rem' }}>
            Explore our latest work and see how we help businesses transform their digital presence.
          </p>

          {/* Filter tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setExpandedIndex(null); }}
                style={{
                  padding: '9px 20px', borderRadius: '100px',
                  border: activeCategory === cat ? '1px solid rgba(99,102,241,0.55)' : '1px solid rgba(255,255,255,0.1)',
                  background: activeCategory === cat
                    ? 'linear-gradient(135deg, rgba(99,102,241,0.28), rgba(168,85,247,0.28))'
                    : 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(10px)',
                  color: activeCategory === cat ? '#fff' : 'rgba(255,255,255,0.5)',
                  fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: activeCategory === cat ? '0 0 18px rgba(99,102,241,0.3)' : 'none',
                }}
              >{cat}</button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Cards */}
      <ScrollReveal
        direction="up"
        stagger={0.12}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))',
          gap: '28px',
        }}
      >
        {filteredProjects.map((project, index) => (
          <MagneticCard
            key={project.title}
            glowColor={project.color}
            data-cursor-color={project.color}
            tiltStrength={12}
            scaleHover={1.02}
            zDepth={15}
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
          >
            <div
              className="galaxy-card"
              style={{
                position: 'relative', borderRadius: '26px', overflow: 'hidden',
                background: 'rgba(5,5,20,0.8)',
                border: `1px solid ${expandedIndex === index ? project.color + '66' : project.color + '25'}`,
                height: expandedIndex === index ? '500px' : '400px',
                transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
                boxShadow: expandedIndex === index
                  ? `0 0 50px ${project.glow}, 0 24px 50px rgba(0,0,0,0.55)`
                  : `0 0 18px ${project.glow}44`,
              }}
            >
              {/* Glow bg */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `radial-gradient(circle at 75% 15%, ${project.glow} 0%, transparent 55%)`,
                pointerEvents: 'none',
              }} />

              {/* Image */}
              <div style={{ height: '55%', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.6s ease, filter 0.4s ease',
                    filter: expandedIndex === index ? 'brightness(1.1)' : 'brightness(0.65)',
                  }}
                  className="galaxy-img"
                />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
                  background: 'linear-gradient(to top, rgba(5,5,20,0.95), transparent)',
                }} />
                {/* Category badge */}
                <div style={{
                  position: 'absolute', top: '14px', right: '14px',
                  padding: '4px 12px', borderRadius: '20px',
                  background: `${project.color}20`, border: `1px solid ${project.color}44`,
                  color: project.color, fontSize: '0.66rem', fontWeight: '700',
                  backdropFilter: 'blur(8px)',
                }}>{project.category}</div>
              </div>

              {/* Content */}
              <div style={{ padding: '22px 24px', position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
                  {project.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: '0.62rem', padding: '3px 8px',
                      background: `${project.color}15`, color: project.color,
                      border: `1px solid ${project.color}30`, borderRadius: '6px', fontWeight: '700',
                    }}>{tag}</span>
                  ))}
                </div>
                <h3 className="outfit" style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '6px', color: '#fff', letterSpacing: '0.04em' }}>
                  {project.title}
                </h3>
                {expandedIndex === index && (
                  <p style={{
                    color: 'rgba(255,255,255,0.52)', fontSize: '0.87rem',
                    lineHeight: '1.6', marginBottom: '14px',
                    animation: 'fadeInUp 0.35s ease',
                  }}>{project.desc}</p>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: project.color, fontSize: '0.8rem', fontWeight: '600' }}>
                  <ExternalLink size={13} />
                  {expandedIndex === index ? 'Tap to collapse' : 'Tap to expand'}
                  <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${project.color}55, transparent)` }} />
                </div>
              </div>

              {/* Border glow overlay */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '26px',
                border: `1px solid ${project.color}`,
                opacity: expandedIndex === index ? 0.4 : 0,
                transition: 'opacity 0.4s ease', pointerEvents: 'none',
              }} />
            </div>
          </MagneticCard>
        ))}
      </ScrollReveal>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .galaxy-card:hover .galaxy-img { transform: scale(1.05); }
        @media (max-width: 480px) {
          .portfolio-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Portfolio;
