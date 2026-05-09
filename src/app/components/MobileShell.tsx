import { Outlet } from 'react-router';

export function MobileShell() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{ background: '#E5E7EB', fontFamily: "'Poppins', sans-serif" }}
    >
      <div
        className="relative w-full max-w-[390px] overflow-hidden flex flex-col"
        style={{
          height: '100dvh',
          maxHeight: '100dvh',
          background: '#F7F8FA',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
