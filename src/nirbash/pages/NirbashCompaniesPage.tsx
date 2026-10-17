import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ShieldCheck, Building2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { NIRBASH_COMPANIES, getPropertiesByCompany } from '../data/nirbashData';
import clsx from 'clsx';

export default function NirbashCompaniesPage() {
  const { lang } = useLanguage();

  const t = {
    en: {
      title: 'Registered Real Estate Companies',
      subtitle: 'Browse verified property companies and explore their listings',
      listings: 'listings',
      viewListings: 'View Listings',
      verified: 'Verified',
      pending: 'Verification Pending',
      registered: 'Registered',
      established: 'Est.',
      noCompanies: 'No companies registered yet.',
    },
    bn: {
      title: 'নিবন্ধিত রিয়েল এস্টেট কোম্পানি',
      subtitle: 'যাচাইকৃত সম্পত্তি কোম্পানি ব্রাউজ করুন এবং তাদের তালিকা দেখুন',
      listings: 'টি সম্পত্তি',
      viewListings: 'তালিকা দেখুন',
      verified: 'যাচাইকৃত',
      pending: 'যাচাই প্রক্রিয়াধীন',
      registered: 'নিবন্ধিত',
      established: 'প্রতিষ্ঠিত',
      noCompanies: 'এখনো কোনো কোম্পানি নিবন্ধিত হয়নি।',
    },
  }[lang];

  const verifBadge = {
    verified: { label: t.verified, bg: '#dcfce7', color: '#166534' },
    pending: { label: t.pending, bg: '#fef3c7', color: '#92400e' },
    registered: { label: t.registered, bg: '#f3f4f6', color: '#4b5563' },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-900 text-white py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-green-300 text-sm mb-2">
            <Link to="/nirbash" className="hover:text-white">NIRBASH</Link>
            <span>/</span>
            <span>{lang === 'bn' ? 'কোম্পানি' : 'Companies'}</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
          <p className="text-green-200 text-sm">{t.subtitle}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {NIRBASH_COMPANIES.length === 0 ? (
          <div className="text-center py-20">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">{t.noCompanies}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {NIRBASH_COMPANIES.map(company => {
              const listings = getPropertiesByCompany(company.id);
              const badge = verifBadge[company.verificationStatus];
              const name = lang === 'bn' ? company.nameBn : company.name;
              const description = lang === 'bn' ? company.descriptionBn : company.description;

              return (
                <div key={company.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
                  {/* Company header bar */}
                  <div className="h-2" style={{ backgroundColor: company.logoColor }} />

                  <div className="p-5 flex-1 flex flex-col">
                    {/* Top row */}
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-md"
                        style={{ backgroundColor: company.logoColor }}
                      >
                        {company.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-bold text-gray-900 leading-tight">{name}</h2>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span
                            className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                            style={{ background: badge.bg, color: badge.color }}
                          >
                            {badge.label}
                            {company.verificationStatus === 'verified' && (
                              <ShieldCheck className="w-3 h-3 inline ml-1" />
                            )}
                          </span>
                          <span className="text-xs text-gray-500">
                            {t.established} {company.established}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">{description}</p>

                    {/* Contact info */}
                    <div className="space-y-1.5 mb-4 text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-green-700 flex-shrink-0" />
                        <span className="truncate">{lang === 'bn' ? company.addressBn : company.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-green-700 flex-shrink-0" />
                        <span>{company.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-green-700 flex-shrink-0" />
                        <span className="truncate">{company.email}</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                      <div className="text-sm font-semibold text-gray-700">
                        <span className="text-2xl font-bold text-green-800">{listings.length}</span>
                        {' '}{t.listings}
                      </div>
                      <Link
                        to={`/nirbash/companies/${company.id}`}
                        className="flex items-center gap-1.5 text-sm font-semibold text-green-800 hover:text-green-900 transition-colors"
                      >
                        {t.viewListings}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
