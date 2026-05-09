import { useNavigate, useLocation } from 'react-router';
import { ArrowLeft, Star, CheckCircle } from 'lucide-react';
import { C } from '../theme/colors';

const included = [
  'Professional equipment provided',
  'Trained & verified worker',
  '2 hour service window',
  'Post-service cleanup',
];

const steps = [
  { icon: '📅', label: 'Book' },
  { icon: '👷', label: 'Worker Arrives' },
  { icon: '💳', label: 'Pay After' },
];

export default function ServiceDetailScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const service = location.state?.service || {
    id: 1,
    icon: '🧹',
    name: 'Home Cleaning',
    price: 'From ₹299',
    color: '#E3F2FD',
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col" style={{ background: C.bg }}>
      {/* AppBar */}
      <div
        className="flex items-center gap-3 px-4 pt-12 pb-4"
        style={{ background: C.cardWhite, borderBottom: `1px solid ${C.divider}` }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            border: `1px solid ${C.divider}`,
            background: C.bg,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowLeft size={18} color={C.textDark} />
        </button>
        <div style={{ fontSize: 18, fontWeight: 600, color: C.textDark }}>
          {service.name}
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-4 pt-4 pb-6">
        {/* Hero */}
        <div
          className="mt-0 flex flex-col items-center justify-center"
          style={{
            height: 180,
            borderRadius: 16,
            background: `linear-gradient(135deg, ${service.color} 0%, ${service.bg || '#BBDEFB'} 100%)`,
          }}
        >
          <span style={{ fontSize: 70 }}>{service.icon}</span>
        </div>

        {/* Details card */}
        <div
          className="mx-4 mt-4 p-4"
          style={{
            background: C.cardWhite,
            borderRadius: 16,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 700, color: C.textDark, marginBottom: 6 }}>
            {service.name}
          </div>
          <div className="flex items-center justify-between">
            <div style={{ fontSize: 18, fontWeight: 600, color: C.primaryBlue }}>
              ₹299 – ₹599
            </div>
            <div className="flex items-center gap-1">
              <Star size={14} fill="#FBBC04" color="#FBBC04" />
              <span style={{ fontSize: 13, fontWeight: 600, color: C.textDark }}>4.8</span>
              <span style={{ fontSize: 12, color: C.textGrey }}>(238 reviews)</span>
            </div>
          </div>
        </div>

        {/* What's included */}
        <div className="mx-4 mt-4">
          <div style={{ fontSize: 15, fontWeight: 600, color: C.textDark, marginBottom: 12 }}>
            What's Included
          </div>
          <div
            style={{
              background: C.cardWhite,
              borderRadius: 16,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}
          >
            {included.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-3"
                style={{
                  borderBottom: i < included.length - 1 ? `1px solid ${C.divider}` : 'none',
                }}
              >
                <CheckCircle size={18} color={C.successGreen} fill={`${C.successGreen}20`} />
                <span style={{ fontSize: 13, color: C.textDark }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 20 }} />
      </div>

      {/* Book Service button */}
      <div
        className="px-4 py-4"
        style={{ background: C.cardWhite, borderTop: `1px solid ${C.divider}` }}
      >
        <button
          onClick={() => navigate('/address', { state: { service } })}
          style={{
            width: '100%',
            height: 52,
            borderRadius: 12,
            background: C.primaryBlue,
            color: '#fff',
            fontSize: 16,
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          BOOK SERVICE
        </button>
      </div>
    </div>
  );
}
