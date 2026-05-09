import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ArrowLeft, MapPin, Plus } from 'lucide-react';
import { C } from '../theme/colors';

const addresses = [
  { id: 1, icon: '🏠', type: 'Home', address: '42 Green Avenue, Model Town, Ludhiana' },
  { id: 2, icon: '🏢', type: 'Office', address: '15 Industrial Area, Phase 2, Ludhiana' },
];

export default function AddressSelectionScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const service = location.state?.service;
  const [selected, setSelected] = useState(1);

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
          Select Address
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-4 pt-4 pb-6">
        <p style={{ fontSize: 14, color: C.textGrey, marginBottom: 16 }}>
          Where do you need the service?
        </p>

        {/* Map placeholder */}
        <div
          className="flex flex-col items-center justify-center mb-5"
          style={{
            height: 200,
            background: 'linear-gradient(135deg, #90CAF9 0%, #64B5F6 100%)',
            borderRadius: 16,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Grid lines */}
          {[1, 2, 3].map((i) => (
            <div
              key={`h${i}`}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: `${i * 25}%`,
                height: 1,
                background: 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
          {[1, 2, 3].map((i) => (
            <div
              key={`v${i}`}
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${i * 25}%`,
                width: 1,
                background: 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
          {/* Pin */}
          <div className="flex flex-col items-center" style={{ zIndex: 1 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: C.primaryBlue,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(26,115,232,0.4)',
              }}
            >
              <MapPin size={22} color="#fff" fill="rgba(255,255,255,0.3)" />
            </div>
            <div
              style={{
                width: 2,
                height: 16,
                background: C.primaryBlue,
                borderRadius: 1,
              }}
            />
            <div
              style={{
                width: 10,
                height: 4,
                borderRadius: '50%',
                background: 'rgba(26,115,232,0.3)',
              }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 8,
              left: 0,
              right: 0,
              textAlign: 'center',
              fontSize: 11,
              color: '#fff',
              fontWeight: 500,
            }}
          >
            📍 Model Town, Ludhiana
          </div>
        </div>

        {/* Saved addresses */}
        <div style={{ fontSize: 15, fontWeight: 600, color: C.textDark, marginBottom: 12 }}>
          Saved Addresses
        </div>

        {addresses.map((addr) => (
          <button
            key={addr.id}
            onClick={() => setSelected(addr.id)}
            style={{
              width: '100%',
              background: C.cardWhite,
              borderRadius: 14,
              padding: '14px 16px',
              border: `2px solid ${selected === addr.id ? C.primaryBlue : C.divider}`,
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 10,
              fontFamily: "'Poppins', sans-serif",
              transition: 'border-color 0.2s',
              boxShadow: selected === addr.id ? `0 0 0 4px ${C.primaryBlue}15` : 'none',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: selected === addr.id ? `${C.primaryBlue}15` : '#F3F4F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                flexShrink: 0,
              }}
            >
              {addr.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.textDark }}>
                {addr.type}
              </div>
              <div style={{ fontSize: 12, color: C.textGrey, marginTop: 2, lineHeight: 1.4 }}>
                {addr.address}
              </div>
            </div>
            {selected === addr.id && (
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: C.primaryBlue,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </button>
        ))}

        {/* Add new address */}
        <button
          style={{
            width: '100%',
            background: 'transparent',
            borderRadius: 14,
            padding: '14px 16px',
            border: `2px dashed ${C.divider}`,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginBottom: 20,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <Plus size={18} color={C.primaryBlue} />
          <span style={{ fontSize: 13, fontWeight: 500, color: C.primaryBlue }}>
            Add New Address
          </span>
        </button>
      </div>

      {/* Confirm button */}
      <div
        className="px-4 py-4"
        style={{ background: C.cardWhite, borderTop: `1px solid ${C.divider}` }}
      >
        <button
          onClick={() => navigate('/tracking', { state: { service } })}
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
          Confirm Address
        </button>
      </div>
    </div>
  );
}
