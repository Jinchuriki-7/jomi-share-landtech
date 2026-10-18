import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function NirbashTermsPage() {
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
            <span className="text-blue-700 font-bold border-b-2 border-blue-600 pb-0.5">
              {isBn ? 'শর্তাবলী' : 'Terms'}
            </span>
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-700 flex items-center justify-center gap-2.5 tracking-tight">
            <FileText className="w-8 h-8 text-blue-600 flex-shrink-0" />
            <span>{isBn ? 'ব্যবহারের শর্তাবলী' : 'Terms of Service'}</span>
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
                এই ব্যবহারের শর্তাবলী <strong className="text-gray-900">NIRBASH (নিবাস)</strong> প্ল্যাটফর্ম ব্যবহারের নিয়মাবলী ও আইনি চুক্তি নির্ধারণ করে। আমাদের ওয়েবসাইট ব্রাউজ করা, প্রপার্টি অনুসন্ধান করা বা বিজ্ঞাপনের জন্য প্রপার্টি পোস্ট করার মাধ্যমে আপনি এই সকল শর্ত মানতে সম্মত হচ্ছেন।
              </p>
              <p>
                যদি আপনি এই শর্তাবলীর কোনো অংশের সাথে একমত না হন, তবে অনুগ্রহ করে সাইটটি ব্যবহার করা থেকে বিরত থাকুন।
              </p>
            </>
          ) : (
            <>
              <p>
                These Terms of Service govern your access to and use of <strong className="text-gray-900">NIRBASH</strong>. By using our website, searching for land or property, or listing a property for sale or rent, you agree to comply with and be legally bound by these terms.
              </p>
              <p>
                If you disagree with any portion of these terms, please refrain from using the platform.
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
                <li>বিজ্ঞাপন পোস্ট করার জন্য ব্যবহারকারীকে অবশ্যই প্রাপ্তবয়স্ক (১৮ বছর বা তদূর্ধ্ব) হতে হবে।</li>
                <li>কেবল বৈধ স্বত্বাধিকারী, আমমোক্তারনামাপ্রাপ্ত ব্যক্তি বা অনুমোদিত রিয়েল এস্টেট এজেন্টরাই বিজ্ঞাপন দিতে পারবেন।</li>
                <li>জাল দলিল, কাল্পনিক দাগ নম্বর বা বিভ্রান্তিকর কম মূল্য দিয়ে ক্রেতা আকর্ষণের চেষ্টা আইনত নিষিদ্ধ।</li>
                <li>আইন বিরোধী কোনো কর্মকাণ্ড দেখা গেলে প্ল্যাটফর্ম কর্তৃপক্ষ তাৎক্ষণিকভাবে অ্যাকাউন্ট স্থগিত করার অধিকার রাখে।</li>
              </>
            ) : (
              <>
                <li>You must be at least 18 years old and legally capable of entering binding agreements in Bangladesh.</li>
                <li>You may only list properties you legitimately own or have written power of attorney/developer agency to represent.</li>
                <li>No fake deeds, fraudulent dag numbers, unapproved encroached land, or misleading prices are permitted.</li>
                <li>NIRBASH reserves the right to suspend accounts or delete listings that violate Bangladeshi property laws.</li>
              </>
            )}
          </ul>
        </div>

        {/* Eligibility */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
            <span className="text-xl">👤</span>
            <span>{isBn ? 'ব্যবহারকারীর যোগ্যতা ও বৈধ প্রতিনিধিত্ব' : 'User eligibility & representation'}</span>
          </h2>
          <div className="space-y-3 text-gray-700 text-sm sm:text-base leading-relaxed">
            {isBn ? (
              <>
                <p>
                  বিজ্ঞাপন প্রকাশের সময় আপনি নিশ্চিত করছেন যে আপনি সম্পত্তির রেকর্ডকৃত মালিক অথবা মালিক কর্তৃক আইনগতভাবে ক্ষমতাপ্রাপ্ত মোক্তার বা নিবন্ধিত রিয়েল এস্টেট ডেভেলপার।
                </p>
                <p>
                  প্রপার্টির নামজারি স্ট্যাটাস, প্রবেশপথের রাস্তার প্রশস্ততা এবং আদালতে কোনো স্থগিতাদেশ বা ব্যাংক দায়বদ্ধতা থাকলে তা সততার সাথে উল্লেখ করতে হবে।
                </p>
              </>
            ) : (
              <>
                <p>
                  By posting an advertisement, you warrant that you are the lawful recorded owner of the property, or a registered real estate company/agent holding written authorization from the owner.
                </p>
                <p>
                  You agree to provide true, accurate, and up-to-date information regarding ownership status, mutation status, road width, and any encumbrances or pending civil disputes.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Prohibited activities */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
            <span className="text-xl">🚫</span>
            <span>{isBn ? 'সম্পূর্ণ নিষিদ্ধ কর্মকাণ্ড' : 'Strictly prohibited activities'}</span>
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm sm:text-base leading-relaxed">
            {isBn ? (
              <>
                <li>সরকারি খাস জমি, অর্পিত বা পরিত্যক্ত সম্পত্তি, রেলওয়ের জমি বা বনভূমির প্রপার্টি পোস্ট করা।</li>
                <li>জাল বা বিকৃত বায়া দলিল, ভুয়া নামজারি খতিয়ান বা অবৈধ মৌজা নকশা আপলোড করা।</li>
                <li>কৃত্রিমভাবে নামমাত্র মূল্য (যেমন ৳ ১ বা ৳ ৫০০) উল্লেখ করে ক্রেতাকে বিভ্রান্ত করা।</li>
                <li>রেজিস্টার্ড বায়না দলিল ছাড়া নগদ টাকা লেনদেনে প্রতারণার চেষ্টা করা।</li>
              </>
            ) : (
              <>
                <li>Posting government khas land, vested property, railway land, or forest/wetland conservation zones.</li>
                <li>Uploading falsified or forged land deeds, fake mutation khatians, or misleading survey maps.</li>
                <li>Spamming duplicate listings across multiple categories or manipulating pricing with non-existent token prices.</li>
                <li>Harassing potential buyers or attempting advance payment scams without a registered bayna deed.</li>
              </>
            )}
          </ul>
        </div>

        {/* Account suspension */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
            <span className="text-xl">🛑</span>
            <span>{isBn ? 'অ্যাকাউন্ট স্থগিতকরণ ও আইনগত ব্যবস্থা' : 'Account suspension and termination'}</span>
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            {isBn
              ? 'আমরা নিয়মিত লিস্টিং পর্যবেক্ষণ করি। কোনো ব্যবহারকারী বা এজেন্টের বিরুদ্ধে জালিয়াতির প্রমাণ পাওয়া গেলে কোনো পূর্ব নোটিশ ছাড়াই তার অ্যাকাউন্ট ও সকল লিস্টিং বাতিল করা হবে এবং সাইবার নিরাপত্তা আইনে ব্যবস্থা নেওয়া হতে পারে।'
              : 'We actively monitor listings and investigate user reports. Any violation of these terms may result in immediate listing removal, temporary account suspension, or permanent ban without notice, and may be reported to law enforcement agencies under cyber laws.'}
          </p>
        </div>

        {/* Help box */}
        <div className="mt-12 p-6 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-gray-900 text-base">
              {isBn ? 'শর্তাবলী সম্পর্কে আরও জানতে চান?' : 'Questions regarding our terms?'}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {isBn ? 'আমাদের লিগ্যাল অ্যাডভাইজারি টিমের সাথে কথা বলুন' : 'Get in touch with our legal advisory team'}
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
