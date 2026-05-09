import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { C } from '../theme/colors';

export default function PaymentInvoiceScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const service = location.state?.service;
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'cash'>('upi');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirmPayment = () => setShowSuccess(true);

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
            width: 38, height: 38, borderRadius: 10,
            border: `1px solid ${C.divider}`, background: C.bg,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <ArrowLeft size={18} color={C.textDark} />
        </button>
        <div style={{ fontSize: 18, fontWeight: 600, color: C.textDark }}>Payment Summary</div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-4 pt-4 pb-6">
        {/* Invoice card */}
        <div
          className="p-4 mb-4"
          style={{ background: C.cardWhite, borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
        >
          <div style={{ fontSize: 15, fontWeight: 600, color: C.textDark, marginBottom: 16 }}>
            🧾 Invoice
          </div>

          {[
            ['Service', service?.name || 'Home Cleaning'],
            ['Worker', 'Suresh Kumar'],
            ['Date', 'Today'],
            ['Duration', '1h 45min'],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between mb-3">
              <span style={{ fontSize: 13, color: C.textGrey }}>{label}</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: C.textDark }}>{value}</span>
            </div>
          ))}

          <div style={{ height: 1, background: C.divider, margin: '12px 0' }} />

          {[
            ['Base Price', '₹499'],
            ['Platform Fee', '₹49'],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between mb-3">
              <span style={{ fontSize: 13, color: C.textGrey }}>{label}</span>
              <span style={{ fontSize: 13, color: C.textDark }}>{value}</span>
            </div>
          ))}

          <div style={{ height: 1, background: C.divider, margin: '12px 0' }} />

          <div className="flex justify-between">
            <span style={{ fontSize: 15, fontWeight: 700, color: C.textDark }}>Total</span>
            <span style={{ fontSize: 17, fontWeight: 700, color: C.primaryBlue }}>₹548</span>
          </div>
        </div>

        {/* Payment methods */}
        <div style={{ fontSize: 15, fontWeight: 600, color: C.textDark, marginBottom: 12 }}>
          Payment Method
        </div>

        {[
          { id: 'upi' as const, icon: '📱', label: 'Pay via UPI', sub: 'Google Pay, PhonePe, Paytm' },
          { id: 'cash' as const, icon: '💵', label: 'Pay Cash to Worker', sub: 'Pay at the time of service' },
        ].map((method) => (
          <button
            key={method.id}
            onClick={() => setSelectedMethod(method.id)}
            style={{
              width: '100%', background: C.cardWhite, borderRadius: 14,
              padding: '14px 16px', border: `2px solid ${selectedMethod === method.id ? C.primaryBlue : C.divider}`,
              cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12,
              marginBottom: 10, fontFamily: "'Poppins', sans-serif",
              boxShadow: selectedMethod === method.id ? `0 0 0 4px ${C.primaryBlue}15` : 'none',
              transition: 'all 0.2s',
            }}
          >
            <div
              style={{
                width: 44, height: 44, borderRadius: 12,
                background: selectedMethod === method.id ? `${C.primaryBlue}15` : '#F3F4F6',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, flexShrink: 0,
              }}
            >
              {method.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.textDark }}>{method.label}</div>
              <div style={{ fontSize: 12, color: C.textGrey, marginTop: 2 }}>{method.sub}</div>
            </div>
            <div
              style={{
                width: 20, height: 20, borderRadius: '50%',
                border: `2px solid ${selectedMethod === method.id ? C.primaryBlue : C.divider}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}
            >
              {selectedMethod === method.id && (
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: C.primaryBlue }} />
              )}
            </div>
          </button>
        ))}

        <div style={{ height: 20 }} />
      </div>

      {/* Pay button */}
      <div
        className="px-4 py-4"
        style={{ background: C.cardWhite, borderTop: `1px solid ${C.divider}` }}
      >
        <button
          onClick={handleConfirmPayment}
          style={{
            width: '100%', height: 52, borderRadius: 12,
            background: C.primaryBlue, color: '#fff',
            fontSize: 16, fontWeight: 600, border: 'none',
            cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
          }}
        >
          Confirm Payment · ₹548
        </button>
      </div>

      {/* Success bottom sheet */}
      {showSuccess && (
        <>
          <div
            onClick={() => setShowSuccess(false)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 40 }}
          />
          <div
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: C.cardWhite, borderRadius: '24px 24px 0 0',
              padding: '32px 24px 40px', zIndex: 50,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: 80, height: 80, borderRadius: '50%',
                background: `${C.successGreen}15`, border: `3px solid ${C.successGreen}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px', fontSize: 36,
              }}
            >
              ✅
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: C.textDark, marginBottom: 6 }}>
              Payment Successful!
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: C.successGreen, marginBottom: 8 }}>
              ₹548
            </div>
            <p style={{ fontSize: 13, color: C.textGrey, marginBottom: 28 }}>
              Your payment has been received successfully
            </p>
            <button
              onClick={() => navigate('/review')}
              style={{
                width: '100%', height: 52, borderRadius: 12,
                background: C.primaryBlue, color: '#fff',
                fontSize: 15, fontWeight: 600, border: 'none',
                cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
              }}
            >
              Rate Your Experience
            </button>
            <button
              onClick={() => navigate('/app')}
              style={{
                width: '100%', height: 44, borderRadius: 12,
                background: 'transparent', color: C.textGrey,
                fontSize: 14, fontWeight: 500, border: 'none',
                cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
                marginTop: 8,
              }}
            >
              Back to Home
            </button>
          </div>
        </>
      )}
    </div>
  );
}
