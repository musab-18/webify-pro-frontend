import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Terminal, MessageCircle } from 'lucide-react';
import { sendOrderEmail, buildOrderWAMessage, WA_NUMBER } from '../config/emailjs';
import GlitchText from './motion/GlitchText';
import ScrollReveal from './motion/ScrollReveal';
import MagneticCard from './motion/MagneticCard';
import SubmissionPopup from './SubmissionPopup';

const INITIAL = {
  service: 'Web Development',
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  details: '',
};

const OrderForm = () => {
  const [formData, setFormData] = useState(INITIAL);
  const [pulseActive, setPulseActive] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [waUrl, setWaUrl] = useState('');

  const set = (key) => (e) => setFormData(prev => ({ ...prev, [key]: e.target.value }));

  useEffect(() => {
    const handleSelectService = (e) => {
      let targetService = e.detail;
      if (targetService === 'Mobile Applications') {
        targetService = 'Mobile Application';
      }
      setFormData(prev => ({ ...prev, service: targetService }));
      const orderSec = document.getElementById('order');
      if (orderSec) {
        orderSec.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('select-service', handleSelectService);
    return () => window.removeEventListener('select-service', handleSelectService);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (popupOpen) return;

    // ── Step 1: Build WA URL & store it ──
    const snapshot = { ...formData };
    const waMsg = buildOrderWAMessage(snapshot);
    const encoded = encodeURIComponent(waMsg);
    const url = `https://wa.me/${WA_NUMBER}?text=${encoded}`;
    setWaUrl(url);

    // ── Step 2: Show popup immediately & pulse effect ──
    setPopupOpen(true);
    setPulseActive(true);
    setTimeout(() => setPulseActive(false), 1500);
    setFormData(INITIAL);

    // ── Step 3: Send email & DB in background (non-blocking) ──
    sendOrderEmail(snapshot).catch(err => console.warn('Email send failed:', err));
    const apiUrl = import.meta.env.VITE_API_URL;
    if (apiUrl) {
      fetch(`${apiUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(snapshot),
      }).catch(err => console.warn('Backend sync error:', err));
    }
  };

  const inputStyle = {
    width: '100%', padding: '13px 16px',
    background: 'rgba(0,0,0,0.4)',
    border: '1px solid rgba(99,102,241,0.3)',
    borderRadius: '10px', color: '#e0e7ff', outline: 'none',
    fontFamily: "'Courier New', monospace", fontSize: '16px',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    boxSizing: 'border-box',
  };

  return (
    <>
      <section id="order" style={{ position: 'relative', zIndex: 2 }}>
      {/* Pulse explosion overlay */}
      {pulseActive && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          pointerEvents: 'none', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: '20px', height: '20px', borderRadius: '50%',
            background: 'rgba(99,102,241,0.8)',
            animation: 'pulse-explosion 1.2s ease-out forwards',
          }} />
        </div>
      )}

      <div className="order-container" style={{
        maxWidth: '1000px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1.2fr',
        gap: '60px', alignItems: 'start',
      }}>
        {/* ── Left Panel ── */}
        <ScrollReveal direction="left">
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 16px', borderRadius: '100px',
              border: '1px solid rgba(6,255,165,0.3)', color: '#06ffa5',
              fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.1em',
              textTransform: 'uppercase', marginBottom: '24px',
              background: 'rgba(6,255,165,0.06)',
            }}>
              <Terminal size={13} /> Quantum Terminal
            </div>

            <h2 className="outfit" style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: '800', marginBottom: '18px', lineHeight: '1.2',
            }}>
              Ready to{' '}
              <GlitchText interval={7}>
                <span style={{
                  background: 'linear-gradient(135deg, #6366f1, #06ffa5)',
                  backgroundClip: 'text', WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>Launch?</span>
              </GlitchText>
            </h2>

            <p style={{ color: 'rgba(255,255,255,0.55)', marginBottom: '32px', lineHeight: '1.75', fontSize: '0.93rem' }}>
              Submit your order below. You'll get a <strong style={{ color: '#06ffa5' }}>confirmation email</strong> and your request will arrive via <strong style={{ color: '#25d366' }}>WhatsApp</strong> instantly — no delays.
            </p>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
              {[
                ['Full custom design & development', '#06ffa5'],
                ['Modern & High Performance Stack', '#00d4ff'],
                ['24/7 Dedicated support', '#a855f7'],
              ].map(([item, color]) => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <CheckCircle size={19} color={color} style={{ flexShrink: 0 }} />
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.92rem' }}>{item}</span>
                </li>
              ))}
            </ul>

            {/* Notification channels */}
            <MagneticCard
              tiltStrength={10}
              scaleHover={1.02}
              zDepth={12}
              glowColor="#06ffa5"
              data-cursor-color="#06ffa5"
            >
              <div style={{
                padding: '20px 22px',
                background: 'rgba(3,7,18,0.8)',
                border: '1px solid rgba(99,102,241,0.18)',
                borderRadius: '18px',
              }}>
                <div style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: 'rgba(99,102,241,0.55)', marginBottom: '14px', letterSpacing: '0.1em' }}>
                  // NOTIFICATION_CHANNELS
                </div>
                {[
                  { icon: '📧', label: 'Email', value: 'WEBIFYPRO9@GMAIL.COM', color: '#00d4ff' },
                  { icon: '💬', label: 'WhatsApp', value: '+923708316591', color: '#25d366' },
                  { icon: '⚡', label: 'Response', value: '< 2 hours', color: '#06ffa5' },
                ].map(s => (
                  <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
                      {s.icon} {s.label}
                    </span>
                    <span style={{ fontSize: '0.78rem', fontWeight: '700', color: s.color, fontFamily: 'monospace', textAlign: 'right', maxWidth: '60%', wordBreak: 'break-all' }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </MagneticCard>
          </div>
        </ScrollReveal>

        {/* ── Right: Form ── */}
        <ScrollReveal direction="right">
          <form onSubmit={handleSubmit} className="order-form-el" style={{
            background: 'rgba(3,7,18,0.88)', backdropFilter: 'blur(24px)',
            border: '1px solid rgba(99,102,241,0.25)', position: 'relative', overflow: 'hidden',
          }}>
            {/* Terminal bar */}
            <div style={{
              display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px',
              marginBottom: '24px', paddingBottom: '16px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              {['#ff006e', '#06ffa5', '#00d4ff'].map((c, i) => (
                <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, opacity: 0.8 }} />
              ))}
              <span style={{ marginLeft: '6px', fontSize: '0.72rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)' }}>
                webifypro ~ order_terminal
              </span>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(99,102,241,0.7)', animation: `blink-dot 1.5s ${i * 0.4}s infinite` }} />
                ))}
              </div>
            </div>

            {/* Service + Name */}
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={labelStyle}>&gt; service_type</label>
                <select value={formData.service} onChange={set('service')} style={inputStyle} className="terminal-input">
                  <option>Web Development</option>
                  <option>Digital Marketing</option>
                  <option>Mobile Application</option>
                  <option>Social Media Management</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>&gt; your_name</label>
                <input type="text" required placeholder="John Doe" value={formData.customerName} onChange={set('customerName')} style={inputStyle} className="terminal-input" />
              </div>
            </div>

            {/* Email + Phone */}
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={labelStyle}>&gt; email_address</label>
                <input type="email" required placeholder="john@example.com" value={formData.customerEmail} onChange={set('customerEmail')} style={inputStyle} className="terminal-input" />
              </div>
              <div>
                <label style={labelStyle}>&gt; phone_number</label>
                <input type="tel" required placeholder="+1 234 567 890" value={formData.customerPhone} onChange={set('customerPhone')} style={inputStyle} className="terminal-input" />
              </div>
            </div>

            {/* Details */}
            <div style={{ marginBottom: '22px' }}>
              <label style={labelStyle}>&gt; project_details</label>
              <textarea rows={4} required placeholder="Tell us about your project... describe the mission."
                value={formData.details} onChange={set('details')}
                style={{ ...inputStyle, resize: 'none' }} className="terminal-input" />
            </div>

            {/* Submit button */}
            <MagneticCard
              tiltStrength={5}
              scaleHover={1.02}
              zDepth={8}
              glowColor="#6366f1"
              data-cursor-color="#6366f1"
              style={{ width: '100%', display: 'block' }}
            >
              <button type="submit" className="launch-btn" style={{
                width: '100%', padding: '16px',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                borderRadius: '12px', fontWeight: '700', fontSize: '1rem',
                color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 30px rgba(99,102,241,0.45)',
                cursor: 'pointer',
                border: 'none',
              }}>
                <Send size={18} />
                <span>Launch Mission</span>
              </button>
            </MagneticCard>

            {/* Grid overlay */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '28px', zIndex: 0, pointerEvents: 'none',
              backgroundImage: 'linear-gradient(rgba(99,102,241,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.025) 1px,transparent 1px)',
              backgroundSize: '30px 30px',
            }} />
          </form>
        </ScrollReveal>
      </div>

      <style>{`
        .order-form-el {
          padding: 32px 28px;
          border-radius: 28px;
        }
        .terminal-input:focus {
          border-color: rgba(99,102,241,0.7) !important;
          box-shadow: 0 0 20px rgba(99,102,241,0.2) !important;
        }
        .terminal-input::placeholder { color: rgba(255,255,255,0.2); }
        .terminal-input option { background: #0d0d1a; }
        .launch-btn:hover:not(:disabled) {
          box-shadow: 0 16px 40px rgba(99,102,241,0.5) !important;
        }
        @keyframes pulse-explosion {
          0% { transform: scale(1); opacity: 0.9; }
          100% { transform: scale(80); opacity: 0; }
        }
        @keyframes blink-dot {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 860px) {
          .order-container { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
        @media (max-width: 520px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .order-form-el {
            padding: 24px 16px !important;
            border-radius: 20px !important;
          }
        }
      `}</style>
    </section>

      {/* Success Popup */}
      <SubmissionPopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        waUrl={waUrl}
        title="Order Received! 🚀"
        subtitle="Your order has been submitted. We'll be in touch soon. Click below to continue the conversation on WhatsApp."
        countdownSec={4}
      />
    </>
  );
};

const labelStyle = {
  display: 'block', marginBottom: '7px',
  fontSize: '0.72rem', color: 'rgba(99,102,241,0.8)',
  fontFamily: 'monospace', letterSpacing: '0.05em',
};

export default OrderForm;
