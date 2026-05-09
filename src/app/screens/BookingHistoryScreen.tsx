import { useState } from 'react';
import { C } from '../theme/colors';

type FilterType = 'All' | 'Active' | 'Completed' | 'Cancelled';

const bookings = [
  { id: 1, icon: '🧹', name: 'Home Cleaning', date: '3 May 2025', status: 'Completed', amount: '₹548', color: C.successGreen },
  { id: 2, icon: '🚗', name: 'Car Wash', date: '28 Apr 2025', status: 'Completed', amount: '₹249', color: C.successGreen },
  { id: 3, icon: '❄️', name: 'AC Repair', date: '20 Apr 2025', status: 'Cancelled', amount: '₹0', color: '#EA4335' },
  { id: 4, icon: '🔧', name: 'Plumbing', date: '10 Apr 2025', status: 'Completed', amount: '₹399', color: C.successGreen },
  { id: 5, icon: '⚡', name: 'Electrician', date: '2 Apr 2025', status: 'Disputed', amount: '₹299', color: '#FBBC04' },
];

const filters: FilterType[] = ['All', 'Active', 'Completed', 'Cancelled'];

export default function BookingHistoryScreen() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const filtered = bookings.filter((b) => {
    if (activeFilter === 'All') return true;
    return b.status === activeFilter;
  });

  return (
    <div style={{ background: C.bg, minHeight: '100%' }}>
      {/* AppBar */}
      <div
        className="px-4 pt-12 pb-4"
        style={{ background: C.cardWhite, borderBottom: `1px solid ${C.divider}` }}
      >
        <div style={{ fontSize: 20, fontWeight: 600, color: C.textDark }}>My Bookings</div>
      </div>

      {/* Filter chips */}
      <div className="px-4 pt-4 pb-3 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            style={{
              flexShrink: 0, padding: '7px 16px', borderRadius: 20,
              border: `1.5px solid ${activeFilter === filter ? C.primaryBlue : C.divider}`,
              background: activeFilter === filter ? C.primaryBlue : C.cardWhite,
              color: activeFilter === filter ? '#fff' : C.textGrey,
              fontSize: 13, fontWeight: activeFilter === filter ? 600 : 400,
              cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
              transition: 'all 0.2s',
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="px-4 pb-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-12">
            <span style={{ fontSize: 48 }}>📭</span>
            <p style={{ fontSize: 14, color: C.textGrey, marginTop: 8 }}>No bookings found</p>
          </div>
        ) : (
          filtered.map((booking) => (
            <div
              key={booking.id}
              style={{
                background: C.cardWhite, borderRadius: 14,
                padding: '14px 16px', marginBottom: 10,
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                display: 'flex', alignItems: 'center', gap: 12,
              }}
            >
              <div
                style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: '#F3F4F6',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, flexShrink: 0,
                }}
              >
                {booking.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.textDark }}>
                  {booking.name}
                </div>
                <div style={{ fontSize: 11, color: C.textGrey, marginTop: 2 }}>
                  {booking.date}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div
                  style={{
                    background: `${booking.color}20`,
                    color: booking.color,
                    borderRadius: 6, padding: '3px 8px',
                    fontSize: 11, fontWeight: 600,
                  }}
                >
                  {booking.status}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.textDark }}>
                  {booking.amount}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
