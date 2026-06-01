import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Zap, MessageCircle, Loader } from 'lucide-react';
import { sendContactEmail, openWhatsApp, buildContactWAMessage } from '../config/emailjs';
import ScrollReveal from './motion/ScrollReveal';
import MagneticCard from './motion/MagneticCard';

const INITIAL = { name: '', email: '', phone: '', subject: '', message: '' };

const Contact = () => {
  const [formData, setFormData] = useState(INITIAL);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const set = (key) => (e) => setFormData(prev => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // 1. Send email via EmailJS
      await sendContactEmail(formData);

      // 2. Success
      setStatus('success');

      // 3. Open WhatsApp after brief delay
      setTimeout(() => {
        openWhatsApp(buildContactWAMessage(formData));
      }, 800);

      setFormData(INITIAL);
      setTimeout(() => setStatus('idle'), 7000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => status === 'loading' && setStatus('idle'), 5000);
    }
  };

  const contactInfo = [
    { icon: <Mail size={20} />, title: 'Email Us', value: 'WEBIFYPRO9@GMAIL.COM', href: 'mailto:WEBIFYPRO9@GMAIL.COM', color: '#00d4ff' },
    { icon: <Phone size={20} />, title: 'Call Us', value: '+923708316591', href: 'tel:+923708316591', color: '#06ffa5' },
    { icon: <MessageCircle size={20} />, title: 'WhatsApp', value: '+923708316591', href: 'https://wa.me/923708316591', color: '#25d366' },
    { icon: <MapPin size={20} />, title: 'Location', value: 'SIALKOT, PAKISTAN', href: null, color: '#a855f7' },
  ];

  const inputStyle = {
    width: '100%', padding: '13px 16px',
    background: 'rgba(0,0,0,0.4)',
    border: '1px solid rgba(0, 212, 255, 0.3)',
    borderRadius: '10px', color: '#e0f7ff', outline: 'none',
    fontFamily: "'Courier New', monospace", fontSize: '0.9rem',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block', marginBottom: '7px',
    fontSize: '0.72rem', color: 'rgba(0, 212, 255, 0.8)',
    fontFamily: 'monospace', letterSpacing: '0.05em',
  };

  return (
    <section id="contact" style={{ position: 'relative', zIndex: 2 }}>
      {/* Header */}
      <ScrollReveal direction="up">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            display: 'inline-block', padding: '6px 16px', borderRadius: '100px',
            border: '1px solid rgba(0,212,255,0.3)', color: '#00d4ff',
            fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.12em',
            textTransform: 'uppercase', marginBottom: '18px',
            background: 'rgba(0,212,255,0.06)',
          }}>✦ Quantum Signal</div>

          <h2 className="outfit" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: '800', marginBottom: '14px', color: '#fff' }}>
            Get In{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00d4ff, #6366f1)',
              backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Touch</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '520px', margin: '0 auto', lineHeight: '1.7', fontSize: '0.95rem' }}>
            Send a message — we respond within 24 hours via <strong style={{ color: '#00d4ff' }}>email</strong> and <strong style={{ color: '#25d366' }}>WhatsApp</strong>.
          </p>
        </div>
      </ScrollReveal>

      <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '48px', alignItems: 'start' }}>
        {/* ── Left: Contact Info ── */}
        <ScrollReveal direction="left">
          <div>
            <h3 className="outfit" style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '22px', color: '#fff' }}>
              Contact Channels
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '26px' }}>
              {contactInfo.map(info => (
                <MagneticCard
                  key={info.title}
                  glowColor={info.color}
                  data-cursor-color={info.color}
                  tiltStrength={8}
                  scaleHover={1.03}
                  zDepth={12}
                  style={{ display: 'block' }}
                >
                  <a
                    href={info.href || undefined}
                    target={info.href && !info.href.startsWith('mailto') && !info.href.startsWith('tel') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="contact-info-card"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '15px',
                      padding: '16px 18px',
                      background: 'rgba(5,5,20,0.72)',
                      border: `1px solid ${info.color}22`,
                      borderRadius: '14px', backdropFilter: 'blur(16px)',
                      transition: 'all 0.3s ease, border-color 0.3s ease',
                      textDecoration: 'none', color: 'inherit',
                      cursor: info.href ? 'pointer' : 'default',
                      height: '100%',
                    }}
                  >
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '11px', flexShrink: 0,
                      background: `${info.color}15`, border: `1px solid ${info.color}28`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: info.color, boxShadow: `0 0 14px ${info.color}18`,
                    }}>{info.icon}</div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.38)', marginBottom: '2px' }}>{info.title}</div>
                      <div style={{ fontWeight: '600', fontSize: '0.86rem', color: '#fff', wordBreak: 'break-all' }}>{info.value}</div>
                    </div>
                    {info.href && <div style={{ marginLeft: 'auto', color: `${info.color}66`, flexShrink: 0, fontSize: '1rem' }}>→</div>}
                  </a>
                </MagneticCard>
              ))}
            </div>

            {/* Status panel */}
            <div style={{
              padding: '18px 20px',
              background: 'rgba(3,7,18,0.85)',
              border: '1px solid rgba(99,102,241,0.16)',
              borderRadius: '16px',
              backgroundImage: 'linear-gradient(rgba(99,102,241,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.025) 1px,transparent 1px)',
              backgroundSize: '24px 24px',
            }}>
              <div style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: 'rgba(99,102,241,0.5)', marginBottom: '12px', letterSpacing: '0.1em' }}>
                // TRANSMISSION_STATUS
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#06ffa5', animation: 'pulse-dot 2s infinite', flexShrink: 0 }} />
                <span style={{ fontSize: '0.78rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }}>Signal: ONLINE</span>
              </div>
              <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.28)', lineHeight: '1.7' }}>
                📧 Email: instant delivery<br />
                💬 WhatsApp: auto-opens<br />
                ⚡ Response: &lt; 2 hours
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Right: Form ── */}
        <ScrollReveal direction="right">
          <div>
            <h3 className="outfit" style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '22px', color: '#fff' }}>
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="contact-form-inner" style={{
              background: 'rgba(3,7,18,0.88)', backdropFilter: 'blur(24px)',
              border: '1px solid rgba(0, 212, 255, 0.25)', borderRadius: '28px',
              padding: '32px 28px', position: 'relative', overflow: 'hidden',
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '14px', alignContent: 'start',
            }}>
              {/* Terminal bar */}
              <div style={{
                gridColumn: 'span 2',
                display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px',
                marginBottom: '10px', paddingBottom: '16px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                zIndex: 1,
              }}>
                {['#00d4ff', '#6366f1', '#a855f7'].map((c, i) => (
                  <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, opacity: 0.8 }} />
                ))}
                <span style={{ marginLeft: '6px', fontSize: '0.72rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)' }}>
                  webifypro ~ contact_terminal
                </span>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(0, 212, 255, 0.7)', animation: `blink-dot 1.5s ${i * 0.4}s infinite` }} />
                  ))}
                </div>
              </div>

              {[
                { type: 'text', placeholder: 'Your Name', key: 'name', label: '> client_name' },
                { type: 'email', placeholder: 'your@email.com', key: 'email', label: '> email_address' },
                { type: 'tel', placeholder: '+1 234 567 890', key: 'phone', label: '> phone_number' },
                { type: 'text', placeholder: 'Project Subject', key: 'subject', label: '> message_subject' },
              ].map(({ type, placeholder, key, label }) => (
                <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 1 }}>
                  <label style={labelStyle}>{label}</label>
                  <input type={type} placeholder={placeholder} required
                    value={formData[key]} onChange={set(key)}
                    style={inputStyle} className="contact-input" />
                </div>
              ))}

              <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 1 }}>
                <label style={labelStyle}>&gt; message_content</label>
                <textarea placeholder="Tell us about your project..." required rows={5}
                  value={formData.message} onChange={set('message')}
                  style={{ ...inputStyle, resize: 'none' }} className="contact-input" />
              </div>

              {/* Submit */}
              <MagneticCard
                tiltStrength={5}
                scaleHover={1.02}
                zDepth={8}
                glowColor="#00d4ff"
                data-cursor-color="#00d4ff"
                style={{ gridColumn: 'span 2', display: 'block', zIndex: 1 }}
              >
                <button type="submit" disabled={status === 'loading'} className="send-btn" style={{
                  width: '100%', padding: '16px',
                  background: status === 'success'
                    ? 'linear-gradient(135deg, #25d366, #06ffa5)'
                    : status === 'error'
                    ? 'linear-gradient(135deg, #ff006e, #ff4444)'
                    : 'linear-gradient(135deg, #00d4ff, #6366f1)',
                  borderRadius: '12px', fontWeight: '700', fontSize: '1rem',
                  color: status === 'success' ? '#000' : 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  transition: 'all 0.3s ease', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  opacity: status === 'loading' ? 0.8 : 1,
                  boxShadow: '0 8px 28px rgba(0,212,255,0.3)',
                  boxSizing: 'border-box',
                }}>
                  {status === 'loading' && <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />}
                  {status === 'success' && <MessageCircle size={18} />}
                  {status === 'idle' && <><Zap size={18} /><Send size={18} /></>}
                  <span>
                    {status === 'loading' ? 'Transmitting...'
                      : status === 'success' ? '✓ Sent! WhatsApp opening...'
                      : status === 'error' ? '✗ Failed — Try Again'
                      : 'Send Message'}
                  </span>
                </button>
              </MagneticCard>

              {/* Success feedback */}
              {status === 'success' && (
                <div style={{
                  gridColumn: 'span 2', padding: '12px 16px',
                  background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)',
                  borderRadius: '10px', fontSize: '0.82rem', color: '#25d366',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  animation: 'fadeInUp 0.3s ease', zIndex: 1,
                }}>
                  <MessageCircle size={15} />
                  Message delivered! WhatsApp is opening — just tap Send to also notify via chat.
                </div>
              )}

              {/* Error feedback */}
              {status === 'error' && (
                <div style={{
                  gridColumn: 'span 2', padding: '12px 16px',
                  background: 'rgba(255,0,110,0.1)', border: '1px solid rgba(255,0,110,0.3)',
                  borderRadius: '10px', fontSize: '0.82rem', color: '#ff006e',
                  animation: 'fadeInUp 0.3s ease', zIndex: 1,
                }}>
                  ✗ Email failed. Please check your Web3Forms key in .env and restart the server.
                </div>
              )}

              {/* Grid overlay */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '28px', zIndex: 0, pointerEvents: 'none',
                backgroundImage: 'linear-gradient(rgba(0, 212, 255, 0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0, 212, 255, 0.02) 1px,transparent 1px)',
                backgroundSize: '30px 30px',
              }} />
            </form>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        .contact-input:focus {
          border-color: rgba(0,212,255,0.6) !important;
          box-shadow: 0 0 20px rgba(0,212,255,0.15) !important;
        }
        .contact-input::placeholder { color: rgba(255,255,255,0.2); }
        .contact-info-card:hover {
          background: rgba(10,10,30,0.92) !important;
        }
        .send-btn:hover:not(:disabled) {
          box-shadow: 0 16px 40px rgba(0,212,255,0.4) !important;
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
          .contact-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
        @media (max-width: 520px) {
          .contact-form-inner { grid-template-columns: 1fr !important; }
          .contact-form-inner > div[style*="span 2"],
          .contact-form-inner > button { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
