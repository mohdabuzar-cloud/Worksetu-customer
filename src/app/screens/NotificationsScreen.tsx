import { C } from '../theme/colors';

const notifications = [
  { id: 1, icon: '✅', title: 'Booking Confirmed', sub: 'Home Cleaning booked', time: '2 min ago', color: C.successGreen },
  { id: 2, icon: '👷', title: 'Worker Assigned', sub: 'Suresh Kumar accepted your request', time: '5 min ago', color: C.primaryBlue },
  { id: 3, icon: '📍', title: 'Worker Arrived', sub: 'Suresh has arrived at your location', time: '1 hr ago', color: C.primaryBlue },
  { id: 4, icon: '✓', title: 'Service Complete', sub: 'Your service is done', time: '2 hr ago', color: C.successGreen },
  { id: 5, icon: '💰', title: 'Payment Received', sub: '₹548 paid successfully', time: '2 hr ago', color: C.successGreen },
  { id: 6, icon: '⭐', title: 'Rate Your Experience', sub: 'How was your Home Cleaning?', time: 'Yesterday', color: '#FBBC04' },
  { id: 7, icon: '🎉', title: 'New Service Added', sub: 'Sofa Cleaning is now available', time: '2 days ago', color: C.accentOrange },
  { id: 8, icon: '🔔', title: 'Special Offer', sub: 'Book again and get 10% off', time: '3 days ago', color: C.accentOrange },
];

export default function NotificationsScreen() {
  return (
    <div style={{ background: C.bg, minHeight: '100%' }}>
      {/* AppBar */}
      <div
        className="px-4 pt-12 pb-4"
        style={{ background: C.cardWhite, borderBottom: `1px solid ${C.divider}` }}
      >
        <div style={{ fontSize: 20, fontWeight: 600, color: C.textDark }}>Notifications</div>
        <div style={{ fontSize: 12, color: C.textGrey, marginTop: 2 }}>
          {notifications.length} notifications
        </div>
      </div>

      <div className="px-4 pt-4 pb-4">
        {notifications.map((notif, i) => (
          <div
            key={notif.id}
            style={{
              background: C.cardWhite, borderRadius: 14,
              padding: '14px 16px', marginBottom: 8,
              display: 'flex', alignItems: 'flex-start', gap: 12,
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              borderLeft: i < 2 ? `3px solid ${notif.color}` : '3px solid transparent',
            }}
          >
            <div
              style={{
                width: 42, height: 42, borderRadius: 12,
                background: `${notif.color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, flexShrink: 0,
              }}
            >
              {notif.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 13, fontWeight: i < 2 ? 600 : 500,
                  color: C.textDark, marginBottom: 3,
                }}
              >
                {notif.title}
                {i < 2 && (
                  <span
                    style={{
                      marginLeft: 6, display: 'inline-block',
                      width: 6, height: 6, borderRadius: '50%',
                      background: C.primaryBlue, verticalAlign: 'middle',
                    }}
                  />
                )}
              </div>
              <div style={{ fontSize: 12, color: C.textGrey, lineHeight: 1.4 }}>
                {notif.sub}
              </div>
            </div>
            <div style={{ fontSize: 11, color: C.textGrey, flexShrink: 0, marginTop: 2 }}>
              {notif.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
