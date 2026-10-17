import { useState, useEffect } from 'react';
import { Info, AlertTriangle, CheckCircle, Code2, Leaf, Users, Globe } from 'lucide-react';
import { SectionHeader, AlertBox } from '../components/ui';
import clsx from 'clsx';

type Language = 'en' | 'bn';

interface ContentText {
  headerTitle: string;
  headerSubtitle: string;
  appName: string;
  appSubtitle: string;
  tagline: string;
  missionDesc: string;
  disclaimerTitle: string;
  disclaimers: string[];
  modulesTitle: string;
  modules: { title: string; desc: string }[];
  techTitle: string;
  techCategories: { cat: string; items: string[] }[];
  limitationsTitle: string;
  limitations: { title: string; desc: string }[];
  aiDisclosureTitle: string;
  aiDisclosures: string[];
  projectTitle: string;
  eventLabel: string;
  eventValue: string;
  appLabel: string;
  appValue: string;
  taglineLabel: string;
  taglineValue: string;
  caseLabel: string;
  caseValue: string;
  osmAttribution: string;
}

const CONTENT: Record<Language, ContentText> = {
  en: {
    headerTitle: 'About & Limitations',
    headerSubtitle: 'JOMI-SHARE — AI-Powered Land Intelligence & Inheritance Partition Platform',
    appName: 'JOMI-SHARE',
    appSubtitle: 'AI-Powered Land Intelligence & Inheritance Partition Platform',
    tagline: '"Understand Your Land. Verify the Records. Plan a Fairer Partition."',
    missionDesc:
      'JOMI-SHARE demonstrates how geospatial technology, document analysis, digital land records, and optimization algorithms can help families understand land information and explore possible inheritance partition plans. This is a hackathon demonstration application built for the LandTech Bangladesh hackathon.',
    disclaimerTitle: 'Critical Disclaimers — Please Read',
    disclaimers: [
      'All land plots, people, documents, values, and records in this application are completely fictional synthetic demo data. No real people, land parcels, or government records are represented.',
      'This application does not connect to any government database, land record portal, or authorized official system.',
      'Nothing in this application constitutes legal advice, legal ownership verification, or an official partition determination.',
      'Record "verification" results are comparisons against fictional demo data only — not real legal verification.',
      'Entitlement percentages are user-defined demo inputs. Legal inheritance rights must be determined by a competent court or authorized legal process.',
      'All monetary values are synthetic estimates for demonstration purposes — not real market valuations.',
    ],
    modulesTitle: 'Implemented Modules',
    modules: [
      {
        title: 'Module A: Smart Land Map',
        desc: 'Interactive Leaflet map with synthetic plot geometries, layer toggles, plot selection, road visualization, shared resource display, and file upload interface.',
      },
      {
        title: 'Module B: Land DNA',
        desc: 'Digital identity profiles for each synthetic plot including document history, discrepancy detection, visual timeline, and completeness indicators.',
      },
      {
        title: 'Module C: JOMI-SHARE Partition',
        desc: 'Working inheritance partition optimization engine generating three deterministic candidate plans with scoring, constraint checking, and comparative analysis.',
      },
      {
        title: 'Module D: Decision Support',
        desc: 'Conflict heatmap with explainable risk indicators, what-if scenario simulator, record verification matching tool, and printable report generation.',
      },
    ],
    techTitle: 'Technology Stack',
    techCategories: [
      { cat: 'Frontend', items: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS v3'] },
      { cat: 'Maps', items: ['Leaflet 1.9', 'React-Leaflet', 'OpenStreetMap tiles'] },
      { cat: 'Charts', items: ['Recharts', 'RadarChart', 'BarChart', 'PieChart'] },
      { cat: 'State', items: ['React Context API', 'useState', 'useCallback'] },
      { cat: 'Data', items: ['Local TypeScript data', 'GeoJSON geometries', 'Synthetic records'] },
      { cat: 'Optimization', items: ['Custom TypeScript engine', 'Deterministic algorithms', 'Weighted scoring'] },
    ],
    limitationsTitle: 'Known Limitations',
    limitations: [
      {
        title: 'Geometry partitioning',
        desc: 'The current algorithm allocates whole plots only. Sub-plot polygon subdivision (splitting a single plot into geometric sub-parcels) is not implemented. A full computational geometry library would be required for arbitrary polygon splitting.',
      },
      {
        title: 'OCR and boundary detection',
        desc: 'Uploaded map files are received but not processed by real OCR or computer vision models. The demo uses pre-loaded synthetic geometries. Full OCR would require a Python backend with Tesseract or a similar engine.',
      },
      {
        title: 'Government data integration',
        desc: 'No connection to Bangladesh Land Record databases, mouza maps, or CS/SA/RS portals is implemented. Such integration would require authorized API access from the relevant authorities.',
      },
      {
        title: 'Legal inheritance calculation',
        desc: 'The application does not calculate legal inheritance shares under any inheritance law. Entitlement percentages must be supplied by the user and are not validated against any legal framework.',
      },
      {
        title: 'Monetary valuation',
        desc: 'All land values are synthetic demo estimates. Real market valuation requires engagement of a certified land valuer and market survey data.',
      },
      {
        title: 'Georeferencing',
        desc: 'Demo plot coordinates are approximate and for visualization only. They do not represent verified cadastral boundary coordinates. Accurate georeferencing requires reference control points and a proper GIS workflow.',
      },
    ],
    aiDisclosureTitle: 'AI Coding Assistant Disclosure',
    aiDisclosures: [
      'This application was developed with assistance from AI coding tools. All algorithms, business logic, data models, optimization engines, and user interface components were designed, implemented, reviewed, and verified by the project team.',
      'No AI language model is used at runtime to generate recommendations, verify records, or calculate scores. All outputs are produced by deterministic TypeScript algorithms operating on the pre-loaded synthetic dataset.',
      'Recommendations, scores, and risk indicators are derived from actual computed metrics — not from language model generation or pattern matching against undisclosed training data.',
    ],
    projectTitle: 'Project',
    eventLabel: 'Event:',
    eventValue: 'LandTech Hackathon — Bangladesh University',
    appLabel: 'Application:',
    appValue: 'JOMI-SHARE v1.0 Demo',
    taglineLabel: 'Tagline:',
    taglineValue: '"Understand Your Land. Verify the Records. Plan a Fairer Partition."',
    caseLabel: 'Demo Case:',
    caseValue: 'Sonargaon Family Land Partition — Demo Case 001 (Fully Synthetic)',
    osmAttribution:
      'OpenStreetMap tiles © OpenStreetMap contributors (CC-BY-SA). Used under the OpenStreetMap Tile Usage Policy for demonstration purposes.',
  },
  bn: {
    headerTitle: 'পরিচিতি ও সীমাবদ্ধতা',
    headerSubtitle: 'জমি-শেয়ার — এআই-চালিত ভূমি গোয়েন্দা ও উত্তরাধিকার বাটোয়ারা প্ল্যাটফর্ম',
    appName: 'জমি-শেয়ার (JOMI-SHARE)',
    appSubtitle: 'এআই-চালিত ভূমি গোয়েন্দা ও উত্তরাধিকার বাটোয়ারা প্ল্যাটফর্ম',
    tagline: '"আপনার জমি জানুন। খতিয়ান যাচাই করুন। সুষ্ঠু বাটোয়ারা নিশ্চিত করুন।"',
    missionDesc:
      'জমি-শেয়ার (JOMI-SHARE) প্রদর্শন করে যে কীভাবে জিওস্প্যাশিয়াল প্রযুক্তি, দলিল ও খতিয়ান বিশ্লেষণ, ডিজিটাল ভূমি রেকর্ড এবং অপটিমাইজেশন অ্যালগরিদম পরিবারগুলোকে তাদের জমির বিস্তারিত বুঝতে এবং সম্ভাব্য উত্তরাধিকার বাটোয়ারা পরিকল্পনা অন্বেষণ করতে সহায়তা করতে পারে। এটি ল্যান্ডটেক বাংলাদেশ হ্যাকাথনের জন্য তৈরি একটি বিশেষ ডেমোনস্ট্রেশন অ্যাপ্লিকেশন।',
    disclaimerTitle: 'জরুরি আইনি সতর্কবার্তা — অনুগ্রহ করে পড়ুন',
    disclaimers: [
      'এই অ্যাপ্লিকেশনের সমস্ত জমির দাগ, ব্যক্তি, নথিপত্র, আর্থিক মূল্য এবং খতিয়ান রেকর্ড সম্পূর্ণ কাল্পনিক সিন্থেটিক ডেমো ডেটা। কোনো বাস্তব ব্যক্তি, জমির দাগ বা সরকারি রেকর্ড এখানে প্রদর্শিত হয়নি।',
      'এই অ্যাপ্লিকেশনটি কোনো সরকারি ডাটাবেজ, জাতীয় ভূমি রেকর্ড পোর্টাল বা অনুমোদিত দাপ্তরিক সিস্টেমের সাথে সংযুক্ত নয়।',
      'এই অ্যাপ্লিকেশনের কোনো তথ্য বা ফলাফল আইনি পরামর্শ, জমির মালিকানা প্রত্যয়ন বা সরকারি বাটোয়ারা ডিক্রি হিসেবে গণ্য হবে না।',
      'রেকর্ড "যাচাইকরণ" (Verification) ফলাফল শুধুই কাল্পনিক ডেমো ডেটার অভ্যন্তরীণ তুলনা — এটি কোনো প্রকৃত আইনি বা প্রশাসনিক যাচাই নয়।',
      'ওয়ারিশদের প্রাপ্য অংশের শতকরা হার ব্যবহারকারীর ইনপুট করা ডেমো তথ্য। আইনগত উত্তরাধিকার অধিকার অবশ্যই উপযুক্ত আদালত বা স্বীকৃত আইনি প্রক্রিয়ার মাধ্যমে নির্ধারিত হতে হবে।',
      'প্রদর্শিত সমস্ত আর্থিক বা বাজারমূল্য ডেমোর উদ্দেশ্যে প্রস্তুত সিন্থেটিক অনুমান — এগুলো কোনো বাস্তব বাজারদর বা সার্টিফাইড ভ্যালুয়ারের মূল্যায়ন নয়।',
    ],
    modulesTitle: 'বাস্তবায়িত মডিউলসমূহ',
    modules: [
      {
        title: 'মডিউল ক: স্মার্ট ল্যান্ড ম্যাপ',
        desc: 'সিন্থেটিক প্লট জিওমেট্রি, লেয়ার টগল, দাগ নির্বাচন, সড়ক ও অবকাঠামো ভিজ্যুয়ালাইজেশন, যৌথ সম্পদ প্রদর্শন এবং ম্যাপ ফাইল আপলোড ইন্টারফেস সম্বলিত ইন্টারঅ্যাক্টিভ লিফলেট ম্যাপ।',
      },
      {
        title: 'মডিউল খ: ল্যান্ড ডিএনএ',
        desc: 'খতিয়ানের ঐতিহাসিক রেকর্ড, গরমিল বা অসঙ্গতি শনাক্তকরণ, ভিজ্যুয়াল টাইমলাইন এবং ডেটার পূর্ণতা নির্দেশক সহ প্রতিটি সিন্থেটিক দাগের ডিজিটাল প্রফাইল।',
      },
      {
        title: 'মডিউল গ: জমি-শেয়ার বাটোয়ারা ইঞ্জিন',
        desc: 'স্কোরিং, বাউন্ডারি সীমাবদ্ধতা যাচাই এবং তুলনামূলক বিশ্লেষণ সহ তিনটি বাস্তবসম্মত বিকল্প পরিকল্পনা প্রস্তুতকারী কার্যকর উত্তরাধিকার বণ্টন অপটিমাইজেশন অ্যালগরিদম।',
      },
      {
        title: 'মডিউল ঘ: সিদ্ধান্ত সহায়তা ব্যবস্থা',
        desc: 'ব্যাখ্যাযোগ্য ঝুঁকি নির্দেশক সম্বলিত বিরোধ হিটম্যাপ, বাস্তবমুখী "হোয়াট-ইফ" দৃশ্যপট সিমুলেটর, রেকর্ড ম্যাচিং টুল এবং প্রিন্ট উপযোগী বাটোয়ারা প্রতিবেদন তৈরির ব্যবস্থা।',
      },
    ],
    techTitle: 'ব্যবহৃত প্রযুক্তি (Technology Stack)',
    techCategories: [
      { cat: 'ফ্রন্টএন্ড', items: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS v3'] },
      { cat: 'ডিজিটাল ম্যাপ', items: ['Leaflet 1.9', 'React-Leaflet', 'OpenStreetMap tiles'] },
      { cat: 'চার্ট ও ভিজ্যুয়ালাইজেশন', items: ['Recharts', 'RadarChart', 'BarChart', 'PieChart'] },
      { cat: 'স্টেট ম্যানেজমেন্ট', items: ['React Context API', 'useState', 'useCallback'] },
      { cat: 'ডেটা ও জিওমেট্রি', items: ['Local TypeScript data', 'GeoJSON geometries', 'Synthetic records'] },
      { cat: 'অপটিমাইজেশন ইঞ্জিন', items: ['Custom TypeScript engine', 'Deterministic algorithms', 'Weighted scoring'] },
    ],
    limitationsTitle: 'বিদ্যমান সীমাবদ্ধতাসমূহ',
    limitations: [
      {
        title: 'জ্যামিতিক বহুভুজ বিভাজন (Geometry Partitioning)',
        desc: 'বর্তমান অ্যালগরিদমটি শুধুমাত্র সম্পূর্ণ দাগ বণ্টন করে। একটি একক দাগকে জ্যামিতিকভাবে ভেঙে একাধিক সাব-প্লটে খণ্ড খণ্ড করা (Sub-plot Polygon Subdivision) বর্তমানে যুক্ত নেই। যেকোনো বহুভুজ নিখুঁতভাবে বিভক্ত করতে একটি পূর্ণাঙ্গ কম্পিউটেশনাল জিওমেট্রি লাইব্রেরি প্রয়োজন।',
      },
      {
        title: 'ওসিআর এবং স্বয়ংক্রিয় সীমানা শনাক্তকরণ',
        desc: 'আপলোড করা ম্যাপ বা দলিলের ফাইল গ্রহণ করা হলেও তা রিয়েল ওসিআর (OCR) বা কম্পিউটার ভিশন মডেল দ্বারা প্রক্রিয়াজাত হয় না। ডেমোতে আগে থেকে সংরক্ষিত সিন্থেটিক কো-অর্ডিনেট ব্যবহার করা হয়। পূর্ণাঙ্গ ওসিআরের জন্য টেসেরাক্ট (Tesseract) ভিত্তিক পাইথন ব্যাকএন্ড প্রয়োজন।',
      },
      {
        title: 'সরকারি ডাটাবেজের সরাসরি সংযুক্তি',
        desc: 'বাংলাদেশ সরকারের ভূমি রেকর্ড ডাটাবেজ, মৌজা ম্যাপ বা সিএস/এসএ/আরএস পোর্টালের সাথে সরাসরি কোনো এপিআই সংযোগ নেই। বাস্তব প্রয়োগে এর জন্য সরকারের ভূমি মন্ত্রণালয়ের আনুষ্ঠানিক এপিআই (API) অ্যাক্সেস প্রয়োজন।',
      },
      {
        title: 'আইনগত উত্তরাধিকার হিসাব',
        desc: 'অ্যাপ্লিকেশনটি কোনো উত্তরাধিকার আইনের অধীনে স্বয়ংক্রিয়ভাবে চূড়ান্ত আইনি হিস্যা নির্ধারণ করে না। ওয়ারিশদের প্রাপ্য শতকরা হার ব্যবহারকারীকে ইনপুট দিতে হয় এবং তা কোনো আইনি কাঠামোর সাথে সংক্রিয়ভাবে যাচাই করা হয় না।',
      },
      {
        title: 'জমির আর্থিক বাজারমূল্য',
        desc: 'প্রদর্শিত জমির সকল মূল্য সিন্থেটিক ডেমো প্রাক্কলন। প্রকৃত বাজারদর ও ভ্যালুয়েশনের জন্য সরকার অনুমোদিত সার্ভেয়ার বা সার্টিফাইড ভূমি মূল্যায়নকারীর সাহায্য প্রয়োজন।',
      },
      {
        title: 'জিও-রেফারেন্সিং ও ক্যাডাস্ট্রাল স্থানাঙ্ক',
        desc: 'ডেমো প্লটের কো-অর্ডিনেটগুলো আনুমানিক এবং কেবল প্রদর্শনের জন্য তৈরি। এগুলো সরেজমিনে পরিমাপকৃত ক্যাডাস্ট্রাল বাউন্ডারি নির্দেশ করে না। নির্ভুল জিও-রেফারেন্সিংয়ের জন্য গ্রাউন্ড কন্ট্রোল পয়েন্ট (GCP) ও নিখুঁত জিআইএস (GIS) পরিমাপ প্রয়োজন।',
      },
    ],
    aiDisclosureTitle: 'এআই কোডিং অ্যাসিস্ট্যান্ট সম্পর্কিত ডিসক্লোজার',
    aiDisclosures: [
      'এই অ্যাপ্লিকেশনটি আধুনিক এআই কোডিং সরঞ্জামের সহায়তায় দ্রুতগতিতে তৈরি করা হয়েছে। সমস্ত অ্যালগরিদম, বিজনেস লজিক, ডেটা মডেল, অপটিমাইজেশন ইঞ্জিন এবং ইউজার ইন্টারফেসের উপাদানগুলো প্রজেক্ট দল কর্তৃক ডিজাইন, বাস্তবায়িত, পর্যালোচনা ও যাচাইকৃত।',
      'সুপারিশ তৈরি, রেকর্ড যাচাই বা স্কোর গণনার জন্য রানটাইমে কোনো এআই ল্যাঙ্গুয়েজ মডেল (LLM) ব্যবহার করা হয় না। সমস্ত ফলাফল পূর্ব-সংরক্ষিত সিন্থেটিক ডেটাসেটের ওপর ডিসিশন-বেসড টাইপস্ক্রিপ্ট অ্যালগরিদমের মাধ্যমে স্বয়ংক্রিয়ভাবে গণনা করা হয়।',
      'পরামর্শ, স্কোর এবং ঝুঁকি নির্দেশকগুলো সরাসরি সুনির্দিষ্ট গাণিতিক সূত্রের ভিত্তিতে তৈরি — কোনো ল্যাঙ্গুয়েজ মডেলের অনুমাননির্ভর আউটপুট বা অস্পষ্ট ট্রেনিং ডেটার ওপর নির্ভরশীল নয়।',
    ],
    projectTitle: 'প্রজেক্ট পরিচিতি',
    eventLabel: 'ইভেন্ট:',
    eventValue: 'ল্যান্ডটেক হ্যাকাথন — বাংলাদেশ বিশ্ববিদ্যালয়',
    appLabel: 'অ্যাপ্লিকেশন:',
    appValue: 'জমি-শেয়ার (JOMI-SHARE) v১.০ ডেমো',
    taglineLabel: 'স্লোগান:',
    taglineValue: '"আপনার জমি জানুন। খতিয়ান যাচাই করুন। সুষ্ঠু বাটোয়ারা নিশ্চিত করুন।"',
    caseLabel: 'ডেমো কেস:',
    caseValue: 'সোনারগাঁও পারিবারিক জমি বাটোয়ারা — ডেমো কেস ০০১ (সম্পূর্ণ সিন্থেটিক)',
    osmAttribution:
      'ওপেনস্ট্রিটম্যাপ টাইলস © ওপেনস্ট্রিটম্যাপ অবদানকারী (CC-BY-SA)। প্রদর্শনের উদ্দেশ্যে ওপেনস্ট্রিটম্যাপ নীতিমালার আওতায় ব্যবহৃত।',
  },
};

import { useLanguage } from '../context/LanguageContext';

export default function AboutPage() {
  const { lang, setLang } = useLanguage();
  const t = CONTENT[lang];

  return (
    <div className="space-y-6 max-w-4xl">
      <SectionHeader
        title={t.headerTitle}
        subtitle={t.headerSubtitle}
        actions={
          <div className="inline-flex items-center p-1 bg-white rounded-xl border border-gray-200 shadow-sm gap-1">
            <span className="pl-2 pr-1 text-gray-400">
              <Globe className="w-4 h-4 text-brand-600" />
            </span>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={clsx(
                'px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200',
                lang === 'en'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-navy-800 hover:bg-gray-100'
              )}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLang('bn')}
              className={clsx(
                'px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200',
                lang === 'bn'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-navy-800 hover:bg-gray-100'
              )}
            >
              বাংলা
            </button>
          </div>
        }
      />

      {/* Mission */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-navy-800">{t.appName}</div>
            <div className="text-sm text-gray-500">{t.appSubtitle}</div>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          <strong>{t.tagline}</strong>
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">{t.missionDesc}</p>
      </div>

      {/* Important Disclaimers */}
      <AlertBox type="error" title={t.disclaimerTitle}>
        <ul className="space-y-2 text-sm">
          {t.disclaimers.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              • {item}
            </li>
          ))}
        </ul>
      </AlertBox>

      {/* Modules */}
      <div className="card">
        <div className="font-bold text-navy-800 mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-brand-600" /> {t.modulesTitle}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {t.modules.map(m => (
            <div key={m.title} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="font-semibold text-navy-800 text-sm mb-1">{m.title}</div>
              <div className="text-xs text-gray-600 leading-relaxed">{m.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="card">
        <div className="font-bold text-navy-800 mb-4 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-blue-600" /> {t.techTitle}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
          {t.techCategories.map(({ cat, items }) => (
            <div key={cat} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{cat}</div>
              {items.map(item => (
                <div key={item} className="text-xs text-navy-800 flex items-center gap-1.5 mb-1">
                  <CheckCircle className="w-3 h-3 text-brand-500 flex-shrink-0" /> {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Known Limitations */}
      <div className="card">
        <div className="font-bold text-navy-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" /> {t.limitationsTitle}
        </div>
        <div className="space-y-3">
          {t.limitations.map(({ title, desc }) => (
            <div key={title} className="flex gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-navy-800">{title}</div>
                <div className="text-xs text-gray-600 mt-0.5 leading-relaxed">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Disclosure */}
      <div className="card border-blue-100 bg-blue-50/30">
        <div className="font-bold text-navy-800 mb-3 flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-600" /> {t.aiDisclosureTitle}
        </div>
        <div className="text-sm text-gray-600 space-y-2 leading-relaxed">
          {t.aiDisclosures.map((disc, idx) => (
            <p key={idx}>{disc}</p>
          ))}
        </div>
      </div>

      {/* Team / Project */}
      <div className="card">
        <div className="font-bold text-navy-800 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-brand-600" /> {t.projectTitle}
        </div>
        <div className="text-sm text-gray-600 space-y-1">
          <div>
            <strong>{t.eventLabel}</strong> {t.eventValue}
          </div>
          <div>
            <strong>{t.appLabel}</strong> {t.appValue}
          </div>
          <div>
            <strong>{t.taglineLabel}</strong> {t.taglineValue}
          </div>
          <div>
            <strong>{t.caseLabel}</strong> {t.caseValue}
          </div>
          <div className="pt-2 text-xs text-gray-400">{t.osmAttribution}</div>
        </div>
      </div>
    </div>
  );
}
