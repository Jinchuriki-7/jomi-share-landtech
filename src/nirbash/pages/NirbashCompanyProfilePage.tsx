import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, ShieldCheck, Building2, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getCompanyById, getPropertiesByCompany } from '../data/nirbashData';
import PropertyCard from '../components/PropertyCard';

export default function NirbashCompanyProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { lang } = useLanguage();
  const company = id ? getCompanyById(id) : undefined;
  const listings = company ? getPropertiesByCompany(company.id) : [];

  const t = {
    en: {
      back: 'Back to Companies',
      verified: 'Verified Company',
      pending: 'Verification Pending',
      registered: 'Registered',
      about: 'About',
      listings: 'Property Listings',
      noListings: 'No published listings from this company.',
      est: 'Established',
      totalListings: 'Total Listings',
    },
    bn: {
      back: 'কোম্পানির তালিকায় ফিরুন',
      verified: 'যাচাইকৃত কোম্পানি',
      pending: 'যাচাই প্রক্রিয়াধীন',
      registered: 'নিবন্ধিত',
      about: 'সম্পর্কে',
      listings: 'সম্পত্তির তালিকা',
      noListings: 'এই কোম্পানির কোনো প্রকাশিত তালিকা নেই।',
      est: 'প্রতিষ্ঠিত',
      totalListings: 'মোট তালিকা',
    },
  }[lang];

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-700 font-semibold">{lang === 'bn' ? 'কোম্পানি পাওয়া যায়নি' : 'Company not found'}</p>
          <Link to="/nirbash/companies" className="text-green-700 text-sm hover:underline mt-2 block">
            {t.back}
          </Link>
        </div>
      </div>
    );
  }

  const name = lang === 'bn' ? company.nameBn : company.name;
  const description = lang === 'bn' ? company.descriptionBn : company.description;
  const address = lang === 'bn' ? company.addressBn : company.address;

  const verifBadge = {
    verified: { label: t.verified, bg: '#dcfce7', color: '#166534' },
    pending: { label: t.pending, bg: '#fef3c7', color: '#92400e' },
    registered: { label: t.registered, bg: '#f3f4f6', color: '#4b5563' },
  }[company.verificationStatus];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="h-3" style={{ background: `linear-gradient(90deg, ${company.logoColor}, ${company.logoColor}cc)` }} />
      <div className="bg-white border-b border-gray-100 shadow-sm px-4 py-6">
        <div className="max-w-5xl mx-auto">
          <Link to="/nirbash/companies" className="flex items-center gap-2 text-sm text-green-700 hover:text-green-900 mb-4 font-medium">
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </Link>
          <div className="flex items-center gap-5">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg flex-shrink-0"
              style={{ backgroundColor: company.logoColor }}
            >
              {company.logo}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: verifBadge.bg, color: verifBadge.color }}
                >
                  {company.verificationStatus === 'verified' && <ShieldCheck className="w-3 h-3 inline mr-1" />}
                  {verifBadge.label}
                </span>
                <span className="text-sm text-gray-500">{t.est} {company.established}</span>
                <span className="text-sm text-gray-500">·</span>
                <span className="text-sm text-gray-500">{listings.length} {t.totalListings}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: About */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4">
              <h2 className="font-semibold text-gray-900 mb-3 text-sm">{t.about}</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{description}</p>
              <div className="space-y-2.5 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-green-700 flex-shrink-0 mt-0.5" />
                  <span>{address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-700 flex-shrink-0" />
                  <span>{company.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-green-700 flex-shrink-0" />
                  <span>{company.email}</span>
                </div>
                {company.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-green-700 flex-shrink-0" />
                    <span>{company.website}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Listings */}
          <div className="lg:col-span-2">
            <h2 className="font-bold text-gray-900 mb-4">{t.listings} ({listings.length})</h2>
            {listings.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">{t.noListings}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {listings.map(p => <PropertyCard key={p.id} property={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
