import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function NirbashDisclaimerPage() {
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
            <span className="text-red-600 font-bold border-b-2 border-red-500 pb-0.5">
              {isBn ? 'দায়মুক্তি ঘোষণা' : 'Disclaimer'}
            </span>
            <Link to="/nirbash/privacy" className="hover:text-green-800 transition-colors">
              {isBn ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
            </Link>
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
        {/* Centered Red Heading */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#e03131] flex items-center justify-center gap-2.5 tracking-tight">
            <AlertTriangle className="w-8 h-8 text-[#e03131] flex-shrink-0" />
            <span>{isBn ? 'দায়মুক্তি ঘোষণা (Disclaimer)' : 'Disclaimer'}</span>
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
                <strong className="text-gray-900">NIRBASH (নিবাস)</strong>-এ আপনাকে স্বাগতম — বাংলাদেশে জমি ও প্রপার্টি লিস্টিং আবিষ্কার ও বিজ্ঞাপনের ডিজিটাল প্ল্যাটফর্ম।
              </p>
              <p>
                বাংলাদেশে মানুষের জমি এবং প্রপার্টি কেনাবেচা সহজ ও স্বচ্ছ করার লক্ষ্যে এই প্ল্যাটফর্মটি নির্মিত হয়েছে। সাইটটি ব্যবহারের পূর্বে অনুগ্রহ করে এই নীতিমালাটি মনোযোগ দিয়ে পড়ুন। এটি ব্যাখ্যা করে আমরা কী করি, কী করি না এবং আপনার নিজ দায়িত্বে কী কী যাচাই করা উচিত। সাইটটি ব্যবহার করার মাধ্যমে আপনি নিচের শর্তাবলীতে সম্মতি জ্ঞাপন করছেন।
              </p>
            </>
          ) : (
            <>
              <p>
                Welcome to <strong className="text-gray-900">NIRBASH</strong> — your digital platform for discovering land and property listings in Bangladesh.
              </p>
              <p>
                We built this site to help people find and advertise land and property in Bangladesh. Before you use the site, please take a moment to read this. It explains what we do, what we don't do, and what you should check for yourself. By using the site you agree to the points below.
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
                <li>আমরা একটি উন্মুক্ত ডিজিটাল প্ল্যাটফর্ম সরবরাহ করি যেখানে মালিক এবং এজেন্টগণ প্রপার্টির বিজ্ঞাপন দিতে পারেন।</li>
                <li>আমরা প্রদর্শিত কোনো প্রপার্টি বা জমি ক্রয়, বিক্রয় বা এর নিজস্ব মালিকানা দাবি করি না।</li>
                <li>বিজ্ঞাপনের তথ্যসমূহ সরাসরি ব্যবহারকারী — মালিক, এজেন্ট বা ডেভেলপারদের কাছ থেকে আসে — এবং তারা যা পোস্ট করেন আমরা তা প্রদর্শন করি।</li>
                <li>যেকোনো বায়না বা টাকা লেনদেন করার পূর্বে সবসময় সবকিছু নিজে সরেজমিনে যাচাই করুন।</li>
              </>
            ) : (
              <>
                <li>We provide a platform where owners and agents can post property listings.</li>
                <li>We do not buy, sell, or own any properties shown here.</li>
                <li>Listings come from other people — owners, agents, or developers — and we show what they post.</li>
                <li>Always verify everything yourself before you pay or sign.</li>
              </>
            )}
          </ul>
        </div>

        {/* Section: We don't own or sell */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
            <span className="text-xl">🏢</span>
            <span>{isBn ? 'আমরা প্রপার্টির মালিক নই এবং সরাসরি বিক্রয় করি না' : "We don't own or sell the properties"}</span>
          </h2>
          <div className="space-y-3 text-gray-700 text-sm sm:text-base leading-relaxed">
            {isBn ? (
              <>
                <p>
                  NIRBASH প্ল্যাটফর্মে প্রদর্শিত কোনো প্রপার্টি নিজে কেনে না, বিক্রি করে না বা এর কোনো অংশের মালিকানা ধারণ করে না। সকল বিজ্ঞাপন স্বতন্ত্র এজেন্ট, ডেভেলপার বা প্রপার্টি মালিকদের দ্বারা আপলোডকৃত। আমরা কেবল তাদের বিজ্ঞাপন প্রকাশের একটি ডিজিটাল মাধ্যম।
                </p>
                <p>
                  সার্টিফাইড ল্যান্ড ডিএনএ ব্যাজ ব্যতীত আমরা সাধারণ বিজ্ঞাপনের আইনি বৈধতা, স্বত্ব বা বাস্তব অবস্থার সরাসরি নিশ্চয়তা দিই না।
                </p>
              </>
            ) : (
              <>
                <p>
                  NIRBASH does not buy, sell, or own any property listed on this website. All listings are submitted by individual agents, developers, or property owners. We only provide a platform where they can advertise their properties.
                </p>
                <p>
                  We do not inspect, approve, or verify the ownership, legal status, or physical condition of the listed properties unless explicitly marked with a verified Land DNA badge.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Section: Verify before you pay or sign */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
            <span className="text-xl">🔍</span>
            <span>{isBn ? 'টাকা প্রদান বা চুক্তি স্বাক্ষরের পূর্বে অবশ্যই যাচাই করুন' : 'Always check and verify before you pay or sign'}</span>
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-3">
            {isBn
              ? 'প্ল্যাটফর্মে প্রদর্শিত তথ্যের ওপর অন্ধভাবে নির্ভর করবেন না। যেকোনো অগ্রিম টাকা, বায়না বা চুক্তি স্বাক্ষরের পূর্বে:'
              : 'Do not rely solely on the information posted on this platform. Before you pay any advance, token money, or sign any deed:'}
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base leading-relaxed">
            {isBn ? (
              <>
                <li><strong>সরেজমিনে ভিজিট করুন:</strong> দিনের আলোতে জমি বা ফ্ল্যাট পরিদর্শন করুন, সীমানা, চলাচলের রাস্তা ও পরিবেশ নিজ চোখে দেখে নিন।</li>
                <li><strong>কাগজপত্র যাচাই করুন:</strong> মূল বায়া দলিল (চেইন দলিল), নামজারি খতিয়ান (খারিজ পর্চা), ডিসিআর ও হাল সনের ভূমি উন্নয়ন কর (খাজনা) দাখিলা সংশ্লিষ্ট এসি (ল্যান্ড) ও সাব-রেজিস্ট্রি অফিসে যাচাই করুন।</li>
                <li><strong>আইনজীবীর পরামর্শ নিন:</strong> নিবন্ধিত ভূমি আইন বিশেষজ্ঞ বা দলিল লেখকের মাধ্যমে স্বত্বে কোনো বিরোধ, মামলা বা ব্যাংক বন্ধক রয়েছে কিনা নিশ্চিত হোন।</li>
                <li><strong>মাঠপর্যায়ে সার্ভে:</strong> সরকারি অনুমোদিত সার্ভেয়ার বা ডিজিটাল আমিন দ্বারা মৌজা নকশার সাথে বাস্তব জমির সীমানা মেপে নিশ্চিত হোন।</li>
              </>
            ) : (
              <>
                <li><strong>Visit in person:</strong> Always inspect the property, boundary demarcation, road access, and neighborhood in daylight.</li>
                <li><strong>Check land records:</strong> Verify the original Baya Dalil, Mutation Khatian, DCR, and up-to-date Land Development Tax receipts at the local AC Land and Sub-Registry office.</li>
                <li><strong>Consult a lawyer:</strong> Hire an independent land lawyer or licensed Deed Writer to verify freedom from legal encumbrances, court stay orders, or bank mortgages.</li>
                <li><strong>Ground Survey:</strong> Conduct a physical demarcation with an authorized government Amin/Surveyor matching the CS/SA/RS/BS mouza sheet.</li>
              </>
            )}
          </ul>
        </div>

        {/* Section: Financial dealings */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
            <span className="text-xl">💰</span>
            <span>{isBn ? 'আর্থিক লেনদেন ও দায়বদ্ধতা' : 'Dealings, payments, and disputes'}</span>
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            {isBn
              ? 'NIRBASH ক্রেতাদের জন্য সম্পূর্ণ কমিশনমুক্ত। বিক্রেতা বা ডেভেলপারের সাথে যেকোনো বায়না চুক্তি বা আর্থিক লেনদেন সম্পূর্ণ আপনার নিজ দায়িত্বে সম্পন্ন হবে। কোনো আর্থিক বিরোধের জন্য প্ল্যাটফর্ম কর্তৃপক্ষ দায়ী থাকবে না।'
              : 'NIRBASH is 100% free of commission for buyers. Any financial transaction, token payment, or contract entered into is strictly between you and the advertiser. NIRBASH is not responsible or liable for any financial disputes, fraud, or disagreements that may arise.'}
          </p>
        </div>

        {/* Section: AI Land DNA */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
            <span className="text-xl">🤖</span>
            <span>{isBn ? 'এআই ল্যান্ড ডিএনএ ও স্যাটেলাইট ম্যাপের সঠিকতা' : 'AI Land DNA & map accuracy'}</span>
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            {isBn
              ? 'স্বয়ংক্রিয় এআই ল্যান্ড ডিএনএ স্কোর, স্যাটেলাইট চিত্র এবং মৌজা ম্যাপ ওভারলে প্রাথমিক বিশ্লেষণের সুবিধার জন্য দেওয়া হয়েছে। এটি কোনো আদালত বা সরকারি জরিপ অধিদপ্তরের আইনি সনদের বিকল্প নয়।'
              : 'The automated AI Land DNA scores, satellite imagery, and mouza map overlays are provided for convenience and initial preliminary evaluation. They do not constitute official legal certifications or government survey reports.'}
          </p>
        </div>

        {/* Section: Reporting */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
            <span className="text-xl">🚨</span>
            <span>{isBn ? 'ভুয়া বা বিভ্রান্তিকর বিজ্ঞাপন রিপোর্ট করুন' : 'Report false or fraudulent listings'}</span>
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            {isBn
              ? 'যদি আপনি কোনো বিজ্ঞাপনে ভুয়া তথ্য, জালিয়াতি বা প্রতারণামূলক মূল্য দেখতে পান, অবিলম্বে আমাদের কন্টাক্ট পেজ অথবা হটলাইনে জানান। আমরা দ্রুত তদন্ত করে ব্যবস্থা নেব।'
              : 'If you suspect any listing is fraudulent, contains misleading pricing, false dag/khatian numbers, or violates property laws, please report it immediately via our Contact page or call our hotline. We investigate and remove offending listings promptly.'}
          </p>
        </div>

        {/* Help box */}
        <div className="mt-12 p-6 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-gray-900 text-base">
              {isBn ? 'কোনো প্রশ্ন বা জিজ্ঞাসা আছে?' : 'Have any questions or need guidance?'}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {isBn ? 'আমাদের সাপোর্ট টিম সার্বক্ষণিক সহায়তায় প্রস্তুত' : 'Our support and legal assistance team is available 24/7'}
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
