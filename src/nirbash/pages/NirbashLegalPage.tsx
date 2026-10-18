import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  AlertTriangle, ShieldCheck, FileText, Scale, CheckCircle2,
  Lock, ArrowRight, Sparkles, Building2
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import clsx from 'clsx';

export type LegalTab = 'disclaimer' | 'privacy' | 'terms' | 'guidelines';

interface NirbashLegalPageProps {
  initialTab?: LegalTab;
}

export default function NirbashLegalPage({ initialTab = 'disclaimer' }: NirbashLegalPageProps) {
  const { lang } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = (searchParams.get('tab') as LegalTab) || initialTab;
  const [activeTab, setActiveTab] = useState<LegalTab>(tabParam);

  useEffect(() => {
    if (tabParam && ['disclaimer', 'privacy', 'terms', 'guidelines'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tab: LegalTab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  return (
    <div className="min-h-screen bg-[#f7faf8] text-gray-800 pb-16 font-sans">
      {/* Header */}
      <div className="bg-gradient-to-b from-white via-green-50/50 to-[#f7faf8] border-b border-gray-200 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-900 text-xs font-bold mb-3 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-emerald-700" />
            <span>{lang === 'bn' ? 'আইনি সুরক্ষা ও নীতিমালা' : 'Legal Protection & Policies'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-green-950 tracking-tight mb-3">
            {lang === 'bn' ? 'আইনি নীতিমালা ও গাইডলাইন' : 'Legal Policies & Guidelines'}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            {lang === 'bn'
              ? 'NIRBASH (নিবাস) প্ল্যাটফর্ম ব্যবহারের আইনি শর্তাবলী, প্রাইভেসি পলিসি, ডিসক্লেইমার এবং প্রপার্টি লিস্টিং নীতিমালা।'
              : 'Terms of service, privacy policy, legal disclaimer, and property listing guidelines for NIRBASH portal.'}
          </p>

          {/* Tab Navigation Pill Bar */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-white border border-gray-200 shadow-sm gap-1 max-w-full overflow-x-auto">
            <button
              onClick={() => handleTabChange('disclaimer')}
              className={clsx(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap',
                activeTab === 'disclaimer' ? 'bg-[#154631] text-white shadow-xs' : 'text-gray-600 hover:text-green-900'
              )}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>{lang === 'bn' ? 'ডিসক্লেইমার' : 'Disclaimer'}</span>
            </button>

            <button
              onClick={() => handleTabChange('privacy')}
              className={clsx(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap',
                activeTab === 'privacy' ? 'bg-[#154631] text-white shadow-xs' : 'text-gray-600 hover:text-green-900'
              )}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{lang === 'bn' ? 'প্রাইভেসি পলিসি' : 'Privacy Policy'}</span>
            </button>

            <button
              onClick={() => handleTabChange('terms')}
              className={clsx(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap',
                activeTab === 'terms' ? 'bg-[#154631] text-white shadow-xs' : 'text-gray-600 hover:text-green-900'
              )}
            >
              <FileText className="w-4 h-4" />
              <span>{lang === 'bn' ? 'ব্যবহারের শর্তাবলী' : 'Terms of Service'}</span>
            </button>

            <button
              onClick={() => handleTabChange('guidelines')}
              className={clsx(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap',
                activeTab === 'guidelines' ? 'bg-[#154631] text-white shadow-xs' : 'text-gray-600 hover:text-green-900'
              )}
            >
              <Scale className="w-4 h-4" />
              <span>{lang === 'bn' ? 'লিস্টিং গাইডলাইন' : 'Listing Guidelines'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-xs">
          {/* TAB 1: DISCLAIMER */}
          {activeTab === 'disclaimer' && (
            <div className="space-y-6 text-gray-700 animate-fade-in leading-relaxed text-sm">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-green-950">
                    {lang === 'bn' ? 'ডিসক্লেইমার ও দায়মুক্তি ঘোষণা' : 'Disclaimer & Limitation of Liability'}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {lang === 'bn' ? 'সর্বশেষ সংস্করণ: অক্টোবর ২০২৬' : 'Last Updated: October 2026'}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm font-medium">
                <strong>{lang === 'bn' ? 'সতর্কবার্তা:' : 'Important Notice:'}</strong>{' '}
                {lang === 'bn'
                  ? 'NIRBASH একটি উন্মুক্ত এআই ও প্রযুক্তিভিত্তিক ল্যান্ড মার্কেটপ্লেস। প্ল্যাটফর্মে কোনো সম্পত্তি বায়না বা ক্রয়ের পূর্বে ক্রেতাকে অবশ্যই সংশ্লিষ্ট সাব-রেজিস্ট্রি এবং এসি (ল্যান্ড) অফিস থেকে যাবতীয় কাগজপত্র যাচাই করার পরামর্শ দেওয়া হচ্ছে।'
                  : 'NIRBASH is an open AI-assisted land technology marketplace. Buyers are strongly advised to independently verify all deeds, titles, and records at the relevant Sub-Registry and AC (Land) offices prior to any deposit or deed execution.'}
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 text-base">
                  {lang === 'bn' ? '১. তৃতীয় পক্ষের তথ্যের দায়' : '1. Third-Party Information & Listings'}
                </h3>
                <p>
                  {lang === 'bn'
                    ? 'NIRBASH প্ল্যাটফর্মে প্রদর্শিত বিজ্ঞাপন, ছবি, জমির পরিমাপ ও বিবরণ সংশ্লিষ্ট সেলার বা এজেন্টের প্রদত্ত তথ্যের ভিত্তিতে প্রকাশিত। প্ল্যাটফর্ম কর্তৃপক্ষ তথ্যের প্রাথমিক স্ক্রিনিং পরিচালনা করলেও কোনো বিক্রেতার অভ্যন্তরীণ গোপন স্বত্ব বা পারিবারিক বিরোধের দায় বহন করে না।'
                    : 'All listings, photos, plot measurements, and descriptions published on NIRBASH are provided by respective sellers and agents. While NIRBASH conducts baseline automated screening, it does not assume liability for undisclosed internal title defects or familial inheritance disputes.'}
                </p>

                <h3 className="font-bold text-gray-900 text-base">
                  {lang === 'bn' ? '২. কমিশন ও আর্থিক লেনদেন' : '2. Commissions & Financial Transactions'}
                </h3>
                <p>
                  {lang === 'bn'
                    ? 'NIRBASH কোনো ব্রোকারেজ বা কমিশন ফি গ্রহণ করে না। ক্রেতা ও বিক্রেতার মধ্যকার যেকোনো নগদ অর্থ লেনদেন সম্পূর্ণ তাদের নিজ দায়িত্বে পরিচালিত হবে। আমরা কোনো অবস্থাতেই রেজিস্টার্ড বায়না দলিল ছাড়া অগ্রিম নগদ অর্থ লেনদেন না করার নির্দেশ দিচ্ছি।'
                    : 'NIRBASH does not charge brokerage or intermediary transaction fees. All monetary negotiations and transactions between buyers and sellers are conducted at their own discretion and risk. We strictly advise against paying unverified cash advances without a registered preliminary deed (Baynanama).'}
                </p>

                <h3 className="font-bold text-gray-900 text-base">
                  {lang === 'bn' ? '৩. এআই ল্যান্ড ডিএনএ ও ম্যাপ ওভারলে সীমাবদ্ধতা' : '3. AI Land DNA & Map Overlay Limitations'}
                </h3>
                <p>
                  {lang === 'bn'
                    ? 'প্ল্যাটফর্মে প্রদত্ত এআই দলিল বিশ্লেষণ ও গুগল স্যাটেলাইট ওভারলে প্রাথমিক সিদ্ধান্ত গ্রহণের সহায়ক টুল। এটি সরকারি জরিপ বা আদালতের আইনি রায়ের বিকল্প নয়। চূড়ান্ত রেজিস্ট্রির জন্য সরকারি অনুমোদিত সার্ভেয়ার বা আমিনের মাঠপর্যায়ের ডিমারকেশন আবশ্যক।'
                    : 'The automated Land DNA scan, deed OCR, and satellite map overlays provided on this platform are advisory decision-support tools. They do not constitute official government cadastre surveys or judicial rulings. Physical on-ground survey and demarcation by a certified surveyor/Amin are mandatory prior to final registration.'}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-6 text-gray-700 animate-fade-in leading-relaxed text-sm">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-green-950">
                    {lang === 'bn' ? 'গোপনীয়তা ও ডেটা সুরক্ষা নীতিমালা' : 'Privacy & Data Protection Policy'}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {lang === 'bn' ? 'আপনার তথ্যের সর্বোচ্চ নিরাপত্তা আমাদের অঙ্গীকার' : 'Committed to safeguarding your personal and property data'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 text-base">
                  {lang === 'bn' ? '১. আমরা কোন তথ্য সংগ্রহ করি?' : '1. What Information Do We Collect?'}
                </h3>
                <p>
                  {lang === 'bn'
                    ? 'অ্যাকাউন্ট তৈরির সময় আপনার নাম, মোবাইল নম্বর এবং ইমেইল সংগ্রহ করা হয়। বিক্রেতাদের ক্ষেত্রে প্রপার্টির ঠিকানা, মৌজা, খতিয়ান/দাগ বিবরণ এবং মালিকানা সংশ্লিষ্ট দলিলের ছবি/নকল তথ্য সার্ভারে সংরক্ষিত হয়।'
                    : 'When registering an account, we collect your name, phone number, and email. For property sellers, property address, mouza, khatian/dag records, and uploaded deed scans or ownership proofs are securely stored.'}
                </p>

                <h3 className="font-bold text-gray-900 text-base">
                  {lang === 'bn' ? '২. তথ্য কীভাবে সুরক্ষিত থাকে?' : '2. How Is Your Data Secured?'}
                </h3>
                <p>
                  {lang === 'bn'
                    ? 'NIRBASH আপনার সকল তথ্য ২৫৬-বিট এসএসএল (SSL) এনক্রিপশন প্রযুক্তির মাধ্যমে সুরক্ষিত রাখে। কোনো তৃতীয় পক্ষের বিজ্ঞাপনদাতা বা টেলিমার্কেটিং এজেন্সির কাছে আপনার মোবাইল নম্বর বা ব্যক্তিগত ডেটা বিক্রয় বা শেয়ার করা হয় না।'
                    : 'NIRBASH encrypts all data transmissions using 256-bit SSL protocols. We strictly prohibit selling, renting, or sharing your phone numbers or confidential property documents with third-party advertisers or telemarketers.'}
                </p>

                <h3 className="font-bold text-gray-900 text-base">
                  {lang === 'bn' ? '৩. মোবাইল নম্বর গোপন রাখার সুবিধা' : '3. Privacy Shield for Phone Numbers'}
                </h3>
                <p>
                  {lang === 'bn'
                    ? 'অনাকাঙ্ক্ষিত স্প্যাম কল এড়াতে আপনি চাইলে আপনার বিজ্ঞাপনে ফোন নম্বরটি শুধুমাত্র "লগইনকৃত ও ভেরিফাইড" ব্যবহারকারীদের জন্য দৃশ্যমান রাখতে পারেন।'
                    : 'To prevent unwanted spam calls, sellers can choose to display their contact numbers only to logged-in and phone-verified buyers on the platform.'}
                </p>

                <h3 className="font-bold text-gray-900 text-base">
                  {lang === 'bn' ? '৪. কুকিজের ব্যবহার (Cookies Policy)' : '4. Use of Cookies'}
                </h3>
                <p>
                  {lang === 'bn'
                    ? 'আপনার ব্রাউজিং পছন্দ, সংরক্ষিত বা পছন্দের প্রপার্টি তালিকা এবং ফিল্টার প্রেফারেন্স মনে রাখার জন্য আমরা অত্যাবশ্যকীয় কুকিজ ব্যবহার করি।'
                    : 'We use essential session and functional cookies to remember your language preference, saved properties, and search filters for a seamless experience.'}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <div className="space-y-6 text-gray-700 animate-fade-in leading-relaxed text-sm">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-green-950">
                    {lang === 'bn' ? 'ব্যবহারের শর্তাবলী' : 'Terms of Service'}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {lang === 'bn' ? 'NIRBASH প্ল্যাটফর্ম ব্যবহারের আইনি চুক্তি' : 'Legal terms governing your use of NIRBASH'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 text-base">
                  {lang === 'bn' ? '১. ব্যবহারকারীর যোগ্যতা' : '1. Eligibility & Authority'}
                </h3>
                <p>
                  {lang === 'bn'
                    ? 'NIRBASH প্ল্যাটফর্মে প্রপার্টি তালিকাভুক্ত করতে হলে ব্যবহারকারীকে অবশ্যই প্রাপ্তবয়স্ক (১৮ বছর বা তদূর্ধ্ব) এবং সম্পত্তির বৈধ মালিক অথবা আইনগতভাবে ক্ষমতাপ্রাপ্ত মোক্তার বা অনুমোদিত এজেন্ট হতে হবে।'
                    : 'To list a property on NIRBASH, you must be of legal age (18 years or older) and possess rightful ownership, a registered Power of Attorney (Mukhtarnama), or valid agency authorization.'}
                </p>

                <h3 className="font-bold text-gray-900 text-base">
                  {lang === 'bn' ? '২. নিষিদ্ধ কর্মকাণ্ড' : '2. Prohibited Conduct'}
                </h3>
                <p>
                  {lang === 'bn'
                    ? 'প্ল্যাটফর্মে কোনো প্রকার জাল দলিল, মিথ্যা বা বিভ্রান্তিকর দাগ নম্বর, প্রতারণামূলক মূল্য বা কোনো সরকারি খাস ও ভাওয়াল এস্টেটের জমি বিক্রয়ের বিজ্ঞাপন দেওয়া সম্পূর্ণ নিষিদ্ধ। এমন কোনো পোস্ট পাওয়া গেলে তাৎক্ষণিকভাবে অ্যাকাউন্ট বাতিল এবং সাইবার ক্রাইম আইনে ব্যবস্থা গ্রহণ করা হবে।'
                    : 'Posting forged deeds, deceptive plot/khatian numbers, fraudulent pricing, or attempting to market vested property, government Khas land, or Bhawal Court of Wards land is strictly prohibited. Violators face immediate account termination and legal action under digital security and anti-fraud laws.'}
                </p>

                <h3 className="font-bold text-gray-900 text-base">
                  {lang === 'bn' ? '৩. অ্যাকাউন্ট স্থগিতকরণ' : '3. Account Suspension & Delisting'}
                </h3>
                <p>
                  {lang === 'bn'
                    ? 'কোনো ব্যবহারকারী বা এজেন্টের বিরুদ্ধে ক্রেতা প্রতারণা বা অস্বচ্ছতার সুনির্দিষ্ট প্রমাণ পাওয়া গেলে NIRBASH কর্তৃপক্ষ কোনো পূর্ব নোটিশ ছাড়াই উক্ত প্রোফাইল ব্যান করার অধিকার সংরক্ষণ করে।'
                    : 'NIRBASH reserves the right to suspend accounts and delist properties immediately without prior notice upon receipt of credible evidence of fraudulent activities or title impersonation.'}
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: LISTING GUIDELINES */}
          {activeTab === 'guidelines' && (
            <div className="space-y-6 text-gray-700 animate-fade-in leading-relaxed text-sm">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center font-bold">
                  <Scale className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-green-950">
                    {lang === 'bn' ? 'প্রপার্টি লিস্টিং গাইডলাইন' : 'Property Listing Guidelines'}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {lang === 'bn' ? 'বিজ্ঞাপন প্রকাশের সঠিক নিয়ম ও মানদণ্ড' : 'Standards and best practices for creating verified listings'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 text-base">
                  {lang === 'bn' ? '১. আসল ও স্পষ্ট ছবি আপলোড' : '1. Authentic & Clear Photos'}
                </h3>
                <p>
                  {lang === 'bn'
                    ? 'জমির ক্ষেত্রে বাস্তব জমিন, সামনের রাস্তা ও চারপাশের স্পষ্ট ছবি দিতে হবে। কোনো ইন্টারনেট থেকে ডাউনলোডকৃত স্টক ফটো বা অবাস্তব ৩ডি রেন্ডার লিস্টিংয়ে ব্যবহার করা যাবে না।'
                    : 'Upload real, high-resolution photographs of the actual land, access road, boundary markers, and immediate surroundings. Using generic stock images or fake 3D renders is prohibited.'}
                </p>

                <h3 className="font-bold text-gray-900 text-base">
                  {lang === 'bn' ? '২. সঠিক দাগ ও খতিয়ান উল্লেখ' : '2. Accurate Dag & Khatian Identifiers'}
                </h3>
                <p>
                  {lang === 'bn'
                    ? 'জমির বিজ্ঞাপনে সিএস, এসএ, আরএস বা বিএস দাগ নম্বর এবং খতিয়ান নম্বর সঠিক রাখা বাধ্যতামূলক। এটি ক্রেতাদের কাছে বিজ্ঞাপনের গ্রহণযোগ্যতা বৃদ্ধি করে এবং ল্যান্ড ডিএনএ ভেরিফিকেশনে সাহায্য করে।'
                    : 'Accurately specify CS, SA, RS, or BS Dag and Khatian numbers. Verifiable identifiers enhance buyer trust and enable automated Land DNA verification.'}
                </p>

                <h3 className="font-bold text-gray-900 text-base">
                  {lang === 'bn' ? '৩. রাজউক ও ডেভেলপার অনুমোদন' : '3. RAJUK & Authority Approvals'}
                </h3>
                <p>
                  {lang === 'bn'
                    ? 'অ্যাপার্টমেন্ট বা কমার্শিয়াল প্রপার্টির ক্ষেত্রে রাজউক বা সংশ্লিষ্ট সিটি উন্নয়ন কর্তৃপক্ষের প্ল্যান অনুমোদন নম্বর এবং রিহ্যাব নিবন্ধন নম্বর থাকলে তা উল্লেখ করতে হবে।'
                    : 'For apartments or commercial properties, include RAJUK or local development authority approval numbers and REHAB membership identifiers where applicable.'}
                </p>

                <h3 className="font-bold text-gray-900 text-base">
                  {lang === 'bn' ? '৪. প্রকৃত ও স্বচ্ছ মূল্য' : '4. Transparent & Genuine Pricing'}
                </h3>
                <p>
                  {lang === 'bn'
                    ? 'বিজ্ঞাপনে সবসময় বাস্তবসম্মত মোট মূল্য অথবা শতক/কাঠাপ্রতি সঠিক মূল্য নির্ধারণ করুন। বিভ্রান্তিকর নামমাত্র মূল্য দিয়ে ক্রেতাকে আকর্ষণের চেষ্টা আইনত দণ্ডনীয়।'
                    : 'List genuine, realistic total prices or price-per-decimal/katha rates. Misleading bait-and-switch pricing is strictly prohibited on the platform.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
