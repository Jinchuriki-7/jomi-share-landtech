import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Clock, ArrowRight, Calendar,
  CheckCircle2, BookOpen, X
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface BlogPost {
  id: string;
  titleBn: string;
  titleEn: string;
  categoryBn: string;
  categoryEn: string;
  readTimeBn: string;
  readTimeEn: string;
  dateBn: string;
  dateEn: string;
  authorBn: string;
  authorEn: string;
  summaryBn: string;
  summaryEn: string;
  image: string;
  contentBn: string[];
  contentEn: string[];
  keyTakeawaysBn: string[];
  keyTakeawaysEn: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'khatian-verification-guide',
    titleBn: 'জমি কেনার পূর্বে খতিয়ান ও রেকর্ড যাচাইয়ের ৫টি সহজ নিয়ম',
    titleEn: '5 Essential Rules to Verify Land Khatian & Records Before Buying',
    categoryBn: 'জমি যাচাইকরণ',
    categoryEn: 'Verification',
    readTimeBn: '৪ মিনিট পাঠ',
    readTimeEn: '4 min read',
    dateBn: '১২ অক্টোবর, ২০২৬',
    dateEn: 'October 12, 2026',
    authorBn: 'অ্যাডভোকেট সাজিদুর রহমান (ভূমি আইন বিশেষজ্ঞ)',
    authorEn: 'Advocate Sajidur Rahman (Land Law Specialist)',
    summaryBn: 'সিএস, এসএ, আরএস ও বিএস খতিয়ান মেলানো এবং দলিলের ধারাবাহিকতা (Chain of Ownership) যাচাই করার বাস্তবসম্মত কৌশল।',
    summaryEn: 'Practical guide to cross-examining CS, SA, RS, and BS survey records and verifying the chain of deed ownership.',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80',
    contentBn: [
      'বাংলাদেশে জমি কেনাবেচায় সবচেয়ে বেশি প্রতারণা ঘটে ভুয়া বা জাল খতিয়ান ও দলিলের ধারাবাহিকতায় গরমিলের কারণে। জমি রেজিস্ট্রেশনের পূর্বে ন্যূনতম ৪টি মৌলিক জরিপ রেকর্ড পুঙ্খানুপুঙ্খ মেলানো অত্যন্ত জরুরি।',
      'প্রথমত, সিএস (CS - Cadastral Survey) খতিয়ানের মূল মালিকের নাম থেকে শুরু করে এসএ (SA) ও আরএস (RS) রেকর্ডে মালিকানার হস্তান্তর কীভাবে হয়েছে তা হিস্যা অনুযায়ী যোগ-বিয়োগ করে যাচাই করতে হবে। একে বলা হয় দলিলের চেইন (Chain of Ownership)।',
      'দ্বিতীয়ত, হাল সনের ভূমি উন্নয়ন কর বা খাজনা দাখিলা বিক্রেতার নিজের নামে বা তার পূর্বপুরুষের নামে আপ-টু-ডেট আছে কিনা তা দেখতে হবে। খাজনা বকেয়া থাকলে নামজারিতে জটিলতা সৃষ্টি হয়।',
      'তৃতীয়ত, সহকারী কমিশনার (ভূমি) অফিস বা ইউনিয়ন ভূমি অফিস থেকে মৌজা ম্যাপের সাথে দাগ নম্বর মিলিয়ে জমির বর্তমান দখল ও চৌহদ্দি সরেজমিনে পরিমাপ করতে হবে। JOMI-SHARE এআই ল্যান্ড ডিএনএ ব্যবহার করে ঘরে বসেই এই প্রাথমিক যাচাই করা সম্ভব।'
    ],
    contentEn: [
      'In Bangladesh, the vast majority of real estate fraud arises from forged khatians, disconnected chain of title, or unverified oral inheritance partitions. Before signing any deed, verifying four historic survey records is paramount.',
      'First, trace ownership succession starting from the Cadastral Survey (CS), continuing through State Acquisition (SA), and cross-checking Revision Survey (RS) to City/BS records. Ensure the fractional shares match mathematically.',
      'Second, confirm that up-to-date Land Development Tax (Khajna) receipts and certified Mutation Khatians exist under the seller’s name with an authentic DCR number.',
      'Third, physically measure the plot with an authorized surveyor against the Mouza sheet to guarantee that the ground demarcation matches government coordinates.'
    ],
    keyTakeawaysBn: [
      'সিএস থেকে বিএস পর্যন্ত ধারাবাহিক বায়া দলিল যাচাই করুন',
      'বিক্রেতার নামে হাল সনের দাখিলা ও নামজারি পর্চা বাধ্যতামূলক',
      'মৌজা নকশা ও বাস্তব জমিনের সীমানা আমিন দিয়ে মেপে নিশ্চিত হোন',
      'আদালতে কোনো স্বত্ব মামলা বা নিলাম ক্রোক চলছে কিনা দেওয়ানি আদালতে খোঁজ নিন'
    ],
    keyTakeawaysEn: [
      'Verify unbroken succession of Baya deeds from CS to City/BS surveys',
      'Ensure mutation khatian and current fiscal year tax receipts exist under seller name',
      'Physically measure boundaries with a licensed surveyor against the Mouza sheet',
      'Confirm with the local civil court that no lis pendens stay order exists'
    ]
  },
  {
    id: 'bajna-agreement-rules',
    titleBn: 'বায়না দলিল করার সঠিক আইনি নিয়ম ও টাকা পরিশোধের সতর্কতা',
    titleEn: 'Legal Rules for Land Agreement (Bayna) & Payment Safety',
    categoryBn: 'আইন ও দলিল',
    categoryEn: 'Legal Documentation',
    readTimeBn: '৩ মিনিট পাঠ',
    readTimeEn: '3 min read',
    dateBn: '০৮ অক্টোবর, ২০২৬',
    dateEn: 'October 08, 2026',
    authorBn: 'ব্যারিস্টার তানভীর হাসান',
    authorEn: 'Barrister Tanvir Hasan',
    summaryBn: 'রেজিস্টার্ড বায়না দলিলের মেয়াদ, টাকা পরিশোধের ব্যাংকিং মাধ্যম ও আইনি বাধ্যবাধকতা।',
    summaryEn: 'Validity of registered Bayna deeds, banking payment instruments, and legal enforceability.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=80',
    contentBn: [
      '২০০৪ সালের সম্পত্তি হস্তান্তর আইনের সংশোধনী অনুযায়ী বায়না চুক্তি অবশ্যই সাব-রেজিস্ট্রি অফিসে রেজিস্ট্রি করা বাধ্যতামূলক। নোটারি পাবলিক বা ১০০ টাকার নন-জুডিশিয়াল স্ট্যাম্পে মৌখিক চুক্তির কোনো আইনি ভিত্তি নেই।',
      'বায়না দলিলের মেয়াদ সর্বোচ্চ ৬ মাস। নির্দিষ্ট মেয়াদের মধ্যে বাকি টাকা পরিশোধ করে সাফ-কবলা দলিল রেজিস্ট্রির দিন ধার্য করতে হবে।',
      'বায়নার টাকা সবসময় একাউন্ট পেয়ি চেক বা পে-অর্ডারের মাধ্যমে পরিশোধ করা উচিত। কোনো অবস্থাতেই বড় অঙ্কের নগদ অর্থ লেনদেন করবেন না।'
    ],
    contentEn: [
      'Under the 2004 amended Registration Act of Bangladesh, contract for sale (Bayna Nama) must be formally registered at the Sub-Registry office. Unregistered notary agreements hold no weight in court.',
      'The statutory duration of a Bayna agreement defaults to 6 months unless a specific deadline is stipulated in the registered contract.',
      'Always remit earnest payments via Account Payee Cheques or Bank Pay Orders rather than cash transactions.'
    ],
    keyTakeawaysBn: [
      '১০০ টাকার স্ট্যাম্পে নোটারি নয়, সাব-রেজিস্ট্রিতে রেজিস্টার্ড বায়না করুন',
      'বায়নার টাকা পে-অর্ডার বা ব্যাংক একাউন্টে জমা দিয়ে রসিদ সংরক্ষণ করুন',
      'নির্দিষ্ট মেয়াদের মধ্যে সাফ-কবলা সম্পাদনে ব্যর্থ হলে দেওয়ানি আদালতে চুক্তি কার্যকরের মামলা করা যায়'
    ],
    keyTakeawaysEn: [
      'Always register your Bayna deed at the government sub-registry',
      'Use bank pay orders to create an indisputable audit trail',
      'Breach of contract enables suit for specific performance under civil procedure'
    ]
  },
  {
    id: 'rajuk-approval-check',
    titleBn: 'ঢাকায় ফ্ল্যাট কেনার আগে রাজউক প্ল্যান ও অনুমোদন যেভাবে যাচাই করবেন',
    titleEn: 'How to Verify RAJUK Building Approvals Before Purchasing Flats in Dhaka',
    categoryBn: 'ফ্ল্যাট ও অ্যাপার্টমেন্ট',
    categoryEn: 'Apartments',
    readTimeBn: '৫ মিনিট পাঠ',
    readTimeEn: '5 min read',
    dateBn: '০২ অক্টোবর, ২০২৬',
    dateEn: 'October 02, 2026',
    authorBn: 'স্থপতি ফারহানা জামান (নগর পরিকল্পনাবিদ)',
    authorEn: 'Architect Farhana Zaman (Urban Planner)',
    summaryBn: 'FAR ক্যালকুলেশন, পার্কিং স্পেস নিশ্চিতকরণ ও অকুপেন্সি সার্টিফিকেট যাচাই করার চেকলিস্ট।',
    summaryEn: 'Checklist for FAR zoning calculation, parking entitlement, and Occupancy Certificates.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80',
    contentBn: [
      'ঢাকায় নির্মিত বহু ভবনে রাজউকের অনুমোদিত নকশা লঙ্ঘন করে অতিরিক্ত ফ্লোর বা সেটব্যাক এলাকায় ফ্ল্যাট নির্মাণ করা হয়। এমন ফ্ল্যাট কিনলে পরবর্তীতে উচ্ছেদ বা সংযোগ বিচ্ছিন্ন হওয়ার ঝুঁকি থাকে।',
      'ফ্ল্যাট বুকিংয়ের পূর্বে রাজউকের ওয়েবসাইট বা জোন অফিস থেকে প্ল্যান নম্বর মিলিয়ে দেখুন ভবনটি কত তলার অনুমোদনপ্রাপ্ত।',
      'রিয়েল এস্টেট অ্যান্ড হাউজিং অ্যাসোসিয়েশন অব বাংলাদেশ (REHAB) এবং রাজউক নিবন্ধিত ডেভেলপারের কাছ থেকে ফ্ল্যাট কিনলে আইনি ঝুঁকি অনেক হ্রাস পায়।'
    ],
    contentEn: [
      'Many multi-storied buildings in Dhaka deviate from RAJUK-approved plans by encroaching on mandatory setback spaces or adding unapproved vertical floors.',
      'Cross-check the approval permit number directly against RAJUK zonal databases prior to booking confirmation.',
      'Ensure the developer is a registered member of REHAB and has obtained the formal Occupancy Certificate.'
    ],
    keyTakeawaysBn: [
      'রাজউকের সর্বশেষ অনুমোদিত আর্কিটেকচারাল ও স্ট্রাকচারাল নকশা দেখুন',
      'বিল্ডিংয়ের অকুপেন্সি সার্টিফিকেট (Occupancy Certificate) আছে কিনা যাচাই করুন',
      'পার্কিং স্পেস ও কমন এরিয়ার আনুপাতিক হিস্যা দলিলে নিশ্চিত করুন'
    ],
    keyTakeawaysEn: [
      'Inspect approved architectural blueprints and structural calculations',
      'Verify that the building holds a valid Occupancy Certificate',
      'Confirm allocated car parking slots in the registered title deed'
    ]
  },
  {
    id: 'inheritance-land-partition',
    titleBn: 'ওয়ারিশান সম্পত্তি বণ্টন ও আপস বণ্টননামা দলিলের গুরুত্ব',
    titleEn: 'Inheritance Property Division & Partition Deed Guide',
    categoryBn: 'উত্তরাধিকার ও ফারায়েজ',
    categoryEn: 'Inheritance',
    readTimeBn: '৪ মিনিট পাঠ',
    readTimeEn: '4 min read',
    dateBn: '২৮ সেপ্টেম্বর, ২০২৬',
    dateEn: 'September 28, 2026',
    authorBn: 'মাওলানা কামরুল ইসলাম ও অ্যাডভোকেট রফিকুল ইসলাম',
    authorEn: 'Mawlana Kamrul Islam & Adv. Rafiqul Islam',
    summaryBn: 'পারিবারিক বিরোধ ছাড়া মুসলিম ও হিন্দু উত্তরাধিকার আইন মেনে জমি পরিমাপ ও আপস বণ্টননামা দলিল করার উপায়।',
    summaryEn: 'Method of peaceful land demarcation and registered partition deed under succession laws.',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&auto=format&fit=crop&q=80',
    contentBn: [
      'পৈত্রিক সম্পত্তি মৌখিকভাবে ভাগ করে ভোগদখল করলে ভবিষ্যতে ওয়ারিশদের উত্তরসূরিদের মধ্যে চরম সীমানা বিরোধ সৃষ্টি হয়। আইনে মৌখিক বণ্টনের কোনো স্থায়ী ভিত্তি নেই।',
      'সকল ওয়ারিশ একত্রিত হয়ে ডিজিটাল সার্ভেয়ার দিয়ে সমগ্র দাগ মেপে যার যার ফারায়েজ অনুযায়ী অংশ চিহ্নিত করে সাব-রেজিস্ট্রি অফিসে "আপস বণ্টননামা দলিল" সম্পাদন ও রেজিস্ট্রি করা আবশ্যক।',
      'বণ্টননামা দলিল রেজিস্ট্রি হওয়ার পর প্রতিটি ওয়ারিশ নিজ নিজ অংশে পৃথক নামজারি (জমাখারিজ) করে আলাদা খতিয়ান খুলে নিতে পারেন।'
    ],
    contentEn: [
      'Informal oral family divisions almost inevitably degenerate into bitter boundary disputes in succeeding generations. Oral partitions possess zero legal immunity against lawsuits.',
      'All legal heirs must demarcate the total acreage and execute a registered Partition Deed (Aposh Bonton-Nama) at the sub-registry office.',
      'Following registration, each heir can execute mutation (Jomakharij) in their individual name.'
    ],
    keyTakeawaysBn: [
      'মৌখিক বণ্টনের বদলে রেজিস্টার্ড বণ্টননামা দলিল করুন',
      'বণ্টননামার পর নিজ নিজ নামে পৃথক নামজারি ও জমাখারিজ সম্পন্ন করুন',
      'JOMI-SHARE এর অটোমেটিক পার্টিশন ইঞ্জিন দিয়ে ফ্রিতে নির্ভুল অংশ জেনে নিন'
    ],
    keyTakeawaysEn: [
      'Execute a formal registered deed rather than oral family agreements',
      'Mutate separate khatian immediately following partition registration',
      'Calculate precise shares with the JOMI-SHARE Inheritance Engine'
    ]
  }
];

export default function NirbashBlogPage() {
  const { lang } = useLanguage();
  const isBn = lang === 'bn';
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoryOptions = isBn
    ? [
        { key: 'all', label: 'সকল ব্লগ' },
        { key: 'verification', label: 'জমি যাচাইকরণ' },
        { key: 'legal', label: 'আইন ও দলিল' },
        { key: 'apartments', label: 'ফ্ল্যাট ও অ্যাপার্টমেন্ট' },
        { key: 'inheritance', label: 'উত্তরাধিকার ও ফারায়েজ' },
      ]
    : [
        { key: 'all', label: 'All Articles' },
        { key: 'verification', label: 'Verification' },
        { key: 'legal', label: 'Legal Documentation' },
        { key: 'apartments', label: 'Apartments' },
        { key: 'inheritance', label: 'Inheritance' },
      ];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'verification' && post.categoryEn === 'Verification') ||
      (selectedCategory === 'legal' && post.categoryEn === 'Legal Documentation') ||
      (selectedCategory === 'apartments' && post.categoryEn === 'Apartments') ||
      (selectedCategory === 'inheritance' && post.categoryEn === 'Inheritance');

    const searchLower = searchQuery.toLowerCase();
    const title = isBn ? post.titleBn : post.titleEn;
    const summary = isBn ? post.summaryBn : post.summaryEn;
    const matchSearch =
      searchQuery === '' ||
      title.toLowerCase().includes(searchLower) ||
      summary.toLowerCase().includes(searchLower);

    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#f7faf8] text-gray-800 pb-16 font-sans">
      {/* Header */}
      <div className="bg-gradient-to-b from-white via-green-50/50 to-[#f7faf8] border-b border-gray-200 py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-900 text-xs font-bold mb-3 shadow-xs">
            <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
            <span>{isBn ? 'NIRBASH রিয়েল এস্টেট ও ল্যান্ড নলেজ হাব' : 'NIRBASH Real Estate & Land Knowledge Hub'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-green-950 tracking-tight mb-3">
            {isBn ? 'নিবাস প্রপার্টি গাইড ও ব্লগ' : 'NIRBASH Property Guide & Blog'}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            {isBn
              ? 'জমি কেনাবেচা, দলিল লিখন, খতিয়ান যাচাই ও রাজউক বিধিমালা সংক্রান্ত বিশেষজ্ঞ আইনি পরামর্শ ও দিকনির্দেশনা।'
              : 'Expert insights, legal procedures, deed verification guides, and urban development regulations in Bangladesh.'}
          </p>

          {/* Search bar */}
          <div className="mt-7 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={isBn ? 'আর্টিকেল বা বিষয় দিয়ে খুঁজুন...' : 'Search articles or legal topics...'}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm bg-white shadow-xs focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />
          </div>

          {/* Category Pills */}
          <div className="mt-5 flex items-center justify-center gap-2 flex-wrap">
            {categoryOptions.map(cat => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.key
                    ? 'bg-green-900 text-white shadow-xs'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-green-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {filteredPosts.map(post => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col group"
            >
              <div className="relative h-52 sm:h-56 overflow-hidden bg-gray-100">
                <img
                  src={post.image}
                  alt={isBn ? post.titleBn : post.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-green-950/85 backdrop-blur-xs text-amber-300 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
                  {isBn ? post.categoryBn : post.categoryEn}
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>{isBn ? post.readTimeBn : post.readTimeEn}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] text-gray-400 font-semibold mb-2 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{isBn ? post.dateBn : post.dateEn}</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-bold">{isBn ? post.authorBn : post.authorEn}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-900 transition-colors leading-snug mb-2">
                    {isBn ? post.titleBn : post.titleEn}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {isBn ? post.summaryBn : post.summaryEn}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-green-900">
                  <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    {isBn ? 'সম্পূর্ণ পড়ুন' : 'Read Full Guide'} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[11px] text-gray-400 font-normal">NIRBASH Legal Desk</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full Article Reader Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-gray-800 p-6 sm:p-8"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-gray-700 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100">
                {isBn ? selectedPost.categoryBn : selectedPost.categoryEn}
              </span>
              <span>•</span>
              <span className="text-gray-500">{isBn ? selectedPost.dateBn : selectedPost.dateEn}</span>
              <span>•</span>
              <span className="text-amber-700">{isBn ? selectedPost.readTimeBn : selectedPost.readTimeEn}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-green-950 leading-tight mb-3">
              {isBn ? selectedPost.titleBn : selectedPost.titleEn}
            </h2>

            <div className="text-xs text-gray-500 font-semibold mb-5 pb-3 border-b border-gray-100">
              {isBn ? 'লেখক: ' : 'Author: '}
              <span className="text-gray-900 font-bold">{isBn ? selectedPost.authorBn : selectedPost.authorEn}</span>
            </div>

            {/* Featured Image */}
            <div className="rounded-2xl overflow-hidden h-56 mb-6">
              <img
                src={selectedPost.image}
                alt={isBn ? selectedPost.titleBn : selectedPost.titleEn}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Body Paragraphs */}
            <div className="space-y-3.5 text-sm text-gray-700 leading-relaxed font-normal">
              {(isBn ? selectedPost.contentBn : selectedPost.contentEn).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Key Takeaways Box */}
            <div className="mt-6 p-4 rounded-2xl bg-green-50 border border-green-200">
              <h4 className="text-xs font-bold text-green-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{isBn ? 'বিশেষ জরুরি নির্দেশিকা:' : 'Key Practical Directives:'}</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-700 font-medium">
                {(isBn ? selectedPost.keyTakeawaysBn : selectedPost.keyTakeawaysEn).map((t, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0"></span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
              <Link
                to="/land-dna"
                onClick={() => setSelectedPost(null)}
                className="px-3.5 py-2 rounded-xl bg-amber-400 text-green-950 font-black hover:bg-amber-300 transition-colors inline-flex items-center gap-1.5"
              >
                <span>{isBn ? 'Land DNA দিয়ে যাচাই করুন' : 'Verify with Land DNA'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors cursor-pointer"
              >
                {isBn ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
