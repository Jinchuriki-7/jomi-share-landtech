import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, Search, CheckCircle2, MapPin, Phone, MessageCircle,
  X, ArrowRight, ShieldCheck, Clock, Award, Sparkles, Send,
  Layers, Map, Scissors, FileSearch, Monitor
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import clsx from 'clsx';

export interface ServiceItem {
  id: string;
  titleBn: string;
  titleEn: string;
  category: 'legal' | 'survey' | 'mapping';
  descBn: string;
  descEn: string;
  deliveryTimeBn: string;
  feeEstimateBn: string;
  requiredDocsBn: string[];
  jomiShareToolLink?: string;
  jomiShareToolName?: string;
  renderVisual: () => React.ReactNode;
}

export default function NirbashServicesPage() {
  const { lang } = useLanguage();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', district: '', notes: '' });

  const services: ServiceItem[] = [
    {
      id: 'deed-writing',
      titleBn: 'দলিল লেখা',
      titleEn: 'Deed Writing & Drafting',
      category: 'legal',
      descBn: 'সাফ-কবলা, হেবা, দানপত্র, বণ্টননামা ও বায়না দলিল অভিজ্ঞ ও রেজিস্টার্ড দলিল লেখক দ্বারা সরকারি আইন মোতাবেক প্রস্তুতকরণ।',
      descEn: 'Professional drafting of sale deeds, heba, gift deeds, and partition deeds according to Bangladesh legal standards.',
      deliveryTimeBn: '১-২ কার্যদিবস',
      feeEstimateBn: '৳ ১,৫০০ - ৩,০০০',
      requiredDocsBn: ['সিএস/এসএ/আরএস/বিএস খতিয়ান', 'পূর্ববর্তী মূল দলিল', 'দাখিলা/খাজনার রশিদ', 'ওয়ারিশ সনদ (প্রযোজ্য ক্ষেত্রে)'],
      jomiShareToolLink: '/land-dna',
      jomiShareToolName: 'Land DNA দিয়ে দলিল খসড়া যাচাই',
      renderVisual: () => (
        <div className="relative w-44 sm:w-48 h-44 sm:h-48 mx-auto flex items-center justify-center">
          {/* Bangladesh Non-Judicial Stamp Paper Mockup */}
          <div className="w-36 h-44 bg-[#f8f6ee] rounded-xs shadow-2xl border border-amber-900/20 p-2 transform -rotate-3 hover:rotate-0 transition-transform duration-300 relative overflow-hidden flex flex-col">
            {/* Government Stamp Header */}
            <div className="h-9 border border-amber-800/40 rounded-xs bg-[#f4eed5] p-1 flex flex-col items-center justify-center text-center">
              <div className="w-4 h-4 rounded-full border border-amber-900 flex items-center justify-center text-[7px] font-bold text-amber-900">
                ৳
              </div>
              <div className="text-[6px] font-bold text-amber-900 uppercase tracking-tighter">
                গণপ্রজাতন্ত্রী বাংলাদেশ
              </div>
            </div>
            {/* Stamp Paper Lines */}
            <div className="mt-2 space-y-1 opacity-70 flex-1">
              <div className="h-1 bg-gray-400 rounded-full w-full"></div>
              <div className="h-1 bg-gray-400 rounded-full w-5/6"></div>
              <div className="h-1 bg-gray-400 rounded-full w-full"></div>
              <div className="h-1 bg-gray-400 rounded-full w-4/6"></div>
              <div className="h-1 bg-gray-300 rounded-full w-full"></div>
              <div className="h-1 bg-gray-300 rounded-full w-3/4"></div>
            </div>
            <div className="text-[7px] text-green-950 font-bold border-t border-gray-300 pt-1 flex justify-between">
              <span>সাফ-কবলা দলিল</span>
              <span>স্বাক্ষর: ______</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'deed-registration',
      titleBn: 'দলিল রেজিস্ট্রি',
      titleEn: 'Deed Registration Support',
      category: 'legal',
      descBn: 'সাব-রেজিস্ট্রি অফিসে ই-ফি, ট্যাক্স, পে-অর্ডার প্রস্তুতি ও যাবতীয় আইনি আনুষ্ঠানিকতা শেষে নিরাপদ দলিল নিবন্ধন সহায়তা।',
      descEn: 'Complete sub-registry office deed registration support including e-fee, tax calculations, pay-order and official execution.',
      deliveryTimeBn: '২-৩ কার্যদিবস',
      feeEstimateBn: 'সরকারি ফি + সার্ভিস চার্জ',
      requiredDocsBn: ['বিক্রেতার হাল সন পর্যন্ত খাজনা', 'খতিয়ান ও নামজারি পর্চা', 'উভয়পক্ষের জাতীয় পরিচয়পত্র', 'জমির ছবি ও চার সীমানা বিবরণ'],
      jomiShareToolLink: '/verification',
      jomiShareToolName: 'মালিকানা যাচাই করুন',
      renderVisual: () => (
        <div className="relative w-44 sm:w-48 h-44 sm:h-48 mx-auto flex items-center justify-center">
          {/* Registered Deed with Red Seals */}
          <div className="w-36 h-44 bg-[#faf7ee] rounded-xs shadow-2xl border border-red-900/30 p-2 transform rotate-2 hover:rotate-0 transition-transform duration-300 relative flex flex-col justify-between">
            {/* Top Red Stamp */}
            <div className="h-9 border border-red-700/60 rounded-xs bg-red-50 p-1 flex items-center justify-between">
              <div className="w-5 h-5 rounded-full bg-red-600 text-white text-[8px] font-bold flex items-center justify-center">
                Seal
              </div>
              <div className="text-[6.5px] font-black text-red-800 text-right">
                রেজিস্ট্রি অফিস<br />দলিল নং- ১২৮৪
              </div>
            </div>
            <div className="space-y-1 opacity-70 my-1">
              <div className="h-1 bg-gray-400 rounded-full w-full"></div>
              <div className="h-1 bg-gray-400 rounded-full w-4/5"></div>
              <div className="h-1 bg-gray-300 rounded-full w-full"></div>
            </div>
            {/* Official Stamp & Fingerprint */}
            <div className="flex items-center justify-between pt-1 border-t border-gray-200">
              <div className="w-6 h-7 rounded-sm border border-dashed border-red-500 bg-red-100/60 flex items-center justify-center text-[6px] text-red-700 font-bold">
                টিপসই
              </div>
              <div className="text-right">
                <span className="text-[7px] font-bold text-green-900 bg-green-100 px-1 py-0.5 rounded">রেজিস্ট্রিকৃত</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'deed-search',
      titleBn: 'দলিল তল্লাশি',
      titleEn: 'Deed Search & Certified Copy',
      category: 'legal',
      descBn: 'সাব-রেজিস্ট্রি ও জেলা রেকর্ড রুম থেকে যেকোনো পুরনো বা নতুন দলিলের সত্যতা যাচাই এবং সার্টিফাইড নকল কপি সংগ্রহ।',
      descEn: 'Official deed verification, record search, and certified copy retrieval from sub-registry and district record rooms.',
      deliveryTimeBn: '৩-৫ কার্যদিবস',
      feeEstimateBn: '৳ ২,০০০ - ৪,৫০০',
      requiredDocsBn: ['সম্ভাব্য দলিল নম্বর ও সন', 'সাব-রেজিস্ট্রি অফিসের নাম', 'দাতা ও গ্রহীতার নাম', 'মৌজা ও দাগ নম্বর'],
      jomiShareToolLink: '/land-dna',
      jomiShareToolName: 'Land DNA স্মার্ট সার্চ',
      renderVisual: () => (
        <div className="relative w-44 sm:w-48 h-44 sm:h-48 mx-auto flex items-center justify-center">
          <div className="w-36 h-44 bg-[#fbf9f2] rounded-xs shadow-2xl border border-gray-300 p-2 relative flex flex-col justify-between">
            <div className="h-8 border border-amber-800/30 bg-amber-50 rounded-xs p-1 text-[7px] text-amber-950 font-bold flex items-center justify-between">
              <span>তল্লাশি রেকর্ড বই</span>
              <span className="text-red-700 font-black">১৯৭২-২০২৪</span>
            </div>
            <div className="space-y-1 opacity-60">
              <div className="h-1 bg-gray-400 rounded-full w-full"></div>
              <div className="h-1 bg-gray-400 rounded-full w-2/3"></div>
              <div className="h-1 bg-gray-300 rounded-full w-full"></div>
            </div>
            {/* Magnifying Glass Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-amber-600 bg-amber-200/30 backdrop-blur-xs flex items-center justify-center shadow-lg">
              <Search className="w-8 h-8 text-amber-700 stroke-[2.5]" />
            </div>
            <div className="text-[7px] font-bold text-gray-600 text-center border-t border-gray-200 pt-1">
              নকল তল্লাশি সফল
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'namjari',
      titleBn: 'নামজারি',
      titleEn: 'Mutation (E-Namjari)',
      category: 'legal',
      descBn: 'সহকারী কমিশনার (ভূমি) অফিস থেকে দ্রুত ও বৈধ নিয়মে নামজারি (মিউটেশন), জমাখারিজ, প্রস্তাবিত খতিয়ান ও ডিসিআর সংগ্রহ।',
      descEn: 'Fast and official E-Namjari, mutation khatian generation, and DCR collection via the AC (Land) office.',
      deliveryTimeBn: '৭-১৫ কার্যদিবস',
      feeEstimateBn: 'সরকারি ফি + প্রসেসিং চার্জ',
      requiredDocsBn: ['মূল দলিলের সার্টিফাইড কপি', 'সিএস/এসএ/আরএস/বিএস পর্চা', 'হাল সন পর্যন্ত দাখিলা', 'উত্তরাধিকার সনদ (প্রযোজ্য ক্ষেত্রে)'],
      jomiShareToolLink: '/verification',
      jomiShareToolName: 'খতিয়ান রেকর্ড যাচাই',
      renderVisual: () => (
        <div className="relative w-44 sm:w-48 h-44 sm:h-48 mx-auto flex items-center justify-center">
          {/* Tabular Khatian Ledger Sheet */}
          <div className="w-38 h-44 bg-[#f8faf8] rounded-xs shadow-2xl border border-emerald-900/30 p-2 flex flex-col justify-between">
            <div className="text-center border-b border-emerald-800/20 pb-1">
              <div className="text-[7.5px] font-black text-emerald-950 uppercase">বাংলাদেশ ফরম নং ৫৪৬৩</div>
              <div className="text-[6.5px] font-bold text-emerald-700">নামজারি ও জমাখারিজ খতিয়ান</div>
            </div>
            {/* Khatian Grid Columns */}
            <div className="grid grid-cols-4 gap-1 text-[6px] border border-gray-300 p-1 bg-white font-medium">
              <div className="border-r border-gray-200">খতিয়ান নং</div>
              <div className="border-r border-gray-200">দাগ নং</div>
              <div className="border-r border-gray-200">জমির শ্রেণি</div>
              <div>অংশ/পরিমাণ</div>
              <div className="text-emerald-900 font-bold">১০৫২</div>
              <div className="text-emerald-900 font-bold">৪৫২</div>
              <div>নাল</div>
              <div className="text-emerald-900 font-bold">০.২৫০০</div>
            </div>
            <div className="flex items-center justify-between text-[7px] border-t border-gray-200 pt-1 font-semibold text-emerald-900">
              <span>ডিসিআর সংগৃহীত</span>
              <span className="text-green-700 font-black">✓ অনুমোদিত</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'land-survey-partition',
      titleBn: 'জায়গার নিখুঁত পরিমাপ ও ভাগ-বণ্টন',
      titleEn: 'Land Survey & Accurate Partition',
      category: 'survey',
      descBn: 'অভিজ্ঞ ডিজিটাল আমিন দ্বারা আধুনিক টোটাল স্টেশন ও জিপিএস দিয়ে জমি পরিমাপ, সীমানা নির্ধারণ ও ফারায়েজ অনুযায়ী ওয়ারিশান বণ্টন।',
      descEn: 'Precision digital land survey using Total Station & GPS, field demarcation, and algorithmic inheritance partition.',
      deliveryTimeBn: '১-২ কার্যদিবস',
      feeEstimateBn: '৳ ৩,০০০ - ৬,০০০',
      requiredDocsBn: ['মৌজা ম্যাপের শিট', 'মালিকানা দলিল ও রেকর্ড পর্চা', 'ওয়ারিশ তালিকা', 'চৌহদ্দির সীমানা বিবরণ'],
      jomiShareToolLink: '/partition',
      jomiShareToolName: 'AI অটো-পার্টিশন টুল চালান',
      renderVisual: () => (
        <div className="relative w-44 sm:w-48 h-44 sm:h-48 mx-auto flex items-center justify-center">
          {/* Rolled Blueprint Map with Wooden Survey Ruler & Triangulation */}
          <div className="w-40 h-36 bg-[#f3efe4] rounded-sm shadow-2xl border border-amber-900/30 p-2 relative flex flex-col justify-between">
            {/* Triangular survey geometric lines */}
            <svg className="w-full h-24 text-green-900/70" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1">
              <polygon points="10,50 45,10 85,30 60,55" strokeDasharray="2,1" fill="#14532d10" />
              <line x1="10" y1="50" x2="85" y2="30" stroke="#b91c1c" strokeWidth="1.2" />
              <circle cx="10" cy="50" r="2" fill="#b91c1c" />
              <circle cx="45" cy="10" r="2" fill="#b91c1c" />
              <circle cx="85" cy="30" r="2" fill="#b91c1c" />
              <circle cx="60" cy="55" r="2" fill="#b91c1c" />
              <text x="35" y="42" fontSize="5" fill="#14532d" fontWeight="bold">প্লট-১ (৫০%)</text>
              <text x="50" y="22" fontSize="5" fill="#1e3a8a" fontWeight="bold">প্লট-২ (৫০%)</text>
            </svg>
            {/* Wooden Ruler at side */}
            <div className="absolute -right-2 top-2 bottom-2 w-4 bg-[#c89858] rounded-xs shadow-md border border-amber-900 flex flex-col justify-between py-1 items-center">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-2 h-0.5 bg-black/60"></div>
              ))}
            </div>
            <div className="text-[7px] font-bold text-green-950 flex justify-between pr-4">
              <span>ডিজিটাল আমিন জরিপ</span>
              <span>স্কেল: ১৬"= ১ মাইল</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'mouza-google-overlay',
      titleBn: 'গুগল ম্যাপ ও মৌজা ম্যাপের ওভারলে',
      titleEn: 'Google Map & Mouza Map Overlay',
      category: 'mapping',
      descBn: 'সিএস/এসএ/আরএস মৌজা ম্যাপকে বাস্তব গুগল স্যাটেলাইট ম্যাপের উপর নিখুঁত জিও-ট্যাগিং করে রাস্তা, খাল ও বর্তমান দখলের অবস্থান নির্ণয়।',
      descEn: 'Georeferenced cadastral Mouza overlay on Google Satellite imagery to verify actual land occupancy, roads, and encroachment.',
      deliveryTimeBn: '২৪ ঘণ্টার মধ্যে',
      feeEstimateBn: '৳ ১,০০০ - ২,৫০০',
      requiredDocsBn: ['জেলা, উপজেলা ও মৌজা নাম', 'জেএল (JL) নম্বর ও দাগ নম্বর', 'সিএস/আরএস রেকর্ড তথ্য'],
      jomiShareToolLink: '/map',
      jomiShareToolName: 'স্যাটেলাইট ম্যাপ ওভারলে দেখুন',
      renderVisual: () => (
        <div className="relative w-44 sm:w-48 h-44 sm:h-48 mx-auto flex items-center justify-center">
          {/* Satellite Map with Transparent Mouza CAD Vector Overlay */}
          <div className="w-40 h-36 rounded-md shadow-2xl border-2 border-emerald-400 overflow-hidden relative">
            {/* Satellite Background Simulation */}
            <div className="absolute inset-0 bg-[#283f2a] flex items-center justify-center">
              <div className="w-full h-full opacity-60 bg-[radial-gradient(#88aa66_2px,transparent_2px)] bg-[size:10px_10px]"></div>
              <div className="absolute top-2 left-3 text-[7px] text-amber-300 font-bold bg-black/50 px-1 rounded">
                Google Satellite
              </div>
            </div>
            {/* Overlaid Mouza Map Lines */}
            <svg className="absolute inset-0 w-full h-full text-white" viewBox="0 0 100 70" fill="none" stroke="currentColor" strokeWidth="1.2">
              <polygon points="15,15 50,8 85,25 70,60 25,55" fill="#facc1530" stroke="#facc15" strokeWidth="1.5" />
              <line x1="15" y1="15" x2="70" y2="60" stroke="#facc15" strokeDasharray="3,2" />
              <circle cx="50" cy="35" r="3" fill="#ef4444" />
              <text x="45" y="47" fontSize="6" fill="#ffffff" fontWeight="bold" stroke="#000" strokeWidth="0.3">দাগ নং ৫১২</text>
            </svg>
            <div className="absolute bottom-1 right-2 bg-emerald-950/90 text-[6.5px] text-emerald-200 px-1 py-0.5 rounded font-bold">
              100% Georeferenced
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'digital-demarcation',
      titleBn: 'ডিজিটাল ডিমারকেশন',
      titleEn: 'Digital Demarcation & Boundary Pillar',
      category: 'survey',
      descBn: 'আরটিকে-জিপিএস (RTK-GPS) ড্রোন ও স্যাটেলাইট কো-অর্ডিনেট ব্যবহার করে প্লটের চতুঃসীমা ও টেকসই বাউন্ডারি পিলার স্থাপন।',
      descEn: 'Accurate boundary marking and permanent pillar positioning utilizing RTK-GPS latitude/longitude coordinates.',
      deliveryTimeBn: '১-২ কার্যদিবস',
      feeEstimateBn: '৳ ৪,০০০ - ৮,০০০',
      requiredDocsBn: ['খতিয়ান ও দাগ নম্বর', 'মৌজা নকশা', 'পূর্বে সীমানা বিরোধের তথ্য (যদি থাকে)'],
      jomiShareToolLink: '/heatmap',
      jomiShareToolName: 'রিস্ক ও বাউন্ডারি হিটম্যাপ',
      renderVisual: () => (
        <div className="relative w-44 sm:w-48 h-44 sm:h-48 mx-auto flex items-center justify-center">
          {/* Boundary coordinate plot diagram */}
          <div className="w-40 h-36 bg-[#fbfbf6] rounded-sm shadow-2xl border border-gray-400 p-2 flex flex-col justify-between">
            <div className="flex justify-between items-center text-[7px] text-green-950 font-bold border-b border-gray-200 pb-1">
              <span>ডিজিটাল ডিমারকেশন প্ল্যান</span>
              <span className="text-red-600">RTK-GPS</span>
            </div>
            {/* Plot with Pillar Points */}
            <svg className="w-full h-20 text-gray-800" viewBox="0 0 100 55" fill="none">
              <polygon points="20,10 80,15 70,48 15,42" fill="#15803d15" stroke="#15803d" strokeWidth="1.5" />
              {/* Pillars at 4 corners */}
              <circle cx="20" cy="10" r="3" fill="#dc2626" />
              <circle cx="80" cy="15" r="3" fill="#dc2626" />
              <circle cx="70" cy="48" r="3" fill="#dc2626" />
              <circle cx="15" cy="42" r="3" fill="#dc2626" />
              <text x="12" y="8" fontSize="4.5" fill="#000" fontWeight="bold">P1 (23.75°N)</text>
              <text x="68" y="12" fontSize="4.5" fill="#000" fontWeight="bold">P2 (90.39°E)</text>
              <text x="35" y="32" fontSize="6" fill="#15803d" fontWeight="bold">নিষ্কণ্টক সীমানা</text>
            </svg>
            <div className="text-[6.5px] text-gray-500 font-semibold text-center">
              পিলার স্থাপন সহ চূড়ান্ত ডিমারকেশন রিপোর্ট
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'mouza-scanned-copy',
      titleBn: 'মৌজা ম্যাপের স্ক্যান কপি',
      titleEn: 'Mouza Map High-Res Scan Copy',
      category: 'mapping',
      descBn: 'বাংলাদেশ জরিপ অধিদপ্তর ও জেলা রেকর্ড রুমের মূল সিএস, এসএ, আরএস ও বিএস মৌজা ম্যাপের হাই-রেজ্যুলেশন ফুল শিট স্ক্যান কপি।',
      descEn: 'Authentic 300+ DPI full-sheet high-resolution scans of original CS, SA, RS, and BS cadastral sheets.',
      deliveryTimeBn: '১২-২৪ ঘণ্টা (ইনস্ট্যান্ট ডাউনলোড)',
      feeEstimateBn: '৳ ৫০০ - ১,০০০',
      requiredDocsBn: ['জেলা ও উপজেলার নাম', 'মৌজার নাম ও জেএল (JL) নম্বর', 'প্রয়োজনীয় জরিপ (সিএস/এসএ/আরএস/বিএস) ও শিট নম্বর'],
      jomiShareToolLink: '/map',
      jomiShareToolName: 'ডিজিটাল ম্যাপ ব্রাউজার',
      renderVisual: () => (
        <div className="relative w-44 sm:w-48 h-44 sm:h-48 mx-auto flex items-center justify-center">
          {/* Authentic High-Res Mouza Cadastral Sheet Mockup */}
          <div className="w-40 h-36 bg-[#f7f2e5] rounded-xs shadow-2xl border border-amber-900/30 p-2 relative flex flex-col justify-between">
            {/* Mouza Sheet Header */}
            <div className="text-center border-b border-amber-900/20 pb-0.5">
              <div className="text-[7px] font-black text-amber-950">মৌজা নকশা (আর. এস. জরিপ)</div>
              <div className="text-[6px] text-gray-600">জে. এল. নং- ১০৪, শিট নং- ০১</div>
            </div>
            {/* Dense cadastral plot polygon network */}
            <svg className="w-full h-20 text-gray-700" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="0.8">
              <path d="M5,5 L30,5 L30,25 L5,25 Z" />
              <path d="M30,5 L65,8 L60,30 L30,25 Z" fill="#fde68a30" />
              <path d="M65,8 L95,12 L90,32 L60,30 Z" />
              <path d="M5,25 L30,25 L25,48 L8,45 Z" />
              <path d="M30,25 L60,30 L55,48 L25,48 Z" />
              <path d="M60,30 L90,32 L85,48 L55,48 Z" />
              <text x="40" y="19" fontSize="4.5" fill="#b45309" fontWeight="bold">দাগ ৩১৪</text>
              <text x="12" y="16" fontSize="4" fill="#555">৩১৩</text>
              <text x="72" y="21" fontSize="4" fill="#555">৩১৫</text>
            </svg>
            <div className="flex justify-between items-center text-[6px] text-green-950 font-bold border-t border-gray-300 pt-0.5">
              <span>মুদ্রণ: জরিপ অধিদপ্তর</span>
              <span className="text-emerald-700">৩০০+ ডিপিআই হাই-রেজ</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'autocad-pentagraph',
      titleBn: 'অটোক্যাড পেন্টাগ্রাফ',
      titleEn: 'AutoCAD Pentagraph & Digital Tracing',
      category: 'mapping',
      descBn: 'মৌজা ম্যাপের নির্দিষ্ট দাগ বা একাধিক দাগের নিখুঁত অটোক্যাড ডিজিটালাইজেশন, পরিমাপ হিসাব ও পেন্টাগ্রাফ ড্রয়িং (DWG/PDF)।',
      descEn: 'Cadastral vector pentagraph tracing in AutoCAD (DWG/DXF/PDF) with coordinate dimensioning and area computation.',
      deliveryTimeBn: '২৪-৪৮ ঘণ্টা',
      feeEstimateBn: '৳ ১,৫০০ - ৩,৫০০',
      requiredDocsBn: ['মৌজা ম্যাপের দাগ নম্বর', 'মালিকানা হিস্যা/শেয়ার', 'রাস্তা ও চারদিকের বিবরণ'],
      jomiShareToolLink: '/simulator',
      jomiShareToolName: 'সিমুলেটর ও ক্যলকুলেটর',
      renderVisual: () => (
        <div className="relative w-44 sm:w-48 h-44 sm:h-48 mx-auto flex items-center justify-center">
          {/* Desktop Computer Screen displaying AutoCAD */}
          <div className="w-42 h-36 bg-[#1e293b] rounded-md shadow-2xl border-2 border-slate-700 p-1 flex flex-col justify-between">
            {/* Monitor Screen Top Bar */}
            <div className="flex items-center justify-between px-1 py-0.5 bg-slate-900 rounded text-[6px] text-slate-300">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                <span>AutoCAD 2026 - [Pentagraph.dwg]</span>
              </span>
              <span className="text-emerald-400 font-mono">1:1 SCALE</span>
            </div>
            {/* CAD Plot Drawing Canvas */}
            <div className="relative flex-1 bg-black rounded my-0.5 p-1 flex items-center justify-center overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 100 55" fill="none">
                {/* Cadastral vector plot in CAD neon colors */}
                <polygon points="20,10 75,8 85,42 30,45" stroke="#06b6d4" strokeWidth="1.2" fill="#06b6d415" />
                <line x1="20" y1="10" x2="85" y2="42" stroke="#f43f5e" strokeWidth="0.8" strokeDasharray="2,2" />
                <text x="38" y="28" fontSize="5" fill="#facc15" fontWeight="bold">Area: 10.50 Shotok</text>
                {/* Dimension callouts */}
                <text x="42" y="7" fontSize="4" fill="#a78bfa">75 ft</text>
                <text x="82" y="27" fontSize="4" fill="#a78bfa">62 ft</text>
              </svg>
            </div>
            {/* Monitor Stand */}
            <div className="text-center text-[6px] text-slate-400 font-mono">
              Vector Pentagraph DWG / DXF
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSubmitted(true);
    setTimeout(() => {
      setOrderSubmitted(false);
      setSelectedService(null);
      setFormData({ name: '', phone: '', district: '', notes: '' });
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-[#f7faf8] text-gray-800 pb-16 font-sans">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER BANNER
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-b from-white via-green-50/40 to-[#f7faf8] border-b border-gray-200 py-10 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-900 text-xs font-bold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>১০০% বিশ্বস্ত ও নির্ভুল জমি সংক্রান্ত পেশাদার সার্ভিস</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#14442d] tracking-tight mb-3">
            {lang === 'bn' ? 'নিবাস সেবা সমূহ' : 'NIRBASH Services'}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
            দলিল তৈরি, রেজিস্ট্রি, নামজারি, মৌজা ম্যাপ স্ক্যান থেকে শুরু করে ডিজিটাল আমিন দ্বারা নিখুঁত পরিমাপ ও জমি বণ্টন—সকল সেবা এক ছাদের নিচে!
          </p>

          {/* Quick Contact & Hotline */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs">
            <a
              href="tel:+8801700000000"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 hover:border-green-600 shadow-xs text-green-900 font-bold transition-all hover:scale-105"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>হটলাইন: +880 1700-000000</span>
            </a>
            <a
              href="https://wa.me/8801700000000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 shadow-xs text-white font-bold transition-all hover:scale-105"
            >
              <MessageCircle className="w-3.5 h-3.5 text-white" />
              <span>হোয়াটসঅ্যাপে অর্ডার করুন</span>
            </a>
            <Link
              to="/partition"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 shadow-xs text-green-950 font-black transition-all hover:scale-105"
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>ফ্রি এআই জমি বণ্টন টুল</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. THE 9 SERVICES GRID (EXACTLY MATCHING USER SCREENSHOT)
      ───────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col bg-white"
            >
              {/* TOP PART: Dark Green Realistic Perspective Container */}
              <div
                className="h-56 sm:h-52 w-full flex items-center justify-center p-3 relative overflow-hidden transition-colors"
                style={{
                  background: 'linear-gradient(145deg, #385141 0%, #2f4436 60%, #25372c 100%)',
                }}
              >
                {/* Visual Graphic Representation */}
                {service.renderVisual()}

                {/* Subtle Hover Action Badge */}
                <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="px-2 py-1 rounded-md bg-amber-400 text-green-950 font-black text-[10px] shadow-sm">
                    বিস্তারিত দেখুন →
                  </span>
                </div>
              </div>

              {/* BOTTOM PART: Clean Card Footer with Bold Dark Green Title */}
              <div className="bg-[#eaf1ec] group-hover:bg-[#dbe9df] border-t border-gray-200/60 py-3.5 px-3 flex items-center justify-center text-center transition-colors">
                <h3 className="text-base sm:text-[17px] font-bold text-[#14442d] group-hover:text-green-950 tracking-tight leading-snug">
                  {lang === 'bn' ? service.titleBn : service.titleEn}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. SERVICE DETAILS & INSTANT BOOKING MODAL
      ───────────────────────────────────────────────────────────── */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-gray-800 p-6 sm:p-7"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-gray-700 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-900 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-green-950 leading-tight">
                  {lang === 'bn' ? selectedService.titleBn : selectedService.titleEn}
                </h2>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1 font-semibold">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>সময়: {selectedService.deliveryTimeBn}</span>
                  </span>
                  <span>•</span>
                  <span className="text-emerald-700 font-bold">
                    চার্জ: {selectedService.feeEstimateBn}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 text-sm text-gray-700 leading-relaxed mb-4">
              {lang === 'bn' ? selectedService.descBn : selectedService.descEn}
            </div>

            {/* Required Documents Checklist */}
            <div className="mb-5">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                প্রয়োজনীয় কাগজপত্র / তথ্য:
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-700 font-medium">
                {selectedService.requiredDocsBn.map((doc, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connected JOMI-SHARE Core AI Tool Banner (if applicable) */}
            {selectedService.jomiShareToolLink && (
              <div className="mb-5 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-900 to-green-900 text-white flex items-center justify-between shadow-xs">
                <div>
                  <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wide">
                    JOMI-SHARE AI ইন্টিগ্রেশন
                  </div>
                  <div className="text-xs font-semibold text-green-100 mt-0.5">
                    {selectedService.jomiShareToolName}
                  </div>
                </div>
                <Link
                  to={selectedService.jomiShareToolLink}
                  onClick={() => setSelectedService(null)}
                  className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-green-950 text-xs font-black transition-all flex items-center gap-1"
                >
                  <span>টুল খুলুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {/* Service Request / Order Form */}
            {orderSubmitted ? (
              <div className="p-6 bg-green-50 rounded-2xl border border-green-200 text-center animate-fade-in">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h3 className="text-base font-bold text-green-950">আপনার রিকোয়েস্ট গৃহীত হয়েছে!</h3>
                <p className="text-xs text-gray-600 mt-1">
                  আমাদের সার্ভিস টিম দ্রুত আপনার সাথে যোগাযোগ করে প্রয়োজনীয় পদক্ষেপ গ্রহণ করবে।
                </p>
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit} className="space-y-3 border-t border-gray-100 pt-4">
                <h4 className="text-sm font-bold text-green-950">
                  সার্ভিসটির জন্য সরাসরি আবেদন বা তথ্য চান?
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    required
                    placeholder="আপনার নাম"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="মোবাইল নম্বর"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                  />
                </div>
                <input
                  type="text"
                  placeholder="জেলা / মৌজা / দাগ নম্বর (যদি থাকে)"
                  value={formData.district}
                  onChange={e => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                />

                <div className="flex items-center gap-2.5 pt-1">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-xl bg-green-900 hover:bg-green-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>রিকোয়েস্ট সাবমিট করুন</span>
                  </button>

                  <a
                    href="https://wa.me/8801700000000"
                    target="_blank"
                    rel="noreferrer"
                    className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
