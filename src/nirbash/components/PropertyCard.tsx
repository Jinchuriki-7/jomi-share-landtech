import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, BedDouble, Bath, Maximize2, Building2, ShieldCheck, Heart, Eye, Scale } from 'lucide-react';
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
  const { isSaved, toggleSaved, isCompared, toggleCompare, companies } = useNirbash();
  const [imgError, setImgError] = useState(false);

  const wishlisted = isSaved(property.id);
  const compared = isCompared(property.id);

  const company = companies.find(c => c.id === property.companyId) || getCompanyById(property.companyId);

  const title = lang === 'bn' ? property.titleBn : property.title;
  const location = lang === 'bn' ? property.locationBn : property.location;
  const price = formatPrice(property.price, lang);
  const area = getAreaLabel(property.area, property.areaUnit, lang);
  const catLabel = getCategoryLabel(property.category, lang);
  const verif = getVerificationBadge(property.verificationStatus, lang);
  const avail = getAvailabilityBadge(property.availabilityStatus, lang);
  const primaryImage = property.images.find(i => i.isPrimary) ?? property.images[0];

  // Category accent colors
  const catColorMap: Record<string, string> = {
    land_plot: 'bg-emerald-100 text-emerald-700',
    residential_flat: 'bg-blue-100 text-blue-700',
    commercial_property: 'bg-amber-100 text-amber-700',
    ready_to_move: 'bg-teal-100 text-teal-700',
    under_construction: 'bg-orange-100 text-orange-700',
  };

  return (
    <div className={clsx('group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col', className)}>
      {/* Image */}
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
            style={{ background: 'linear-gradient(135deg, #166534 0%, #14532d 100%)' }}
          >
            <Building2 className="w-16 h-16 text-white/30" />
          </div>
        )}

        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className={clsx('text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs', catColorMap[property.category] ?? 'bg-gray-100 text-gray-700')}>
            {catLabel}
          </span>
          {property.completionStatus === 'under_construction' && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-500 text-white shadow-xs">
              {lang === 'bn' ? 'নির্মাণাধীন' : 'Under Construction'}
            </span>
          )}
        </div>

        {/* Top Right Actions: Compare & Wishlist */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {/* Compare Button */}
          <button
            onClick={() => toggleCompare(property.id)}
            className={clsx(
              'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm',
              compared ? 'bg-green-700 text-white ring-2 ring-white' : 'bg-white/90 text-gray-600 hover:bg-green-50 hover:text-green-700'
            )}
            title={lang === 'bn' ? 'তুলনা করুন' : 'Compare'}
            aria-label="Compare"
          >
            <Scale className="w-4 h-4" />
          </button>

          {/* Wishlist */}
          <button
            onClick={() => toggleSaved(property.id)}
            className={clsx(
              'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm',
              wishlisted ? 'bg-red-500 text-white ring-2 ring-white' : 'bg-white/90 text-gray-500 hover:bg-red-50 hover:text-red-500'
            )}
            title={lang === 'bn' ? 'পছন্দতালিকায় যোগ করুন' : 'Add to wishlist'}
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4" fill={wishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Availability */}
        <div className="absolute bottom-3 left-3">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs"
            style={{ background: avail.bg, color: avail.color }}
          >
            {avail.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-4">
        {/* Price */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-xl font-bold text-green-800">{price}</span>
          {property.priceUnit === 'per_katha' && (
            <span className="text-xs text-gray-500">/{lang === 'bn' ? 'কাঠা' : 'katha'}</span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 leading-snug mb-2 line-clamp-2 text-sm">
          {title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-gray-500 mb-3">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-green-700" />
          <span className="text-xs truncate">{location}</span>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3 text-xs text-gray-600 mb-3 flex-wrap">
          <div className="flex items-center gap-1">
            <Maximize2 className="w-3.5 h-3.5 text-gray-400" />
            <span>{area}</span>
          </div>
          {property.bedrooms != null && (
            <div className="flex items-center gap-1">
              <BedDouble className="w-3.5 h-3.5 text-gray-400" />
              <span>{property.bedrooms} {lang === 'bn' ? 'বেড' : 'Bed'}</span>
            </div>
          )}
          {property.bathrooms != null && (
            <div className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-gray-400" />
              <span>{property.bathrooms} {lang === 'bn' ? 'বাথ' : 'Bath'}</span>
            </div>
          )}
        </div>

        {/* Verification badge */}
        <div className="flex items-center gap-1.5 mb-3">
          <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" style={{ color: verif.color }} />
          <span className="text-xs font-medium" style={{ color: verif.color }}>{verif.label}</span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-2" />

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-1">
          {/* Company */}
          {company && (
            <div className="flex items-center gap-2 min-w-0">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                style={{ backgroundColor: company.logoColor }}
              >
                {company.logo}
              </div>
              <span className="text-xs text-gray-500 truncate max-w-[100px]">
                {lang === 'bn' ? company.nameBn : company.name}
              </span>
            </div>
          )}

          {/* View count */}
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Eye className="w-3 h-3" />
            <span>{property.viewCount}</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          <button
            onClick={() => toggleCompare(property.id)}
            className={clsx(
              'px-3 py-2 text-xs font-semibold rounded-xl border transition-colors flex items-center justify-center gap-1',
              compared
                ? 'bg-green-50 border-green-300 text-green-800'
                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
            )}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{compared ? (lang === 'bn' ? 'তুলনায় আছে' : 'Added') : (lang === 'bn' ? 'তুলনা' : 'Compare')}</span>
          </button>

          <Link
            to={`/nirbash/properties/${property.id}`}
            className="text-center px-3 py-2 bg-green-800 hover:bg-green-900 text-white text-xs font-semibold rounded-xl transition-colors duration-200"
          >
            {lang === 'bn' ? 'বিস্তারিত দেখুন' : 'View Details'}
          </Link>
        </div>
      </div>
    </div>
  );
}
