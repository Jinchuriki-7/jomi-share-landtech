import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin, BedDouble, Bath, Maximize2, Building2, ShieldCheck, Heart,
  Eye, Scale, Lock, Unlock, Phone, Calendar, MessageCircle
} from 'lucide-react';
import type { NirbashProperty } from '../data/nirbashData';
import {
  formatPrice, getAreaLabel, getCategoryLabel,
  getVerificationBadge, getAvailabilityBadge, getCompanyById,
} from '../data/nirbashData';
import { useLanguage } from '../../context/LanguageContext';
import { useNirbash } from '../context/NirbashContext';
import clsx from 'clsx';

interface PropertyCardProps {
  property: NirbashProperty;
  className?: string;
}

export default function PropertyCard({ property, className }: PropertyCardProps) {
  const { lang } = useLanguage();
  const {
    isSaved, toggleSaved, isCompared, toggleCompare, companies,
    isPriceVisible, unlockPrice, setShowAuthModal, isLoggedIn
  } = useNirbash();
  const [imgError, setImgError] = useState(false);

  const wishlisted = isSaved(property.id);
  const compared = isCompared(property.id);
  const priceVisible = isPriceVisible(property.id);

  const company = companies.find(c => c.id === property.companyId) || getCompanyById(property.companyId);

  const title = lang === 'bn' ? property.titleBn : property.title;
  const location = lang === 'bn' ? property.locationBn : property.location;
  const formattedPrice = formatPrice(property.price, lang);
  const area = getAreaLabel(property.area, property.areaUnit, lang);
  const catLabel = getCategoryLabel(property.category, lang);
  const verif = getVerificationBadge(property.verificationStatus, lang);
  const avail = getAvailabilityBadge(property.availabilityStatus, lang);
  const primaryImage = property.images.find(i => i.isPrimary) ?? property.images[0];

  const catColorMap: Record<string, string> = {
    land_plot: 'bg-emerald-800 text-white',
    residential_flat: 'bg-blue-800 text-white',
    commercial_property: 'bg-amber-700 text-white',
    ready_to_move: 'bg-teal-800 text-white',
    under_construction: 'bg-orange-600 text-white',
  };

  const handlePriceClick = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
    }
    unlockPrice(property.id);
  };

  return (
    <div className={clsx('group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col', className)}>
      {/* Image Container */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        {primaryImage && !imgError ? (
          <img
            src={primaryImage.url}
            alt={primaryImage.alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #13382c 0%, #0d281f 100%)' }}
          >
            <Building2 className="w-16 h-16 text-white/30" />
          </div>
        )}

        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className={clsx('text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md tracking-wide', catColorMap[property.category] ?? 'bg-gray-800 text-white')}>
            {catLabel}
          </span>
          {property.completionStatus === 'under_construction' && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500 text-white shadow-md">
              {lang === 'bn' ? 'নির্মাণাধীন' : 'Under Construction'}
            </span>
          )}
        </div>

        {/* Top Right: Compare & Wishlist */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={() => toggleCompare(property.id)}
            className={clsx(
              'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-md',
              compared ? 'bg-green-800 text-white ring-2 ring-white' : 'bg-white/95 text-gray-700 hover:bg-green-50 hover:text-green-800'
            )}
            title={lang === 'bn' ? 'তুলনা করুন' : 'Compare'}
          >
            <Scale className="w-4 h-4" />
          </button>

          <button
            onClick={() => toggleSaved(property.id)}
            className={clsx(
              'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-md',
              wishlisted ? 'bg-red-500 text-white ring-2 ring-white' : 'bg-white/95 text-gray-500 hover:bg-red-50 hover:text-red-500'
            )}
            title={lang === 'bn' ? 'পছন্দতালিকায় যোগ করুন' : 'Add to wishlist'}
          >
            <Heart className="w-4 h-4" fill={wishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Bottom Tag on Image */}
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5">
          <span
            className="text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md"
            style={{ background: avail.bg, color: avail.color }}
          >
            {avail.label}
          </span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-xs flex items-center gap-1">
            <Calendar className="w-3 h-3 text-green-300" />
            <span>{property.createdAt}</span>
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex-1 flex flex-col p-4">
        {/* Title */}
        <Link to={`/nirbash/properties/${property.id}`}>
          <h3 className="font-bold text-gray-900 leading-snug line-clamp-2 text-sm hover:text-green-800 transition-colors mb-2">
            {title}
          </h3>
        </Link>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-gray-500 mb-2.5">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-green-700" />
          <span className="text-xs truncate">{location}</span>
        </div>

        {/* Size & Specifications */}
        <div className="flex items-center gap-3 text-xs text-gray-700 mb-3 flex-wrap bg-gray-50 p-2 rounded-xl">
          <div className="flex items-center gap-1 font-bold text-gray-900">
            <Maximize2 className="w-3.5 h-3.5 text-green-700" />
            <span>{area}</span>
          </div>
          {property.bedrooms != null && (
            <div className="flex items-center gap-1 text-gray-600">
              <BedDouble className="w-3.5 h-3.5 text-gray-400" />
              <span>{property.bedrooms} {lang === 'bn' ? 'বেড' : 'Bed'}</span>
            </div>
          )}
          {property.bathrooms != null && (
            <div className="flex items-center gap-1 text-gray-600">
              <Bath className="w-3.5 h-3.5 text-gray-400" />
              <span>{property.bathrooms} {lang === 'bn' ? 'বাথ' : 'Bath'}</span>
            </div>
          )}
        </div>

        {/* Land DNA Verification Badge */}
        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" style={{ color: verif.color }} />
            <span className="text-[11px] font-bold" style={{ color: verif.color }}>{verif.label}</span>
          </div>
          {property.dagNumber && (
            <span className="text-[10px] font-mono text-gray-400">
              DAG: {property.dagNumber.split(' ')[0]}
            </span>
          )}
        </div>

        {/* Jomi Bazar Price Gate / Price Display */}
        <div className="mb-3">
          {priceVisible ? (
            <div className="flex items-baseline justify-between bg-green-50/70 p-2 rounded-xl border border-green-200/60">
              <div>
                <span className="text-xs text-gray-500 block leading-none mb-1">
                  {lang === 'bn' ? 'প্রপার্টি মূল্য' : 'Property Price'}
                </span>
                <span className="text-lg font-black text-green-900">{formattedPrice}</span>
              </div>
              <span className="text-[10px] text-green-700 font-semibold flex items-center gap-1">
                <Unlock className="w-3 h-3" />
                {lang === 'bn' ? 'দৃশ্যমান' : 'Unlocked'}
              </span>
            </div>
          ) : (
            <button
              onClick={handlePriceClick}
              className="w-full py-2.5 px-3 bg-gradient-to-r from-amber-500/10 via-amber-500/15 to-amber-500/10 hover:from-amber-500/20 hover:to-amber-500/20 text-amber-950 border border-amber-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <Lock className="w-3.5 h-3.5 text-amber-700" />
              <span>{lang === 'bn' ? 'দাম দেখতে Login করুন' : 'Login to View Price'}</span>
            </button>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-1" />

        {/* Developer / Agency Footer */}
        <div className="flex items-center justify-between mt-auto pt-2">
          {company && (
            <Link
              to={`/nirbash/companies/${company.id}`}
              className="flex items-center gap-1.5 min-w-0 hover:text-green-800 transition-colors"
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
                style={{ backgroundColor: company.logoColor }}
              >
                {company.logo}
              </div>
              <span className="text-xs text-gray-600 truncate max-w-[110px] font-medium">
                {lang === 'bn' ? company.nameBn : company.name}
              </span>
            </Link>
          )}

          {/* Quick Contact Icons */}
          <div className="flex items-center gap-1">
            <a
              href="tel:+8801822456789"
              className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-green-100 hover:text-green-800 text-gray-600 flex items-center justify-center transition-colors"
              title="Call Seller / Agent"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://wa.me/8801822456789"
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 flex items-center justify-center transition-colors"
              title="WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Detail Link CTA */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          <button
            onClick={() => toggleCompare(property.id)}
            className={clsx(
              'px-2.5 py-2 text-xs font-semibold rounded-xl border transition-colors flex items-center justify-center gap-1',
              compared
                ? 'bg-green-50 border-green-300 text-green-800'
                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
            )}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{compared ? (lang === 'bn' ? 'তুলনায় আছে' : 'Added') : (lang === 'bn' ? 'তুলনা' : 'Compare')}</span>
          </button>

          <Link
            to={`/nirbash/properties/${property.id}`}
            className="text-center px-3 py-2 bg-green-900 hover:bg-green-800 text-white text-xs font-bold rounded-xl transition-colors duration-200 shadow-sm"
          >
            {lang === 'bn' ? 'বিস্তারিত দেখুন' : 'View Details'}
          </Link>
        </div>
      </div>
    </div>
  );
}
