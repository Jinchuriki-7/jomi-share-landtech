import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  X, Home, ShoppingCart, User, Minus, Plus, Info, Mail,
  ChevronDown, ChevronRight, FileText, CheckCircle2, ShieldCheck,
  Building2, Scale, Heart, PlusCircle, ArrowLeft, ArrowRight, ExternalLink,
  AlertTriangle, Phone, MessageCircle, Send, Sparkles, Clock, Calendar,
  Map, FileSearch, Scissors, Users, Layers
} from 'lucide-react';
import clsx from 'clsx';
import { useLanguage } from '../../context/LanguageContext';

interface JomiBazarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type ActiveModalType = 'about' | 'contact' | 'blog' | 'disclaimer' | 'privacy' | 'terms' | 'guidelines' | null;

export default function JomiBazarDrawer({ isOpen, onClose }: JomiBazarDrawerProps) {
  const navigate = useNavigate();
  const { lang, setLang } = useLanguage();
  const [jomiShareExpanded, setJomiShareExpanded] = useState(true);
  const [moreExpanded, setMoreExpanded] = useState(false);
  const [cookieExpanded, setCookieExpanded] = useState(true);
  const [activeModal, setActiveModal] = useState<ActiveModalType>(null);

  const handleNavigate = (path: string) => {
    onClose();
    navigate(path);
  };

  // Quick contact form state inside modal
  const [contactSent, setContactSent] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', phone: '', message: '' });

  // Selected blog article in blog modal
  const [selectedBlogIndex, setSelectedBlogIndex] = useState(0);

  if (!isOpen) return null;

  const blogArticles = [
    {
      title: 'জমি কেনার পূর্বে খতিয়ান ও রেকর্ড যাচাইয়ের ৫টি সহজ নিয়ম',
      tag: 'জমি যাচাইকরণ',
      time: '৪ মিনিট পাঠ',
      summary: 'সিএস, এসএ, আরএস ও বিএস খতিয়ান মেলানো এবং দলিলের ধারাবাহিকতা (Chain of Ownership) যাচাই করার বাস্তবসম্মত কৌশল।',
      tips: [
        'সিএস থেকে বিএস পর্যন্ত ধারাবাহিক বায়া দলিল পুঙ্খানুপুঙ্খ মেলান',
        'বিক্রেতার নামে হাল সনের দাখিলা ও নামজারি পর্চা নিশ্চিত করুন',
        'মৌজা নকশার সাথে বাস্তব জমিনের সীমানা আমিন দিয়ে মেপে নিন'
      ]
    },
    {
      title: 'বায়না দলিল (Bayna Agreement) করার সঠিক আইনি নিয়ম ও সতর্কতা',
      tag: 'আইন ও দলিল',
      time: '৩ মিনিট পাঠ',
      summary: 'সাব-রেজিস্ট্রি অফিসে ৩০০ টাকার স্ট্যাম্পে রেজিস্টার্ড বায়না দলিলের মেয়াদ, টাকা পরিশোধের ব্যাংকিং মাধ্যম ও আইনি বাধ্যবাধকতা।',
      tips: [
        'সর্বদা সাব-রেজিস্ট্রি অফিসে রেজিস্টার্ড বায়না দলিল সম্পাদন করুন',
        'নগদ লেনদেনের বদলে পে-অর্ডার বা ব্যাংকিং চ্যানেল ব্যবহার বাধ্যতামূলক',
        'নির্দিষ্ট মেয়াদের মধ্যে মূল দলিল রেজিস্ট্রি বা লিগ্যাল নোটিশ দিন'
      ]
    },
    {
      title: 'রাজউক ড্যাপ (DAP) বিধিমালা ও ফ্ল্যাট কেনার সময় করণীয়',
      tag: 'ফ্ল্যাট ক্রয়',
      time: '৫ মিনিট পাঠ',
      summary: 'ফ্লোর এরিয়া রেশিও (FAR), অনুমোদিত ফ্লোর প্ল্যান এবং ডেভেলপার চুক্তিপত্রে লুকানো ফাঁদ চেনার নিয়ম।',
      tips: [
        'রাজউকের সর্বশেষ অনুমোদিত আর্কিটেকচারাল নকশা দেখুন',
        'বিল্ডিংয়ের অকুপেন্সি সার্টিফিকেট (Occupancy Certificate) যাচাই করুন',
        'পার্কিং স্পেস ও কমন এরিয়ার আনুপাতিক হিস্যা দলিলে নিশ্চিত করুন'
      ]
    },
    {
      title: 'ওয়ারিশান সম্পত্তি বণ্টন ও আপস বণ্টননামা দলিলের গুরুত্ব',
      tag: 'উত্তরাধিকার',
      time: '৪ মিনিট পাঠ',
      summary: 'পারিবারিক বিরোধ ছাড়া মুসলিম ও হিন্দু উত্তরাধিকার আইন মেনে জমি পরিমাপ ও সাব-রেজিস্ট্রি অফিসে আপস বণ্টননামা দলিল করার উপায়।',
      tips: [
        'মৌখিক বণ্টনের কোনো আইনি ভিত্তি নেই, রেজিস্টার্ড বণ্টননামা দলিল করুন',
        'বণ্টননামার পর নিজ নিজ নামে পৃথক নামজারি ও জমাখারিজ সম্পন্ন করুন',
        'JOMI-SHARE এর এআই পার্টিশন টুল দিয়ে সুষম অংশ নির্ধারণ করুন'
      ]
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactForm({ name: '', phone: '', message: '' });
      setActiveModal(null);
    }, 2500);
  };

  return (
    <>
      {/* Dark backdrop overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Drawer Panel */}
      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-50 w-[310px] sm:w-[340px] max-w-[85vw] h-full shadow-2xl',
          'flex flex-col text-white select-none transition-transform duration-300 ease-out',
          'bg-[#0f3423] border-r border-[#1e583d]/70'
        )}
        style={{
          background: 'linear-gradient(180deg, #103826 0%, #0c2d1e 50%, #082115 100%)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="NIRBASH Navigation Menu"
      >
        {/* Subtle Architectural City Skyline Silhouette Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.09] overflow-hidden">
          <svg className="w-full h-full text-white" viewBox="0 0 340 700" fill="currentColor" preserveAspectRatio="none">
            <rect x="20" y="320" width="45" height="380" rx="2" />
            <rect x="75" y="240" width="55" height="460" rx="2" />
            <polygon points="102,180 85,240 120,240" />
            <rect x="140" y="290" width="50" height="410" rx="2" />
            <rect x="200" y="210" width="60" height="490" rx="2" />
            <polygon points="230,160 210,210 250,210" />
            <rect x="270" y="330" width="50" height="370" rx="2" />
            <line x1="85" y1="260" x2="120" y2="260" stroke="#fff" strokeWidth="2" strokeDasharray="3,4" />
            <line x1="85" y1="300" x2="120" y2="300" stroke="#fff" strokeWidth="2" strokeDasharray="3,4" />
            <line x1="85" y1="340" x2="120" y2="340" stroke="#fff" strokeWidth="2" strokeDasharray="3,4" />
            <line x1="210" y1="240" x2="250" y2="240" stroke="#fff" strokeWidth="2" strokeDasharray="3,4" />
            <line x1="210" y1="280" x2="250" y2="280" stroke="#fff" strokeWidth="2" strokeDasharray="3,4" />
            <line x1="210" y1="320" x2="250" y2="320" stroke="#fff" strokeWidth="2" strokeDasharray="3,4" />
          </svg>
        </div>

        {/* ──────── TOP DRAWER HEADER ──────── */}
        <div className="relative z-10 flex items-center justify-between px-5 pt-4 pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            {/* Close 'X' Button */}
            <button
              onClick={onClose}
              className="p-1.5 -ml-1.5 text-white/90 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer rounded-lg hover:bg-white/10"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 stroke-[2.2]" />
            </button>

            {/* In-drawer Language Switcher */}
            <div className="inline-flex items-center p-0.5 bg-black/40 rounded-lg border border-white/20 text-xs">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={clsx(
                  'px-2 py-0.5 rounded text-[11px] font-bold transition-all',
                  lang === 'en' ? 'bg-amber-400 text-green-950 shadow-xs' : 'text-white/70 hover:text-white'
                )}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('bn')}
                className={clsx(
                  'px-2 py-0.5 rounded text-[11px] font-bold transition-all',
                  lang === 'bn' ? 'bg-amber-400 text-green-950 shadow-xs' : 'text-white/70 hover:text-white'
                )}
              >
                বাংলা
              </button>
            </div>
          </div>

          {/* Logo: House Icon & NIRBASH (নিবাস) */}
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border-2 border-amber-400/90 flex items-center justify-center p-1 shadow-xs group-hover:bg-amber-400/20 transition-all">
              <svg
                className="w-5 h-5 text-amber-400 fill-transparent"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5z" />
                <path d="M9 21V12h6v9" />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-black text-white tracking-tight drop-shadow-xs leading-none">
                NIRBASH
              </span>
              <span className="text-[10px] font-bold text-amber-300 tracking-wider">
                {lang === 'bn' ? 'নিবাস প্রপার্টিজ' : 'Property Portal'}
              </span>
            </div>
          </Link>
        </div>

        {/* ──────── SCROLLABLE MENU BODY ──────── */}
        <div className="relative z-10 flex-1 overflow-y-auto px-4 py-3 space-y-2 text-sm font-medium custom-scroll">
          {/* 1. Home */}
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-lg bg-[#174630]/85 hover:bg-[#1e583c] border border-[#2b6d4b]/60 text-white transition-all shadow-xs active:scale-[0.99] group"
          >
            <Home className="w-4 h-4 text-white/90 group-hover:text-amber-300 transition-colors" />
            <span className="font-semibold text-white group-hover:text-amber-200 transition-colors">
              {lang === 'bn' ? 'হোম' : 'Home'}
            </span>
          </Link>

          {/* 2. Buy Property */}
          <Link
            to="/properties"
            onClick={onClose}
            className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-lg bg-[#174630]/85 hover:bg-[#1e583c] border border-[#2b6d4b]/60 text-white transition-all shadow-xs active:scale-[0.99] group"
          >
            <ShoppingCart className="w-4 h-4 text-white/90 group-hover:text-amber-300 transition-colors" />
            <span className="font-semibold text-white group-hover:text-amber-200 transition-colors">
              {lang === 'bn' ? 'প্রপার্টি খুঁজুন' : 'Buy Property'}
            </span>
          </Link>

          {/* 3. All Agent */}
          <Link
            to="/agents"
            onClick={onClose}
            className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-lg bg-[#174630]/85 hover:bg-[#1e583c] border border-[#2b6d4b]/60 text-white transition-all shadow-xs active:scale-[0.99] group"
          >
            <User className="w-4 h-4 text-white/90 group-hover:text-amber-300 transition-colors" />
            <span className="font-semibold text-white group-hover:text-amber-200 transition-colors">
              {lang === 'bn' ? 'সকল এজেন্ট' : 'All Agents'}
            </span>
          </Link>

          {/* 4. Services */}
          <Link
            to="/services"
            onClick={onClose}
            className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-lg bg-[#174630]/85 hover:bg-[#1e583c] border border-[#2b6d4b]/60 text-white transition-all shadow-xs active:scale-[0.99] group"
          >
            <svg
              className="w-4 h-4 text-white/90 group-hover:text-amber-300 transition-colors"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="6" width="18" height="12" rx="2" />
              <line x1="7" y1="6" x2="7" y2="18" />
              <line x1="11" y1="6" x2="11" y2="18" />
              <line x1="15" y1="6" x2="15" y2="18" />
            </svg>
            <span className="font-semibold text-white group-hover:text-amber-200 transition-colors">
              {lang === 'bn' ? 'সেবাসমূহ' : 'Services'}
            </span>
          </Link>

          {/* ── JOMI-SHARE AI Land Intelligence Suite (Inside Nirbash) ── */}
          <div className="rounded-xl overflow-hidden border border-emerald-500/50 bg-gradient-to-br from-[#134932] to-[#0c3121] shadow-md my-1">
            <button
              onClick={() => setJomiShareExpanded(!jomiShareExpanded)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 text-left transition-colors hover:bg-emerald-800/40 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-amber-400 text-green-950 flex items-center justify-center font-black flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-white text-xs flex items-center gap-1.5">
                    <span>{lang === 'bn' ? 'জমি শেয়ার এআই টুলস' : 'JOMI-SHARE AI Tools'}</span>
                    <span className="text-[9px] bg-amber-400/20 text-amber-300 border border-amber-400/40 px-1 py-0.2 rounded font-extrabold uppercase">
                      AI Core
                    </span>
                  </div>
                  <div className="text-[10px] text-emerald-200/80 leading-none mt-0.5">
                    {lang === 'bn' ? 'ডিজিটাল ভূমি যাচাই ও ফারায়েজ' : 'Land DNA & Smart Partition'}
                  </div>
                </div>
              </div>
              <ChevronDown
                className={clsx(
                  'w-4 h-4 text-emerald-300 transition-transform duration-200 flex-shrink-0',
                  jomiShareExpanded ? 'rotate-180 text-amber-300' : ''
                )}
              />
            </button>

            {jomiShareExpanded && (
              <div className="px-2 pb-2.5 pt-1 space-y-0.5 border-t border-emerald-600/40 text-xs">
                <Link
                  to="/jomi-share"
                  onClick={onClose}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors font-semibold"
                >
                  <Home className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
                  <span>{lang === 'bn' ? 'এআই ড্যাশবোর্ড ওভারভিউ' : 'AI Dashboard Overview'}</span>
                </Link>

                <Link
                  to="/jomi-share/land-dna"
                  onClick={onClose}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors font-semibold"
                >
                  <FileSearch className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{lang === 'bn' ? 'ল্যান্ড ডিএনএ (Land DNA)' : 'Land DNA Verification'}</span>
                </Link>

                <Link
                  to="/jomi-share/verification"
                  onClick={onClose}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors font-semibold"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{lang === 'bn' ? 'সিএস / আরএস রেকর্ড যাচাই' : 'CS / RS Record Verification'}</span>
                </Link>

                <Link
                  to="/jomi-share/inheritance"
                  onClick={onClose}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors font-semibold"
                >
                  <Users className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
                  <span>{lang === 'bn' ? 'উত্তরাধিকার ফারায়েজ বণ্টন' : 'Inheritance Farayez Engine'}</span>
                </Link>

                <Link
                  to="/jomi-share/partition"
                  onClick={onClose}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors font-semibold"
                >
                  <Scissors className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
                  <span>{lang === 'bn' ? 'স্মার্ট জমি পার্টিশন' : 'Smart Partition & Boundaries'}</span>
                </Link>

                <Link
                  to="/jomi-share/map"
                  onClick={onClose}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors font-semibold"
                >
                  <Map className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                  <span>{lang === 'bn' ? 'মৌজা ম্যাপ ও জিও ওভারলে' : 'Mouza Map & Geo Overlay'}</span>
                </Link>

                <Link
                  to="/jomi-share/heatmap"
                  onClick={onClose}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors font-semibold"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                  <span>{lang === 'bn' ? 'বিরোধ ও ঝুঁকি হিটম্যাপ' : 'Dispute & Risk Heatmap'}</span>
                </Link>
              </div>
            )}
          </div>

          {/* 5. More (Accordion Section) */}
          <div className="space-y-1.5">
            <button
              onClick={() => setMoreExpanded(!moreExpanded)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-[#174630]/85 hover:bg-[#1e583c] border border-[#2b6d4b]/60 text-white transition-all shadow-xs active:scale-[0.99] group text-left cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                {moreExpanded ? (
                  <Minus className="w-4 h-4 text-white/90 group-hover:text-amber-300 transition-colors" />
                ) : (
                  <Plus className="w-4 h-4 text-white/90 group-hover:text-amber-300 transition-colors" />
                )}
                <span className="font-semibold text-white group-hover:text-amber-200 transition-colors">
                  {lang === 'bn' ? 'আরও মেনু' : 'More'}
                </span>
              </div>
              <ChevronDown
                className={clsx(
                  'w-4 h-4 text-white/60 transition-transform duration-200',
                  moreExpanded ? 'rotate-180 text-amber-300' : ''
                )}
              />
            </button>

            {/* Sub-menu items inside More */}
            {moreExpanded && (
              <div className="pl-3 pr-1 py-1 space-y-1 border-l-2 border-emerald-500/40 ml-4 animate-fade-in text-xs font-semibold">
                <Link
                  to="/company-dashboard"
                  onClick={onClose}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-400 text-green-950 font-black hover:bg-amber-300 transition-colors shadow-xs"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? '+ ফ্রি বিজ্ঞাপন দিন' : '+ Post Free Ad'}</span>
                </Link>

                <Link
                  to="/compare"
                  onClick={onClose}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Scale className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'bn' ? 'সম্পত্তি তুলনা (Compare)' : 'Compare Properties'}</span>
                </Link>

                <Link
                  to="/saved"
                  onClick={onClose}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Heart className="w-3.5 h-3.5 text-red-400" />
                  <span>{lang === 'bn' ? 'পছন্দ তালিকা (Saved)' : 'Saved Properties'}</span>
                </Link>

                <Link
                  to="/register-company"
                  onClick={onClose}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Building2 className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{lang === 'bn' ? 'কোম্পানি / এজেন্ট নিবন্ধন' : 'Register Company / Agent'}</span>
                </Link>

                <Link
                  to="/properties?category=land_plot"
                  onClick={onClose}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>{lang === 'bn' ? 'জমির প্লট (Land Plots)' : 'Land Plots'}</span>
                </Link>
              </div>
            )}
          </div>

          {/* 6. Blog */}
          <button
            onClick={() => handleNavigate('/nirbash/blog')}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-[#174630]/85 hover:bg-[#1e583c] border border-[#2b6d4b]/60 text-white transition-all shadow-xs active:scale-[0.99] group text-left cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <FileText className="w-4 h-4 text-white/90 group-hover:text-amber-300 transition-colors" />
              <span className="font-semibold text-white group-hover:text-amber-200 transition-colors">
                {lang === 'bn' ? 'ব্লগ ও গাইড' : 'Blog'}
              </span>
            </div>
            <span className="text-[10px] bg-emerald-900/80 text-emerald-300 px-1.5 py-0.5 rounded font-mono">
              {lang === 'bn' ? '৪টি গাইড' : '4 Guides'}
            </span>
          </button>

          {/* 7. About us */}
          <button
            onClick={() => handleNavigate('/nirbash/about')}
            className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-lg bg-[#174630]/85 hover:bg-[#1e583c] border border-[#2b6d4b]/60 text-white transition-all shadow-xs active:scale-[0.99] group text-left cursor-pointer"
          >
            <Info className="w-4 h-4 text-white/90 group-hover:text-amber-300 transition-colors" />
            <span className="font-semibold text-white group-hover:text-amber-200 transition-colors">
              {lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About us'}
            </span>
          </button>

          {/* 8. Contact */}
          <button
            onClick={() => handleNavigate('/nirbash/contact')}
            className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-lg bg-[#174630]/85 hover:bg-[#1e583c] border border-[#2b6d4b]/60 text-white transition-all shadow-xs active:scale-[0.99] group text-left cursor-pointer"
          >
            <Mail className="w-4 h-4 text-white/90 group-hover:text-amber-300 transition-colors" />
            <span className="font-semibold text-white group-hover:text-amber-200 transition-colors">
              {lang === 'bn' ? 'যোগাযোগ' : 'Contact'}
            </span>
          </button>

          {/* 9. Cookie (Expandable Accordion containing: Disclaimer, Privacy Policy, Terms, Listing Guidelines) */}
          <div className="space-y-1.5 pt-1">
            <button
              onClick={() => setCookieExpanded(!cookieExpanded)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-[#174630]/85 hover:bg-[#1e583c] border border-[#2b6d4b]/60 text-white transition-all shadow-xs active:scale-[0.99] group text-left cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                {cookieExpanded ? (
                  <Minus className="w-4 h-4 text-white/90 group-hover:text-amber-300 transition-colors" />
                ) : (
                  <Plus className="w-4 h-4 text-white/90 group-hover:text-amber-300 transition-colors" />
                )}
                <span className="font-semibold text-white group-hover:text-amber-200 transition-colors">
                  {lang === 'bn' ? 'কুকি ও নীতিমালা' : 'Cookie & Legal'}
                </span>
              </div>
              <ChevronDown
                className={clsx(
                  'w-4 h-4 text-white/60 transition-transform duration-200',
                  cookieExpanded ? 'rotate-180 text-amber-300' : ''
                )}
              />
            </button>

            {/* Sub-items inside Cookie (Disclaimer, Privacy Policy, Terms, Listing Guidelines) */}
            {cookieExpanded && (
              <div className="space-y-1.5 pt-0.5 animate-fade-in pl-2">
                {/* 1. Disclaimer */}
                <button
                  onClick={() => handleNavigate('/nirbash/disclaimer')}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-[#174630]/90 hover:bg-[#1e583c] border border-[#2b6d4b]/60 text-white transition-all shadow-xs active:scale-[0.99] group text-left cursor-pointer"
                >
                  <AlertTriangle className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="font-medium text-white group-hover:text-amber-200 transition-colors text-xs sm:text-sm">
                    {lang === 'bn' ? 'দায়মুক্তি ঘোষণা (Disclaimer)' : 'Disclaimer'}
                  </span>
                </button>

                {/* 2. Privacy Policy */}
                <button
                  onClick={() => handleNavigate('/nirbash/privacy')}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-[#174630]/90 hover:bg-[#1e583c] border border-[#2b6d4b]/60 text-white transition-all shadow-xs active:scale-[0.99] group text-left cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="font-medium text-white group-hover:text-amber-200 transition-colors text-xs sm:text-sm">
                    {lang === 'bn' ? 'গোপনীয়তা নীতি (Privacy Policy)' : 'Privacy Policy'}
                  </span>
                </button>

                {/* 3. Terms */}
                <button
                  onClick={() => handleNavigate('/nirbash/terms')}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-[#174630]/90 hover:bg-[#1e583c] border border-[#2b6d4b]/60 text-white transition-all shadow-xs active:scale-[0.99] group text-left cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-blue-300 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="font-medium text-white group-hover:text-amber-200 transition-colors text-xs sm:text-sm">
                    {lang === 'bn' ? 'ব্যবহারের শর্তাবলী (Terms)' : 'Terms of Service'}
                  </span>
                </button>

                {/* 4. Listing Guidelines */}
                <button
                  onClick={() => handleNavigate('/nirbash/listing-guidelines')}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-[#174630]/90 hover:bg-[#1e583c] border border-[#2b6d4b]/60 text-white transition-all shadow-xs active:scale-[0.99] group text-left cursor-pointer"
                >
                  <Scale className="w-4 h-4 text-purple-300 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="font-medium text-white group-hover:text-amber-200 transition-colors text-xs sm:text-sm">
                    {lang === 'bn' ? 'লিস্টিং নির্দেশিকা (Guidelines)' : 'Listing Guidelines'}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ──────── SOCIAL MEDIA & FOOTER ──────── */}
        <div className="relative z-10 px-4 pt-2 pb-4 border-t border-white/10 bg-[#0b291c]/90">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="text-[11px] text-white/70 font-medium tracking-wide">
              {lang === 'bn' ? 'আমাদের সোশ্যাল মিডিয়া' : 'our social media'}
            </span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          {/* 8 Social Media Circular Icons */}
          <div className="flex items-center justify-between gap-1 px-1 mb-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              title="Facebook"
              className="w-7 h-7 rounded-full border border-white/40 hover:border-amber-400 bg-white/5 hover:bg-amber-400/20 text-white hover:text-amber-300 flex items-center justify-center transition-all hover:scale-110 shadow-xs"
            >
              <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              title="YouTube"
              className="w-7 h-7 rounded-full border border-white/40 hover:border-red-400 bg-white/5 hover:bg-red-500/20 text-white hover:text-red-400 flex items-center justify-center transition-all hover:scale-110 shadow-xs"
            >
              <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

            <a
              href="https://wa.me/8801700000000"
              target="_blank"
              rel="noreferrer"
              title="WhatsApp"
              className="w-7 h-7 rounded-full border border-white/40 hover:border-emerald-400 bg-white/5 hover:bg-emerald-500/20 text-white hover:text-emerald-400 flex items-center justify-center transition-all hover:scale-110 shadow-xs"
            >
              <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                <path d="M12.031 0C5.396 0 .029 5.367.029 11.987c0 2.108.549 4.168 1.595 5.97L0 24.16l6.376-1.625a11.96 11.96 0 0 0 5.655 1.442h.005c6.632 0 12-5.367 12-11.99C24.036 5.368 18.666 0 12.031 0zm.005 21.942a9.96 9.96 0 0 1-5.08-1.393l-.364-.216-3.777.962.998-3.682-.237-.378a9.93 9.93 0 0 1-1.524-5.247c0-5.502 4.48-9.982 9.987-9.982 2.668 0 5.176 1.04 7.062 2.928a9.935 9.935 0 0 1 2.925 7.058c0 5.503-4.48 9.99-9.99 9.99z" />
              </svg>
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              title="X (Twitter)"
              className="w-7 h-7 rounded-full border border-white/40 hover:border-white bg-white/5 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-110 shadow-xs"
            >
              <svg className="w-3 h-3 fill-currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              title="Instagram"
              className="w-7 h-7 rounded-full border border-white/40 hover:border-pink-400 bg-white/5 hover:bg-pink-500/20 text-white hover:text-pink-400 flex items-center justify-center transition-all hover:scale-110 shadow-xs"
            >
              <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>

            <a
              href="https://threads.net"
              target="_blank"
              rel="noreferrer"
              title="Threads"
              className="w-7 h-7 rounded-full border border-white/40 hover:border-amber-300 bg-white/5 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-110 shadow-xs"
            >
              <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                <path d="M12.186 24h-.007c-3.585-.018-6.61-1.39-8.748-3.967-1.954-2.355-2.92-5.59-2.798-9.354.246-7.593 5.485-10.68 10.748-10.68 5.698 0 10.15 3.738 10.15 9.774 0 3.824-2.028 6.643-5.292 7.359-2.003.44-3.957.172-5.503-.756a5.168 5.168 0 0 1-2.42-3.834c-.21-1.543.256-3.084 1.28-4.227 1.04-1.161 2.535-1.79 4.103-1.724 1.228.051 2.366.527 3.208 1.341.055-.456.082-.924.082-1.401 0-4.607-3.238-7.394-7.608-7.394-4.148 0-8.236 2.378-8.438 8.44-.098 3.013.666 5.592 2.215 7.46 1.704 2.054 4.116 3.149 6.974 3.164h.006c2.404 0 4.38-.62 5.875-1.844l1.455 1.745c-1.89 1.545-4.437 2.327-7.487 2.327z" />
              </svg>
            </a>

            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              title="Telegram"
              className="w-7 h-7 rounded-full border border-white/40 hover:border-sky-400 bg-white/5 hover:bg-sky-500/20 text-white hover:text-sky-400 flex items-center justify-center transition-all hover:scale-110 shadow-xs"
            >
              <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.666 8.163l-2.073 9.774c-.156.69-.564.858-1.144.533L11.23 16.1l-1.527 1.47c-.168.169-.31.31-.635.31l.228-3.228 5.874-5.308c.256-.227-.056-.353-.396-.127L7.518 13.78l-3.13-.978c-.68-.213-.693-.68.142-1.006L16.74 7.218c.567-.212 1.064.135.87.945z" />
              </svg>
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              title="Community Group"
              className="w-7 h-7 rounded-full border border-white/40 hover:border-emerald-300 bg-white/5 hover:bg-emerald-400/20 text-white hover:text-emerald-300 flex items-center justify-center transition-all hover:scale-110 shadow-xs"
            >
              <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 3s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
            </a>
          </div>

          <div className="text-center space-y-0.5 text-[10px] text-white/70">
            <div>Copyright © {new Date().getFullYear()}</div>
            <div>
              All rights reserved{' '}
              <span className="text-amber-400 font-bold">NIRBASH (নিবাস)</span> || Developed by{' '}
              <span className="text-amber-400 font-bold">Farhanul Haque</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ──────── FULLY USABLE INTERACTIVE CONTENT MODALS ──────── */}
      {activeModal && (
        <div
          className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full max-h-[88vh] overflow-y-auto shadow-2xl relative text-gray-800 p-6 sm:p-7"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-700 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* 1. DISCLAIMER MODAL */}
            {activeModal === 'disclaimer' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-green-950">দায়মুক্তি ঘোষণা (Disclaimer)</h3>
                    <p className="text-xs text-gray-500">NIRBASH প্ল্যাটফর্ম নীতিমালা</p>
                  </div>
                </div>

                <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-950 leading-relaxed font-medium">
                  <strong>গুরুত্বপূর্ণ সতর্কতা:</strong> NIRBASH একটি উন্মুক্ত এআই রিয়েল এস্টেট প্ল্যাটফর্ম। জমি বা ফ্ল্যাট কেনার আগে সাব-রেজিস্ট্রি এবং এসিল্যান্ড অফিস থেকে রেকর্ড ও দাগ পুঙ্খানুপুঙ্খ যাচাই করুন।
                </div>

                <div className="space-y-3 text-xs text-gray-700 leading-relaxed">
                  <p>
                    <strong>১. তৃতীয় পক্ষের তথ্যের দায়:</strong> বিক্রেতা বা এজেন্টদের প্রদত্ত বিজ্ঞাপনের ছবি ও পরিমাপ তথ্যের সত্যতা প্রাথমিক স্ক্রিনিং করা হলেও কোনো পারিবারিক বা আইনি গোপন বিরোধের দায় NIRBASH বহন করে না।
                  </p>
                  <p>
                    <strong>২. আর্থিক লেনদেন সতর্কতা:</strong> রেজিস্টার্ড বায়নানামা চুক্তি ছাড়া কোনো অবস্থাতেই বিক্রেতাকে বড় অঙ্কের নগদ অর্থ প্রদান করবেন না। সর্বদা পে-অর্ডার বা ব্যাংকিং চ্যানেল ব্যবহার করুন।
                  </p>
                  <p>
                    <strong>৩. ১০০% কমিশন ফ্রি:</strong> প্ল্যাটফর্মটি ক্রেতা ও বিক্রেতার মাঝে কোনো মধ্যস্বত্বভোগী বা ব্রোকারেজ ফি গ্রহণ করে না।
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-gray-100 text-xs">
                  <Link
                    to="/nirbash/disclaimer"
                    onClick={() => { setActiveModal(null); onClose(); }}
                    className="text-emerald-700 font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>সম্পূর্ণ আইনি পাতা খুলুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 bg-green-900 text-white rounded-xl font-bold cursor-pointer hover:bg-green-800"
                  >
                    বুঝেছি
                  </button>
                </div>
              </div>
            )}

            {/* 2. PRIVACY POLICY MODAL */}
            {activeModal === 'privacy' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-green-950">প্রাইভেসি পলিসি (Privacy Policy)</h3>
                    <p className="text-xs text-gray-500">আপনার তথ্যের নিরাপত্তা নিশ্চয়তা</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-gray-700 leading-relaxed">
                  <p>
                    <strong>১. ডেটা সুরক্ষা:</strong> আপনার ফোন নম্বর, সংরক্ষিত প্রপার্টির তথ্য ও দলিলের রেকর্ড ২৫৬-বিট এসএসএল এনক্রিপশনের মাধ্যমে সম্পূর্ণ নিরাপদে সংরক্ষিত থাকে।
                  </p>
                  <p>
                    <strong>২. নম্বর গোপনীয়তা:</strong> অনাকাঙ্ক্ষিত কল ঠেকাতে বিক্রেতারা চাইলে তাদের ফোন নম্বর শুধুমাত্র লগইনকৃত ভেরিফাইড ক্রেতাদের জন্য দৃশ্যমান রাখতে পারেন।
                  </p>
                  <p>
                    <strong>৩. কোনো তথ্য বিক্রয় নয়:</strong> NIRBASH কোনো অবস্থাতেই ব্যবহারকারীর ডেটা কোনো থার্ড-পার্টি বিজ্ঞাপনদাতার কাছে বিক্রয় বা শেয়ার করে না।
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-gray-100 text-xs">
                  <Link
                    to="/nirbash/privacy"
                    onClick={() => { setActiveModal(null); onClose(); }}
                    className="text-emerald-700 font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>বিস্তারিত প্রাইভেসি শর্তাবলী →</span>
                  </Link>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 bg-green-900 text-white rounded-xl font-bold cursor-pointer hover:bg-green-800"
                  >
                    সম্মতি দিচ্ছি
                  </button>
                </div>
              </div>
            )}

            {/* 3. TERMS MODAL */}
            {activeModal === 'terms' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-green-950">ব্যবহারের শর্তাবলী (Terms of Service)</h3>
                    <p className="text-xs text-gray-500">প্ল্যাটফর্ম ব্যবহারের নিয়মাবলী</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-gray-700 leading-relaxed">
                  <p>
                    <strong>১. বৈধ স্বত্বাধিকারী:</strong> কেবলমাত্র প্রকৃত জমির মালিক অথবা আইনগতভাবে অনুমোদিত এজেন্টই প্রপার্টি লিস্টিং দিতে পারবেন।
                  </p>
                  <p>
                    <strong>২. নিষিদ্ধ প্রচারণা:</strong> কোনো ভুয়া দাগ নম্বর, জাল খতিয়ান, খাস বা বিতর্কিত সরকারি জমি বিক্রয়ের পোস্ট সম্পূর্ণ নিষিদ্ধ।
                  </p>
                  <p>
                    <strong>৩. নিয়ম লঙ্ঘন:</strong> প্রতারণামূলক বিজ্ঞাপনের প্রমাণ পেলে সংশ্লিষ্ট অ্যাকাউন্ট স্থায়ীভাবে বাতিল ও প্রয়োজনীয় আইনি পদক্ষেপ নেওয়া হবে।
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-gray-100 text-xs">
                  <Link
                    to="/nirbash/terms"
                    onClick={() => { setActiveModal(null); onClose(); }}
                    className="text-emerald-700 font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>সম্পূর্ণ শর্তাবলী দেখুন →</span>
                  </Link>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 bg-green-900 text-white rounded-xl font-bold cursor-pointer hover:bg-green-800"
                  >
                    ঠিক আছে
                  </button>
                </div>
              </div>
            )}

            {/* 4. LISTING GUIDELINES MODAL */}
            {activeModal === 'guidelines' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
                    <Scale className="w-5 h-5 text-purple-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-green-950">লিস্টিং গাইডলাইন (Listing Guidelines)</h3>
                    <p className="text-xs text-gray-500">বিজ্ঞাপন প্রকাশের সঠিক নিয়ম</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-gray-700 leading-relaxed">
                  <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                    <h4 className="font-bold text-purple-950 mb-1">✓ আসল ও স্পষ্ট ছবি:</h4>
                    <p>বাস্তব জমিন, সামনের রাস্তা ও চারপাশের স্পষ্ট ছবি দিতে হবে। ইন্টারনেট থেকে ডাউনলোডকৃত ছবি গ্রহণযোগ্য নয়।</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-xl border border-green-200">
                    <h4 className="font-bold text-green-950 mb-1">✓ সঠিক দাগ ও খতিয়ান:</h4>
                    <p>সিএস, এসএ বা আরএস দাগ নম্বর এবং মৌজার নাম সঠিকভাবে পূরণ করলে ক্রেতাদের বিশ্বাসযোগ্যতা বাড়ে।</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <h4 className="font-bold text-blue-950 mb-1">✓ বাস্তবসম্মত মূল্য:</h4>
                    <p>বিজ্ঞাপনে মোট মূল্য বা শতকপ্রতি প্রকৃত বিক্রয়মূল্য উল্লেখ করুন।</p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-gray-100 text-xs">
                  <Link
                    to="/nirbash/listing-guidelines"
                    onClick={() => { setActiveModal(null); onClose(); }}
                    className="text-emerald-700 font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>গাইডলাইন পাতা খুলুন →</span>
                  </Link>
                  <Link
                    to="/nirbash/company-dashboard"
                    onClick={() => { setActiveModal(null); onClose(); }}
                    className="px-4 py-2 bg-amber-400 text-green-950 rounded-xl font-black shadow-xs hover:bg-amber-300"
                  >
                    + নতুন বিজ্ঞাপন দিন
                  </Link>
                </div>
              </div>
            )}

            {/* 5. ABOUT US MODAL */}
            {activeModal === 'about' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-100 text-green-900 flex items-center justify-center font-bold">
                    <Info className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-green-950 leading-tight">আমাদের সম্পর্কে (About NIRBASH)</h3>
                    <p className="text-xs text-gray-500">১০০% কমিশন ফ্রি এআই রিয়েল এস্টেট প্ল্যাটফর্ম</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <strong>NIRBASH (নিবাস)</strong> বাংলাদেশের সবচেয়ে আধুনিক ও স্বচ্ছ প্রপার্টি মার্কেটপ্লেস।
                  এখানে কোনো ব্রোকারেজ ফি বা মধ্যস্বত্বভোগী ছাড়াই ক্রেতা ও প্রকৃত বিক্রেতারা সরাসরি যোগাযোগ করতে পারেন।
                </p>

                {/* 4 Stats Grid */}
                <div className="grid grid-cols-3 gap-2 text-center py-2">
                  <div className="p-2.5 bg-green-50 rounded-xl border border-green-200">
                    <div className="font-black text-green-900 text-base">১০০%</div>
                    <div className="text-[10px] text-gray-600 font-semibold">কমিশন ফ্রি</div>
                  </div>
                  <div className="p-2.5 bg-green-50 rounded-xl border border-green-200">
                    <div className="font-black text-green-900 text-base">১,৫০০+</div>
                    <div className="text-[10px] text-gray-600 font-semibold">প্রপার্টি লিস্টিং</div>
                  </div>
                  <div className="p-2.5 bg-green-50 rounded-xl border border-green-200">
                    <div className="font-black text-green-900 text-base">৬৪</div>
                    <div className="text-[10px] text-gray-600 font-semibold">জেলায় নেটওয়ার্ক</div>
                  </div>
                </div>

                <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200 text-xs text-emerald-950 space-y-1.5 font-medium">
                  <div className="flex items-center gap-1.5 font-bold text-green-950">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>JOMI-SHARE AI ইন্টিগ্রেশন সুবিধা:</span>
                  </div>
                  <div>• সিএস/আরএস খতিয়ান ও দাগ নম্বরের ধারাবাহিকতা যাচাই</div>
                  <div>• স্যাটেলাইট ম্যাপে মৌজা নকশার জিও-রেফারেন্সড ওভারলে</div>
                  <div>• স্বয়ংক্রিয় উত্তরাধিকার ফারায়েজ ও ডিজিটাল জমি বণ্টন</div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-gray-100 text-xs">
                  <Link
                    to="/nirbash/about"
                    onClick={() => { setActiveModal(null); onClose(); }}
                    className="text-emerald-700 font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>আমাদের সম্পর্কে পূর্ণাঙ্গ পাতা →</span>
                  </Link>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 bg-green-900 text-white rounded-xl font-bold cursor-pointer hover:bg-green-800"
                  >
                    বন্ধ করুন
                  </button>
                </div>
              </div>
            )}

            {/* 6. CONTACT MODAL */}
            {activeModal === 'contact' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-100 text-green-900 flex items-center justify-center font-bold">
                    <Mail className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-green-950 leading-tight">যোগাযোগ করুন (Contact NIRBASH)</h3>
                    <p className="text-xs text-gray-500">আমরা সার্বক্ষণিক আপনার সহায়তায় প্রস্তুত</p>
                  </div>
                </div>

                {/* Quick Call & WhatsApp Buttons */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a
                    href="tel:+8801700000000"
                    className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-green-50 border border-green-200 text-green-900 font-bold hover:bg-green-100 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>+880 1700-000000</span>
                  </a>
                  <a
                    href="https://wa.me/8801700000000"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp চ্যাট</span>
                  </a>
                </div>

                {/* Interactive Message Form */}
                {contactSent ? (
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center animate-fade-in text-xs">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-1.5" />
                    <h4 className="font-bold text-green-950">আপনার মেসেজ সফলভাবে পৌঁছেছে!</h4>
                    <p className="text-gray-600 mt-0.5">আমাদের প্রতিনিধি খুব দ্রুত আপনার নম্বরে যোগাযোগ করবেন।</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-2.5 text-xs">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="আপনার নাম"
                        value={contactForm.name}
                        onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                        className="px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-green-600"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="মোবাইল নম্বর"
                        value={contactForm.phone}
                        onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-green-600"
                      />
                    </div>
                    <textarea
                      required
                      rows={3}
                      placeholder="আপনার প্রশ্ন বা প্রয়োজনীয় প্রপার্টির তথ্য লিখুন..."
                      value={contactForm.message}
                      onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-green-600"
                    />
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-green-900 hover:bg-green-800 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>মেসেজ সাবমিট করুন</span>
                    </button>
                  </form>
                )}

                <div className="pt-2 flex items-center justify-between border-t border-gray-100 text-xs">
                  <Link
                    to="/nirbash/contact"
                    onClick={() => { setActiveModal(null); onClose(); }}
                    className="text-emerald-700 font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>যোগাযোগ কেন্দ্র পূর্ণাঙ্গ পেজ →</span>
                  </Link>
                  <span className="text-[11px] text-gray-400">বনানী, ঢাকা-১২১৩</span>
                </div>
              </div>
            )}

            {/* 7. BLOG MODAL */}
            {activeModal === 'blog' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-100 text-green-900 flex items-center justify-center font-bold">
                      <FileText className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-green-950 leading-tight">নিবাস ব্লগ ও গাইড</h3>
                      <p className="text-xs text-gray-500">রিয়েল এস্টেট ও আইনি পরামর্শ</p>
                    </div>
                  </div>
                  <Link
                    to="/nirbash/blog"
                    onClick={() => { setActiveModal(null); onClose(); }}
                    className="text-xs font-bold text-emerald-700 hover:underline"
                  >
                    সকল ব্লগ →
                  </Link>
                </div>

                {/* Article Selector Tabs */}
                <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
                  {blogArticles.map((art, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedBlogIndex(idx)}
                      className={clsx(
                        'px-2.5 py-1.5 rounded-lg whitespace-nowrap font-bold transition-all cursor-pointer',
                        selectedBlogIndex === idx
                          ? 'bg-green-900 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      )}
                    >
                      গাইড {idx + 1}
                    </button>
                  ))}
                </div>

                {/* Selected Article View */}
                {blogArticles[selectedBlogIndex] && (
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2.5 animate-fade-in text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                        {blogArticles[selectedBlogIndex].tag}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500 text-[10px]">{blogArticles[selectedBlogIndex].time}</span>
                    </div>

                    <h4 className="text-sm font-bold text-gray-900 leading-snug">
                      {blogArticles[selectedBlogIndex].title}
                    </h4>

                    <p className="text-gray-600 leading-relaxed">
                      {blogArticles[selectedBlogIndex].summary}
                    </p>

                    <div className="pt-2 border-t border-gray-200 space-y-1">
                      <div className="font-bold text-green-950 text-[11px]">প্রধান বিবেচ্য বিষয়সমূহ:</div>
                      {blogArticles[selectedBlogIndex].tips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-gray-700 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between border-t border-gray-100 text-xs">
                  <Link
                    to="/nirbash/blog"
                    onClick={() => { setActiveModal(null); onClose(); }}
                    className="px-3.5 py-2 rounded-xl bg-amber-400 text-green-950 font-black hover:bg-amber-300 transition-colors inline-flex items-center gap-1"
                  >
                    <span>ব্লগ হাব খুলুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold cursor-pointer"
                  >
                    বন্ধ করুন
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
