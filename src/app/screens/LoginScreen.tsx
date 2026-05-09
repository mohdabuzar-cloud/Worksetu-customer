import { useState } from 'react';
import { useNavigate } from 'react-router';
import { C } from '../theme/colors';
import { Logo } from '../components/Logo';

export default function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const showSnackbar = (msg: string, isError = false) => {
    setSnackbar(msg);
    setError(isError ? msg : '');
    setTimeout(() => setSnackbar(''), 3000);
  };

  const handleLogin = () => {
    if (!email || !password) {
      showSnackbar('Please fill in all fields', true);
      return;
    }

    // Simple validation for demo
    if (email === 'user@worksetu.com' && password === 'password123') {
      navigate('/app');
    } else {
      showSnackbar('Invalid email or password', true);
    }
  };

  return (
    <div className="flex-1 flex flex-col" style={{ background: C.bg }}>
      {/* Top blue area */}
      <div
        className="px-6 pt-14 pb-8"
        style={{ background: 'linear-gradient(160deg, #1A73E8 0%, #1565C0 100%)' }}
      >
        <div className="flex items-center justify-center mb-6">
          <Logo size="md" showText={false} />
        </div>
        <div style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 6, textAlign: 'center' }}>
          Welcome Back
        </div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', textAlign: 'center' }}>
          Login to book services near you
        </div>
      </div>

      <div className="flex-1 px-6 pt-8 flex flex-col gap-5" style={{ overflowY: 'auto' }}>
        {/* Email input */}
        <div>
          <label style={{ fontSize: 13, fontWeight: 500, color: C.textDark, display: 'block', marginBottom: 8 }}>
            Email or Username
          </label>
          <input
            type="text"
            placeholder="Enter your email or username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              height: 52,
              borderRadius: 12,
              border: `1.5px solid ${C.divider}`,
              background: '#F3F4F6',
              padding: '0 16px',
              fontSize: 14,
              color: C.textDark,
              fontFamily: "'Poppins', sans-serif",
              outline: 'none',
            }}
          />
        </div>

        {/* Password input */}
        <div>
          <label style={{ fontSize: 13, fontWeight: 500, color: C.textDark, display: 'block', marginBottom: 8 }}>
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                height: 52,
                borderRadius: 12,
                border: `1.5px solid ${C.divider}`,
                background: '#F3F4F6',
                padding: '0 50px 0 16px',
                fontSize: 14,
                color: C.textDark,
                fontFamily: "'Poppins', sans-serif",
                outline: 'none',
              }}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: C.textGrey,
                fontSize: 14,
              }}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        {/* Forgot password */}
        <div style={{ textAlign: 'right' }}>
          <button
            style={{
              background: 'transparent',
              border: 'none',
              color: C.primaryBlue,
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Forgot Password?
          </button>
        </div>

        {/* Login button */}
        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            height: 52,
            borderRadius: 12,
            background: C.primaryBlue,
            color: '#fff',
            fontSize: 15,
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Login
        </button>

        {/* Demo credentials */}
        <div
          style={{
            background: '#FFF3CD',
            border: '1px solid #FFEAA7',
            borderRadius: 8,
            padding: '12px',
            marginTop: 8,
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 600, color: '#856404', marginBottom: 4 }}>
            Demo Credentials:
          </div>
          <div style={{ fontSize: 11, color: '#856404' }}>
            Email: user@worksetu.com<br />
            Password: password123
          </div>
        </div>

        {/* Register link */}
        <p style={{ textAlign: 'center', fontSize: 14, color: C.textGrey }}>
          Don't have an account?{' '}
          <span
            style={{ color: C.primaryBlue, fontWeight: 500, cursor: 'pointer' }}
            onClick={() => showSnackbar('Registration coming soon!', false)}
          >
            Register
          </span>
        </p>
      </div>

      {/* Snackbar */}
      {snackbar && (
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            left: 16,
            right: 16,
            background: error ? C.errorRed : C.successGreen,
            color: '#fff',
            borderRadius: 12,
            padding: '12px 16px',
            fontSize: 13,
            fontWeight: 500,
            textAlign: 'center',
            zIndex: 999,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          {snackbar}
        </div>
      )}
    </div>
  );
}
