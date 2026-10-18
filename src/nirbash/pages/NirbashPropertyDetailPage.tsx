import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin, BedDouble, Bath, Maximize2, Building2, ShieldCheck, ChevronLeft,
  Phone, Mail, Send, Calendar, CheckCircle2, AlertTriangle, Info, Heart,
  Eye, Home, Layers, ArrowRight, Scale,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useNirbash } from '../context/NirbashContext';
import PropertyCard from '../components/PropertyCard';
import {
  getSimilarProperties,
  formatPrice, getAreaLabel, getCategoryLabel,
  getVerificationBadge, getAvailabilityBadge,
} from '../data/nirbashData';
import clsx from 'clsx';

export default function NirbashPropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const { properties, companies, isSaved, toggleSaved, isCompared, toggleCompare, submitInquiry } = useNirbash();
  const [selectedImg, setSelectedImg] = useState(0);
  const [activeTab, setActiveTab] = useState<'details' | 'contact' | 'booking'>('details');
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [inquiryType, setInquiryType] = useState<'general' | 'booking'>('general');
  const [submitted, setSubmitted] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setSelectedImg(0);
    setImgError(false);
  }, [id]);

  const property = id ? properties.find(p => p.id === id) : undefined;
  const company = property ? companies.find(c => c.id === property.companyId) : undefined;
  const similar = property ? getSimilarProperties(property, 3) : [];

  const wishlisted = property ? isSaved(property.id) : false;
  const compared = property ? isCompared(property.id) : false;

  const t = {
    en: {
      back: 'Back to Properties',
      overview: 'Overview',
      details: 'Full Details',
      contact: 'Contact Company',
      booking: 'Booking Inquiry',
      price: 'Total Price',
      area: 'Area',
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms',
      floor: 'Floor',
      facing: 'Facing',
      completion: 'Completion',
      status: 'Availability',
      completionEst: 'Est. Completion',
      company: 'Listed by',
      features: 'Features & Amenities',
      dnaSection: 'Land DNA Information',
      dagNumber: 'DAG Number',
      mouza: 'Mouza',
      verifInfo: 'JOMI-SHARE Land DNA verification information is available for this plot. The data below is synthetic demo data — not real government records.',
      verifUnavail: 'Land DNA verification information is not available for this property type. Verification is applicable to land plots only.',
      verifPending: 'Land DNA verification is pending for this property.',
      similar: 'Similar Properties',
      nameLabel: 'Full Name',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      msgLabel: 'Message',
      msgPlaceholder: 'Tell us about your requirement…',
      send: 'Send Inquiry',
      bookingNote: 'Note: Submitting a booking inquiry does not confirm a reservation. The company will contact you to proceed.',
      submitSuccess: 'Your inquiry has been submitted successfully! The company will contact you shortly.',
      notFound: 'Property not found',
    },
    bn: {
      back: 'সম্পত্তির তালিকায় ফিরুন',
      overview: 'সংক্ষিপ্ত বিবরণ',
      details: 'সম্পূর্ণ বিবরণ',
      contact: 'কোম্পানিতে যোগাযোগ',
      booking: 'বুকিং অনুসন্ধান',
      price: 'মোট মূল্য',
      area: 'জমির পরিমাণ',
      bedrooms: 'বেডরুম',
      bathrooms: 'বাথরুম',
      floor: 'ফ্লোর',
      facing: 'অভিমুখ',
      completion: 'সমাপ্তির অবস্থা',
      status: 'উপলব্ধতা',
      completionEst: 'আনুমানিক সমাপ্তি',
      company: 'তালিকাভুক্তকারী',
      features: 'সুবিধা ও বৈশিষ্ট্য',
      dnaSection: 'জমির ডিএনএ তথ্য',
      dagNumber: 'দাগ নম্বর',
      mouza: 'মৌজা',
      verifInfo: 'এই প্লটের জন্য জমি-শেয়ার ল্যান্ড ডিএনএ যাচাই তথ্য উপলব্ধ। নিচের ডেটা কৃত্রিম ডেমো — আসল সরকারি রেকর্ড নয়।',
      verifUnavail: 'এই সম্পত্তির ধরনের জন্য ল্যান্ড ডিএনএ যাচাই তথ্য উপলব্ধ নয়। শুধুমাত্র জমির প্লটের ক্ষেত্রে প্রযোজ্য।',
      verifPending: 'এই সম্পত্তির ল্যান্ড ডিএনএ যাচাই প্রক্রিয়াধীন।',
      similar: 'অনুরূপ সম্পত্তি',
      nameLabel: 'পুরো নাম',
      emailLabel: 'ইমেইল',
      phoneLabel: 'ফোন',
      msgLabel: 'বার্তা',
      msgPlaceholder: 'আপনার প্রয়োজনীয়তা সম্পর্কে জানান…',
      send: 'অনুসন্ধান পাঠান',
      bookingNote: 'দ্রষ্টব্য: বুকিং অনুসন্ধান পাঠানো মানে রিজার্ভেশন নিশ্চিত নয়। কোম্পানি আপনার সাথে যোগাযোগ করবে।',
      submitSuccess: 'আপনার অনুসন্ধান সফলভাবে পাঠানো হয়েছে! কোম্পানি শীঘ্রই যোগাযোগ করবে।',
      notFound: 'সম্পত্তি পাওয়া যায়নি',
    },
  }[lang];

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-700 mb-2">{t.notFound}</h2>
          <Link to="/nirbash/properties" className="text-green-700 hover:underline text-sm">
            {t.back}
          </Link>
        </div>
      </div>
    );
  }

  const title = lang === 'bn' ? property.titleBn : property.title;
  const description = lang === 'bn' ? property.descriptionBn : property.description;
  const location = lang === 'bn' ? property.locationBn : property.location;
  const price = formatPrice(property.price, lang);
  const area = getAreaLabel(property.area, property.areaUnit, lang);
  const catLabel = getCategoryLabel(property.category, lang);
  const verif = getVerificationBadge(property.verificationStatus, lang);
  const avail = getAvailabilityBadge(property.availabilityStatus, lang);
  const features = lang === 'bn' ? property.featuresBn : property.features;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (property) {
      submitInquiry({
        propertyId: property.id,
        propertyTitle: property.title,
        companyId: property.companyId,
        name: contactForm.name,
        email: contactForm.email || 'buyer@example.com',
        phone: contactForm.phone,
        message: contactForm.message || (activeTab === 'booking' ? 'Requesting site visit/booking' : 'Property inquiry'),
        inquiryType: activeTab === 'booking' ? 'booking' : 'general',
      });
    }
    setSubmitted(true);
  };

  const tabs = [
    { key: 'details' as const, label: t.details },
    { key: 'contact' as const, label: t.contact },
    { key: 'booking' as const, label: t.booking },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-green-900 text-white py-3 px-4">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm text-green-300">
          <Link to="/nirbash" className="hover:text-white">NIRBASH</Link>
          <span>/</span>
          <Link to="/nirbash/properties" className="hover:text-white">{lang === 'bn' ? 'সম্পত্তি' : 'Properties'}</Link>
          <span>/</span>
          <span className="text-white truncate max-w-xs">{title}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-green-800 hover:text-green-900 mb-5 font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          {t.back}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Images + Details */}
          <div className="lg:col-span-2 space-y-5">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="relative h-72 sm:h-96 bg-gray-100">
                {property.images[selectedImg] && !imgError ? (
                  <img
                    src={property.images[selectedImg].url}
                    alt={property.images[selectedImg].alt}
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-800 to-green-950">
                    <Building2 className="w-24 h-24 text-white/20" />
                  </div>
                )}
                {/* Overlay action buttons: Compare & Wishlist */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button
                    onClick={() => toggleCompare(property.id)}
                    className={clsx(
                      'px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all',
                      compared ? 'bg-green-700 text-white' : 'bg-white/95 text-gray-700 hover:bg-green-50'
                    )}
                  >
                    <Scale className="w-4 h-4" />
                    <span>{compared ? (lang === 'bn' ? 'তুলনায় আছে' : 'In Compare') : (lang === 'bn' ? 'তুলনা করুন' : 'Compare')}</span>
                  </button>
                  <button
                    onClick={() => toggleSaved(property.id)}
                    className={clsx(
                      'w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all',
                      wishlisted ? 'bg-red-500 text-white' : 'bg-white/95 text-gray-600 hover:bg-red-50 hover:text-red-500'
                    )}
                  >
                    <Heart className="w-5 h-5" fill={wishlisted ? 'currentColor' : 'none'} />
                  </button>
                </div>

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-green-800 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    {catLabel}
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              {property.images.length > 1 && (
                <div className="flex gap-2 p-3">
                  {property.images.map((img, i) => (
                    <button
                      key={img.id}
                      onClick={() => { setSelectedImg(i); setImgError(false); }}
                      className={clsx(
                        'w-16 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0',
                        selectedImg === i ? 'border-green-700' : 'border-transparent opacity-60 hover:opacity-100'
                      )}
                    >
                      <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex border-b border-gray-100">
                {tabs.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={clsx(
                      'flex-1 px-4 py-3.5 text-sm font-semibold transition-all border-b-2',
                      activeTab === tab.key
                        ? 'border-green-700 text-green-800 bg-green-50'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-5">
                {activeTab === 'details' && (
                  <div className="space-y-5">
                    {/* Description */}
                    <p className="text-gray-700 text-sm leading-relaxed">{description}</p>

                    {/* Specs grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {[
                        { label: t.price, value: price, icon: <span className="text-green-700 font-bold">৳</span> },
                        { label: t.area, value: area, icon: <Maximize2 className="w-4 h-4 text-green-700" /> },
                        property.bedrooms != null && { label: t.bedrooms, value: String(property.bedrooms), icon: <BedDouble className="w-4 h-4 text-green-700" /> },
                        property.bathrooms != null && { label: t.bathrooms, value: String(property.bathrooms), icon: <Bath className="w-4 h-4 text-green-700" /> },
                        property.floorNumber != null && { label: t.floor, value: `${property.floorNumber}/${property.totalFloors}`, icon: <Layers className="w-4 h-4 text-green-700" /> },
                        property.facing && { label: t.facing, value: property.facing, icon: <Home className="w-4 h-4 text-green-700" /> },
                      ].filter(Boolean).map((item: any, i: number) => (
                        <div key={i} className="bg-gray-50 rounded-xl p-3">
                          <div className="flex items-center gap-1.5 mb-1">{item.icon}</div>
                          <div className="text-xs text-gray-500 mb-0.5">{item.label}</div>
                          <div className="text-sm font-semibold text-gray-900">{item.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Availability & Completion */}
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: avail.bg }}>
                        <CheckCircle2 className="w-4 h-4" style={{ color: avail.color }} />
                        <span className="text-sm font-semibold" style={{ color: avail.color }}>{avail.label}</span>
                      </div>
                      {property.completionStatus === 'under_construction' && property.estimatedCompletion && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-orange-50 rounded-xl">
                          <Calendar className="w-4 h-4 text-orange-600" />
                          <span className="text-sm font-semibold text-orange-700">
                            {t.completionEst}: {property.estimatedCompletion}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 text-sm">{t.features}</h3>
                      <div className="flex flex-wrap gap-2">
                        {features.map((f, i) => (
                          <span key={i} className="text-xs bg-green-50 text-green-800 px-3 py-1.5 rounded-full font-medium border border-green-100">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Land DNA Section */}
                    <div className="border border-dashed border-green-200 rounded-xl p-4 bg-green-50">
                      <div className="flex items-center gap-2 mb-3">
                        <ShieldCheck className="w-5 h-5 text-green-700" />
                        <h3 className="font-semibold text-green-900 text-sm">{t.dnaSection}</h3>
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full ml-auto"
                          style={{ background: verif.bg, color: verif.color }}
                        >
                          {verif.label}
                        </span>
                      </div>

                      {property.verificationStatus === 'available' && property.dagNumber ? (
                        <div className="space-y-2 text-sm">
                          <p className="text-green-800 text-xs mb-3">{t.verifInfo}</p>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white rounded-lg p-2.5">
                              <div className="text-xs text-gray-500">{t.dagNumber}</div>
                              <div className="font-mono font-semibold text-gray-800 text-xs mt-0.5">{property.dagNumber}</div>
                            </div>
                            {property.mouzaName && (
                              <div className="bg-white rounded-lg p-2.5">
                                <div className="text-xs text-gray-500">{t.mouza}</div>
                                <div className="font-semibold text-gray-800 text-xs mt-0.5">{property.mouzaName}</div>
                              </div>
                            )}
                          </div>
                          <Link
                            to="/land-dna"
                            className="inline-flex items-center gap-1.5 mt-2 text-green-700 text-xs font-semibold hover:underline"
                          >
                            {lang === 'bn' ? 'জমি-শেয়ারে পূর্ণ ডিএনএ দেখুন' : 'View full DNA in JOMI-SHARE'}
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      ) : property.verificationStatus === 'pending' ? (
                        <p className="text-xs text-amber-700">{t.verifPending}</p>
                      ) : (
                        <p className="text-xs text-gray-600">{t.verifUnavail}</p>
                      )}
                    </div>
                  </div>
                )}

                {(activeTab === 'contact' || activeTab === 'booking') && (
                  <div>
                    {activeTab === 'booking' && (
                      <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-700">{t.bookingNote}</p>
                      </div>
                    )}

                    {submitted ? (
                      <div className="text-center py-8">
                        <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
                        <p className="text-gray-700 font-semibold">{t.submitSuccess}</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">{t.nameLabel} *</label>
                            <input
                              required
                              type="text"
                              value={contactForm.name}
                              onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))}
                              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">{t.phoneLabel} *</label>
                            <input
                              required
                              type="tel"
                              value={contactForm.phone}
                              onChange={e => setContactForm(f => ({ ...f, phone: e.target.value }))}
                              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">{t.emailLabel}</label>
                          <input
                            type="email"
                            value={contactForm.email}
                            onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))}
                            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">{t.msgLabel}</label>
                          <textarea
                            rows={4}
                            value={contactForm.message}
                            onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                            placeholder={t.msgPlaceholder}
                            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full flex items-center justify-center gap-2 py-3 bg-green-800 hover:bg-green-900 text-white font-semibold rounded-xl transition-colors"
                        >
                          <Send className="w-4 h-4" />
                          {t.send}
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Price Card + Company */}
          <div className="space-y-4">
            {/* Price Summary Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-20">
              <div className="mb-4">
                <div className="text-3xl font-bold text-green-800">{price}</div>
                <div className="text-sm text-gray-500 mt-0.5">{title}</div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-green-700 flex-shrink-0" />
                <span className="text-sm text-gray-600">{location}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
                <div>
                  <div className="text-gray-500 text-xs">{t.area}</div>
                  <div className="font-semibold text-gray-900">{area}</div>
                </div>
                {property.bedrooms != null && (
                  <div>
                    <div className="text-gray-500 text-xs">{t.bedrooms}</div>
                    <div className="font-semibold text-gray-900">{property.bedrooms}</div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setActiveTab('contact')}
                className="w-full py-3 bg-green-800 hover:bg-green-900 text-white font-semibold rounded-xl text-sm transition-colors mb-2"
              >
                {t.contact}
              </button>
              <button
                onClick={() => setActiveTab('booking')}
                className="w-full py-3 border-2 border-green-800 text-green-800 hover:bg-green-50 font-semibold rounded-xl text-sm transition-colors"
              >
                {t.booking}
              </button>
            </div>

            {/* Company Card */}
            {company && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">{t.company}</div>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                    style={{ backgroundColor: company.logoColor }}
                  >
                    {company.logo}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">
                      {lang === 'bn' ? company.nameBn : company.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {lang === 'bn' ? 'প্রতিষ্ঠিত' : 'Est.'} {company.established}
                    </div>
                  </div>
                </div>

                {company.verificationStatus === 'verified' && (
                  <div className="flex items-center gap-1.5 mb-3 text-xs text-green-700 bg-green-50 px-2.5 py-1.5 rounded-lg">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span className="font-semibold">{lang === 'bn' ? 'যাচাইকৃত কোম্পানি' : 'Verified Company'}</span>
                  </div>
                )}

                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span>{company.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span>{company.email}</span>
                  </div>
                </div>

                <Link
                  to={`/nirbash/companies/${company.id}`}
                  className="mt-4 block text-center text-xs font-semibold text-green-700 hover:text-green-900 hover:underline"
                >
                  {lang === 'bn' ? 'কোম্পানির সব সম্পত্তি দেখুন →' : 'View all company listings →'}
                </Link>
              </div>
            )}

            {/* View count */}
            <div className="flex items-center gap-2 text-xs text-gray-400 px-1">
              <Eye className="w-3.5 h-3.5" />
              <span>{property.viewCount} {lang === 'bn' ? 'বার দেখা হয়েছে' : 'views'}</span>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similar.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-900">{t.similar}</h2>
              <Link to="/nirbash/properties" className="text-sm text-green-700 hover:underline font-medium">
                {lang === 'bn' ? 'সব দেখুন →' : 'View all →'}
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {similar.map(p => <PropertyCard key={p.id} property={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
