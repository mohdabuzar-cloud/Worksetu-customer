import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Logo } from '../components/Logo';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/login'), 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(160deg, #1A73E8 0%, #0D47A1 100%)',
      }}
    >
      <div className="mb-4">
        <Logo size="lg" showText={false} />
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: '#fff',
            letterSpacing: -0.5,
            textAlign: 'center',
            marginTop: 12,
          }}
        >
          WorkSetu
        </div>
      </div>

      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 60 }}>
        Connecting Work with Trust
      </p>

      {/* Loader */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.5)',
              animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
