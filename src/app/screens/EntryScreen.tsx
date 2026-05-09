import { useNavigate } from 'react-router';
import { C } from '../theme/colors';
import { Logo } from '../components/Logo';

export default function EntryScreen() {
  const navigate = useNavigate();

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center px-6"
      style={{ background: C.bg }}
    >
      {/* Logo */}
      <Logo size="lg" className="mb-3" />

      <p style={{ fontSize: 14, color: C.textGrey, marginBottom: 48 }}>
        Connecting Work with Trust
      </p>

      {/* Illustration */}
      <div
        className="w-56 h-56 rounded-3xl flex items-center justify-center mb-10"
        style={{ background: `${C.primaryBlue}15` }}
      >
        <span style={{ fontSize: 80 }}>🏡</span>
      </div>

      <h1
        style={{
          fontSize: 24,
          fontWeight: 600,
          color: C.textDark,
          textAlign: 'center',
          marginBottom: 8,
        }}
      >
        Home Services at Your Doorstep
      </h1>
      <p
        style={{
          fontSize: 14,
          color: C.textGrey,
          textAlign: 'center',
          marginBottom: 40,
          lineHeight: 1.6,
        }}
      >
        Book trusted professionals for all your home service needs
      </p>

      <button
        onClick={() => navigate('/login')}
        className="w-full"
        style={{
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
        Login
      </button>
    </div>
  );
}
