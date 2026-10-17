import React, { useState } from 'react';
import { Outlet, Link, NavLink, useLocation } from 'react-router-dom';
import {
  Leaf, Menu, X, Globe, Heart, Scale, Building2,
  UserCheck, User, LogOut, PlusCircle, Users, Sparkles
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { NirbashProvider, useNirbash } from '../context/NirbashContext';
import FloatingCompareBar from './FloatingCompareBar';
import AuthModal from './AuthModal';
import JomiBazarDrawer from './JomiBazarDrawer';
import clsx from 'clsx';

function NirbashLayoutInner() {
  const { lang, setLang } = useLanguage();
  const {
    savedIds, comparedIds, isLoggedIn, currentUser, logout, setShowAuthModal
  } = useNirbash();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: { en: 'Home', bn: 'হোম' }, exact: true },
    { to: '/properties', label: { en: 'Buy Property', bn: 'প্রপার্টি কিনুন' } },
    { to: '/agents', label: { en: 'All Agent', bn: 'সকল এজেন্ট' } },
    { to: '/services', label: { en: 'Services', bn: 'সেবাসমূহ' } },
    { to: '/properties?category=land_plot', label: { en: 'Land Plots', bn: 'জমির প্লট' } },
    { to: '/companies', label: { en: 'Companies', bn: 'কোম্পানি' } },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* NIRBASH / Jomi Bazar Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left: Hamburger Button & NIRBASH Brand Logo */}
            <div className="flex items-center gap-3">
              {/* Green Hamburger Button matching design */}
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="w-10 h-10 bg-[#123824] hover:bg-[#194c33] active:scale-95 rounded-lg flex flex-col justify-center items-center gap-[5px] shadow-sm transition-all focus:outline-none cursor-pointer flex-shrink-0"
                aria-label="Open Nirbash Menu"
                title={lang === 'bn' ? 'মেনু খুলুন' : 'Open Menu'}
              >
                <span className="w-5 h-[2.5px] bg-white rounded-full"></span>
                <span className="w-5 h-[2.5px] bg-white rounded-full"></span>
                <span className="w-5 h-[2.5px] bg-white rounded-full"></span>
              </button>

              {/* NIRBASH Main Logo */}
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-green-900 group-hover:bg-green-800 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0 transition-colors">
                  <Leaf className="w-4 h-4 text-emerald-300" />
                </div>
                <div>
                  <div className="text-base font-black text-green-950 leading-tight tracking-tight flex items-center gap-1.5">
                    <span>NIRBASH</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 bg-green-100 text-green-800 rounded">
                      নিবাস
                    </span>
                  </div>
                  <div className="text-[9px] font-bold text-green-700 tracking-wide uppercase leading-none hidden xs:block">
                    {lang === 'bn' ? 'প্রপার্টি মার্কেটপ্লেস' : 'Property Marketplace'}
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => {
                const isActive = link.exact
                  ? location.pathname === '/' || location.pathname === '/nirbash'
                  : location.pathname.startsWith(link.to.split('?')[0]) || location.pathname.startsWith('/nirbash' + link.to.split('?')[0]);
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={clsx(
                      'px-3 py-2 rounded-xl text-xs font-bold transition-all',
                      isActive
                        ? 'bg-green-100/70 text-green-900'
                        : 'text-gray-600 hover:text-green-900 hover:bg-green-50/70'
                    )}
                  >
                    {link.label[lang]}
                  </NavLink>
                );
              })}

              {/* JOMI-SHARE AI Integrated Module in Nirbash Header */}
              <Link
                to="/jomi-share"
                className="ml-1 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-800 to-green-900 text-white hover:from-emerald-700 hover:to-green-800 text-xs font-black transition-all shadow-xs border border-emerald-600/40 hover:scale-[1.02]"
                title="JOMI-SHARE AI Land Intelligence & Partition Engine"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span>{lang === 'bn' ? 'জমি শেয়ার (AI)' : 'JOMI-SHARE AI'}</span>
                <span className="text-[9px] bg-amber-400 text-green-950 px-1 py-0.2 rounded font-extrabold uppercase">
                  {lang === 'bn' ? 'টুলস' : 'Tools'}
                </span>
              </Link>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Compare Button */}
              <Link
                to="/nirbash/compare"
                className={clsx(
                  'relative p-2 rounded-xl border text-gray-600 hover:text-green-800 hover:border-green-300 transition-all flex items-center gap-1.5',
                  comparedIds.length > 0 ? 'bg-green-50 border-green-200 text-green-800 font-bold' : 'border-gray-200'
                )}
                title="Compare Properties"
              >
                <Scale className="w-4 h-4" />
                <span className="hidden xl:inline text-xs font-semibold">
                  {lang === 'bn' ? 'তুলনা' : 'Compare'}
                </span>
                {comparedIds.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-green-800 text-white text-[10px] font-bold flex items-center justify-center">
                    {comparedIds.length}
                  </span>
                )}
              </Link>

              {/* Saved / Wishlist */}
              <Link
                to="/nirbash/saved"
                className={clsx(
                  'relative p-2 rounded-xl border text-gray-600 hover:text-red-600 hover:border-red-200 transition-all flex items-center gap-1.5',
                  savedIds.length > 0 ? 'bg-red-50/60 border-red-200 text-red-600 font-bold' : 'border-gray-200'
                )}
                title="Saved Properties"
              >
                <Heart className="w-4 h-4" fill={savedIds.length > 0 ? 'currentColor' : 'none'} />
                <span className="hidden xl:inline text-xs font-semibold">
                  {lang === 'bn' ? 'সংরক্ষিত' : 'Saved'}
                </span>
                {savedIds.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {savedIds.length}
                  </span>
                )}
              </Link>

              {/* Post Free Ad / Company Dashboard CTA */}
              <Link
                to="/nirbash/company-dashboard"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 bg-amber-400 hover:bg-amber-300 text-green-950 rounded-xl text-xs font-black transition-all shadow-xs"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? '+ বিজ্ঞাপন দিন' : '+ Post Ad'}</span>
              </Link>

              {/* User Login / Profile status */}
              {isLoggedIn ? (
                <div className="flex items-center gap-1.5 bg-gray-100 py-1 px-2.5 rounded-xl text-xs">
                  <User className="w-3.5 h-3.5 text-green-800" />
                  <span className="font-bold text-gray-800 max-w-[80px] sm:max-w-[120px] truncate">
                    {currentUser?.name}
                  </span>
                  <button
                    onClick={logout}
                    className="p-1 hover:text-red-600 transition-colors ml-1"
                    title="Log Out"
                  >
                    <LogOut className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-3 py-2 bg-green-900 hover:bg-green-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{lang === 'bn' ? 'লগইন / রেজিস্টার' : 'Sign In'}</span>
                  <span className="sm:hidden">{lang === 'bn' ? 'লগইন' : 'Login'}</span>
                </button>
              )}

              {/* Lang switcher */}
              <div className="inline-flex items-center p-0.5 bg-gray-100 rounded-xl border border-gray-200 text-xs">
                <button
                  onClick={() => setLang('en')}
                  className={clsx('px-2 py-1 rounded-lg font-semibold transition-all', lang === 'en' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-800')}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang('bn')}
                  className={clsx('flex items-center gap-1 px-2 py-1 rounded-lg font-semibold transition-all', lang === 'bn' ? 'bg-green-800 text-white shadow-xs' : 'text-gray-500 hover:text-gray-800')}
                >
                  <Globe className="w-3 h-3" />
                  বাংলা
                </button>
              </div>

              {/* Mobile menu toggle button -> opens JomiBazarDrawer */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden w-10 h-10 bg-[#123824] hover:bg-[#194c33] active:scale-95 rounded-lg flex flex-col justify-center items-center gap-[5px] shadow-sm transition-all focus:outline-none cursor-pointer"
                aria-label="Open Nirbash Menu"
              >
                <span className="w-5 h-[2.5px] bg-white rounded-full"></span>
                <span className="w-5 h-[2.5px] bg-white rounded-full"></span>
                <span className="w-5 h-[2.5px] bg-white rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-out Jomi Bazar Drawer Navigation */}
      <JomiBazarDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Jomi Bazar Login / Register Modal */}
      <AuthModal />

      {/* Floating Compare Bar */}
      <FloatingCompareBar />
    </div>
  );
}

export default function NirbashLayout() {
  return (
    <NirbashProvider>
      <NirbashLayoutInner />
    </NirbashProvider>
  );
}
