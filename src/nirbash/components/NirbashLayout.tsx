import React, { useState } from 'react';
import { Outlet, Link, NavLink, useLocation } from 'react-router-dom';
import { Leaf, Menu, X, Globe, ArrowLeft, Heart, Scale, Building2, UserCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { NirbashProvider, useNirbash } from '../context/NirbashContext';
import FloatingCompareBar from './FloatingCompareBar';
import clsx from 'clsx';

function NirbashLayoutInner() {
  const { lang, setLang } = useLanguage();
  const { savedIds, comparedIds } = useNirbash();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/nirbash/properties', label: { en: 'Properties', bn: 'সম্পত্তি' } },
    { to: '/nirbash/properties?category=land_plot', label: { en: 'Land Plots', bn: 'জমির প্লট' } },
    { to: '/nirbash/properties?category=ready_to_move', label: { en: 'Flats', bn: 'ফ্ল্যাট' } },
    { to: '/nirbash/companies', label: { en: 'Companies', bn: 'কোম্পানি' } },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* NIRBASH Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              {/* Back to JOMI-SHARE */}
              <Link
                to="/"
                className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-green-800 transition-colors border-r border-gray-200 pr-3 mr-1"
                title="Back to JOMI-SHARE"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">JOMI-SHARE</span>
              </Link>

              <Link to="/nirbash" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-800 rounded-xl flex items-center justify-center shadow-sm">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-base font-black text-green-950 leading-tight tracking-tight">NIRBASH</div>
                  <div className="text-[9px] font-bold text-green-700 tracking-wider uppercase leading-none">Property Marketplace</div>
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={clsx(
                    'px-3.5 py-2 rounded-xl text-xs font-semibold transition-all',
                    location.pathname.startsWith(link.to.split('?')[0]) && link.to !== '/nirbash/properties?category=land_plot' && link.to !== '/nirbash/properties?category=ready_to_move'
                      ? 'bg-green-50 text-green-800'
                      : 'text-gray-600 hover:text-green-800 hover:bg-green-50/70'
                  )}
                >
                  {link.label[lang]}
                </NavLink>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Compare Button */}
              <Link
                to="/nirbash/compare"
                className={clsx(
                  'relative p-2 rounded-xl border text-gray-600 hover:text-green-800 hover:border-green-300 transition-all flex items-center gap-1.5',
                  comparedIds.length > 0 ? 'bg-green-50 border-green-200 text-green-800' : 'border-gray-200'
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
                  savedIds.length > 0 ? 'bg-red-50/60 border-red-200 text-red-600' : 'border-gray-200'
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

              {/* Company Portal CTA */}
              <Link
                to="/nirbash/company-dashboard"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-900 hover:bg-green-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'কোম্পানি পোর্টাল' : 'Company Portal'}</span>
              </Link>

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

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(m => !m)}
                className="md:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-3 pb-4 space-y-1 animate-fade-in">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors"
                >
                  {link.label[lang]}
                </Link>
              ))}

              <div className="border-t border-gray-100 my-2 pt-2 space-y-1">
                <Link
                  to="/nirbash/compare"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-sm text-gray-700 hover:bg-green-50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-green-700" />
                    <span>{lang === 'bn' ? 'সম্পত্তি তুলনা' : 'Compare Properties'}</span>
                  </span>
                  {comparedIds.length > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-xs font-bold">
                      {comparedIds.length}
                    </span>
                  )}
                </Link>

                <Link
                  to="/nirbash/saved"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-sm text-gray-700 hover:bg-green-50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span>{lang === 'bn' ? 'পছন্দ তালিকা' : 'Saved Properties'}</span>
                  </span>
                  {savedIds.length > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-xs font-bold">
                      {savedIds.length}
                    </span>
                  )}
                </Link>

                <Link
                  to="/nirbash/company-dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-green-900 font-bold bg-green-50 transition-colors"
                >
                  <Building2 className="w-4 h-4 text-green-800" />
                  <span>{lang === 'bn' ? 'কোম্পানি ড্যাশবোর্ড' : 'Company Dashboard'}</span>
                </Link>

                <Link
                  to="/nirbash/register-company"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <UserCheck className="w-4 h-4 text-gray-500" />
                  <span>{lang === 'bn' ? 'কোম্পানি নিবন্ধন' : 'Register New Company'}</span>
                </Link>
              </div>

              <div className="border-t border-gray-100 mt-2 pt-2">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  {lang === 'bn' ? 'জমি-শেয়ারে ফিরুন' : 'Back to JOMI-SHARE'}
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

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
