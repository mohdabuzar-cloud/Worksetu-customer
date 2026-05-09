import { C } from '../theme/colors';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const iconSize = {
    sm: 20,
    md: 28,
    lg: 32,
  }[size];

  const textSize = {
    sm: 20,
    md: 28,
    lg: 32,
  }[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className="rounded-2xl flex items-center justify-center"
        style={{
          background: C.primaryBlue,
          width: iconSize + 8,
          height: iconSize + 8,
        }}
      >
        <img
          src="/logo.png"
          alt="WorkSetu Logo"
          style={{
            width: iconSize,
            height: iconSize,
            objectFit: 'contain',
          }}
          onError={(e) => {
            // Fallback to text if image fails to load
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement!.innerHTML = '🔧';
          }}
        />
      </div>
      {showText && (
        <div>
          <div
            style={{
              fontSize: textSize,
              fontWeight: 700,
              color: C.textDark,
              lineHeight: 1.1,
            }}
          >
            Work<span style={{ color: C.primaryBlue }}>Setu</span>
          </div>
        </div>
      )}
    </div>
  );
}