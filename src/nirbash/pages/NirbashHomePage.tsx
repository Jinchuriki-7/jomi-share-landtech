import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, MapPin, ChevronRight, Star, ShieldCheck, Building2,
  ArrowRight, Landmark, Home, Briefcase, CheckCircle, HardHat,
  TrendingUp, Users, Phone, Mail, ChevronDown, Leaf, Play,
  Lock, Unlock, MessageCircle, AlertCircle, Sparkles, CheckCircle2,
  FileText, PlusCircle, HelpCircle, X
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useNirbash } from '../context/NirbashContext';
import PropertyCard from '../components/PropertyCard';
import {
  PROPERTY_CATEGORIES_DATA, DISTRICTS_BD,
  JOMIBAZAR_AGENTS, type PropertyCategory, type NirbashProperty
} from '../data/nirbashData';
import clsx from 'clsx';

export default function NirbashHomePage() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const { properties, companies, setShowAuthModal, isLoggedIn, currentUser } = useNirbash();

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PropertyCategory | ''>('');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [activePropertyFilter, setActivePropertyFilter] = useState<'all' | 'land_plot' | 'urgent' | 'residential_flat'>('all');

  // Video guide modal state
  const [activeVideoGuide, setActiveVideoGuide] = useState<{ title: string; desc: string; role: string } | null>(null);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedLocation) params.set('district', selectedLocation);
    navigate(`/nirbash/properties?${params.toString()}`);
  };

  // Filter properties for the All Property section
  const displayedProperties = properties.filter(p => {
    if (p.listingStatus !== 'published') return false;
    if (activePropertyFilter === 'all') return true;
    if (activePropertyFilter === 'land_plot') return p.category === 'land_plot';
    if (activePropertyFilter === 'residential_flat') return p.category === 'residential_flat' || p.category === 'ready_to_move';
    if (activePropertyFilter === 'urgent') return p.titleBn.includes('আর্জেন্ট') || p.title.toLowerCase().includes('urgent') || p.titleBn.includes('ভিটা');
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* ─────────────────────────────────────────────────────────────
          1. TOP ANNOUNCEMENT RIBBON (Jomi Bazar Style)
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-green-950 via-green-900 to-green-950 text-white py-2 px-4 border-b border-green-800/40 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-green-950 font-black text-[10px] uppercase tracking-wide">
              ১০০% কমিশন ফ্রি
            </span>
            <span className="text-green-200 font-medium">
              {lang === 'bn'
                ? 'সম্পূর্ণ এজেন্ট ও সেলার ভিত্তিক রিয়েল এস্টেট মার্কেটপ্লেস'
                : '100% Commission-Free Agent & Seller Real Estate Marketplace'}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-green-300">
            <span>
              {lang === 'bn' ? `(${properties.length}) টি প্রপার্টি বিক্রির জন্য তালিকাভুক্ত` : `(${properties.length}) Properties for Sale`}
            </span>
            <span className="text-green-700">•</span>
            <Link to="/nirbash/register-company" className="text-amber-300 font-bold hover:underline">
              {lang === 'bn' ? 'ফ্রি বিজ্ঞাপন দিন' : 'Post Free Ad'}
            </Link>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. HERO SECTION & ADVANCED SEARCH (Jomi Bazar Identity)
      ───────────────────────────────────────────────────────────── */}
      <section
        className="relative py-14 sm:py-20 px-4 sm:px-6 overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 80% 20%, #164e38 0%, #0d2e23 60%, #081d16 100%)',
        }}
      >
        {/* Background glow & accents */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-green-300 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{lang === 'bn' ? 'জায়গা-জমি বিক্রি হবে খুব সহজে, নিবাসে!' : 'Buy & Sell Land Easily on NIRBASH!'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              {lang === 'bn'
                ? 'বাংলাদেশের যেকোনো জায়গায় জমি, ফ্ল্যাট ও প্লট ক্রয়-বিক্রয়'
                : 'Buy & Sell Land, Flats & Plots Anywhere in Bangladesh'}
            </h1>

            <p className="text-green-100/80 text-sm sm:text-base leading-relaxed">
              {lang === 'bn'
                ? 'সরাসরি জমির মালিক ও যাচাইকৃত এজেন্টদের সাথে কথা বলুন। কোনো তৃতীয় পক্ষের বাড়তি কমিশন ছাড়া নিরাপদ লেনদেন করুন।'
                : 'Direct connection with real estate owners and certified agents with 100% transparent Land DNA records.'}
            </p>
          </div>

          {/* Jomi Bazar Advanced Filter Box */}
          <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 border border-gray-100 max-w-5xl mx-auto">
            <form onSubmit={handleSearch} className="space-y-4">
              {/* Top search row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                {/* Details Input */}
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder={lang === 'bn' ? 'প্রপার্টির বিবরণ বা নাম...' : 'Property details or title...'}
                    className="w-full pl-9 pr-3 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:border-green-800 font-medium"
                  />
                </div>

                {/* Property Type Dropdown */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value as any)}
                    className="w-full px-3.5 py-3 rounded-2xl border border-gray-200 bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:border-green-800 appearance-none cursor-pointer"
                  >
                    <option value="">{lang === 'bn' ? 'সকল ক্যাটাগরি (All Types)' : 'All Property Types'}</option>
                    <option value="land_plot">{lang === 'bn' ? 'জমির প্লট (Land Plot)' : 'Land Plot'}</option>
                    <option value="residential_flat">{lang === 'bn' ? 'ফ্ল্যাট (Flat/Apartment)' : 'Residential Flat'}</option>
                    <option value="ready_to_move">{lang === 'bn' ? 'রেডি ফ্ল্যাট (Ready to Move)' : 'Ready to Move'}</option>
                    <option value="commercial_property">{lang === 'bn' ? 'বাণিজ্যিক স্পেস (Commercial)' : 'Commercial'}</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Search Agent Dropdown */}
                <div className="relative">
                  <select
                    value={selectedAgent}
                    onChange={e => setSelectedAgent(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-2xl border border-gray-200 bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:border-green-800 appearance-none cursor-pointer"
                  >
                    <option value="">{lang === 'bn' ? 'সকল এজেন্ট (Search Agent)' : 'Search Agent'}</option>
                    {JOMIBAZAR_AGENTS.map(agent => (
                      <option key={agent.id} value={agent.id}>
                        {lang === 'bn' ? agent.nameBn : agent.name} ({lang === 'bn' ? agent.agencyBn : agent.agency})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Search Location Dropdown */}
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={selectedLocation}
                    onChange={e => setSelectedLocation(e.target.value)}
                    className="w-full pl-9 pr-8 py-3 rounded-2xl border border-gray-200 bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:border-green-800 appearance-none cursor-pointer"
                  >
                    <option value="">{lang === 'bn' ? 'সকল লোকেশন (Search Location)' : 'Search Location'}</option>
                    <option value="Chittagong">চট্টগ্রাম (Chittagong / ফটিকছড়ি)</option>
                    <option value="Dhaka">ঢাকা (Dhaka / সাভার / গুলশান)</option>
                    <option value="Gazipur">গাজীপুর (Gazipur)</option>
                    <option value="Sylhet">সিলেট (Sylhet)</option>
                    {DISTRICTS_BD.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Action Buttons row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto py-1">
                  <span className="text-xs text-gray-400 font-semibold">{lang === 'bn' ? 'জনপ্রিয়:' : 'Popular:'}</span>
                  {['দাঁতমারা', 'ফটিকছড়ি', 'হেয়াকো', 'সাভার', 'গুলশান'].map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => { setSearchQuery(tag); handleSearch(); }}
                      className="px-2.5 py-1 bg-gray-100 hover:bg-green-100 hover:text-green-800 text-gray-600 rounded-lg text-[11px] font-semibold transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-green-900 hover:bg-green-800 text-white rounded-2xl text-xs font-bold transition-all shadow-md shadow-green-950/20 flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'প্রপার্টি খুঁজুন' : 'Search Properties'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-white">
              <div className="text-2xl font-black text-amber-300">১০০%</div>
              <div className="text-xs text-green-200 mt-0.5">{lang === 'bn' ? 'কমিশন ফ্রি' : 'Commission Free'}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-white">
              <div className="text-2xl font-black text-white">{properties.length}+</div>
              <div className="text-xs text-green-200 mt-0.5">{lang === 'bn' ? 'লাইভ প্রপার্টি' : 'Active Listings'}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-white">
              <div className="text-2xl font-black text-white">{JOMIBAZAR_AGENTS.length}+</div>
              <div className="text-xs text-green-200 mt-0.5">{lang === 'bn' ? 'অনুমোদিত এজেন্ট' : 'Certified Agents'}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-white">
              <div className="text-2xl font-black text-emerald-300">ল্যান্ড ডিএনএ</div>
              <div className="text-xs text-green-200 mt-0.5">{lang === 'bn' ? 'যাচাইকৃত রেকর্ড' : 'Verified Records'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. ALL PROPERTY SECTION (Jomi Bazar Grid)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-gray-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                All Property (সকল প্রপার্টি)
              </h2>
              <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-800 text-xs font-black">
                {displayedProperties.length} টি
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {lang === 'bn'
                ? 'সরাসরি জমি ও ফ্ল্যাটের বিবরণ, মাপ ও ছবি দেখুন'
                : 'Explore live verified properties across Bangladesh'}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {[
              { id: 'all', label: lang === 'bn' ? 'সকল প্রপার্টি' : 'All Properties' },
              { id: 'land_plot', label: lang === 'bn' ? 'জমির প্লট' : 'Land Plots' },
              { id: 'urgent', label: lang === 'bn' ? 'আর্জেন্ট বিক্রি' : 'Urgent Sale' },
              { id: 'residential_flat', label: lang === 'bn' ? 'ফ্ল্যাট' : 'Flats' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActivePropertyFilter(tab.id as any)}
                className={clsx(
                  'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap',
                  activePropertyFilter === tab.id
                    ? 'bg-green-900 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/nirbash/properties"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-900 hover:bg-green-800 text-white text-xs font-bold rounded-2xl shadow-md transition-all"
          >
            <span>{lang === 'bn' ? 'সকল প্রপার্টি ব্রাউজ করুন' : 'Browse All Properties'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. USER GUIDE SECTION (Buyer, Seller & Agent)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-14 bg-emerald-950 text-white px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="px-3 py-1 rounded-full bg-emerald-800/60 text-emerald-300 text-xs font-bold">
              টিউটোরিয়াল ও নির্দেশিকা
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-2">
              User Guide (Buyer, Seller & Agent)
            </h2>
            <p className="text-xs text-emerald-200/80 mt-1">
              {lang === 'bn'
                ? 'কীভাবে নিবাস (NIRBASH) ব্যবহার করে নিরাপদে কেনাবেচা ও লিস্টিং করবেন তার সম্পূর্ণ গাইড'
                : 'Comprehensive tutorials on how to search, post listings, and manage transactions'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Guide 1: Buyer */}
            <div
              onClick={() => setActiveVideoGuide({
                role: 'Buyer Guide',
                title: 'কীভাবে নিবাসে প্রপার্টি খুঁজবেন ও সরাসরি সেলারের সাথে কথা বলবেন',
                desc: 'সার্চ ফিল্টারে এলাকা ও বাজেট নির্ধারণ করে প্রপার্টি নির্বাচন করুন। জমির খতিয়ান/দাগ বিবরণ দেখে সরাসরি মালিকের ফোন বা হোয়াটসঅ্যাপে যুক্ত হোন।'
              })}
              className="bg-emerald-900/60 border border-emerald-800/80 rounded-3xl p-6 hover:bg-emerald-800/60 transition-all cursor-pointer group"
            >
              <div className="relative h-44 rounded-2xl overflow-hidden mb-4 bg-emerald-950 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&auto=format&fit=crop&q=80"
                  alt="Buyer Guide"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-amber-400 text-green-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 text-white text-[10px] font-bold">
                  Buyer Guide (ক্রেতা গাইড)
                </span>
              </div>
              <h3 className="font-bold text-white text-sm mb-2 group-hover:text-amber-300 transition-colors">
                কীভাবে প্রপার্টি খুঁজবেন ও মালিকের সাথে যোগাযোগ করবেন
              </h3>
              <p className="text-xs text-emerald-200/80 leading-relaxed">
                কোনো তৃতীয় পক্ষ ছাড়াই সরাসরি ফোনে কথা বলে সাইট ভিজিট বুক করার নিয়মাবলী।
              </p>
            </div>

            {/* Guide 2: Seller */}
            <div
              onClick={() => setActiveVideoGuide({
                role: 'Seller Guide',
                title: 'কীভাবে আপনার জমি বা ফ্ল্যাটের ফ্রি বিজ্ঞাপন পোস্ট করবেন',
                desc: 'মেনু বার থেকে "বিজ্ঞাপন দিন" বাটন প্রেস করুন। আপনার জমির শতক/কাঠা সাইজ, ছবি, লোকেশন ও দাম দিয়ে মাত্র ২ মিনিটে বিজ্ঞাপন লাইভ করুন।'
              })}
              className="bg-emerald-900/60 border border-emerald-800/80 rounded-3xl p-6 hover:bg-emerald-800/60 transition-all cursor-pointer group"
            >
              <div className="relative h-44 rounded-2xl overflow-hidden mb-4 bg-emerald-950 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&auto=format&fit=crop&q=80"
                  alt="Seller Guide"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-amber-400 text-green-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 text-white text-[10px] font-bold">
                  Seller Guide (সেলার গাইড)
                </span>
              </div>
              <h3 className="font-bold text-white text-sm mb-2 group-hover:text-amber-300 transition-colors">
                কীভাবে নিজে নিজে ফ্রি বিজ্ঞাপন পাবলিশ করবেন
              </h3>
              <p className="text-xs text-emerald-200/80 leading-relaxed">
                সহজ ৪ ধাপে প্রপার্টি লিস্টিং করে দেশের হাজার হাজার ক্রেতার কাছে পৌঁছান।
              </p>
            </div>

            {/* Guide 3: Agent */}
            <div
              onClick={() => setActiveVideoGuide({
                role: 'Agent Guide',
                title: 'কীভাবে এজেন্ট প্রোফাইল তৈরি করবেন ও ক্লায়েন্ট লিড পাবেন',
                desc: 'এজেন্ট হিসেবে রেজিস্টার করে আপনার লাইসেন্স ও এলাকা যুক্ত করুন। ক্রেতাদের সরাসরি কল ও হোয়াটসঅ্যাপ বার্তা গ্রহণ করুন।'
              })}
              className="bg-emerald-900/60 border border-emerald-800/80 rounded-3xl p-6 hover:bg-emerald-800/60 transition-all cursor-pointer group"
            >
              <div className="relative h-44 rounded-2xl overflow-hidden mb-4 bg-emerald-950 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600&auto=format&fit=crop&q=80"
                  alt="Agent Guide"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-amber-400 text-green-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 text-white text-[10px] font-bold">
                  Agent Guide (এজেন্ট গাইড)
                </span>
              </div>
              <h3 className="font-bold text-white text-sm mb-2 group-hover:text-amber-300 transition-colors">
                কীভাবে এজেন্ট হিসেবে যুক্ত হয়ে ক্লায়েন্ট পাবেন
              </h3>
              <p className="text-xs text-emerald-200/80 leading-relaxed">
                ভেরিফায়েড এজেন্ট ব্যাজ নিয়ে দ্রুত ক্লায়েন্ট ডিল সম্পন্ন করার টিপস।
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/nirbash/company-dashboard"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-emerald-700 hover:bg-emerald-900 text-xs font-semibold text-emerald-200 transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-amber-300" />
              <span>Want More? Check Out More Tutorials Inside Dashboard</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. ফ্রিতে নিজে নিজে বিজ্ঞাপন দেওয়ার ধাপ সমূহ (Jomi Bazar 4 Steps)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold">
            সহজ ও ফ্রি প্রক্রিয়া
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
            ফ্রিতে নিজে নিজে নিবাসে বিজ্ঞাপন দেওয়ার ধাপ সমূহ:
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            কোনো এজেন্ট বা দালালের সাহায্য ছাড়াই নিজের প্রপার্টি অনলাইনে লিস্টিং করুন
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all text-center relative flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-800 flex items-center justify-center mx-auto mb-4 font-black text-lg border border-green-200">
                ০১
              </div>
              <span className="text-[11px] font-bold text-green-700 uppercase tracking-wider block mb-1">Step-1</span>
              <h3 className="font-bold text-gray-900 text-sm mb-2">Login / Register করে নিন</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                মোবাইল নম্বর দিয়ে সাইন ইন করুন এবং আপনার প্রোফাইল টাইপ (Seller বা Agent) সিলেক্ট করুন।
              </p>
            </div>
            <button
              onClick={() => setShowAuthModal(true)}
              className="mt-4 py-2 px-3 bg-gray-100 hover:bg-green-100 text-green-900 rounded-xl text-xs font-semibold"
            >
              লগইন / রেজিস্টার
            </button>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all text-center relative flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center mx-auto mb-4 font-black text-lg border border-blue-200">
                ০২
              </div>
              <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block mb-1">Step-2</span>
              <h3 className="font-bold text-gray-900 text-sm mb-2">মেনু বার থেকে 'বিজ্ঞাপন দিন' এ ক্লিক করুন</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                ড্যাশবোর্ড অথবা টপ নেভিগেশন বার থেকে "অ্যাড প্রপার্টি" বাটনে চাপ দিয়ে লিস্টিং ফর্ম খুলুন।
              </p>
            </div>
            <Link
              to="/nirbash/company-dashboard"
              className="mt-4 py-2 px-3 bg-gray-100 hover:bg-blue-100 text-blue-900 rounded-xl text-xs font-semibold"
            >
              বিজ্ঞাপন ফর্ম খুলুন
            </Link>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all text-center relative flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center mx-auto mb-4 font-black text-lg border border-amber-200">
                ০৩
              </div>
              <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block mb-1">Step-3</span>
              <h3 className="font-bold text-gray-900 text-sm mb-2">দাম, সাইজ, ছবি ও দাগ/মৌজা দিন</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                বিক্রয়যোগ্য জমির শতক/কাঠা পরিমাণ, মূল্য, ঠিকানা, ছবি এবং জমি-শেয়ারের দাগ নম্বর দিন।
              </p>
            </div>
            <span className="mt-4 py-2 px-3 bg-amber-50 text-amber-900 rounded-xl text-xs font-semibold block">
              শতক / কাঠা / স্কয়ার ফিট
            </span>
          </div>

          {/* Final Step */}
          <div className="bg-gradient-to-br from-green-900 to-green-950 text-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all text-center relative flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white/20 text-white flex items-center justify-center mx-auto mb-4 font-black text-lg border border-white/30">
                ০৪
              </div>
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block mb-1">Final Step</span>
              <h3 className="font-bold text-white text-sm mb-2">আপনার প্রপার্টি পাবলিশ হয়ে গেল!</h3>
              <p className="text-xs text-green-200 leading-relaxed">
                সরাসরি আগ্রহী ক্রেতারা আপনাকে কল বা হোয়াটসঅ্যাপে মেসেজ পাঠিয়ে কথা বলবে!
              </p>
            </div>
            <Link
              to="/nirbash/register-company"
              className="mt-4 py-2 px-3 bg-amber-400 hover:bg-amber-300 text-green-950 rounded-xl text-xs font-black"
            >
              এখনই শুরু করুন
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. TOP VERIFIED AGENTS SECTION (All Agent Directory Preview)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-14 bg-white border-t border-gray-100 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-800" />
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                  All Agent (শীর্ষ অনুমোদিত এজেন্টসমূহ)
                </h2>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {lang === 'bn'
                  ? 'আপনার এলাকার বিশ্বস্ত ও পরীক্ষিত রিয়েল এস্টেট এজেন্টদের সাথে সরাসরি কথা বলুন'
                  : 'Certified land and flat agents ready to assist your property deals'}
              </p>
            </div>

            <Link
              to="/nirbash/agents"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-green-800 hover:text-green-900"
            >
              <span>{lang === 'bn' ? 'সকল এজেন্ট দেখুন' : 'View All Agents'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {JOMIBAZAR_AGENTS.map(agent => (
              <div
                key={agent.id}
                className="bg-gray-50 rounded-3xl p-5 border border-gray-200/80 hover:border-green-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-3.5 mb-3">
                    <img
                      src={agent.avatar}
                      alt={agent.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-green-800"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm leading-tight flex items-center gap-1.5">
                        <span>{lang === 'bn' ? agent.nameBn : agent.name}</span>
                        <ShieldCheck className="w-4 h-4 text-green-700" />
                      </h3>
                      <p className="text-[11px] text-green-800 font-semibold mt-0.5">
                        {lang === 'bn' ? agent.agencyBn : agent.agency}
                      </p>
                      <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-1">
                        <MapPin className="w-3 h-3 text-green-700" />
                        <span>{lang === 'bn' ? agent.locationBn : agent.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl text-xs flex justify-between items-center mb-3">
                    <span className="text-gray-500">লিস্টিং সংখ্যা</span>
                    <span className="font-bold text-green-900">{agent.activeListings} টি সক্রিয় প্রপার্টি</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200/60">
                  <a
                    href={`tel:${agent.phone}`}
                    className="py-2 px-3 bg-green-900 hover:bg-green-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>কল করুন</span>
                  </a>
                  <a
                    href={`https://wa.me/${agent.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. LAND DNA INTEGRATION (JOMI-SHARE Verification Engine)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-14 bg-green-50/60 border-t border-green-100 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="px-3 py-1 rounded-full bg-green-200 text-green-900 text-xs font-bold">
                জমি-শেয়ার এআই প্রযুক্তি
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2 mb-3">
                ল্যান্ড ডিএনএ (Land DNA) — ডিজিটাল ভূমি যাচাইকরণ
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-5">
                নিবাসে তালিকাভুক্ত প্রতিটি জমির জন্য সিএস, এসএ ও আরএস খতিয়ানের দাগ নম্বর যাচাই করা যায়। জমি-শেয়ারের ইন্টেলিজেন্ট ইঞ্জিন দলিলের অমিল ও মালিকানা রেকর্ড শনাক্ত করে ক্রেতাদের শতভাগ ঝুঁকিহীন বিনিয়োগ নিশ্চিত করে।
              </p>

              <div className="space-y-2 mb-6 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-700 flex-shrink-0" />
                  <span>সিএস, এসএ, আরএস ও বিএস দাগ নম্বরের স্বয়ংক্রিয় ম্যাপিং</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-700 flex-shrink-0" />
                  <span>মৌজা ম্যাপ ও ভৌগোলিক অবস্থানের যাচাই</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-700 flex-shrink-0" />
                  <span>মালিকানা অসঙ্গতি ও বিরোধের পূর্বাভাস অ্যালার্ট</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/jomi-share/land-dna"
                  className="px-5 py-3 bg-green-900 hover:bg-green-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                >
                  {lang === 'bn' ? 'ল্যান্ড ডিএনএ টুল দেখুন' : 'Explore Land DNA'}
                </Link>
                <Link
                  to="/jomi-share/verification"
                  className="px-5 py-3 border border-gray-300 hover:bg-white text-gray-700 rounded-xl text-xs font-semibold transition-all"
                >
                  {lang === 'bn' ? 'রেকর্ড যাচাই করুন' : 'Verify Records'}
                </Link>
                <Link
                  to="/jomi-share"
                  className="px-4 py-3 bg-amber-400 hover:bg-amber-300 text-green-950 rounded-xl text-xs font-black shadow-xs transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-green-950" />
                  <span>{lang === 'bn' ? 'সম্পূর্ণ এআই প্ল্যাটফর্ম খুলুন' : 'Open JOMI-SHARE AI'}</span>
                </Link>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-green-200 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                লাইভ ভেরিফিকেশন স্ট্যাটাসসমূহ:
              </h4>
              {[
                { label: 'DNA Verified (ডিএনএ যাচাইকৃত)', desc: 'দাগ ও মৌজা তথ্য জমি-শেয়ার ডেটাবেজে সম্পূর্ণ মিলেছে', color: '#166534', bg: '#dcfce7' },
                { label: 'Verification Pending (যাচাই প্রক্রিয়াধীন)', desc: 'কাগজপত্র জমা হয়েছে, অডিট চলছে', color: '#92400e', bg: '#fef3c7' },
                { label: 'Mismatch Detected (অসঙ্গতি সতর্কতা)', desc: 'রেকর্ডে মালিকানার অমিল বা খতিয়ান বিভ্রাট শনাক্ত হয়েছে', color: '#991b1b', bg: '#fee2e2' },
                { label: 'Verification N/A (প্রযোজ্য নয়)', desc: 'ফ্ল্যাট বা কমার্শিয়াল প্রপার্টির ক্ষেত্রে প্রযোজ্য নয়', color: '#4b5563', bg: '#f3f4f6' },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-2xl flex items-center justify-between border border-gray-100">
                  <div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: item.bg, color: item.color }}>
                      {item.label}
                    </span>
                    <p className="text-[11px] text-gray-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. VIDEO GUIDE MODAL
      ───────────────────────────────────────────────────────────── */}
      {activeVideoGuide && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold">
                {activeVideoGuide.role}
              </span>
              <button
                onClick={() => setActiveVideoGuide(null)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video rounded-2xl bg-black overflow-hidden flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80"
                alt="Guide Cover"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute text-center text-white p-4">
                <Play className="w-12 h-12 text-amber-400 mx-auto mb-2 fill-current" />
                <p className="text-xs font-bold">{activeVideoGuide.title}</p>
                <p className="text-[11px] text-gray-300 mt-1">Interactive Video Tutorial</p>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-2xl border border-gray-100">
              {activeVideoGuide.desc}
            </p>

            <button
              onClick={() => setActiveVideoGuide(null)}
              className="w-full py-2.5 bg-green-900 text-white rounded-xl text-xs font-bold"
            >
              বন্ধ করুন (Close)
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          9. JOMI BAZAR FOOTER
      ───────────────────────────────────────────────────────────── */}
      <footer className="bg-gray-950 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {/* Col 1 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-green-800 text-white flex items-center justify-center font-black">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-white font-black text-base leading-tight">NIRBASH • নিবাস</h3>
                  <p className="text-[10px] text-green-400">জায়গা-জমি বিক্রি হবে খুব সহজে!</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                বাংলাদেশের যেকোনো জায়গায় জমি, ফ্ল্যাট, প্লট, বাড়ি বা বাণিজ্যিক প্রপার্টি ক্রয়/বিক্রয় করুন সম্পূর্ণ ১০০% কমিশন ছাড়া।
              </p>
              <div className="text-xs text-gray-500">
                হটলাইন: <span className="text-white font-mono">+880 1822-456789</span>
              </div>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">ক্যাটাগরিসমূহ</h4>
              <ul className="space-y-2 text-xs">
                <li><Link to="/nirbash/properties?category=land_plot" className="hover:text-white">জমির প্লট ও ভিটা জমি</Link></li>
                <li><Link to="/nirbash/properties?category=ready_to_move" className="hover:text-white">রেডি-টু-মুভ ফ্ল্যাট</Link></li>
                <li><Link to="/nirbash/properties?category=under_construction" className="hover:text-white">নির্মাণাধীন প্রকল্প</Link></li>
                <li><Link to="/nirbash/properties?category=commercial_property" className="hover:text-white">বাণিজ্যিক স্পেস ও দোকান</Link></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">দ্রুত লিংক</h4>
              <ul className="space-y-2 text-xs">
                <li><Link to="/nirbash/agents" className="hover:text-white">All Agent (সকল এজেন্ট)</Link></li>
                <li><Link to="/nirbash/compare" className="hover:text-white">প্রপার্টি তুলনা (Compare)</Link></li>
                <li><Link to="/nirbash/company-dashboard" className="hover:text-white">কোম্পানি ও সেলার ড্যাশবোর্ড</Link></li>
                <li><Link to="/nirbash/register-company" className="hover:text-white">নতুন বিজ্ঞাপন দিন</Link></li>
                <li><Link to="/land-dna" className="hover:text-white">জমি-শেয়ার ল্যান্ড ডিএনএ</Link></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">কমিউনিটি ও সাপোর্ট</h4>
              <p className="text-xs text-gray-400 mb-3">
                সোশ্যাল মিডিয়ায় আমাদের সাথে যুক্ত থাকুন:
              </p>
              <div className="flex items-center gap-2 mb-4">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-gray-900 hover:bg-green-800 text-white flex items-center justify-center transition-colors">
                  f
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-gray-900 hover:bg-red-700 text-white flex items-center justify-center transition-colors">
                  ▶
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-gray-900 hover:bg-blue-600 text-white flex items-center justify-center transition-colors">
                  𝕏
                </a>
              </div>
              <div className="p-3 bg-gray-900 rounded-2xl text-[11px] text-gray-400">
                🔒 ১০০% নিরাপদ ও এনক্রিপ্টেড ল্যান্ড ডাটা প্ল্যাটফর্ম।
              </div>
            </div>
          </div>

          <div className="border-t border-gray-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
            <div>
              Copyright © {new Date().getFullYear()} NIRBASH. All Rights Reserved.
            </div>
            <div className="text-green-500 font-semibold">
              Developed by Farhanul Haque (Integrated into JOMI-SHARE)
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
