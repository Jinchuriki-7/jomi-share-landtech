import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Award, Users, MapPin,
  Sparkles, Leaf
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function NirbashAboutPage() {
  const { lang } = useLanguage();
  const isBn = lang === 'bn';

  const stats = [
    { value: isBn ? '১০০%' : '100%', label: isBn ? 'কমিশন ফ্রি মার্কেটপ্লেস' : 'Commission-Free Marketplace' },
    { value: isBn ? '১,৫০০+' : '1,500+', label: isBn ? 'তালিকাভুক্ত প্রপার্টি' : 'Verified Listings' },
    { value: isBn ? '৬৪' : '64', label: isBn ? 'জেলায় বিস্তৃত নেটওয়ার্ক' : 'Districts Covered' },
    { value: isBn ? '০%' : '0%', label: isBn ? 'হিডেন ফি বা মধ্যস্বত্বভোগী' : 'Hidden Fees or Middlemen' },
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: isBn ? 'এআই-চালিত ল্যান্ড ডিএনএ ভেরিফিকেশন' : 'AI-Powered Land DNA Verification',
      desc: isBn
        ? 'সিএস, এসএ, আরএস ও বিএস রেকর্ডের দাগ ও খতিয়ান মিলিয়ে দলিলের ধারাবাহিকতা ও আইনি মালিকানা যাচাই।'
        : 'Matching CS, SA, RS, and BS record dags and khatians to cross-examine deed succession and authentic ownership.'
    },
    {
      icon: Award,
      title: isBn ? '১০০% কমিশন ও দালালমুক্ত লেনদেন' : '100% Direct & Commission-Free',
      desc: isBn
        ? 'কোনো ব্রোকারেজ ফি বা মধ্যস্থতাকারী নেই। সরাসরি জমির প্রকৃত মালিক অথবা ভেরিফাইড রিয়েল এস্টেট কোম্পানির সাথে কথা বলুন।'
        : 'Zero brokerage fees or middlemen. Directly communicate with authentic property owners or verified development companies.'
    },
    {
      icon: Users,
      title: isBn ? 'ডিজিটাল পার্টিশন ও ফারায়েজ সমাধান' : 'Digital Inheritance & Partitioning',
      desc: isBn
        ? 'পৈত্রিক ও যৌথ জমির উত্তরাধিকারীদের মধ্যে সুষম ও বৈজ্ঞানিক নিয়মে নিখুঁত জমি ভাগ-বণ্টন এআই সুবিধা।'
        : 'Scientific AI partition engine for equitable inheritance calculation across heirs without family litigation.'
    },
    {
      icon: MapPin,
      title: isBn ? 'মৌজা ম্যাপ ও গুগল স্যাটেলাইট ওভারলে' : 'Mouza Sheet & Satellite Overlay',
      desc: isBn
        ? 'কাগজের মৌজা নকশাকে বাস্তব স্যাটেলাইট ম্যাপের উপর জিও-ট্যাগ করে রাস্তা, সীমানা ও দখল শতভাগ নিশ্চিতকরণ।'
        : 'Georeferencing paper mouza survey maps directly on high-resolution Google Satellite imagery for boundary demarcation.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f7faf8] text-gray-800 pb-16 font-sans">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-white via-green-50/50 to-[#f7faf8] border-b border-gray-200 py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-900 text-xs font-bold mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{isBn ? 'সম্পূর্ণ স্বচ্ছ ও আধুনিক রিয়েল এস্টেট প্ল্যাটফর্ম' : 'Transparent & Modern Real Estate Ecosystem'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-green-950 tracking-tight leading-tight mb-4">
            {isBn ? 'আমাদের সম্পর্কে — ' : 'About Us — '}
            <span className="text-emerald-700">NIRBASH {isBn ? '(নিবাস)' : ''}</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto font-medium">
            {isBn
              ? 'বাংলাদেশের সাধারণ নাগরিক, ক্রেতা, বিক্রেতা এবং রিয়েল এস্টেট উদ্যোক্তাদের জন্য জমি কেনাবেচাকে নিরাপদ, হয়রানিমুক্ত এবং প্রযুক্তিনির্ভর করার লক্ষ্যে আমাদের এই পথচলা।'
              : 'Empowering Bangladeshi citizens, buyers, sellers, and real estate developers with secure, fraud-free, and AI-driven land intelligence.'}
          </p>
        </div>
      </div>

      {/* Stats Counter Row */}
      <div className="max-w-5xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm text-center">
              <div className="text-2xl sm:text-3xl font-black text-green-900">{s.value}</div>
              <div className="text-xs text-gray-500 font-semibold mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-16">
        <div className="bg-white rounded-3xl border border-gray-200 p-7 sm:p-10 shadow-xs mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold mb-3">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>{isBn ? 'আমাদের ভিশন ও লক্ষ্য' : 'Our Vision & Mission'}</span>
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-4 leading-snug">
                {isBn
                  ? 'জমি কেনাবেচায় দালালমুক্ত নতুন যুগের সূচনা'
                  : 'A New Era of Direct, Transparent Property Exchange'}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {isBn
                  ? 'বাংলাদেশে ঐতিহ্যগতভাবে জমি বা প্রপার্টি ক্রয়ে সাধারণ মানুষ সীমাহীন জটিলতা, সীমানা বিরোধ এবং মধ্যস্বত্বভোগীদের চড়া কমিশনের শিকার হন।'
                  : 'Traditionally in Bangladesh, property buyers and genuine sellers suffer from extortionate commissions, lack of verified land records, and confusing boundary conflicts.'}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {isBn ? (
                  <>
                    <strong>NIRBASH (নিবাস)</strong> তৈরি হয়েছে ক্রেতা ও প্রকৃত বিক্রেতার মধ্যে সরাসরি সেতুবন্ধন গড়তে। এর সাথে <strong>JOMI-SHARE</strong> এর পেটেন্টেড এআই ইঞ্জিন যুক্ত থাকায় যে কেউ জমি কেনার আগেই তার কাগজপত্র, খতিয়ান ও স্যাটেলাইট নকশা নিখুঁতভাবে যাচাই করতে পারেন।
                  </>
                ) : (
                  <>
                    <strong>NIRBASH</strong> was built to create an honest bridge between buyers and authentic sellers. Deeply integrated with <strong>JOMI-SHARE</strong> AI intelligence, anyone can verify land records, mutation chains, and mouza coordinates before investing.
                  </>
                )}
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80"
                alt="Modern Real Estate"
                className="w-full h-72 object-cover"
              />
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
            {isBn ? 'কেন NIRBASH অন্যান্য প্ল্যাটফর্ম থেকে আলাদা?' : 'Why NIRBASH Stands Apart?'}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {isBn ? 'প্রযুক্তির শক্তি ও স্বচ্ছতার সমন্বয়' : 'The synergy of Artificial Intelligence and verified land data'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-green-50 text-green-900 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-emerald-700" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Hackathon Project Credits */}
        <div className="bg-gradient-to-r from-green-950 via-green-900 to-green-950 text-white rounded-3xl p-8 sm:p-10 shadow-lg text-center">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-green-950 font-black text-xs uppercase tracking-wider">
              LandTech Hackathon 2026 Project
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Developed with Passion by Dider & Noman
            </h3>
            <p className="text-xs sm:text-sm text-green-200 leading-relaxed">
              {isBn
                ? 'JOMI-SHARE ও NIRBASH প্ল্যাটফর্মটি ভূমি ব্যবস্থাপনায় স্বচ্ছতা ও ডিজিটাল উদ্ভাবন নিশ্চিত করার লক্ষ্যে ডিজাইন ও ডেভেলপ করা হয়েছে।'
                : 'Designed and developed to bring automated transparency, legal clarity, and digital innovation to Bangladesh land administration.'}
            </p>
            <div className="pt-3 flex items-center justify-center gap-3">
              <Link
                to="/nirbash/properties"
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-green-950 font-black rounded-xl text-xs transition-all shadow-xs"
              >
                {isBn ? 'প্রপার্টি ব্রাউজ করুন' : 'Browse Properties'}
              </Link>
              <Link
                to="/nirbash/contact"
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs transition-all border border-white/20"
              >
                {isBn ? 'আমাদের সাথে যোগাযোগ' : 'Contact Us'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
