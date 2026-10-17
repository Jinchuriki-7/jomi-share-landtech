import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Map, FileSearch, ShieldCheck, Users,
  Scissors, AlertTriangle, Sliders, FileText, Info,
  ChevronLeft, ChevronRight, Leaf, Store,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import clsx from 'clsx';

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useApp();
  const { t } = useLanguage();
  const location = useLocation();

  const NAV_ITEMS = [
    { path: '/',                icon: LayoutDashboard, label: t.nav.overview },
    { path: '/map',             icon: Map,             label: t.nav.map },
    { path: '/land-dna',        icon: FileSearch,      label: t.nav.landDna },
    { path: '/verification',    icon: ShieldCheck,     label: t.nav.verification },
    { path: '/inheritance',     icon: Users,           label: t.nav.inheritance },
    { path: '/partition',       icon: Scissors,        label: t.nav.partition },
    { path: '/heatmap',         icon: AlertTriangle,   label: t.nav.heatmap },
    { path: '/simulator',       icon: Sliders,         label: t.nav.simulator },
    { path: '/reports',         icon: FileText,        label: t.nav.reports },
    { path: '/about',           icon: Info,            label: t.nav.about },
    { path: '/nirbash',         icon: Store,           label: t.nav.nirbash ?? 'NIRBASH', isDivider: true },
  ];

  return (
    <aside
      className={clsx(
        'fixed inset-y-0 left-0 z-30 flex flex-col bg-white border-r border-gray-100 shadow-sm transition-all duration-300',
        sidebarOpen ? 'w-56' : 'w-16',
      )}
    >
      {/* Logo */}
      <div className={clsx('flex items-center gap-2 px-4 py-4 border-b border-gray-100', !sidebarOpen && 'justify-center')}>
        <div className="flex-shrink-0 w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
          <Leaf className="w-4 h-4 text-white" />
        </div>
        {sidebarOpen && (
          <div>
            <div className="text-sm font-bold text-navy-800 leading-tight">{t.appName}</div>
            <div className="text-[10px] text-gray-500 leading-tight">{t.appSubtitle}</div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
        {NAV_ITEMS.map(({ path, icon: Icon, label, isDivider }: any) => {
          const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
          return (
            <React.Fragment key={path}>
              {isDivider && (
                <div className={clsx('flex items-center gap-2 mt-2 mb-1 px-3', !sidebarOpen && 'justify-center')}>
                  <div className="flex-1 h-px bg-gray-100" />
                  {sidebarOpen && <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider whitespace-nowrap">Marketplace</span>}
                  <div className="flex-1 h-px bg-gray-100" />
                </div>
              )}
              <NavLink
                to={path}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                  isActive
                    ? (isDivider ? 'bg-green-50 text-green-700' : 'bg-brand-50 text-brand-700')
                    : (isDivider ? 'text-green-700 hover:bg-green-50 hover:text-green-800' : 'text-gray-600 hover:bg-gray-50 hover:text-navy-800'),
                  !sidebarOpen && 'justify-center',
                )}
                title={!sidebarOpen ? label : undefined}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {sidebarOpen && <span className="truncate">{label}</span>}
              </NavLink>
            </React.Fragment>
          );
        })}
      </nav>

      {/* Collapse button */}
      <div className="border-t border-gray-100 p-2">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
        >
          {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          {sidebarOpen && <span>{t.nav.collapse}</span>}
        </button>
      </div>
    </aside>
  );
}
