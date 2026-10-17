import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Map, FileSearch, ShieldCheck, Users,
  Scissors, AlertTriangle, Sliders, FileText, Info,
  ChevronLeft, ChevronRight, Leaf, Store, ArrowLeft, Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import clsx from 'clsx';

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useApp();
  const { lang, t } = useLanguage();
  const location = useLocation();

  const NAV_ITEMS = [
    { path: '/jomi-share',           aliases: ['/jomi-share', '/jomi-share/overview'], icon: LayoutDashboard, label: t.nav.overview },
    { path: '/jomi-share/map',       aliases: ['/map', '/jomi-share/map'],             icon: Map,             label: t.nav.map },
    { path: '/jomi-share/land-dna',  aliases: ['/land-dna', '/jomi-share/land-dna'],   icon: FileSearch,      label: t.nav.landDna },
    { path: '/jomi-share/verification', aliases: ['/verification', '/jomi-share/verification'], icon: ShieldCheck, label: t.nav.verification },
    { path: '/jomi-share/inheritance', aliases: ['/inheritance', '/jomi-share/inheritance'], icon: Users,    label: t.nav.inheritance },
    { path: '/jomi-share/partition', aliases: ['/partition', '/jomi-share/partition'], icon: Scissors,       label: t.nav.partition },
    { path: '/jomi-share/heatmap',   aliases: ['/heatmap', '/jomi-share/heatmap'],     icon: AlertTriangle,   label: t.nav.heatmap },
    { path: '/jomi-share/simulator', aliases: ['/simulator', '/jomi-share/simulator'], icon: Sliders,        label: t.nav.simulator },
    { path: '/jomi-share/reports',   aliases: ['/reports', '/jomi-share/reports'],     icon: FileText,        label: t.nav.reports },
    { path: '/jomi-share/about',     aliases: ['/about', '/jomi-share/about'],         icon: Info,            label: t.nav.about },
    { path: '/',                     aliases: ['/nirbash'],                            icon: Store,           label: t.nav.nirbash ?? 'NIRBASH', isDivider: true },
  ];

  return (
    <aside
      className={clsx(
        'fixed inset-y-0 left-0 z-30 flex flex-col bg-white border-r border-gray-100 shadow-sm transition-all duration-300',
        sidebarOpen ? 'w-56' : 'w-16',
      )}
    >
      {/* Logo & Back to Nirbash indicator */}
      <div className={clsx('flex items-center gap-2 px-4 py-3.5 border-b border-gray-100', !sidebarOpen && 'justify-center')}>
        <div className="flex-shrink-0 w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
          <Leaf className="w-4 h-4 text-white" />
        </div>
        {sidebarOpen && (
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-navy-800 leading-tight truncate">{t.appName}</div>
            <div className="text-[10px] text-emerald-700 font-semibold leading-tight flex items-center gap-1">
              <span>NIRBASH AI Core</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick link back to NIRBASH Main Marketplace */}
      <div className="px-2 pt-2.5 pb-1">
        <Link
          to="/"
          className={clsx(
            'flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 transition-colors shadow-2xs',
            !sidebarOpen && 'justify-center'
          )}
          title="Return to NIRBASH Property Portal"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
          {sidebarOpen && <span className="truncate">{lang === 'bn' ? '← নিবাস পোর্টাল' : '← NIRBASH Portal'}</span>}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
        {NAV_ITEMS.map((item: any) => {
          const { path, aliases, icon: Icon, label, isDivider } = item;
          const isActive = (aliases || [path]).some((p: string) => {
            if (p === '/' || p === '/jomi-share') return location.pathname === p;
            return location.pathname.startsWith(p);
          });
          return (
            <React.Fragment key={path}>
              {isDivider && (
                <div className={clsx('flex items-center gap-2 mt-3 mb-1.5 px-3', !sidebarOpen && 'justify-center')}>
                  <div className="flex-1 h-px bg-gray-100" />
                  {sidebarOpen && <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider whitespace-nowrap">Main Portal</span>}
                  <div className="flex-1 h-px bg-gray-100" />
                </div>
              )}
              <NavLink
                to={path}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                  isActive
                    ? (isDivider ? 'bg-green-50 text-green-700 font-bold' : 'bg-brand-50 text-brand-700 font-semibold')
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
