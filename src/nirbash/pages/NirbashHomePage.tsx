import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, MapPin, ChevronRight, Star, ShieldCheck, Building2,
  ArrowRight, Landmark, Home, Briefcase, CheckCircle, HardHat,
  TrendingUp, Users, Phone, Mail, ChevronDown, Leaf,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import PropertyCard from '../components/PropertyCard';
import {
  NIRBASH_COMPANIES, PROPERTY_CATEGORIES_DATA, DISTRICTS_BD,
  getFeaturedProperties, getRecentProperties, getPropertiesByCompany,
  type PropertyCategory,
} from '../data/nirbashData';
import clsx from 'clsx';

// ──── HERO SECTION ────────────────────────────────────────────
function HeroSection() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PropertyCategory | ''>('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const t = {
    en: {
      headline: 'Find the Right Plot or Flat for Your Future',
      sub: 'Explore property listings, compare opportunities, and connect directly with real estate companies through NIRBASH.',
      tagline: 'Find Your Land. Discover Your Home.',
      placeholder: 'Search by location or property name…',
      category: 'Property Type',
      district: 'District',
      search: 'Search Properties',
      allCats: 'All Types',
      allDistricts: 'All Districts',
      stats: [
        { value: '10+', label: 'Active Listings' },
        { value: '4', label: 'Partner Companies' },
        { value: '5', label: 'Property Types' },
        { value: '4', label: 'Districts' },
      ],
    },
    bn: {
      headline: 'আপনার ভবিষ্যতের জন্য সঠিক প্লট বা ফ্ল্যাট খুঁজুন',
      sub: 'নির্বাশের মাধ্যমে সম্পত্তির তালিকা অন্বেষণ করুন, সুযোগ তুলনা করুন এবং রিয়েল এস্টেট কোম্পানির সাথে সরাসরি সংযোগ করুন।',
      tagline: 'আপনার জমি খুঁজুন। আপনার ঘর আবিষ্কার করুন।',
      placeholder: 'এলাকা বা সম্পত্তির নাম দিয়ে অনুসন্ধান করুন…',
      category: 'সম্পত্তির ধরন',
      district: 'জেলা',
      search: 'সম্পত্তি খুঁজুন',
      allCats: 'সব ধরন',
      allDistricts: 'সব জেলা',
      stats: [
        { value: '১০+', label: 'সক্রিয় তালিকা' },
        { value: '৪', label: 'অংশীদার কোম্পানি' },
        { value: '৫', label: 'সম্পত্তির ধরন' },
        { value: '৪', label: 'জেলা' },
      ],
    },
  }[lang];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedDistrict) params.set('district', selectedDistrict);
    navigate(`/nirbash/properties?${params.toString()}`);
  };

  return (
    <section
      className="relative min-h-[560px] flex flex-col justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #052e16 0%, #14532d 40%, #166534 70%, #15803d 100%)',
      }}
    >
      {/* Decorative circles */}
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #4ade80, transparent)' }} />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #86efac, transparent)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
          <Leaf className="w-3.5 h-3.5 text-green-300" />
          <span className="text-green-200 text-xs font-semibold">{t.tagline}</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 max-w-2xl">
          {t.headline}
        </h1>
        <p className="text-green-200 text-base sm:text-lg mb-8 max-w-xl leading-relaxed">
          {t.sub}
        </p>

        {/* Search Box */}
        <div className="bg-white rounded-2xl shadow-2xl p-4 max-w-3xl">
          {/* Search input */}
          <div className="relative mb-3">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              placeholder={t.placeholder}
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-50"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Category select */}
            <div className="relative flex-1">
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value as PropertyCategory | '')}
                className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-3 pr-9 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600 bg-white cursor-pointer"
              >
                <option value="">{t.allCats}</option>
                {PROPERTY_CATEGORIES_DATA.map(c => (
                  <option key={c.key} value={c.key}>{lang === 'bn' ? c.labelBn : c.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* District select */}
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={selectedDistrict}
                onChange={e => setSelectedDistrict(e.target.value)}
                className="w-full appearance-none border border-gray-200 rounded-xl pl-9 pr-9 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600 bg-white cursor-pointer"
              >
                <option value="">{t.allDistricts}</option>
                {DISTRICTS_BD.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Search button */}
            <button
              onClick={handleSearch}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-green-800 hover:bg-green-900 text-white font-bold rounded-xl transition-all text-sm whitespace-nowrap shadow-sm hover:shadow-md"
            >
              <Search className="w-4 h-4" />
              {t.search}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-6 mt-8">
          {t.stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-green-300 text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ──── CATEGORY SECTION ─────────────────────────────────────────
function CategorySection() {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const catIcons = {
    land_plot: <Landmark className="w-6 h-6" />,
    residential_flat: <Home className="w-6 h-6" />,
    commercial_property: <Briefcase className="w-6 h-6" />,
    ready_to_move: <CheckCircle className="w-6 h-6" />,
    under_construction: <HardHat className="w-6 h-6" />,
  };

  return (
    <section className="py-14 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {lang === 'bn' ? 'সম্পত্তির ধরন অনুযায়ী ব্রাউজ করুন' : 'Browse by Property Type'}
          </h2>
          <p className="text-gray-500 text-sm">
            {lang === 'bn' ? 'আপনার পছন্দের ক্যাটাগরি বেছে নিন' : 'Choose your preferred category'}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {PROPERTY_CATEGORIES_DATA.map(cat => {
            const count = NIRBASH_COMPANIES.length > 0
              ? getFeaturedProperties().filter(p => p.category === cat.key).length
              : 0;
            return (
              <button
                key={cat.key}
                onClick={() => navigate(`/nirbash/properties?category=${cat.key}`)}
                className="group flex flex-col items-center text-center p-5 rounded-2xl border-2 border-gray-100 hover:border-transparent transition-all duration-300 hover:shadow-lg cursor-pointer"
                style={{ '--cat-color': cat.color } as React.CSSProperties}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = cat.color;
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = cat.bgColor;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '';
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = '';
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: cat.color }}
                >
                  {catIcons[cat.key as keyof typeof catIcons]}
                </div>
                <div className="font-semibold text-gray-800 text-sm">
                  {lang === 'bn' ? cat.labelBn : cat.label}
                </div>
                <div className="text-xs text-gray-500 mt-1 leading-tight">
                  {lang === 'bn' ? cat.descriptionBn : cat.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ──── FEATURED PROPERTIES ──────────────────────────────────────
function FeaturedPropertiesSection() {
  const { lang } = useLanguage();
  const featured = getFeaturedProperties();

  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              {lang === 'bn' ? 'বিশেষ সম্পত্তি' : 'Featured Properties'}
            </h2>
            <p className="text-gray-500 text-sm">
              {lang === 'bn' ? 'হাতে-বাছাই করা সেরা বিজ্ঞাপনগুলো' : 'Handpicked top listings'}
            </p>
          </div>
          <Link
            to="/nirbash/properties"
            className="flex items-center gap-1.5 text-sm font-semibold text-green-800 hover:text-green-900"
          >
            {lang === 'bn' ? 'সব দেখুন' : 'View All'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map(p => <PropertyCard key={p.id} property={p} />)}
        </div>
      </div>
    </section>
  );
}

// ──── RECENT PROPERTIES ────────────────────────────────────────
function RecentPropertiesSection() {
  const { lang } = useLanguage();
  const recent = getRecentProperties(3).filter(p => !getFeaturedProperties().some(f => f.id === p.id));

  if (recent.length === 0) return null;

  return (
    <section className="py-14 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              {lang === 'bn' ? 'সম্প্রতি যোগ করা' : 'Recently Added'}
            </h2>
            <p className="text-gray-500 text-sm">
              {lang === 'bn' ? 'সর্বশেষ যোগ করা সম্পত্তি' : 'Newest property listings'}
            </p>
          </div>
          <Link to="/nirbash/properties?sort=newest" className="flex items-center gap-1.5 text-sm font-semibold text-green-800 hover:text-green-900">
            {lang === 'bn' ? 'সব দেখুন' : 'View All'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recent.map(p => <PropertyCard key={p.id} property={p} />)}
        </div>
      </div>
    </section>
  );
}

// ──── COMPANIES SECTION ────────────────────────────────────────
function CompaniesSection() {
  const { lang } = useLanguage();

  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {lang === 'bn' ? 'নিবন্ধিত রিয়েল এস্টেট কোম্পানি' : 'Registered Real Estate Companies'}
          </h2>
          <p className="text-gray-500 text-sm">
            {lang === 'bn' ? 'যাচাইকৃত কোম্পানির সাথে সরাসরি সংযুক্ত হন' : 'Connect directly with verified property developers'}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {NIRBASH_COMPANIES.map(company => {
            const listings = getPropertiesByCompany(company.id);
            const name = lang === 'bn' ? company.nameBn : company.name;
            return (
              <Link
                key={company.id}
                to={`/nirbash/companies/${company.id}`}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all p-5 text-center group"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-3 group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: company.logoColor }}
                >
                  {company.logo}
                </div>
                <div className="font-semibold text-gray-900 text-sm mb-1">{name}</div>
                {company.verificationStatus === 'verified' && (
                  <div className="flex items-center justify-center gap-1 text-green-700 text-xs mb-2">
                    <ShieldCheck className="w-3 h-3" />
                    <span className="font-medium">{lang === 'bn' ? 'যাচাইকৃত' : 'Verified'}</span>
                  </div>
                )}
                <div className="text-gray-500 text-xs">{listings.length} {lang === 'bn' ? 'টি সম্পত্তি' : 'listings'}</div>
              </Link>
            );
          })}
        </div>
        <div className="text-center mt-6">
          <Link to="/nirbash/companies" className="inline-flex items-center gap-2 text-green-800 font-semibold text-sm hover:text-green-900">
            {lang === 'bn' ? 'সব কোম্পানি দেখুন' : 'View All Companies'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ──── LAND DNA SECTION ────────────────────────────────────────
function LandDNASection() {
  const { lang } = useLanguage();
  return (
    <section className="py-14 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 mb-5">
              <ShieldCheck className="w-4 h-4 text-green-700" />
              <span className="text-green-700 text-xs font-semibold">
                {lang === 'bn' ? 'জমি-শেয়ার ইন্টিগ্রেশন' : 'JOMI-SHARE Integration'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {lang === 'bn' ? 'ল্যান্ড ডিএনএ — ডিজিটাল ভূমি পরিচিতি' : 'Land DNA — Digital Land Identity'}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {lang === 'bn'
                ? 'নির্বাশে তালিকাভুক্ত জমির প্লটগুলো জমি-শেয়ারের ল্যান্ড ডিএনএ সিস্টেমের সাথে সংযুক্ত হতে পারে। এই সুবিধা দাগ নম্বর, মৌজা তথ্য এবং রেকর্ড অসঙ্গতির তথ্য প্রদর্শন করে।'
                : 'Land plots listed on NIRBASH can be linked to the JOMI-SHARE Land DNA system. This feature displays DAG number, mouza information, and available record discrepancy data for greater transparency.'}
            </p>
            <div className="space-y-3 mb-6">
              {[
                { en: 'DAG number and Mouza identification', bn: 'দাগ নম্বর এবং মৌজা পরিচিতি' },
                { en: 'Document record status', bn: 'দলিল রেকর্ডের অবস্থা' },
                { en: 'Discrepancy detection alerts', bn: 'অসঙ্গতি শনাক্তকরণ সতর্কতা' },
                { en: 'Ownership timeline reference', bn: 'মালিকানার টাইমলাইন রেফারেন্স' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>{lang === 'bn' ? item.bn : item.en}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/land-dna"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-800 hover:bg-green-900 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                {lang === 'bn' ? 'ল্যান্ড ডিএনএ দেখুন' : 'Explore Land DNA'}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl text-xs font-medium">
                {lang === 'bn' ? 'সব তথ্য কৃত্রিম ডেমো — আসল সরকারি রেকর্ড নয়' : 'All data is synthetic demo — not real government records'}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="space-y-3">
              {[
                { status: 'available', label: lang === 'bn' ? 'ডিএনএ যাচাইকৃত' : 'DNA Verified', bg: '#dcfce7', color: '#166534', desc: lang === 'bn' ? 'ল্যান্ড ডিএনএ তথ্য উপলব্ধ' : 'Land DNA information available' },
                { status: 'pending', label: lang === 'bn' ? 'যাচাই প্রক্রিয়াধীন' : 'Verification Pending', bg: '#fef3c7', color: '#92400e', desc: lang === 'bn' ? 'যাচাই এখনো শেষ হয়নি' : 'Verification not yet complete' },
                { status: 'mismatch', label: lang === 'bn' ? 'অসঙ্গতি পাওয়া গেছে' : 'Mismatch Detected', bg: '#fee2e2', color: '#991b1b', desc: lang === 'bn' ? 'রেকর্ডে অমিল পাওয়া গেছে' : 'Discrepancy found in records' },
                { status: 'unavailable', label: lang === 'bn' ? 'যাচাই উপলব্ধ নয়' : 'Verification N/A', bg: '#f3f4f6', color: '#6b7280', desc: lang === 'bn' ? 'ফ্ল্যাটের জন্য প্রযোজ্য নয়' : 'Not applicable for flats' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: item.bg, color: item.color }}>
                    {item.label}
                  </span>
                  <span className="text-xs text-gray-500">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ──── HOW IT WORKS ────────────────────────────────────────────
function HowItWorksSection() {
  const { lang } = useLanguage();
  const steps = {
    en: [
      { num: '01', title: 'Search Properties', desc: 'Use filters to find plots or flats by location, price, type, and more.', icon: <Search className="w-6 h-6" /> },
      { num: '02', title: 'Review Details', desc: 'View full property details, images, specifications, and company information.', icon: <Building2 className="w-6 h-6" /> },
      { num: '03', title: 'Check Verification', desc: 'Review available Land DNA verification status and record information.', icon: <ShieldCheck className="w-6 h-6" /> },
      { num: '04', title: 'Contact & Inquire', desc: 'Send a contact or booking inquiry directly to the property company.', icon: <Phone className="w-6 h-6" /> },
    ],
    bn: [
      { num: '০১', title: 'সম্পত্তি অনুসন্ধান', desc: 'এলাকা, মূল্য, ধরন এবং আরও ফিল্টার ব্যবহার করে প্লট বা ফ্ল্যাট খুঁজুন।', icon: <Search className="w-6 h-6" /> },
      { num: '০২', title: 'বিস্তারিত দেখুন', desc: 'সম্পূর্ণ সম্পত্তির বিবরণ, ছবি, বৈশিষ্ট্য এবং কোম্পানির তথ্য দেখুন।', icon: <Building2 className="w-6 h-6" /> },
      { num: '০৩', title: 'যাচাই পরীক্ষা করুন', desc: 'উপলব্ধ ল্যান্ড ডিএনএ যাচাইয়ের অবস্থা এবং রেকর্ড তথ্য পর্যালোচনা করুন।', icon: <ShieldCheck className="w-6 h-6" /> },
      { num: '০৪', title: 'যোগাযোগ করুন', desc: 'সম্পত্তি কোম্পানিকে সরাসরি যোগাযোগ বা বুকিং অনুসন্ধান পাঠান।', icon: <Phone className="w-6 h-6" /> },
    ],
  }[lang];

  return (
    <section className="py-14 bg-green-900 text-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            {lang === 'bn' ? 'কীভাবে কাজ করে' : 'How It Works'}
          </h2>
          <p className="text-green-300 text-sm">
            {lang === 'bn' ? 'মাত্র ৪টি সহজ ধাপে আপনার স্বপ্নের সম্পত্তি খুঁজুন' : 'Find your dream property in just 4 simple steps'}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-green-300">
                {step.icon}
              </div>
              <div className="text-4xl font-black text-white/10 mb-2 leading-none">{step.num}</div>
              <h3 className="font-bold text-white mb-2">{step.title}</h3>
              <p className="text-green-300 text-xs leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ──── CTA SECTION ─────────────────────────────────────────────
function CTASection() {
  const { lang } = useLanguage();
  return (
    <section className="py-14 bg-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="bg-gradient-to-br from-green-800 to-green-950 rounded-3xl p-8 sm:p-12 text-white">
          <Building2 className="w-12 h-12 text-green-300 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            {lang === 'bn' ? 'আপনার কোম্পানি নিবন্ধন করুন' : 'Register Your Company'}
          </h2>
          <p className="text-green-200 text-sm leading-relaxed mb-6">
            {lang === 'bn'
              ? 'নির্বাশে আপনার রিয়েল এস্টেট কোম্পানি নিবন্ধন করুন এবং লক্ষ লক্ষ সম্ভাব্য ক্রেতার কাছে আপনার সম্পত্তি তালিকা প্রদর্শন করুন।'
              : 'Register your real estate company on NIRBASH and showcase your property listings to millions of potential buyers across Bangladesh.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/nirbash/companies"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-green-900 font-bold rounded-xl text-sm hover:bg-green-50 transition-colors"
            >
              {lang === 'bn' ? 'কোম্পানি তালিকা দেখুন' : 'View Companies'}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/nirbash/properties"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/30 text-white font-semibold rounded-xl text-sm hover:bg-white/10 transition-colors"
            >
              {lang === 'bn' ? 'সম্পত্তি ব্রাউজ করুন' : 'Browse Properties'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ──── FOOTER ──────────────────────────────────────────────────
function NirbashFooter() {
  const { lang } = useLanguage();
  return (
    <footer className="bg-gray-900 text-gray-400 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-green-700 rounded-lg flex items-center justify-center">
                <Leaf className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-white font-bold text-sm">NIRBASH</span>
            </div>
            <p className="text-xs leading-relaxed text-gray-500">
              {lang === 'bn' ? 'আপনার জমি খুঁজুন। আপনার ঘর আবিষ্কার করুন।' : 'Find Your Land. Discover Your Home.'}
            </p>
          </div>
          <div>
            <div className="text-white font-semibold text-xs mb-3 uppercase tracking-wide">
              {lang === 'bn' ? 'সম্পত্তি' : 'Properties'}
            </div>
            <div className="space-y-2">
              {[
                { to: '/nirbash/properties?category=land_plot', label: lang === 'bn' ? 'জমির প্লট' : 'Land Plots' },
                { to: '/nirbash/properties?category=ready_to_move', label: lang === 'bn' ? 'রেডি-টু-মুভ' : 'Ready to Move' },
                { to: '/nirbash/properties?category=under_construction', label: lang === 'bn' ? 'নির্মাণাধীন' : 'Under Construction' },
                { to: '/nirbash/properties?category=commercial_property', label: lang === 'bn' ? 'বাণিজ্যিক' : 'Commercial' },
              ].map(l => (
                <Link key={l.to} to={l.to} className="block text-xs hover:text-white transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <div className="text-white font-semibold text-xs mb-3 uppercase tracking-wide">
              {lang === 'bn' ? 'কোম্পানি' : 'Company'}
            </div>
            <div className="space-y-2">
              <Link to="/nirbash/companies" className="block text-xs hover:text-white transition-colors">
                {lang === 'bn' ? 'কোম্পানি তালিকা' : 'Browse Companies'}
              </Link>
              <Link to="/about" className="block text-xs hover:text-white transition-colors">
                {lang === 'bn' ? 'পরিচিতি' : 'About'}
              </Link>
            </div>
          </div>
          <div>
            <div className="text-white font-semibold text-xs mb-3 uppercase tracking-wide">
              {lang === 'bn' ? 'প্ল্যাটফর্ম' : 'Platform'}
            </div>
            <div className="space-y-2">
              <Link to="/" className="block text-xs hover:text-white transition-colors">
                {lang === 'bn' ? 'জমি-শেয়ার হোম' : 'JOMI-SHARE Home'}
              </Link>
              <Link to="/land-dna" className="block text-xs hover:text-white transition-colors">
                {lang === 'bn' ? 'ল্যান্ড ডিএনএ' : 'Land DNA'}
              </Link>
              <Link to="/verification" className="block text-xs hover:text-white transition-colors">
                {lang === 'bn' ? 'রেকর্ড যাচাই' : 'Record Verification'}
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <span>© 2026 NIRBASH — A JOMI-SHARE Module. {lang === 'bn' ? 'কৃত্রিম ডেমো ডেটা।' : 'Synthetic demo data.'}</span>
          <span className="text-amber-600/70">{lang === 'bn' ? 'আসল সরকারি রেকর্ড নয়' : 'Not real government records'}</span>
        </div>
      </div>
    </footer>
  );
}

// ──── MAIN PAGE ───────────────────────────────────────────────
export default function NirbashHomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategorySection />
      <FeaturedPropertiesSection />
      <RecentPropertiesSection />
      <CompaniesSection />
      <LandDNASection />
      <HowItWorksSection />
      <CTASection />
      <NirbashFooter />
    </div>
  );
}
