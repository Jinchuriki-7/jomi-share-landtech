import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Building2, ShieldCheck, CheckCircle2, ArrowRight, Upload,
  AlertCircle, Lock, Info, Award, FileText, ChevronRight
} from 'lucide-react';
import { useNirbash } from '../context/NirbashContext';
import { useLanguage } from '../../context/LanguageContext';
import { DISTRICTS_BD } from '../data/nirbashData';

export default function NirbashRegisterCompanyPage() {
  const { registerCompany } = useNirbash();
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    nameBn: '',
    representative: '',
    email: '',
    phone: '',
    address: '',
    addressBn: '',
    district: 'Dhaka',
    description: '',
    descriptionBn: '',
    established: 2020,
    website: '',
    tradeLicenseNo: '',
    rehabMember: true,
    logoColor: '#166534',
    logo: '',
  });

  const [documentUploaded, setDocumentUploaded] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError(lang === 'bn' ? 'অনুগ্রহ করে আবশ্যক তথ্যগুলো পূরণ করুন।' : 'Please fill in all required fields.');
      return;
    }
    if (!agreed) {
      setError(lang === 'bn' ? 'অনুগ্রহ করে শর্তাবলীতে সম্মতি দিন।' : 'Please agree to terms and conditions.');
      return;
    }

    const initials = form.name
      .split(' ')
      .map(w => w[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'RE';

    const newCompany = registerCompany({
      name: form.name,
      nameBn: form.nameBn || form.name,
      logo: form.logo || initials,
      logoColor: form.logoColor,
      description: form.description || 'Registered real estate developer on NIRBASH.',
      descriptionBn: form.descriptionBn || form.description || 'নির্বাশের নিবন্ধিত রিয়েল এস্টেট ডেভেলপার।',
      address: `${form.address}, ${form.district}`,
      addressBn: `${form.addressBn || form.address}, ${form.district}`,
      email: form.email,
      phone: form.phone,
      website: form.website,
      established: Number(form.established),
      verificationStatus: documentUploaded ? 'pending' : 'registered',
    });

    setSuccess(true);
    setTimeout(() => {
      navigate('/nirbash/company-dashboard');
    }, 1200);
  };

  const presetColors = ['#166534', '#1e3a5f', '#0f766e', '#854d0e', '#7c2d12', '#4c1d95'];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Breadcrumb & Title */}
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <Link to="/nirbash" className="hover:text-green-800">NIRBASH</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/nirbash/companies" className="hover:text-green-800">
              {lang === 'bn' ? 'কোম্পানিসমূহ' : 'Companies'}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-semibold">
              {lang === 'bn' ? 'কোম্পানি নিবন্ধন' : 'Register Company'}
            </span>
          </div>

          <div className="bg-gradient-to-r from-green-900 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs font-bold border border-green-400/20">
                {lang === 'bn' ? 'পার্টনার প্রোগ্রাম' : 'Developer Partner Program'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {lang === 'bn' ? 'আপনার রিয়েল এস্টেট কোম্পানি নিবন্ধন করুন' : 'Register Your Real Estate Company'}
            </h1>
            <p className="text-sm text-green-100/80 mt-2 max-w-xl">
              {lang === 'bn'
                ? 'জমি-শেয়ার ও নির্বাশে আপনার প্রপার্টি তালিকাভুক্ত করুন এবং যাচাইকৃত ক্রেতাদের কাছে সহজে পৌঁছান।'
                : 'List your flats and land plots directly to verified buyers on Bangladesh’s premier LandTech marketplace.'}
            </p>
          </div>
        </div>

        {/* Verification Notice / Disclaimer */}
        <div className="p-4 bg-amber-50 border border-amber-200/80 rounded-2xl flex items-start gap-3 text-amber-900 text-xs leading-relaxed">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">
              {lang === 'bn' ? 'যাচাইকরণ সংক্রান্ত নিয়মাবলী:' : 'Company Verification Policy:'}
            </span>{' '}
            {lang === 'bn'
              ? 'নিবন্ধন সম্পন্ন করলেই কোম্পানিকে সরাসরি "যাচাইকৃত" ঘোষণা করা হয় না। ট্রেড লাইসেন্স ও রিহ্যাব অনুমোদন যাচাই সাপেক্ষে "যাচাইকৃত পার্টনার" ব্যাজ প্রদান করা হয়।'
              : 'Registration alone does not constitute official verification. Companies are initially marked as "Registered" or "Pending Verification" until trade license and business documentation are audited.'}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3 text-green-800">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-sm">
                  {lang === 'bn' ? 'নিবন্ধন সফল হয়েছে!' : 'Registration Successful!'}
                </h4>
                <p className="text-xs text-green-700 mt-0.5">
                  {lang === 'bn' ? 'কোম্পানি ড্যাশবোর্ডে রিডাইরেক্ট করা হচ্ছে...' : 'Redirecting to your company dashboard...'}
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <Building2 className="w-4 h-4 text-green-700" />
                <span>{lang === 'bn' ? 'কোম্পানির বিবরণ' : 'Company Information'}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {lang === 'bn' ? 'কোম্পানির নাম (ইংরেজি) *' : 'Company Name (English) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Green Valley Properties Ltd."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {lang === 'bn' ? 'কোম্পানির নাম (বাংলা)' : 'Company Name (Bangla)'}
                  </label>
                  <input
                    type="text"
                    value={form.nameBn}
                    onChange={e => setForm({ ...form, nameBn: e.target.value })}
                    placeholder="উদাঃ গ্রিন ভ্যালি প্রপার্টিজ লিঃ"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {lang === 'bn' ? 'অনুমোদিত প্রতিনিধি' : 'Authorized Representative'}
                  </label>
                  <input
                    type="text"
                    value={form.representative}
                    onChange={e => setForm({ ...form, representative: e.target.value })}
                    placeholder="e.g. Managing Director / Partner"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {lang === 'bn' ? 'প্রতিষ্ঠার বছর' : 'Year Established'}
                  </label>
                  <input
                    type="number"
                    min="1970"
                    max="2026"
                    value={form.established}
                    onChange={e => setForm({ ...form, established: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {lang === 'bn' ? 'কোম্পানির বিবরণ (সংক্ষেপে)' : 'Company Overview / About'}
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe your property development portfolio, vision, and experience..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700"
                />
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-green-700" />
                <span>{lang === 'bn' ? 'যোগাযোগ ও অবস্থান' : 'Contact & Address'}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {lang === 'bn' ? 'বিজনেস ইমেইল *' : 'Business Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="contact@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {lang === 'bn' ? 'হটলাইন / ফোন নম্বর *' : 'Hotline / Phone Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+880 1700-000000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {lang === 'bn' ? 'হেড অফিস ঠিকানা' : 'Office Address'}
                  </label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                    placeholder="House, Road, Block, Sector..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {lang === 'bn' ? 'জেলা' : 'District'}
                  </label>
                  <select
                    value={form.district}
                    onChange={e => setForm({ ...form, district: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 bg-white"
                  >
                    {DISTRICTS_BD.map(dist => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Brand Accent & Logo */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-green-700" />
                <span>{lang === 'bn' ? 'ব্র্যান্ড আইডেন্টিটি' : 'Brand Identity & Logo'}</span>
              </h3>

              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-lg font-black shadow-md"
                  style={{ backgroundColor: form.logoColor }}
                >
                  {form.name
                    ? form.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
                    : 'RE'}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    {lang === 'bn' ? 'লোগো ব্র্যান্ড কালার নির্বাচন করুন' : 'Select Brand Theme Color'}
                  </label>
                  <div className="flex items-center gap-2">
                    {presetColors.map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setForm({ ...form, logoColor: color })}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          form.logoColor === color ? 'scale-125 border-gray-900' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Legal Verification Documents (Trade License / REHAB) */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-700" />
                <span>{lang === 'bn' ? 'যাচাইকরণ ও লাইসেন্স' : 'Verification & Business Documents'}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {lang === 'bn' ? 'ট্রেড লাইসেন্স নম্বর' : 'Trade License Number'}
                  </label>
                  <input
                    type="text"
                    value={form.tradeLicenseNo}
                    onChange={e => setForm({ ...form, tradeLicenseNo: e.target.value })}
                    placeholder="TRAD/DNCC/123456/2024"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700"
                  />
                </div>

                <div className="flex items-center gap-3 pt-5">
                  <input
                    type="checkbox"
                    id="rehabMember"
                    checked={form.rehabMember}
                    onChange={e => setForm({ ...form, rehabMember: e.target.checked })}
                    className="w-4 h-4 text-green-700 rounded border-gray-300 focus:ring-green-700"
                  />
                  <label htmlFor="rehabMember" className="text-xs font-semibold text-gray-800">
                    {lang === 'bn' ? 'রিহ্যাব (REHAB) সদস্য কোম্পানি' : 'REHAB Member Company'}
                  </label>
                </div>
              </div>

              {/* Upload document simulator */}
              <div
                onClick={() => setDocumentUploaded(prev => !prev)}
                className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-colors ${
                  documentUploaded ? 'border-green-500 bg-green-50/50' : 'border-gray-200 hover:border-green-600'
                }`}
              >
                <Upload className={`w-6 h-6 mx-auto mb-1 ${documentUploaded ? 'text-green-600' : 'text-gray-400'}`} />
                <p className="text-xs font-semibold text-gray-800">
                  {documentUploaded
                    ? (lang === 'bn' ? 'ট্রেড লাইসেন্স ফাইল সংযুক্ত হয়েছে (audit_doc.pdf)' : 'Trade License Attached (audit_doc.pdf)')
                    : (lang === 'bn' ? 'ট্রেড লাইসেন্স বা অডিট কপি আপলোড করতে ক্লিক করুন' : 'Click to attach Trade License / Incorporation PDF')}
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {lang === 'bn' ? 'সর্বোচ্চ ৫ মেগাবাইট (PDF, JPG, PNG)' : 'Max 5MB (PDF, JPG, PNG)'}
                </p>
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="agreed"
                required
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="w-4 h-4 text-green-700 rounded border-gray-300 focus:ring-green-700 mt-0.5"
              />
              <label htmlFor="agreed" className="text-xs text-gray-600 leading-normal">
                {lang === 'bn'
                  ? 'আমি স্বীকার করছি যে প্রদানকৃত সমস্ত তথ্য সঠিক এবং জমি-শেয়ার / নির্বাশ নীতিমালার সাথে একমত।'
                  : 'I declare that the information provided is accurate and agree to the NIRBASH & JOMI-SHARE Developer Terms.'}
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-green-800 hover:bg-green-900 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-800/25 transition-all"
              >
                <span>{lang === 'bn' ? 'কোম্পানি নিবন্ধন নিশ্চিত করুন' : 'Complete Company Registration'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
