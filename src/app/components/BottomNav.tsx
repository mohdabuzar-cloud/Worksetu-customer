import { useNavigate, useLocation } from 'react-router';
import { Home, Assignment, Notifications, Person } from '@mui/icons-material';
import { C } from '../theme/colors';

const tabs = [
  { label: 'Home', icon: Home, path: '/app' },
  { label: 'Bookings', icon: Assignment, path: '/app/history' },
  { label: 'Alerts', icon: Notifications, path: '/app/notifications' },
  { label: 'Profile', icon: Person, path: '/app/profile' },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="flex"
      style={{
        background: C.cardWhite,
        borderTop: `1px solid ${C.divider}`,
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        const Icon = tab.icon;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px 0 8px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif",
              gap: 3,
            }}
          >
            <Icon
              sx={{
                fontSize: 22,
                color: isActive ? C.primaryBlue : C.textGrey,
                strokeWidth: isActive ? 2.5 : 1.8,
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? C.primaryBlue : C.textGrey,
              }}
            >
              {tab.label}
            </span>
            {isActive && (
              <div
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: C.primaryBlue,
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
