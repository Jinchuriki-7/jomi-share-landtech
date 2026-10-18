import React, { useState } from 'react';
import { X, Lock, User, Phone, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useNirbash } from '../context/NirbashContext';
import { useLanguage } from '../../context/LanguageContext';
import clsx from 'clsx';

export default function AuthModal() {
  const { showAuthModal, setShowAuthModal, login } = useNirbash();
  const { lang } = useLanguage();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<'buyer' | 'seller' | 'agent'>('buyer');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (!showAuthModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(
      name || (role === 'agent' ? (lang === 'bn' ? 'এজেন্ট ইউজার' : 'Agent User') : (lang === 'bn' ? 'সেলার / বায়ার ইউজার' : 'Seller / Buyer User')),
      phone || '+880 1700-123456',
      role
    );
  };

  const handleQuickLogin = (selectedRole: 'buyer' | 'seller' | 'agent', defaultName: string) => {
    login(defaultName, '+880 1800-000000', selectedRole);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-5 animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-green-900 text-white flex items-center justify-center">
              <Lock className="w-4 h-4 text-green-300" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base leading-tight">
                {mode === 'login'
                  ? (lang === 'bn' ? 'নিবাসে লগইন করুন' : 'Sign In to NIRBASH')
                  : (lang === 'bn' ? 'ফ্রি অ্যাকাউন্ট তৈরি করুন' : 'Register Free Account')}
              </h3>
              <p className="text-[11px] text-gray-500">
                {lang === 'bn' ? 'দাম দেখতে ও সরাসরি যোগাযোগ করতে' : 'To view hidden prices & contact sellers'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAuthModal(false)}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Selector Tabs */}
        <div>
          <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
            {lang === 'bn' ? 'আপনার অ্যাকাউন্টের ধরন বেছে নিন:' : 'Select Account Type:'}
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-gray-100 rounded-xl text-xs font-semibold">
            {[
              { id: 'buyer', labelBn: 'ক্রেতা (Buyer)', labelEn: 'Buyer' },
              { id: 'seller', labelBn: 'মালিক (Seller)', labelEn: 'Seller' },
              { id: 'agent', labelBn: 'এজেন্ট (Agent)', labelEn: 'Agent' },
            ].map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id as any)}
                className={clsx(
                  'py-2 rounded-lg transition-all',
                  role === r.id ? 'bg-white text-green-900 shadow-xs font-bold' : 'text-gray-500 hover:text-gray-800'
                )}
              >
                {lang === 'bn' ? r.labelBn : r.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {mode === 'register' && (
            <div>
              <label className="font-semibold text-gray-700 block mb-1">
                {lang === 'bn' ? 'আপনার নাম *' : 'Full Name *'}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={lang === 'bn' ? 'উদাঃ মোঃ রফিকুল ইসলাম' : 'e.g. John Doe'}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-green-800/20 focus:border-green-800"
                />
              </div>
            </div>
          )}

          <div>
            <label className="font-semibold text-gray-700 block mb-1">
              {lang === 'bn' ? 'মোবাইল নম্বর *' : 'Mobile Phone Number *'}
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="tel"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+880 1700-000000"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-green-800/20 focus:border-green-800 font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-900 hover:bg-green-800 text-white rounded-xl font-bold shadow-md shadow-green-950/20 flex items-center justify-center gap-1.5 transition-all text-xs"
          >
            <span>{mode === 'login' ? (lang === 'bn' ? 'লগইন করুন' : 'Sign In') : (lang === 'bn' ? 'নিবন্ধন সম্পন্ন করুন' : 'Complete Registration')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Quick 1-click Demo Login */}
        <div className="border-t border-gray-100 pt-3">
          <div className="text-[11px] text-gray-400 text-center mb-2 font-medium">
            {lang === 'bn' ? 'অথবা এক ক্লিকে ডেমো প্রবেশ করুন:' : 'Or Quick 1-Click Demo Login:'}
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleQuickLogin('buyer', lang === 'bn' ? 'কাজী জামিল (Buyer)' : 'Kazi Jamil (Buyer)')}
              className="px-2 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg text-[11px] font-semibold transition-colors"
            >
              👤 {lang === 'bn' ? 'ক্রেতা হিসেবে' : 'As Buyer'}
            </button>
            <button
              onClick={() => handleQuickLogin('seller', lang === 'bn' ? 'আব্দুল করিম (Seller)' : 'Abdul Karim (Seller)')}
              className="px-2 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg text-[11px] font-semibold transition-colors"
            >
              🏡 {lang === 'bn' ? 'মালিক হিসেবে' : 'As Seller'}
            </button>
            <button
              onClick={() => handleQuickLogin('agent', lang === 'bn' ? 'দিদারুল আলম (Agent)' : 'Didarul Alam (Agent)')}
              className="px-2 py-1.5 bg-green-50 hover:bg-green-100 text-green-800 rounded-lg text-[11px] font-semibold transition-colors"
            >
              💼 {lang === 'bn' ? 'এজেন্ট হিসেবে' : 'As Agent'}
            </button>
          </div>
        </div>

        {/* Footer switch */}
        <div className="text-center text-xs text-gray-500 pt-1">
          {mode === 'login' ? (
            <span>
              {lang === 'bn' ? 'অ্যাকাউন্ট নেই? ' : "Don't have an account? "}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-green-800 font-bold hover:underline"
              >
                {lang === 'bn' ? 'নতুন অ্যাকাউন্ট খুলুন' : 'Register here'}
              </button>
            </span>
          ) : (
            <span>
              {lang === 'bn' ? 'ইতিমধ্যে অ্যাকাউন্ট আছে? ' : 'Already have an account? '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-green-800 font-bold hover:underline"
              >
                {lang === 'bn' ? 'লগইন করুন' : 'Sign In'}
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
