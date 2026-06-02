import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Quote, Award, X, CheckCircle } from 'lucide-react';
import MagneticCard from './motion/MagneticCard';
import ScrollReveal from './motion/ScrollReveal';

const reviewsData = [
  {
    name: 'Zain Awan',
    role: 'CEO, Awan Digital',
    review: "Webify Pro built our company website and the performance is incredible! The site loads in less than a second and the design is absolutely stunning. Strongly recommended!",
    avatar: 'ZA',
    color: '#00d4ff',
    glow: 'rgba(0,212,255,0.12)',
    border: 'rgba(0,212,255,0.25)',
    rating: 5,
    date: '1 week ago',
  },


  {
    name: 'Jessica Taylor',
    role: 'E-commerce Brand Owner',
    review: "Our social media engagement grew by 150% under their management. Highly creative posts, perfect branding, and professional delivery. 10/10!",
    avatar: 'JT',
    color: '#06ffa5',
    glow: 'rgba(6,255,165,0.12)',
    border: 'rgba(6,255,165,0.25)',
    rating: 5,
    date: '1 month ago',
  },
];

const inputStyle = {
  boxSizing: 'border-box',
};

function ReviewCard({ item }) {
  return (
    <MagneticCard
      glowColor={item.color}
      data-cursor-color={item.color}
      tiltStrength={12}
      scaleHover={1.03}
      zDepth={20}
      style={{ height: '100%' }}
    >
      <div
        style={{
          background: 'rgba(5,5,20,0.85)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${item.border}`,
          borderRadius: '22px',
          padding: '32px 28px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          boxSizing: 'border-box',
          transition: 'all 0.3s ease',
        }}
        className="review-card-inner"
      >
        {/* Quote Icon Background Decal */}
        <Quote
          size={80}
          style={{
            position: 'absolute',
            right: '16px',
            top: '16px',
            color: 'rgba(255, 255, 255, 0.02)',
            pointerEvents: 'none',
          }}
        />

        {/* Card Header Info */}
        <div>
          {/* Stars & Date */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div style={{ display: 'flex', gap: '3px' }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < item.rating ? "#f59e0b" : "transparent"}
                  color={i < item.rating ? "#f59e0b" : "rgba(255,255,255,0.15)"}
                  style={{
                    filter: i < item.rating ? 'drop-shadow(0 0 4px rgba(245,158,11,0.5))' : 'none',
                  }}
                />
              ))}
            </div>
            <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>
              {item.date}
            </span>
          </div>

          {/* Review text */}
          <p style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '0.92rem',
            lineHeight: '1.7',
            marginBottom: '24px',
            fontStyle: 'italic',
          }}>
            "{item.review}"
          </p>
        </div>

        {/* Client details info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px', marginTop: 'auto' }}>
          {/* Avatar sphere */}
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${item.color}33, ${item.color}11)`,
            border: `1.5px solid ${item.color}66`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.9rem',
            fontWeight: '800',
            color: item.color,
            boxShadow: `0 0 12px ${item.color}25`,
            fontFamily: 'Outfit, sans-serif',
          }}>
            {item.avatar}
          </div>

          <div style={{ minWidth: 0 }}>
            <h4 className="outfit" style={{ fontSize: '0.96rem', fontWeight: '700', color: '#fff', margin: 0, marginBottom: '2px' }}>
              {item.name}
            </h4>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {item.role}
            </p>
          </div>
        </div>
      </div>
    </MagneticCard>
  );
}

const Reviews = () => {
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('webify_pro_reviews');
    if (saved) {
      try {
        return [...JSON.parse(saved), ...reviewsData];
      } catch (e) {
        return reviewsData;
      }
    }
    return reviewsData;
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerRole, setCustomerRole] = useState('');
  const [customerRating, setCustomerRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Close form modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsFormOpen(false);
    };
    if (isFormOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isFormOpen]);

  // Compute average rating dynamically
  const averageRating = (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1);
  const reviewsCount = reviews.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !customerRole || !reviewText) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Pick a themed color
      const colors = ['#00d4ff', '#ff006e', '#a855f7', '#06ffa5'];
      const randomColor = colors[reviews.length % colors.length];

      // Extract initials
      const parts = customerName.trim().split(' ');
      const avatarInitials = parts.length > 1
        ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
        : parts[0].slice(0, 2).toUpperCase();

      const newReviewItem = {
        name: customerName,
        role: customerRole,
        review: reviewText,
        avatar: avatarInitials,
        color: randomColor,
        glow: `${randomColor}1f`,
        border: `${randomColor}40`,
        rating: customerRating,
        date: 'Just now',
      };

      const updatedLocalReviews = [newReviewItem, ...(JSON.parse(localStorage.getItem('webify_pro_reviews') || '[]'))];
      localStorage.setItem('webify_pro_reviews', JSON.stringify(updatedLocalReviews));

      setReviews([newReviewItem, ...reviews]);
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Reset form fields
      setCustomerName('');
      setCustomerRole('');
      setCustomerRating(5);
      setReviewText('');
    }, 1000);
  };

  return (
    <section id="reviews" style={{ position: 'relative', zIndex: 2 }}>
      {/* Header */}
      <ScrollReveal direction="up">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '100px',
            border: '1px solid rgba(245,158,11,0.3)', color: '#f59e0b',
            fontSize: '0.76rem', fontWeight: '700', letterSpacing: '0.12em',
            textTransform: 'uppercase', marginBottom: '18px',
            background: 'rgba(245,158,11,0.06)',
          }}>
            <Award size={13} /> Verified Reviews
          </div>

          <h2 className="outfit" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: '800', marginBottom: '14px', color: '#fff' }}>
            What Our Clients{' '}
            <span style={{
              background: 'linear-gradient(135deg, #f59e0b, #ff006e)',
              backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Say About Us</span>
          </h2>

          {/* Trust rating badge & Write a Review layout */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            marginTop: '8px',
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '8px 16px',
              borderRadius: '100px',
            }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.round(parseFloat(averageRating)) ? "#f59e0b" : "transparent"} color="#f59e0b" />
                ))}
              </div>
              <span style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.85)', fontWeight: '700', fontFamily: 'Outfit, sans-serif' }}>
                {averageRating}/5 Rating
              </span>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', fontFamily: 'monospace' }}>
                ({reviewsCount} projects completed)
              </span>
            </div>

            {/* Write a review button */}
            <button
              onClick={() => {
                setSubmitSuccess(false);
                setIsFormOpen(true);
              }}
              style={{
                background: 'rgba(245,158,11,0.08)',
                border: '1.5px solid rgba(245,158,11,0.4)',
                color: '#f59e0b',
                padding: '10px 24px',
                borderRadius: '100px',
                fontWeight: '700',
                fontSize: '0.88rem',
                cursor: 'pointer',
                fontFamily: 'Outfit, sans-serif',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 15px rgba(245,158,11,0.15)',
              }}
              className="write-review-btn"
            >
              ★ Write a Review
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* Grid of reviews */}
      <ScrollReveal
        direction="up"
        stagger={0.12}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '24px',
        }}
      >
        {reviews.map((item, idx) => (
          <div key={item.name + idx} className={`review-card-float-${idx % 4}`} style={{ height: '100%' }}>
            <ReviewCard item={item} />
          </div>
        ))}
      </ScrollReveal>

      {/* Review Modal Form */}
      {isFormOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setIsFormOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              background: 'rgba(2, 3, 10, 0.88)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              animation: 'modalFadeIn 0.3s ease',
            }}
          />
          {/* Modal Container */}
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 100000,
              width: 'min(480px, 92vw)',
              background: 'linear-gradient(135deg, rgba(8,8,24,0.98), rgba(12,12,35,0.98))',
              border: '1px solid rgba(245,158,11,0.3)',
              borderRadius: '28px',
              padding: '36px',
              boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 60px rgba(245,158,11,0.12)',
              animation: 'modalSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
              boxSizing: 'border-box',
              textAlign: 'center',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setIsFormOpen(false)}
              style={{
                position: 'absolute', top: '16px', right: '16px',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px', width: '34px', height: '34px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'rgba(255,255,255,0.5)',
                transition: 'all 0.2s ease',
                zIndex: 10,
              }}
              className="modal-close-btn"
            >
              <X size={16} />
            </button>

            {submitSuccess ? (
              /* Success view */
              <div style={{ padding: '20px 0 10px' }}>
                <div style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: '20px' }}>
                  <CheckCircle size={64} color="#06ffa5" style={{ filter: 'drop-shadow(0 0 12px rgba(6,255,165,0.4))' }} />
                </div>
                <h3 className="outfit" style={{ fontSize: '1.6rem', fontWeight: '800', color: '#fff', marginBottom: '12px' }}>
                  Review Published!
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '28px' }}>
                  Thank you for sharing your experience. Your review is now visible on our galaxy landing page.
                </p>
                <button
                  onClick={() => setIsFormOpen(false)}
                  style={{
                    background: 'linear-gradient(135deg, #f59e0b, #ff006e)',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    padding: '14px 28px',
                    fontWeight: '700',
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    width: '100%',
                    boxShadow: '0 8px 24px rgba(245,158,11,0.3)',
                    transition: 'all 0.3s ease',
                  }}
                  className="success-dismiss-btn"
                >
                  Return to Dashboard
                </button>
              </div>
            ) : (
              /* Input form view */
              <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                <h3 className="outfit" style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', marginBottom: '6px', textAlign: 'center' }}>
                  Write a Review
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.84rem', textAlign: 'center', marginBottom: '24px' }}>
                  Share your experience working with Webify Pro.
                </p>

                {/* Rating selection stars */}
                <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    &gt; rating_stars
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[1, 2, 3, 4, 5].map((starVal) => {
                      const isActive = hoveredRating !== null ? starVal <= hoveredRating : starVal <= customerRating;
                      return (
                        <Star
                          key={starVal}
                          size={28}
                          fill={isActive ? "#f59e0b" : "transparent"}
                          color={isActive ? "#f59e0b" : "rgba(255,255,255,0.25)"}
                          style={{
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                            filter: isActive ? 'drop-shadow(0 0 6px rgba(245,158,11,0.6))' : 'none',
                            transform: isActive ? 'scale(1.1)' : 'scale(1)',
                          }}
                          onMouseEnter={() => setHoveredRating(starVal)}
                          onMouseLeave={() => setHoveredRating(null)}
                          onClick={() => setCustomerRating(starVal)}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Name */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={labelStyle}>&gt; customer_name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    style={inputStyle}
                    className="review-form-input"
                  />
                </div>

                {/* Role/Company */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={labelStyle}>&gt; role_or_company</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CEO, Awan Ventures"
                    value={customerRole}
                    onChange={(e) => setCustomerRole(e.target.value)}
                    style={inputStyle}
                    className="review-form-input"
                  />
                </div>

                {/* Review Message */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={labelStyle}>&gt; review_text</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about the launch... what stood out to you?"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    style={{ ...inputStyle, resize: 'none' }}
                    className="review-form-input"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '15px',
                    background: 'linear-gradient(135deg, #f59e0b, #ff006e)',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    fontWeight: '800',
                    fontSize: '0.95rem',
                    fontFamily: 'Outfit, sans-serif',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    boxShadow: '0 8px 24px rgba(245,158,11,0.3)',
                    transition: 'all 0.3s ease',
                    opacity: isSubmitting ? 0.75 : 1,
                  }}
                  className="review-submit-btn"
                >
                  {isSubmitting ? 'Transmitting Data...' : 'Transmit Review'}
                </button>
              </form>
            )}
          </div>
        </>
      )}

      <style>{`
        @keyframes floatCard {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .review-card-float-0 { animation: floatCard 6.5s ease-in-out infinite; }
        .review-card-float-1 { animation: floatCard 7.5s ease-in-out infinite 1.2s; }
        .review-card-float-2 { animation: floatCard 6.0s ease-in-out infinite 0.6s; }
        .review-card-float-3 { animation: floatCard 7.0s ease-in-out infinite 1.8s; }

        @media (max-width: 768px) {
          .review-card-float-0,
          .review-card-float-1,
          .review-card-float-2,
          .review-card-float-3 {
            animation-duration: 5s !important;
          }
        }

        .review-card-inner:hover {
          box-shadow: 0 24px 50px rgba(0,0,0,0.5);
          transform: translateY(-2px);
        }
        
        .write-review-btn:hover {
          box-shadow: 0 0 25px rgba(245,158,11,0.35) !important;
          transform: translateY(-1px);
          background: rgba(245,158,11,0.12) !important;
          border-color: rgba(245,158,11,0.6) !important;
        }

        .review-form-input {
          width: 100%;
          padding: 12px 14px;
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(245,158,11,0.25);
          border-radius: 10px;
          color: #fff;
          outline: none;
          font-family: 'Courier New', monospace;
          font-size: 15px;
          box-sizing: border-box;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .review-form-input:focus {
          border-color: rgba(245,158,11,0.6) !important;
          box-shadow: 0 0 15px rgba(245,158,11,0.15) !important;
        }

        .review-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(245,158,11,0.45) !important;
        }

        .success-dismiss-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(245,158,11,0.45) !important;
        }
      `}</style>
    </section>
  );
};

const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontSize: '0.7rem',
  color: 'rgba(245,158,11,0.7)',
  fontFamily: 'monospace',
  letterSpacing: '0.05em',
};

export default Reviews;
