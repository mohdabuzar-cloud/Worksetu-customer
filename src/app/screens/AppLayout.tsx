import { Outlet } from 'react-router';
import { BottomNav } from '../components/BottomNav';

export default function AppLayout() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}
