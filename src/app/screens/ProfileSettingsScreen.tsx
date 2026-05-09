import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  User, MapPin, CreditCard, Bell, HelpCircle, FileText, LogOut,
  ChevronRight,
} from 'lucide-react';
import { C } from '../theme/colors';

const settingsItems = [
  { icon: User, label: 'Edit Profile', color: C.primaryBlue },
  { icon: MapPin, label: 'Saved Addresses', color: '#9C27B0' },
  { icon: CreditCard, label: 'Payment Methods', color: C.successGreen },
  { icon: Bell, label: 'Notification Preferences', color: C.accentOrange },
  { icon: HelpCircle, label: 'Help & Support', color: '#00BCD4', route: '/help' },
  { icon: FileText, label: 'Terms & Privacy', color: C.textGrey },
];

export default function ProfileSettingsScreen() {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  return (
    <div style={{ background: C.bg, minHeight: '100%' }}>
      {/* Profile header */}
      <div
        className="px-4 pt-12 pb-6 flex flex-col items-center"
        style={{ background: 'linear-gradient(160deg, #1A73E8 0%, #1565C0 100%)' }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            border: '3px solid rgba(255,255,255,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36, marginBottom: 12,
          }}
        >
          👤
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 3 }}>
          Rahul Sharma
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>
          +91 98765 43210
        </div>

        {/* Stats row */}
        <div
          className="flex mt-5 w-full"
          style={{
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 14, overflow: 'hidden',
          }}
        >
          {[
            { label: 'Bookings', value: '5' },
            { label: 'Rating', value: '4.8 ⭐' },
            { label: 'Member Since', value: '2025' },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center py-3"
              style={{
                flex: 1,
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.2)' : 'none',
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings list */}
      <div className="px-4 pt-5">
        <div
          style={{
            background: C.cardWhite, borderRadius: 16,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            overflow: 'hidden',
          }}
        >
          {settingsItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={i}
                onClick={() => item.route ? navigate(item.route) : undefined}
                style={{
                  width: '100%', padding: '14px 16px',
                  border: 'none', background: 'transparent',
                  cursor: item.route ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', gap: 12,
                  borderBottom: i < settingsItems.length - 1 ? `1px solid ${C.divider}` : 'none',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                <div
                  style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: `${item.color}15`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} color={item.color} />
                </div>
                <span style={{ flex: 1, fontSize: 14, color: C.textDark, textAlign: 'left' }}>
                  {item.label}
                </span>
                <ChevronRight size={16} color={C.textGrey} />
              </button>
            );
          })}
        </div>

        {/* Logout */}
        <button
          onClick={() => setShowLogout(true)}
          style={{
            width: '100%', marginTop: 12,
            background: `${C.errorRed}10`,
            borderRadius: 14, padding: '14px 16px',
            border: `1px solid ${C.errorRed}20`,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <div
            style={{
              width: 38, height: 38, borderRadius: 10,
              background: `${C.errorRed}15`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <LogOut size={18} color={C.errorRed} />
          </div>
          <span style={{ flex: 1, fontSize: 14, color: C.errorRed, fontWeight: 500, textAlign: 'left' }}>
            Logout
          </span>
          <ChevronRight size={16} color={C.errorRed} />
        </button>

        {/* App version */}
        <div style={{ textAlign: 'center', fontSize: 12, color: C.textGrey, marginTop: 16, marginBottom: 20 }}>
          WorkSetu v1.0.0 · Customer App
        </div>
      </div>

      {/* Logout confirmation dialog */}
      {showLogout && (
        <>
          <div
            onClick={() => setShowLogout(false)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 40 }}
          />
          <div
            style={{
              position: 'absolute', top: '50%', left: 20, right: 20,
              transform: 'translateY(-50%)',
              background: C.cardWhite, borderRadius: 20, padding: 24,
              zIndex: 50, textAlign: 'center',
              boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 12 }}>👋</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: C.textDark, marginBottom: 8 }}>
              Logout?
            </div>
            <p style={{ fontSize: 13, color: C.textGrey, marginBottom: 24, lineHeight: 1.5 }}>
              Are you sure you want to logout from WorkSetu?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogout(false)}
                style={{
                  flex: 1, height: 46, borderRadius: 12,
                  border: `1.5px solid ${C.divider}`, background: 'transparent',
                  fontSize: 14, fontWeight: 500, color: C.textGrey,
                  cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => navigate('/')}
                style={{
                  flex: 1, height: 46, borderRadius: 12,
                  background: C.errorRed, color: '#fff',
                  border: 'none', fontSize: 14, fontWeight: 600,
                  cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}