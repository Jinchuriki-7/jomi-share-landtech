import React, { useState } from 'react';
import {
  Phone, Mail, MapPin, MessageCircle, Send,
  CheckCircle2, HelpCircle, ChevronDown, Sparkles
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import clsx from 'clsx';

export default function NirbashContactPage() {
  const { lang } = useLanguage();
  const isBn = lang === 'bn';
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'general',
    message: ''
  });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = isBn
    ? [
        {
          q: 'NIRBASH এ প্রপার্টি লিস্টিং দিতে কোনো টাকা লাগে কি?',
          a: 'না, NIRBASH সম্পূর্ণ ১০০% কমিশন ফ্রি প্ল্যাটফর্ম। যে কোনো প্রকৃত জমির মালিক বা অনুমোদিত এজেন্ট বিনামূল্যে বিজ্ঞাপন পোস্ট করতে পারেন।'
        },
        {
          q: 'জমির কাগজপত্র ও খতিয়ান কীভাবে যাচাই করবেন?',
          a: 'আমাদের প্ল্যাটফর্মে তালিকাভুক্ত প্রতিটি প্রপার্টির দাগ ও খতিয়ান নম্বর থাকে। আপনি JOMI-SHARE এর Land DNA টুলের মাধ্যমে অথবা সরাসরি আমাদের বিশেষজ্ঞ সার্ভেয়ারদের সহায়তা নিয়ে দাগের ধারাবাহিকতা যাচাই করতে পারেন।'
        },
        {
          q: 'সরাসরি জমি পরিমাপ বা ডিজিটাল আমিনের সেবা পাওয়া যাবে কি?',
          a: 'হ্যাঁ, আমাদের "Services" সেকশন থেকে আপনি ডিজিটাল আমিন, টোটাল স্টেশন ও আরটিকে-জিপিএস দিয়ে জমি পরিমাপ ও সীমানা পিলার স্থাপনের সার্ভিস অর্ডার করতে পারেন।'
        },
        {
          q: 'বায়না বা রেজিস্ট্রি করার সময় আইনি সহায়তা পাওয়া যাবে কি?',
          a: 'অবশ্যই। আমাদের প্যানেলভুক্ত সুপ্রিম কোর্ট ও জেলা জজ আদালতের অভিজ্ঞ আইনজীবী এবং দলিল লেখকদের মাধ্যমে চুক্তিপত্র খসড়া ও সাব-রেজিস্ট্রি সেবা গ্রহণ করতে পারেন।'
        }
      ]
    : [
        {
          q: 'Is there any fee to list a property on NIRBASH?',
          a: 'No, NIRBASH is a 100% commission-free marketplace. Any authentic land owner or licensed agent can publish property ads free of charge.'
        },
        {
          q: 'How can I verify land records and khatians?',
          a: 'Every listing on our platform includes verified dag and khatian records. You can use our integrated Land DNA tool or consult our licensed deed researchers to verify the chain of title.'
        },
        {
          q: 'Can I order a digital ground survey or digital Amin?',
          a: 'Yes, through our Services section you can book an authorized surveyor equipped with Total Station and RTK-GPS for precise boundary demarcation and demarcation pillars.'
        },
        {
          q: 'Is legal support available for Bayna deed drafting or registration?',
          a: 'Absolutely. Our panel of senior High Court advocates and licensed deed writers provide deed drafting, title search, and sub-registry assistance.'
        }
      ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', email: '', category: 'general', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#f7faf8] text-gray-800 pb-16 font-sans">
      {/* Header */}
      <div className="bg-gradient-to-b from-white via-green-50/50 to-[#f7faf8] border-b border-gray-200 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-900 text-xs font-bold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{isBn ? 'আমরা সার্বক্ষণিক আপনার সহায়তায় প্রস্তুত' : 'We are here to assist you 24/7'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-green-950 tracking-tight mb-3">
            {isBn ? 'যোগাযোগ করুন — NIRBASH' : 'Contact Us — NIRBASH'}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            {isBn
              ? 'প্রপার্টি ক্রয়-বিক্রয়, আইনি পরামর্শ, সার্ভে বা যে কোনো জিজ্ঞাসায় আমাদের হটলাইন বা মেসেজে যুক্ত হোন।'
              : 'Connect with our helpline, WhatsApp desk, or dedicated land experts for listings, verification, and legal advice.'}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-900 flex items-center justify-center mb-3">
              <Phone className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">
                {isBn ? 'সরাসরি হটলাইন' : 'Direct Helpline'}
              </h3>
              <p className="text-xs text-gray-500 mb-2">
                {isBn ? 'প্রতিদিন সকাল ৯টা - রাত ৮টা' : 'Daily 9:00 AM - 8:00 PM'}
              </p>
              <a href="tel:+8801700000000" className="text-xs font-black text-emerald-700 hover:underline">
                +880 1700-000000
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-900 flex items-center justify-center mb-3">
              <MessageCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">
                {isBn ? 'WhatsApp চ্যাট' : 'WhatsApp Support'}
              </h3>
              <p className="text-xs text-gray-500 mb-2">
                {isBn ? 'দ্রুত উত্তর ও ফাইল আদানপ্রদান' : 'Instant chat & file sharing'}
              </p>
              <a
                href="https://wa.me/8801700000000"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-black text-emerald-700 hover:underline"
              >
                {isBn ? 'সরাসরি মেসেজ পাঠান →' : 'Send WhatsApp Message →'}
              </a>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center mb-3">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">
                {isBn ? 'অফিসিয়াল ইমেইল' : 'Official Email'}
              </h3>
              <p className="text-xs text-gray-500 mb-2">
                {isBn ? 'যেকোনো প্রাতিষ্ঠানিক তথ্যে' : 'Corporate inquiries & assistance'}
              </p>
              <a href="mailto:support@nirbash.com" className="text-xs font-black text-blue-700 hover:underline">
                support@nirbash.com
              </a>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center mb-3">
              <MapPin className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">
                {isBn ? 'হেড অফিস' : 'Headquarters'}
              </h3>
              <p className="text-xs text-gray-600 leading-tight">
                {isBn ? 'হাউজ ১২, রোড ৫, ব্লক ডি, বনানী, ঢাকা-১২১৩' : 'House 12, Road 5, Block D, Banani, Dhaka-1213'}
              </p>
            </div>
          </div>
        </div>

        {/* Form & FAQ Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-black text-green-950 mb-1">
              {isBn ? 'আমাদের একটি বার্তা পাঠান' : 'Send us a Message'}
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              {isBn
                ? 'নিচের ফর্মটি পূরণ করুন, আমাদের সাপোর্ট টিম দ্রুত আপনার সাথে যোগাযোগ করবে।'
                : 'Fill out this quick form and our support desk will respond shortly.'}
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-green-950">
                  {isBn ? 'বার্তা সফলভাবে পাঠানো হয়েছে!' : 'Message Sent Successfully!'}
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  {isBn
                    ? 'আপনার মেসেজের জন্য ধন্যবাদ। আমাদের প্রতিনিধি দ্রুত আপনার ফোন নম্বরে যোগাযোগ করবেন।'
                    : 'Thank you for reaching out. A representative will contact you via phone or email shortly.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-bold mb-1.5">
                      {isBn ? 'আপনার নাম *' : 'Your Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isBn ? 'যেমন: মোঃ কামরুল ইসলাম' : 'e.g. Md. Kamrul Islam'}
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-1.5">
                      {isBn ? 'মোবাইল নম্বর *' : 'Phone Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder={isBn ? '০১৭১১-XXXXXX' : '+880 1711-XXXXXX'}
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-bold mb-1.5">
                      {isBn ? 'ইমেইল (ঐচ্ছিক)' : 'Email Address (Optional)'}
                    </label>
                    <input
                      type="email"
                      placeholder="yourname@gmail.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-1.5">
                      {isBn ? 'জিজ্ঞাসার ধরন' : 'Inquiry Category'}
                    </label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                    >
                      <option value="general">{isBn ? 'সাধারণ জিজ্ঞাসা' : 'General Inquiry'}</option>
                      <option value="buy_property">{isBn ? 'প্রপার্টি ক্রয় / বিক্রি সংক্রান্ত' : 'Buying or Selling Property'}</option>
                      <option value="survey_service">{isBn ? 'জমি পরিমাপ ও আমিন সার্ভিস' : 'Land Demarcation & Amin Survey'}</option>
                      <option value="legal_deed">{isBn ? 'দলিল ও খতিয়ান যাচাই সহায়তা' : 'Deed & Record Title Check'}</option>
                      <option value="company_agency">{isBn ? 'কোম্পানি ও এজেন্ট নিবন্ধন' : 'Developer & Agent Registration'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1.5">
                    {isBn ? 'আপনার বার্তা বা বিবরণ *' : 'Your Message *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder={
                      isBn
                        ? 'আপনার প্রশ্ন বা প্রয়োজনীয় প্রপার্টির বিবরণ বিস্তারিত লিখুন...'
                        : 'Describe your property requirement, questions or inquiries...'
                    }
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-green-900 hover:bg-green-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isBn ? 'মেসেজ পাঠান' : 'Submit Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* FAQ Accordion (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-200 p-6 sm:p-7 shadow-xs">
            <div className="flex items-center gap-2 text-green-900 font-black text-lg mb-4">
              <HelpCircle className="w-5 h-5 text-emerald-600" />
              <span>{isBn ? 'সাধারণ জিজ্ঞাসাসমূহ (FAQ)' : 'Frequently Asked Questions (FAQ)'}</span>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden transition-all">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full p-4 flex items-center justify-between text-left text-xs font-bold text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <span className="pr-2">{faq.q}</span>
                      <ChevronDown
                        className={clsx('w-4 h-4 text-gray-500 transition-transform duration-200 flex-shrink-0', isOpen && 'rotate-180 text-emerald-600')}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-gray-600 leading-relaxed bg-gray-50/50 border-t border-gray-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
