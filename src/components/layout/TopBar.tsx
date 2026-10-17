import { Bell, RefreshCw, User, Globe } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import clsx from 'clsx';

export default function TopBar() {
  const { resetDemo } = useApp();
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-5 fixed top-0 right-0 left-0 z-20 shadow-sm">
      {/* Left spacer — filled by sidebar */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 ml-1">
          <span className="text-sm font-semibold text-navy-800 hidden sm:block">
            {t.appName}
          </span>
          <span className="text-gray-300 hidden sm:block">·</span>
          <span className="text-xs text-gray-500 hidden sm:block">
            {t.demoCase}
          </span>
        </div>
      </div>

      {/* Center — demo badge */}
      <div className="demo-badge">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse-slow" />
        <span className="truncate max-w-[200px] sm:max-w-none">{t.demoBadge}</span>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Language Switcher */}
        <div className="inline-flex items-center p-0.5 bg-gray-100/80 rounded-lg border border-gray-200/80">
          <button
            type="button"
            onClick={() => setLang('en')}
            className={clsx(
              'flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-md transition-all duration-150',
              lang === 'en'
                ? 'bg-white text-navy-800 shadow-xs'
                : 'text-gray-500 hover:text-navy-700'
            )}
            title="Switch to English"
          >
            <span>EN</span>
          </button>
          <button
            type="button"
            onClick={() => setLang('bn')}
            className={clsx(
              'flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-all duration-150',
              lang === 'bn'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'text-gray-500 hover:text-navy-700'
            )}
            title="বাংলায় পরিবর্তন করুন"
          >
            <Globe className="w-3 h-3" />
            <span>বাংলা</span>
          </button>
        </div>

        <button
          onClick={resetDemo}
          className="btn-secondary text-xs gap-1.5 py-1.5"
          title="Reset all demo data to original state"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{t.resetDemo}</span>
        </button>

        <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-brand-500 rounded-full" />
        </button>

        <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="w-7 h-7 bg-navy-700 rounded-full flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs font-medium text-navy-700 hidden sm:block">{t.demoUser}</span>
        </button>
      </div>
    </header>
  );
}
