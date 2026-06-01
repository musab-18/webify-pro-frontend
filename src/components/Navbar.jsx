import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket } from 'lucide-react';
import MagneticCard from './motion/MagneticCard';
import { useScrollProgress } from '../hooks/useScrollProgress';

const Navbar = () => {
  const { scrollProgress } = useScrollProgress();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Active section tracking
      const sections = ['home', 'services', 'portfolio', 'order', 'contact'];
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home', id: 'home' },
    { href: '#services', label: 'Services', id: 'services' },
    { href: '#portfolio', label: 'Portfolio', id: 'portfolio' },
    { href: '#order', label: 'Order Now', id: 'order' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isScrolled ? '16px 5%' : '24px 5%',
      background: isScrolled
        ? 'rgba(3, 7, 18, 0.95)'
        : 'rgba(3, 7, 18, 0.1)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(255, 255, 255, 0.01)',
      boxShadow: isScrolled ? '0 10px 40px rgba(0, 0, 0, 0.8)' : 'none',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    }}>
      {/* Logo */}
      <a href="#home" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        textDecoration: 'none',
        cursor: 'pointer',
      }}>
        <div style={{ position: 'relative' }}>
          <Rocket
            size={30}
            color="#6366f1"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(99,102,241,0.8))',
              animation: 'logo-float 3s ease-in-out infinite',
            }}
          />
          <div style={{
            position: 'absolute',
            inset: '-4px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
            animation: 'logo-pulse 3s ease-in-out infinite',
          }} />
        </div>
        <span className="outfit" style={{
          fontSize: '1.5rem',
          fontWeight: '900',
          letterSpacing: '-0.6px',
          textTransform: 'uppercase',
          color: '#ffffff',
        }}>
          WEBIFY <span style={{
            background: 'linear-gradient(135deg, #6366f1, #00d4ff)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>PRO</span>
        </span>
      </a>

      {/* Desktop nav links */}
      <ul style={{
        display: 'flex',
        gap: '8px',
        fontWeight: '600',
        alignItems: 'center',
        listStyle: 'none',
        margin: 0,
        padding: 0,
      }} className="nav-links">
        {navLinks.map(link => (
          <li key={link.id}>
            <a
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                color: activeSection === link.id ? '#ffffff' : 'rgba(255,255,255,0.55)',
                background: activeSection === link.id ? 'rgba(99,102,241,0.12)' : 'transparent',
                border: activeSection === link.id ? '1px solid rgba(99,102,241,0.25)' : '1px solid transparent',
                fontSize: '0.9rem',
                transition: 'all 0.25s ease',
                textDecoration: 'none',
                display: 'block',
              }}
              className="nav-link"
            >
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <MagneticCard
            tiltStrength={8}
            scaleHover={1.06}
            zDepth={10}
            glowColor="#a855f7"
            data-cursor-color="#a855f7"
            style={{ display: 'inline-block' }}
          >
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              style={{
                padding: '10px 22px',
                borderRadius: '100px',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                color: 'white',
                fontWeight: '700',
                fontSize: '0.9rem',
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(99,102,241,0.35)',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
                display: 'block',
              }}
              className="nav-cta"
            >
              Contact Us
            </a>
          </MagneticCard>
        </li>
      </ul>

      {/* Mobile hamburger */}
      <div
        className="mobile-menu-btn"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{ display: 'none', color: 'white', cursor: 'pointer', zIndex: 101 }}
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </div>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(3, 7, 18, 0.97)',
          backdropFilter: 'blur(24px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
          zIndex: 100,
          animation: 'fadeIn 0.3s ease',
        }} className="mobile-overlay">
          {[...navLinks, { href: '#contact', label: 'Contact Us', id: 'contact' }].map(link => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              style={{
                fontSize: '1.8rem',
                fontWeight: '700',
                fontFamily: 'Outfit, sans-serif',
                color: activeSection === link.id ? '#6366f1' : 'rgba(255,255,255,0.8)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @keyframes logo-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(5deg); }
        }
        @keyframes logo-pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.4); opacity: 0.2; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .nav-link:hover {
          color: white !important;
          background: rgba(99,102,241,0.08) !important;
        }
        .nav-cta:hover {
          box-shadow: 0 8px 25px rgba(99,102,241,0.5) !important;
        }
        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>

      {/* Scroll Progress Bar */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '2.5px',
          background: 'linear-gradient(90deg, #6366f1, #00d4ff, #a855f7)',
          transformOrigin: '0% 50%',
          transform: `scaleX(${scrollProgress})`,
          opacity: isScrolled ? 1 : 0,
          boxShadow: isScrolled ? '0 0 12px rgba(0, 212, 255, 0.7), 0 0 6px rgba(99, 102, 241, 0.5)' : 'none',
          transition: 'opacity 0.3s ease, transform 0.1s ease-out',
          willChange: 'transform',
        }}
      />
    </nav>
  );
};

export default Navbar;
