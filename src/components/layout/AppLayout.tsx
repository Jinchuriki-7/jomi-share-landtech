import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useApp } from '../../context/AppContext';
import clsx from 'clsx';

export default function AppLayout() {
  const { sidebarOpen } = useApp();
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Sidebar />
      <main
        className={clsx(
          'pt-14 min-h-screen transition-all duration-300',
          sidebarOpen ? 'pl-56' : 'pl-16',
        )}
      >
        <div className="p-5 animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
