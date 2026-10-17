import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function NirbashListingGuidelinesPage() {
  const { lang } = useLanguage();
  const isBn = lang === 'bn';

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Top Breadcrumb & Legal Nav */}
      <div className="border-b border-gray-100 bg-[#fbfdfc] py-3 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <Link
            to="/nirbash"
            className="inline-flex items-center gap-1.5 text-gray-500 hover:text-green-800 font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isBn ? 'হোমে ফিরে যান' : 'Back to Home'}</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto text-gray-600 font-medium">
            <Link to="/nirbash/disclaimer" className="hover:text-green-800 transition-colors">
              {isBn ? 'দায়মুক্তি ঘোষণা' : 'Disclaimer'}
            </Link>
            <Link to="/nirbash/privacy" className="hover:text-green-800 transition-colors">
              {isBn ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
            </Link>
            <Link to="/nirbash/terms" className="hover:text-green-800 transition-colors">
              {isBn ? 'শর্তাবলী' : 'Terms'}
            </Link>
            <span className="text-purple-700 font-bold border-b-2 border-purple-600 pb-0.5">
              {isBn ? 'লিস্টিং নির্দেশিকা' : 'Listing Guidelines'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        {/* Centered Heading */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-purple-700 flex items-center justify-center gap-2.5 tracking-tight">
            <Scale className="w-8 h-8 text-purple-600 flex-shrink-0" />
            <span>{isBn ? 'প্রপার্টি লিস্টিং নির্দেশিকা (Listing Guidelines)' : 'Listing Guidelines'}</span>
          </h1>
          <p className="text-xs text-gray-400 mt-2 font-mono">
            {isBn ? 'সর্বশেষ হালনাগাদ: অক্টোবর ২০২৬' : 'Last updated: October 2026'}
          </p>
        </div>

        {/* Intro */}
        <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
          {isBn ? (
            <>
              <p>
                <strong className="text-gray-900">NIRBASH (নিবাস)</strong>-কে বাংলাদেশের সকল ক্রেতা এবং প্রকৃত বিক্রেতাদের জন্য সবচেয়ে নির্ভরযোগ্য ও সুরক্ষিত রিয়েল এস্টেট প্ল্যাটফর্ম হিসেবে বজায় রাখতে সকল বিজ্ঞাপনকে এই নির্দেশিকা অনুসরণ করতে হবে।
              </p>
              <p>
                যেসব বিজ্ঞাপন এই গুণগত মান বজায় রাখে, সেগুলি বেশি ভিজিটর ও দ্রুত ক্রেতার যোগাযোগ পায় এবং আমাদের স্বয়ংক্রিয় এআই ল্যান্ড ডিএনএ ভেরিফাইড ব্যাজ অর্জন করে।
              </p>
            </>
          ) : (
            <>
              <p>
                To keep <strong className="text-gray-900">NIRBASH</strong> the most trusted, secure, and transparent property marketplace in Bangladesh, all advertisements must adhere to these listing quality guidelines.
              </p>
              <p>
                Listings that meet these guidelines receive higher visibility, faster buyer inquiries, and the verified Land DNA badge.
              </p>
            </>
          )}
        </div>

        {/* Quick summary */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
            <span className="text-xl">📑</span>
            <span>{isBn ? 'সংক্ষেপ সারসংক্ষেপ (সহজ ভাষায়)' : 'Quick summary (in plain words)'}</span>
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base leading-relaxed">
            {isBn ? (
              <>
                <li>জমিন বা ফ্ল্যাটের আসল ও বাস্তব ছবি আপলোড করুন (ইন্টারনেট থেকে ডাউনলোড করা বা ভুয়া থ্রিডি রেন্ডার নিষিদ্ধ)।</li>
                <li>সঠিক সিএস, এসএ, আরএস বা বিএস দাগ নম্বর ও সঠিক মৌজার নাম উল্লেখ করুন।</li>
                <li>বাস্তবসম্মত মোট মূল্য অথবা কাঠা/শতক প্রতি আসল দর উল্লেখ করুন (নামমাত্র ভুয়া মূল্য নিষিদ্ধ)।</li>
                <li>সামনের সংযোগ রাস্তার প্রশস্ততা, সীমানা প্রাচীর ও ইউটিলিটি সুবিধার সঠিক বিবরণ দিন।</li>
              </>
            ) : (
              <>
                <li>Post real photos of the actual land or flat (no downloaded internet photos or deceptive architectural renders).</li>
                <li>Provide authentic Dag and Khatian numbers (CS, SA, RS, BS) and correct Mouza name.</li>
                <li>List accurate, genuine prices (no artificial zero or nominal clickbait prices).</li>
                <li>Specify front road width, boundary walls, and utility availability (electricity, gas, water, drainage).</li>
              </>
            )}
          </ul>
        </div>

        {/* Photography */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
            <span className="text-xl">📸</span>
            <span>{isBn ? 'ছবি ও ভিডিওর গুণগত মানদণ্ড' : 'Photography and media standards'}</span>
          </h2>
          <div className="space-y-3 text-gray-700 text-sm sm:text-base leading-relaxed">
            {isBn ? (
              <>
                <p><strong>বাস্তব জমিনের ছবি:</strong> দিনের আলোতে তোলা জমির স্পষ্ট ছবি, চারপাশের সীমানা এবং সামনের চলাচলের রাস্তা প্রদর্শন করতে হবে।</p>
                <p><strong>অ্যাপার্টমেন্ট ও ফ্ল্যাট:</strong> বিল্ডিংয়ের বাইরের দৃশ্য, পার্কিং, লিফট এবং ভেতরের রুমের স্পষ্ট ছবি যুক্ত করুন।</p>
                <p><strong>নিষিদ্ধ ছবি:</strong> অন্য কোনো প্রতিযোগী ওয়েবসাইটের ওয়াটারমার্কযুক্ত ছবি বা কপিরাইট লঙ্ঘিত ছবি আপলোড করা যাবে না।</p>
              </>
            ) : (
              <>
                <p><strong>Actual site photos:</strong> Upload clear daylight photographs showing the actual plot, existing boundary demarcation, and front access road.</p>
                <p><strong>Apartments:</strong> Include images of the building exterior, parking, lobby, and room layouts. Video walk-throughs significantly boost buyer confidence.</p>
                <p><strong>Prohibited media:</strong> Watermarked images from competitor portals, stock photography, or misleading computer graphics are strictly disallowed.</p>
              </>
            )}
          </div>
        </div>

        {/* Legal accuracy */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
            <span className="text-xl">📜</span>
            <span>{isBn ? 'দলিল ও খতিয়ান সংক্রান্ত স্বচ্ছতা' : 'Land record and document verification'}</span>
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base leading-relaxed">
            {isBn ? (
              <>
                <li>বিক্রেতার নিজের নামে খারিজ/নামজারি পর্চা আছে কিনা তা স্পষ্ট উল্লেখ করুন।</li>
                <li>দলিলের প্রকৃতি (হেবা, সাফ-কবলা, বণ্টননামা বা কোর্টের ডিক্রি) সঠিকভাবে বিজ্ঞাপনে লিখুন।</li>
                <li>অ্যাপার্টমেন্ট বা বাণিজ্যিক ভবনের ক্ষেত্রে রাজউক/সিডিএ প্ল্যান অনুমোদন নম্বর এবং রিহ্যাব সদস্যপদ নম্বর থাকলে তা উল্লেখ করুন।</li>
              </>
            ) : (
              <>
                <li>State whether mutation is complete in the seller's name.</li>
                <li>Specify the nature of the deed: Heba, Saf-Kabala, Partition, or Court Decree.</li>
                <li>For commercial or apartment projects, include the RAJUK/CDA/City Corporation approval memo number and REHAB membership number.</li>
              </>
            )}
          </ul>
        </div>

        {/* Pricing transparency */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
            <span className="text-xl">🏷️</span>
            <span>{isBn ? 'স্বচ্ছ ও প্রকৃত মূল্য নির্ধারণ' : 'Honest & transparent pricing'}</span>
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            {isBn
              ? 'বিজ্ঞাপনে সর্বদা মোট মূল্য অথবা শতক/কাঠাপ্রতি প্রকৃত মূল্য নির্ধারণ করুন। সার্চ অ্যালগরিদমকে প্রভাবিত করতে নামমাত্র মূল্য দিয়ে বিজ্ঞাপন দিলে তা স্বয়ংক্রিয়ভাবে ডিমোট বা বাতিল করা হবে।'
              : 'Always display the total price or per-katha / per-shotok rate honestly. Listings posted with misleading placeholder prices to trick search algorithms will be demoted or removed automatically.'}
          </p>
        </div>

        {/* Help box */}
        <div className="mt-12 p-6 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-gray-900 text-base">
              {isBn ? 'লিস্টিং সাজাতে সাহায্য চান?' : 'Need help optimizing your listing?'}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {isBn ? 'আমাদের টিম আপনাকে নিখুঁত প্রপার্টি বিজ্ঞাপন তৈরিতে সহায়তা করবে' : 'Our team can assist you in publishing compliant, verified listings'}
            </p>
          </div>
          <Link
            to="/nirbash/contact"
            className="px-4 py-2 bg-[#123824] hover:bg-[#1a4e32] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
          >
            {isBn ? 'যোগাযোগ করুন' : 'Contact Support'}
          </Link>
        </div>
      </main>
    </div>
  );
}
