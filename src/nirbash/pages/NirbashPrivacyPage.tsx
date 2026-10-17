import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function NirbashPrivacyPage() {
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
            <span className="text-emerald-700 font-bold border-b-2 border-emerald-600 pb-0.5">
              {isBn ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
            </span>
            <Link to="/nirbash/terms" className="hover:text-green-800 transition-colors">
              {isBn ? 'শর্তাবলী' : 'Terms'}
            </Link>
            <Link to="/nirbash/listing-guidelines" className="hover:text-green-800 transition-colors">
              {isBn ? 'লিস্টিং নির্দেশিকা' : 'Listing Guidelines'}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        {/* Centered Heading */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-emerald-700 flex items-center justify-center gap-2.5 tracking-tight">
            <ShieldCheck className="w-8 h-8 text-emerald-600 flex-shrink-0" />
            <span>{isBn ? 'গোপনীয়তা নীতিমালা (Privacy Policy)' : 'Privacy Policy'}</span>
          </h1>
          <p className="text-xs text-gray-400 mt-2 font-mono">
            {isBn ? 'সর্বশেষ হালনাগাদ: অক্টোবর ২০২৬' : 'Last updated: October 2026'}
          </p>
        </div>

        {/* Intro Paragraphs */}
        <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
          {isBn ? (
            <>
              <p>
                <strong className="text-gray-900">NIRBASH (নিবাস)</strong>-এর গোপনীয়তা নীতিমালায় আপনাকে স্বাগতম। আপনি যখন প্রপার্টি খোঁজেন বা আপনার নিজস্ব জমি/ফ্ল্যাটের বিজ্ঞাপন পোস্ট করেন, তখন আপনার তথ্যের নিরাপত্তা রক্ষা করা আমাদের অন্যতম প্রধান অঙ্গীকার।
              </p>
              <p>
                এই নীতিমালায় সহজ ভাষায় ব্যাখ্যা করা হয়েছে আমরা কী তথ্য সংগ্রহ করি, তা কীভাবে সুরক্ষিত রাখি এবং আপনার ব্যক্তিগত ও জমির দলিলের তথ্যের ওপর আপনার নিয়ন্ত্রণ কীভাবে নিশ্চিত করা হয়।
              </p>
            </>
          ) : (
            <>
              <p>
                Welcome to the Privacy Policy of <strong className="text-gray-900">NIRBASH</strong>. We value the trust you place in us when browsing properties or posting your land and flat listings in Bangladesh.
              </p>
              <p>
                This policy outlines in simple, transparent terms what information we collect, how it is stored securely, and how we protect your personal and legal data.
              </p>
            </>
          )}
        </div>

        {/* Section: Quick summary */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
            <span className="text-xl">📑</span>
            <span>{isBn ? 'সংক্ষেপ সারসংক্ষেপ (সহজ ভাষায়)' : 'Quick summary (in plain words)'}</span>
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base leading-relaxed">
            {isBn ? (
              <>
                <li>আমরা কেবল প্রপার্টি কেনাবেচা বা আইনি যাচাইকরণের জন্য আবশ্যক তথ্যটুকুই সংগ্রহ করি।</li>
                <li>আমরা কখনোই আপনার মোবাইল নম্বর বা ইমেইল কোনো তৃতীয় পক্ষ বা টেলিমার্কেটিং কোম্পানির কাছে বিক্রি বা শেয়ার করি না।</li>
                <li>আপনি চাইলে বিজ্ঞাপনে আপনার ফোন নম্বর অনিবন্ধিত বা সাধারণ ভিজিটরদের কাছ থেকে হাইড (গোপন) করে রাখতে পারেন।</li>
                <li>আপলোডকৃত সকল দলিলের কপি এবং খতিয়ান ২৫৬-বিট ব্যাংক-গ্রেড এসএসএল এনক্রিপশনে সুরক্ষিত থাকে।</li>
              </>
            ) : (
              <>
                <li>We only collect the details necessary to help you buy, sell, or verify land and properties.</li>
                <li>We do not sell, rent, or trade your phone number or email to telemarketers or third parties.</li>
                <li>You can choose to hide or mask your contact number from unverified users.</li>
                <li>All deed documents and land records uploaded are encrypted with bank-grade 256-bit SSL encryption.</li>
              </>
            )}
          </ul>
        </div>

        {/* Section: What info we collect */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
            <span className="text-xl">📋</span>
            <span>{isBn ? 'আমরা কী কী তথ্য সংগ্রহ করি' : 'What information we collect'}</span>
          </h2>
          <div className="space-y-3 text-gray-700 text-sm sm:text-base leading-relaxed">
            {isBn ? (
              <>
                <p><strong>অ্যাকাউন্ট ও যোগাযোগের তথ্য:</strong> ব্যবহারকারীর নাম, ফোন নম্বর, ইমেইল এবং হোয়াটসঅ্যাপ যোগাযোগের বিবরণ।</p>
                <p><strong>বিজ্ঞাপনের বিবরণ:</strong> প্রপার্টির ঠিকানা, মৌজা, জেল নম্বর, সিএস/এসএ/আরএস/বিএস দাগ ও খতিয়ান নম্বর, জমির আয়তন, মূল্য ও ছবি/ভিডিও।</p>
                <p><strong>যাচাইকরণ দলিল:</strong> ল্যান্ড ডিএনএ ভেরিফিকেশনের জন্য আপলোডকৃত নামজারি খতিয়ান, ডিসিআর ও খাজনা রসিদের অনুলিপি যা কেবল স্বত্ব মিলিয়ে দেখার জন্য ব্যবহৃত হয়।</p>
              </>
            ) : (
              <>
                <p><strong>Account & Contact details:</strong> Name, phone number, email address, and optional WhatsApp contact for inquiries.</p>
                <p><strong>Listing information:</strong> Property title, location, mouza, JL number, CS/SA/RS/BS dag & khatian numbers, pricing, photographs, and video tours.</p>
                <p><strong>Verification documents:</strong> When requesting a verified Land DNA badge, copies of mutation khatian, DCR, and tax receipts are scanned solely for ownership validation.</p>
              </>
            )}
          </div>
        </div>

        {/* Section: How we protect your data */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
            <span className="text-xl">🔒</span>
            <span>{isBn ? 'আপনার ডেটা যেভাবে সুরক্ষিত থাকে' : 'How we protect your data'}</span>
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            {isBn
              ? 'NIRBASH আন্তর্জাতিক মানসম্মত ২৫৬-বিট ডেটা এনক্রিপশন প্রোটোকল ব্যবহার করে। সংবেদনশীল জমির রেকর্ডের অ্যাক্সেস কেবল স্বয়ংক্রিয় এআই যাচাইকরণ সিস্টেম এবং অনুমোদিত কমপ্লায়েন্স অফিসারের জন্য সংরক্ষিত।'
              : 'NIRBASH uses industry-standard 256-bit encryption protocols. Access to sensitive land records is restricted strictly to automated verification microservices and authorized compliance officers.'}
          </p>
        </div>

        {/* Section: Cookies policy */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
            <span className="text-xl">🍪</span>
            <span>{isBn ? 'কুকিজ ও লোকাল স্টোরেজ পলিসি' : 'Cookies and local storage'}</span>
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            {isBn
              ? 'আপনার পছন্দের ভাষা (বাংলা/ইংরেজি), সেভ করা প্রপার্টি তালিকা ও সার্চ ফিল্টার প্রেফারেন্স মনে রাখার জন্য আমরা প্রয়োজনীয় কুকিজ ব্যবহার করি। আমরা কোনো অনাকাঙ্ক্ষিত ট্র্যাকার ব্যবহার করি না।'
              : 'We use functional cookies to remember your language preference (Bangla/English), saved wishlist properties, search filters, and active login sessions. We do not use intrusive tracking cookies.'}
          </p>
        </div>

        {/* Help box */}
        <div className="mt-12 p-6 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-gray-900 text-base">
              {isBn ? 'প্রাইভেসি নিয়ে কোনো প্রশ্ন আছে?' : 'Have privacy questions?'}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {isBn ? 'ইমেইল করুন: privacy@nirbash.com.bd' : 'Email our data officer: privacy@nirbash.com.bd'}
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
