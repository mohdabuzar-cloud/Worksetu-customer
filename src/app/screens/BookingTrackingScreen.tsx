import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ArrowLeft, Phone, MapPin, Clock, Star } from 'lucide-react';
import { C } from '../theme/colors';

const trackingSteps = [
  { label: 'Booking Confirmed', done: true },
  { label: 'Worker Assigned', done: true },
  { label: 'On the Way', active: true },
  { label: 'Arrived', done: false },
  { label: 'Work Started', done: false },
  { label: 'Completed', done: false },
];

export default function BookingTrackingScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const service = location.state?.service;
  const [currentState, setCurrentState] = useState(0);

  const nextState = () => {
    if (currentState < 3) setCurrentState(currentState + 1);
    else navigate('/payment', { state: { service } });
  };

  return (
    <div className="flex-1 flex flex-col" style={{ background: C.bg }}>
      {/* AppBar */}
      <div
        className="flex items-center gap-3 px-4 pt-12 pb-4"
        style={{ background: C.cardWhite, borderBottom: `1px solid ${C.divider}` }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            width: 38, height: 38, borderRadius: 10,
            border: `1px solid ${C.divider}`, background: C.bg,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <ArrowLeft size={18} color={C.textDark} />
        </button>
        <div style={{ fontSize: 18, fontWeight: 600, color: C.textDark }}>
          {['Finding Worker', 'Worker Found', 'Tracking', 'Completed'][currentState]}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-5">
        {/* State 0 — Searching */}
        {currentState === 0 && (
          <div className="flex flex-col items-center py-8">
            <div
              style={{
                width: 100, height: 100, borderRadius: '50%',
                border: `3px solid ${C.primaryBlue}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', marginBottom: 24,
              }}
            >
              <div
                style={{
                  width: 80, height: 80, borderRadius: '50%',
                  border: `3px solid ${C.primaryBlue}`,
                  borderTopColor: 'transparent',
                  animation: 'spin 1s linear infinite',
                  position: 'absolute',
                }}
              />
              <span style={{ fontSize: 32 }}>🔍</span>
            </div>
            <div style={{ fontSize: 18, fontWeight: 600, color: C.textDark, marginBottom: 6, textAlign: 'center' }}>
              Finding workers near you...
            </div>
            <p style={{ fontSize: 13, color: C.textGrey, textAlign: 'center', lineHeight: 1.6 }}>
              Sending request to nearby workers
            </p>
            <p style={{ fontSize: 12, color: C.textGrey, textAlign: 'center', marginTop: 4 }}>
              Usually takes 1–2 minutes
            </p>
            <button
              style={{
                marginTop: 28, height: 46, borderRadius: 12,
                border: `2px solid ${C.errorRed}`, background: 'transparent',
                color: C.errorRed, fontSize: 14, fontWeight: 600,
                padding: '0 32px', cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
              }}
            >
              Cancel Request
            </button>
          </div>
        )}

        {/* State 1 — Worker Accepted */}
        {currentState === 1 && (
          <div>
            <div
              className="flex items-center gap-2 px-4 py-3 mb-4"
              style={{ background: `${C.successGreen}15`, borderRadius: 12, border: `1px solid ${C.successGreen}30` }}
            >
              <span style={{ fontSize: 20 }}>✅</span>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.successGreen }}>
                Worker Found!
              </div>
            </div>
            <WorkerCard />
            <div
              className="flex gap-4 mt-3 mb-3"
              style={{
                background: C.cardWhite, borderRadius: 12, padding: '12px 16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              <div className="flex items-center gap-1">
                <MapPin size={14} color={C.primaryBlue} />
                <span style={{ fontSize: 12, color: C.textGrey }}>2.3 km away</span>
              </div>
              <div style={{ width: 1, background: C.divider }} />
              <div className="flex items-center gap-1">
                <Clock size={14} color={C.accentOrange} />
                <span style={{ fontSize: 12, color: C.textGrey }}>~20 min arrival</span>
              </div>
            </div>
            <MapPlaceholder label="Worker is 2.3 km away" />
            <button
              style={{
                width: '100%', height: 48, borderRadius: 12, marginTop: 12,
                border: `2px solid ${C.primaryBlue}`, background: 'transparent',
                color: C.primaryBlue, fontSize: 14, fontWeight: 600,
                cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}
            >
              <Phone size={16} /> Call Worker
            </button>
          </div>
        )}

        {/* State 2 — On the Way */}
        {currentState === 2 && (
          <div>
            <div
              className="flex items-center justify-between px-4 py-3 mb-4"
              style={{
                background: `${C.primaryBlue}10`, borderRadius: 12,
                border: `1px solid ${C.primaryBlue}20`,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: C.primaryBlue }}>
                🚀 Arriving in ~15 min
              </span>
              <div
                style={{
                  background: C.primaryBlue, color: '#fff',
                  borderRadius: 8, padding: '4px 10px', fontSize: 11, fontWeight: 600,
                }}
              >
                ON THE WAY
              </div>
            </div>

            <WorkerCard />

            {/* Progress stepper */}
            <div
              className="mt-4 p-4"
              style={{ background: C.cardWhite, borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: C.textDark, marginBottom: 14 }}>
                Booking Progress
              </div>
              {trackingSteps.map((step, i) => (
                <div key={i} className="flex gap-3" style={{ marginBottom: i < trackingSteps.length - 1 ? 0 : 0 }}>
                  <div className="flex flex-col items-center">
                    <div
                      style={{
                        width: 22, height: 22, borderRadius: '50%',
                        background: step.done ? C.successGreen : step.active ? C.primaryBlue : C.divider,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                        animation: step.active ? 'pulse2 1.5s ease-in-out infinite' : 'none',
                      }}
                    >
                      {step.done ? (
                        <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                          <path d="M1 4.5L4 7.5L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff' }} />
                      )}
                    </div>
                    {i < trackingSteps.length - 1 && (
                      <div style={{ width: 2, height: 24, background: step.done ? C.successGreen : C.divider, borderRadius: 1 }} />
                    )}
                  </div>
                  <div style={{ paddingBottom: i < trackingSteps.length - 1 ? 0 : 0, flex: 1, marginBottom: 18 }}>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: step.active ? 600 : step.done ? 500 : 400,
                        color: step.done ? C.successGreen : step.active ? C.primaryBlue : C.textGrey,
                      }}
                    >
                      {step.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* State 3 — Completed */}
        {currentState === 3 && (
          <div className="flex flex-col items-center py-4">
            <div
              style={{
                width: 90, height: 90, borderRadius: '50%',
                background: `${C.successGreen}15`,
                border: `3px solid ${C.successGreen}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16, fontSize: 40,
              }}
            >
              ✅
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: C.textDark, marginBottom: 6 }}>
              Service Completed!
            </div>
            <p style={{ fontSize: 13, color: C.textGrey, marginBottom: 24 }}>
              Your service has been completed successfully
            </p>

            <div
              className="w-full p-4"
              style={{
                background: C.cardWhite, borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                marginBottom: 16,
              }}
            >
              {[
                ['Service', service?.name || 'Home Cleaning'],
                ['Worker', 'Suresh Kumar'],
                ['Duration', '1h 45min'],
                ['Date', 'Today'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between py-2" style={{ borderBottom: `1px solid ${C.divider}` }}>
                  <span style={{ fontSize: 13, color: C.textGrey }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.textDark }}>{value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/payment', { state: { service } })}
              style={{
                width: '100%', height: 52, borderRadius: 12,
                background: C.primaryBlue, color: '#fff',
                fontSize: 15, fontWeight: 600, border: 'none',
                cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
              }}
            >
              Proceed to Payment
            </button>
          </div>
        )}

        <div style={{ height: 20 }} />
      </div>

      {/* Demo next state button */}
      <div
        className="px-4 py-3 flex items-center justify-center"
        style={{ borderTop: `1px solid ${C.divider}`, background: C.cardWhite }}
      >
        <button
          onClick={nextState}
          style={{
            fontSize: 12, color: C.primaryBlue, background: 'transparent',
            border: 'none', cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
          }}
        >
          {currentState < 3 ? '▶ Next State (Demo)' : '→ Go to Payment (Demo)'}
        </button>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse2 { 0%,100% { box-shadow: 0 0 0 0 rgba(26,115,232,0.4); } 50% { box-shadow: 0 0 0 8px rgba(26,115,232,0); } }
      `}</style>
    </div>
  );
}

function WorkerCard() {
  return (
    <div
      className="flex items-center gap-3 p-4"
      style={{
        background: C.cardWhite, borderRadius: 16,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      <div
        style={{
          width: 52, height: 52, borderRadius: '50%',
          background: 'linear-gradient(135deg, #1A73E8, #0D47A1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, flexShrink: 0,
        }}
      >
        👷
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.textDark }}>Suresh Kumar</div>
        <div className="flex items-center gap-1 mt-0.5">
          <Star size={12} fill="#FBBC04" color="#FBBC04" />
          <span style={{ fontSize: 12, fontWeight: 500, color: C.textDark }}>4.9</span>
          <span style={{ fontSize: 12, color: C.textGrey }}>· 3 years exp</span>
        </div>
        <div style={{ fontSize: 11, color: C.textGrey, marginTop: 2 }}>Home Cleaning</div>
      </div>
      <div
        style={{
          background: `${C.successGreen}15`, borderRadius: 8,
          padding: '4px 10px', fontSize: 11, fontWeight: 600, color: C.successGreen,
        }}
      >
        Verified ✓
      </div>
    </div>
  );
}

function MapPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center mt-3"
      style={{
        height: 150, background: 'linear-gradient(135deg, #90CAF9 0%, #42A5F5 100%)',
        borderRadius: 14, position: 'relative', overflow: 'hidden',
      }}
    >
      {[1, 2].map((i) => (
        <div key={`h${i}`} style={{ position: 'absolute', left: 0, right: 0, top: `${i * 33}%`, height: 1, background: 'rgba(255,255,255,0.3)' }} />
      ))}
      {[1, 2].map((i) => (
        <div key={`v${i}`} style={{ position: 'absolute', top: 0, bottom: 0, left: `${i * 33}%`, width: 1, background: 'rgba(255,255,255,0.3)' }} />
      ))}
      <div style={{ zIndex: 1, fontSize: 28 }}>🗺️</div>
      <div style={{ zIndex: 1, fontSize: 11, color: '#fff', fontWeight: 500, marginTop: 4 }}>{label}</div>
    </div>
  );
}
