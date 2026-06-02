import React, { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Reviews from './components/Reviews';
import OrderForm from './components/OrderForm';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { PhysicsProvider } from './context/PhysicsContext';
import CursorFX from './components/motion/CursorFX';
import MagneticCard from './components/motion/MagneticCard';
import { MessageCircle } from 'lucide-react';

const WA_URL = `https://wa.me/923708316591?text=${encodeURIComponent("Hello Webify Pro! I'd like to start a project with you.")}`;

// Lazy-load the heavy 3D scene
const SpaceScene = lazy(() => import('./components/three/SpaceScene'));

function App() {
  return (
    <PhysicsProvider>
      <div className="App">
        {/* Premium custom cursor */}
        <CursorFX />

        {/* 3D Canvas — rendered on all devices */}
        <Suspense fallback={null}>
          <SpaceScene />
        </Suspense>

        {/* Floating WhatsApp Button */}
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 999,
        }}>
          <MagneticCard
            tiltStrength={15}
            scaleHover={1.08}
            zDepth={12}
            glowColor="#25d366"
            data-cursor-color="#25d366"
          >
            <div
              onClick={() => window.open(WA_URL, '_blank')}
              style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                alignItems: 'center',
                gap: '8px',
                padding: '12px',
                borderRadius: '50px',
                background: 'rgba(3, 7, 18, 0.82)',
                border: '1.5px solid #25d366',
                color: '#25d366',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 16px rgba(37, 211, 102, 0.35)',
                backdropFilter: 'blur(10px)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                width: '48px',
                height: '48px',
                overflow: 'hidden',
                boxSizing: 'border-box',
              }}
              className="floating-wa-btn"
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', flexShrink: 0 }}>
                <MessageCircle size={20} />
              </div>
              <span style={{
                fontSize: '0.78rem',
                fontWeight: '700',
                whiteSpace: 'nowrap',
                fontFamily: 'Outfit, sans-serif',
                opacity: 0,
                transform: 'translateX(10px)',
                transition: 'all 0.3s ease',
              }} className="floating-wa-text">Chat on WhatsApp</span>
            </div>
          </MagneticCard>
        </div>

        {/* All page content renders on top of the canvas */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Navbar />
          <main>
            <Hero />
            <Services />
            <Portfolio />
            <Reviews />
            <OrderForm />
            <Contact />
          </main>
          <Footer />
        </div>

        <style>{`
          .floating-wa-btn:hover {
            width: 172px !important;
          }
          .floating-wa-btn:hover .floating-wa-text {
            opacity: 1 !important;
            transform: translateX(0) !important;
          }
        `}</style>
      </div>
    </PhysicsProvider>
  );
}

export default App;
