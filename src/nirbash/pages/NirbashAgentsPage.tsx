import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Phone, MessageCircle, ShieldCheck, MapPin, Search,
  Award, ArrowLeft, ExternalLink, Building2
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { JOMIBAZAR_AGENTS, type NirbashAgent } from '../data/nirbashData';
import { useNirbash } from '../context/NirbashContext';

export default function NirbashAgentsPage() {
  const { lang } = useLanguage();
  const [search, setSearch] = useState('');

  const filteredAgents = JOMIBAZAR_AGENTS.filter(a => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      a.name.toLowerCase().includes(q) ||
      a.nameBn.includes(q) ||
      a.agency.toLowerCase().includes(q) ||
      a.location.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-950 via-green-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs font-bold border border-green-400/20">
              {lang === 'bn' ? 'বিশ্বস্ত এজেন্ট নেটওয়ার্ক' : 'Verified Agent Network'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {lang === 'bn' ? 'সকল অনুমোদিত রিয়েল এস্টেট এজেন্ট' : 'All Registered Property Agents'}
          </h1>
          <p className="text-sm text-green-100/80 mt-2 max-w-xl">
            {lang === 'bn'
              ? 'নিবাসের পরীক্ষিত ও নির্ভরযোগ্য এজেন্টদের সাথে সরাসরি কথা বলুন অথবা হোয়াটসঅ্যাপে চ্যাট করুন।'
              : 'Connect directly with certified property agents across Bangladesh via call or WhatsApp.'}
          </p>

          {/* Search */}
          <div className="mt-5 max-w-md relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={lang === 'bn' ? 'এজেন্টের নাম বা এলাকা দিয়ে খুঁজুন...' : 'Search agent by name or location...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-green-400 font-medium"
            />
          </div>
        </div>

        {/* Agent Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map(agent => (
            <div
              key={agent.id}
              className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={agent.avatar}
                      alt={agent.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-green-800 shadow-sm"
                    />
                    {agent.verified && (
                      <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-700 text-white rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base leading-tight">
                      {lang === 'bn' ? agent.nameBn : agent.name}
                    </h3>
                    <p className="text-xs text-green-800 font-semibold mt-0.5">
                      {lang === 'bn' ? agent.agencyBn : agent.agency}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-1">
                      <MapPin className="w-3 h-3 text-green-700" />
                      <span>{lang === 'bn' ? agent.locationBn : agent.location}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-2xl flex items-center justify-between text-xs mb-4">
                  <span className="text-gray-500 font-medium">
                    {lang === 'bn' ? 'সক্রিয় প্রপার্টি লিস্টিং' : 'Active Property Listings'}
                  </span>
                  <span className="font-black text-green-900 text-sm">
                    {agent.activeListings} {lang === 'bn' ? 'টি' : 'Listings'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                <a
                  href={`tel:${agent.phone}`}
                  className="py-2.5 px-3 bg-green-900 hover:bg-green-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'কল করুন' : 'Call'}</span>
                </a>
                <a
                  href={`https://wa.me/${agent.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
