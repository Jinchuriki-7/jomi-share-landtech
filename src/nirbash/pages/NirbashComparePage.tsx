import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, X, ShieldCheck, Check, Minus, Building2, MapPin,
  ExternalLink, Layers, BedDouble, Bath, Maximize2, Calendar, Phone
} from 'lucide-react';
import { useNirbash } from '../context/NirbashContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  formatPrice, getAreaLabel, getCategoryLabel,
  getVerificationBadge, getAvailabilityBadge,
} from '../data/nirbashData';
import clsx from 'clsx';

export default function NirbashComparePage() {
  const { comparedIds, properties, companies, removeFromCompare, clearCompare } = useNirbash();
  const { lang } = useLanguage();

  const comparedProperties = properties.filter(p => comparedIds.includes(p.id));

  // Collect all unique features across compared properties
  const allFeatures = Array.from(
    new Set(
      comparedProperties.flatMap(p => (lang === 'bn' ? p.featuresBn : p.features))
    )
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div>
            <Link
              to="/nirbash/properties"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 hover:text-green-800 transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'সম্পত্তি তালিকায় ফিরুন' : 'Back to Properties'}</span>
            </Link>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              {lang === 'bn' ? 'সম্পত্তির বিস্তারিত তুলনা' : 'Property Comparison'}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              {lang === 'bn'
                ? `পাশাপাশি ${comparedProperties.length}টি সম্পত্তির বৈশিষ্ট্য ও দাম তুলনা করুন`
                : `Comparing ${comparedProperties.length} properties side-by-side with verified specs`}
            </p>
          </div>

          {comparedProperties.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={clearCompare}
                className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-semibold transition-colors"
              >
                {lang === 'bn' ? 'সব মুছুন' : 'Clear All'}
              </button>
              <Link
                to="/nirbash/properties"
                className="px-4 py-2 bg-green-800 hover:bg-green-900 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                {lang === 'bn' ? '+ আরো যোগ করুন' : '+ Add More Properties'}
              </Link>
            </div>
          )}
        </div>

        {/* Empty State */}
        {comparedProperties.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm max-w-2xl mx-auto space-y-4">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto text-green-700">
              <Layers className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {lang === 'bn' ? 'কোনো সম্পত্তি তুলনা তালিকায় নেই' : 'No properties selected for comparison'}
            </h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              {lang === 'bn'
                ? 'সম্পত্তি ব্রাউজ করার সময় কার্ডে থাকা "তুলনা" বাটনে ক্লিক করে সর্বোচ্চ ৪টি সম্পত্তি পাশাপাশি তুলনা করুন।'
                : 'Browse our property catalog and click the "Compare" button on any listing to compare up to 4 properties side-by-side.'}
            </p>
            <div className="pt-2">
              <Link
                to="/nirbash/properties"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-800 hover:bg-green-900 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-green-800/20"
              >
                <span>{lang === 'bn' ? 'সম্পত্তি ব্রাউজ করুন' : 'Browse Properties'}</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>
        ) : (
          /* Comparison Table */
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/70">
                    <th className="p-4 w-48 text-xs font-bold uppercase tracking-wider text-gray-500">
                      {lang === 'bn' ? 'বৈশিষ্ট্য' : 'Attributes'}
                    </th>
                    {comparedProperties.map(prop => {
                      const primaryImg = prop.images.find(img => img.isPrimary) || prop.images[0];
                      const title = lang === 'bn' ? prop.titleBn : prop.title;
                      const price = formatPrice(prop.price, lang);
                      return (
                        <th key={prop.id} className="p-4 w-72 min-w-[260px] align-top">
                          <div className="relative group">
                            <button
                              onClick={() => removeFromCompare(prop.id)}
                              className="absolute top-2 right-2 z-10 w-7 h-7 bg-white/90 hover:bg-red-50 hover:text-red-600 rounded-full flex items-center justify-center text-gray-500 shadow-sm transition-colors"
                              title="Remove"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                            <div className="h-40 rounded-xl overflow-hidden mb-3 bg-gray-100">
                              {primaryImg ? (
                                <img
                                  src={primaryImg.url}
                                  alt={title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-green-900 flex items-center justify-center text-white/40">
                                  <Building2 className="w-10 h-10" />
                                </div>
                              )}
                            </div>
                            <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-1">
                              {title}
                            </h3>
                            <div className="text-lg font-black text-green-800 mb-2">
                              {price}
                            </div>
                            <Link
                              to={`/nirbash/properties/${prop.id}`}
                              className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 bg-green-800 hover:bg-green-900 text-white rounded-lg text-xs font-semibold transition-colors"
                            >
                              <span>{lang === 'bn' ? 'বিস্তারিত দেখুন' : 'View Details'}</span>
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs">
                  {/* Category */}
                  <tr>
                    <td className="p-4 font-semibold text-gray-500 bg-gray-50/40">
                      {lang === 'bn' ? 'ধরন' : 'Category'}
                    </td>
                    {comparedProperties.map(prop => (
                      <td key={prop.id} className="p-4 font-semibold text-gray-800">
                        {getCategoryLabel(prop.category, lang)}
                      </td>
                    ))}
                  </tr>

                  {/* Location & District */}
                  <tr>
                    <td className="p-4 font-semibold text-gray-500 bg-gray-50/40">
                      {lang === 'bn' ? 'লোকেশন' : 'Location'}
                    </td>
                    {comparedProperties.map(prop => (
                      <td key={prop.id} className="p-4 text-gray-700">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-green-700 flex-shrink-0" />
                          <span>{lang === 'bn' ? prop.locationBn : prop.location}</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Land DNA Verification */}
                  <tr>
                    <td className="p-4 font-semibold text-gray-500 bg-gray-50/40">
                      {lang === 'bn' ? 'ল্যান্ড ডিএনএ যাচাই' : 'Land DNA Status'}
                    </td>
                    {comparedProperties.map(prop => {
                      const verif = getVerificationBadge(prop.verificationStatus, lang);
                      return (
                        <td key={prop.id} className="p-4">
                          <div className="space-y-1">
                            <span
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold"
                              style={{ background: verif.bg, color: verif.color }}
                            >
                              <ShieldCheck className="w-3.5 h-3.5" />
                              {verif.label}
                            </span>
                            {prop.dagNumber && (
                              <div className="text-[10px] text-gray-500 font-mono mt-0.5">
                                DAG #{prop.dagNumber} • {prop.mouzaName}
                              </div>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Area / Size */}
                  <tr>
                    <td className="p-4 font-semibold text-gray-500 bg-gray-50/40">
                      {lang === 'bn' ? 'আয়তন' : 'Area / Size'}
                    </td>
                    {comparedProperties.map(prop => (
                      <td key={prop.id} className="p-4 font-bold text-gray-900">
                        {getAreaLabel(prop.area, prop.areaUnit, lang)}
                      </td>
                    ))}
                  </tr>

                  {/* Bed & Bath */}
                  <tr>
                    <td className="p-4 font-semibold text-gray-500 bg-gray-50/40">
                      {lang === 'bn' ? 'বেডরুম ও বাথরুম' : 'Bedrooms & Baths'}
                    </td>
                    {comparedProperties.map(prop => (
                      <td key={prop.id} className="p-4 text-gray-700">
                        {prop.bedrooms ? (
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1 font-semibold">
                              <BedDouble className="w-3.5 h-3.5 text-gray-400" />
                              {prop.bedrooms} Bed
                            </span>
                            <span className="flex items-center gap-1 font-semibold">
                              <Bath className="w-3.5 h-3.5 text-gray-400" />
                              {prop.bathrooms} Bath
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">
                            {lang === 'bn' ? 'প্রযোজ্য নয় (প্লট)' : 'N/A (Plot)'}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Developer / Company */}
                  <tr>
                    <td className="p-4 font-semibold text-gray-500 bg-gray-50/40">
                      {lang === 'bn' ? 'কোম্পানি' : 'Developer'}
                    </td>
                    {comparedProperties.map(prop => {
                      const company = companies.find(c => c.id === prop.companyId);
                      return (
                        <td key={prop.id} className="p-4 text-gray-800">
                          {company ? (
                            <Link
                              to={`/nirbash/companies/${company.id}`}
                              className="font-bold text-green-800 hover:underline flex items-center gap-1.5"
                            >
                              <div
                                className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] text-white font-bold"
                                style={{ backgroundColor: company.logoColor }}
                              >
                                {company.logo}
                              </div>
                              <span>{lang === 'bn' ? company.nameBn : company.name}</span>
                            </Link>
                          ) : (
                            'Nirbash Partner'
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Completion Status */}
                  <tr>
                    <td className="p-4 font-semibold text-gray-500 bg-gray-50/40">
                      {lang === 'bn' ? 'অবস্থা' : 'Completion Status'}
                    </td>
                    {comparedProperties.map(prop => (
                      <td key={prop.id} className="p-4 text-gray-700">
                        <span className="font-semibold capitalize">
                          {prop.completionStatus.replace('_', ' ')}
                        </span>
                        {prop.estimatedCompletion && (
                          <div className="text-[10px] text-orange-600 mt-0.5">
                            Handover: {prop.estimatedCompletion}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Availability */}
                  <tr>
                    <td className="p-4 font-semibold text-gray-500 bg-gray-50/40">
                      {lang === 'bn' ? 'উপলব্ধতা' : 'Availability'}
                    </td>
                    {comparedProperties.map(prop => {
                      const avail = getAvailabilityBadge(prop.availabilityStatus, lang);
                      return (
                        <td key={prop.id} className="p-4">
                          <span
                            className="px-2.5 py-0.5 rounded-full text-[11px] font-bold"
                            style={{ background: avail.bg, color: avail.color }}
                          >
                            {avail.label}
                          </span>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Features Comparison Rows */}
                  {allFeatures.length > 0 && (
                    <tr className="bg-gray-100/60 font-bold text-gray-700">
                      <td colSpan={comparedProperties.length + 1} className="p-3 text-[11px] uppercase tracking-wider">
                        {lang === 'bn' ? 'সুবিধাসমূহ' : 'Amenities & Features Checklist'}
                      </td>
                    </tr>
                  )}

                  {allFeatures.map(feat => (
                    <tr key={feat}>
                      <td className="p-3 text-gray-600 bg-gray-50/40 font-medium">
                        {feat}
                      </td>
                      {comparedProperties.map(prop => {
                        const featuresList = lang === 'bn' ? prop.featuresBn : prop.features;
                        const hasFeat = featuresList.includes(feat);
                        return (
                          <td key={prop.id} className="p-3">
                            {hasFeat ? (
                              <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
                                <Check className="w-3.5 h-3.5" />
                              </span>
                            ) : (
                              <span className="text-gray-300">
                                <Minus className="w-4 h-4" />
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
