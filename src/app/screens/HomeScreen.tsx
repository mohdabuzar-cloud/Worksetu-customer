import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Bell, MapPin, Search } from 'lucide-react';
import { C } from '../theme/colors';

export const services = [
  { id: 1, icon: '🧹', name: 'Home Cleaning', price: 'From ₹299', color: '#E3F2FD', bg: '#BBDEFB' },
  { id: 2, icon: '🚗', name: 'Car Wash', price: 'From ₹199', color: '#F3E5F5', bg: '#E1BEE7' },
  { id: 3, icon: '🔧', name: 'Plumbing', price: 'From ₹349', color: '#E8F5E9', bg: '#C8E6C9' },
  { id: 4, icon: '❄️', name: 'AC Repair', price: 'From ₹499', color: '#FFF3E0', bg: '#FFE0B2' },
  { id: 5, icon: '🛋️', name: 'Sofa Cleaning', price: 'From ₹399', color: '#FCE4EC', bg: '#F8BBD0' },
  { id: 6, icon: '⚡', name: 'Electrician', price: 'From ₹249', color: '#E0F7FA', bg: '#B2EBF2' },
];

export default function HomeScreen() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = services.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: C.bg, minHeight: '100%' }}>
      {/* Top bar */}
      <div
        className="px-4 pt-12 pb-5"
        style={{ background: 'linear-gradient(160deg, #1A73E8 0%, #1565C0 100%)' }}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#fff' }}>
              Hello, Rahul 👋
            </div>
            <div
              className="flex items-center gap-1 mt-1"
              style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}
            >
              <MapPin size={12} />
              <span>Model Town, Ludhiana</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/app/notifications')}
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <Bell size={20} color="#fff" />
            <div
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: C.accentOrange,
                border: '1.5px solid #1565C0',
              }}
            />
          </button>
        </div>

        {/* Search bar */}
        <div
          className="flex items-center gap-2 px-4"
          style={{
            background: '#fff',
            borderRadius: 12,
            height: 46,
          }}
        >
          <Search size={18} color={C.textGrey} />
          <input
            type="text"
            placeholder="Search for services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              outline: 'none',
              fontSize: 14,
              color: C.textDark,
              fontFamily: "'Poppins', sans-serif",
            }}
          />
        </div>
      </div>

      {/* Services grid */}
      <div className="px-4 pt-5">
        {/* Banner */}
        <div
          className="mb-5 px-4 py-4 flex items-center gap-3"
          style={{
            background: `${C.accentOrange}15`,
            borderRadius: 14,
            border: `1px solid ${C.accentOrange}30`,
          }}
        >
          <span style={{ fontSize: 28 }}>🎉</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.textDark }}>
              First Booking Offer
            </div>
            <div style={{ fontSize: 12, color: C.textGrey }}>
              Get 20% off on your first service
            </div>
          </div>
          <div
            style={{
              marginLeft: 'auto',
              background: C.accentOrange,
              color: '#fff',
              borderRadius: 8,
              padding: '4px 10px',
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            USE: FIRST20
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div style={{ fontSize: 16, fontWeight: 600, color: C.textDark }}>
            Our Services
          </div>
          <span style={{ fontSize: 12, color: C.primaryBlue, fontWeight: 500 }}>
            {filtered.length} available
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-10">
            <span style={{ fontSize: 48 }}>🔍</span>
            <p style={{ fontSize: 14, color: C.textGrey, marginTop: 8 }}>No services found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((service) => (
              <button
                key={service.id}
                onClick={() => navigate('/service', { state: { service } })}
                style={{
                  background: C.cardWhite,
                  borderRadius: 16,
                  padding: '16px 12px',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                <div
                  className="flex items-center justify-center mb-3"
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: service.color,
                  }}
                >
                  <span style={{ fontSize: 26 }}>{service.icon}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.textDark, marginBottom: 4 }}>
                  {service.name}
                </div>
                <div style={{ fontSize: 12, color: C.primaryBlue, fontWeight: 500 }}>
                  {service.price}
                </div>
              </button>
            ))}
          </div>
        )}

        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}
