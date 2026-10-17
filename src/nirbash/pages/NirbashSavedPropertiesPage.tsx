import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, Trash2, Scale, ExternalLink } from 'lucide-react';
import { useNirbash } from '../context/NirbashContext';
import { useLanguage } from '../../context/LanguageContext';
import PropertyCard from '../components/PropertyCard';

export default function NirbashSavedPropertiesPage() {
  const { savedIds, properties, toggleSaved } = useNirbash();
  const { lang } = useLanguage();

  const savedProperties = properties.filter(p => savedIds.includes(p.id));

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div>
            <Link
              to="/nirbash/properties"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 hover:text-green-800 transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'সম্পত্তি তালিকায় ফিরুন' : 'Back to Properties'}</span>
            </Link>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500 fill-red-500" />
              <span>{lang === 'bn' ? 'পছন্দ তালিকাভুক্ত সম্পত্তি' : 'Saved Properties'}</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              {lang === 'bn'
                ? `আপনার পছন্দকৃত ${savedProperties.length}টি সম্পত্তি সংরক্ষিত আছে`
                : `${savedProperties.length} properties saved for your quick review`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/nirbash/compare"
              className="px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'তুলনা ড্যাশবোর্ড' : 'Compare Properties'}</span>
            </Link>
            <Link
              to="/nirbash/properties"
              className="px-4 py-2 bg-green-800 hover:bg-green-900 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              {lang === 'bn' ? 'আরো ব্রাউজ করুন' : 'Browse More'}
            </Link>
          </div>
        </div>

        {/* Content */}
        {savedProperties.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 bg-red-50 text-red-400 rounded-2xl flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {lang === 'bn' ? 'পছন্দ তালিকায় কোনো প্রপার্টি নেই' : 'No properties saved yet'}
            </h2>
            <p className="text-xs text-gray-500">
              {lang === 'bn'
                ? 'যেকোনো প্রপার্টি কার্ডে হার্ট আইকনে ক্লিক করে সহজেই সেভ করে রাখুন।'
                : 'Click the heart icon on any property card to save it here for later.'}
            </p>
            <div className="pt-2">
              <Link
                to="/nirbash/properties"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-800 hover:bg-green-900 text-white text-xs font-bold rounded-xl"
              >
                <span>{lang === 'bn' ? 'সম্পত্তি খুঁজুন' : 'Explore Properties'}</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
