import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2, Plus, Sliders, Eye, MessageSquare, CheckCircle,
  Clock, AlertTriangle, Trash2, Edit3, ExternalLink, ShieldCheck,
  MapPin, CheckCircle2, ChevronRight, Filter, Search, X, Sparkles, BedDouble, Bath, Maximize2
} from 'lucide-react';
import { useNirbash } from '../context/NirbashContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  formatPrice, getAreaLabel, getCategoryLabel,
  getVerificationBadge, getAvailabilityBadge,
  DISTRICTS_BD, type PropertyCategory, type NirbashProperty
} from '../data/nirbashData';
import clsx from 'clsx';

export default function NirbashCompanyDashboardPage() {
  const {
    properties, companies, activeCompanyId, setActiveCompanyId,
    addProperty, updateProperty, deleteProperty,
    inquiries, updateInquiryStatus, updateCompany
  } = useNirbash();
  const { lang } = useLanguage();

  const activeCompany = companies.find(c => c.id === activeCompanyId) || companies[0];
  const companyProperties = properties.filter(p => p.companyId === activeCompany?.id);
  const companyInquiries = inquiries.filter(inq => inq.companyId === activeCompany?.id);

  const [activeTab, setActiveTab] = useState<'properties' | 'inquiries' | 'profile'>('properties');
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Add Property Form State
  const [newProp, setNewProp] = useState({
    title: '',
    titleBn: '',
    description: '',
    descriptionBn: '',
    category: 'residential_flat' as PropertyCategory,
    location: '',
    locationBn: '',
    district: 'Dhaka',
    price: 8500000,
    priceUnit: 'total',
    area: 1450,
    areaUnit: 'sqft' as 'sqft' | 'katha' | 'decimal' | 'bigha',
    bedrooms: 3,
    bathrooms: 3,
    floorNumber: 5,
    totalFloors: 10,
    facing: 'South',
    completionStatus: 'ready' as 'ready' | 'under_construction' | 'not_applicable',
    estimatedCompletion: '',
    dagNumber: '',
    mouzaName: '',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80',
    features: ['Lift', 'Generator', '24/7 Security', 'Car Parking'],
  });

  const handleCreateProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProp.title.trim() || !newProp.location.trim() || !activeCompany) {
      alert(lang === 'bn' ? 'অনুগ্রহ করে আবশ্যক তথ্য পূরণ করুন।' : 'Please enter title and location.');
      return;
    }

    addProperty({
      title: newProp.title,
      titleBn: newProp.titleBn || newProp.title,
      description: newProp.description || 'Modern property developed with high quality materials.',
      descriptionBn: newProp.descriptionBn || newProp.description || 'উন্নত মানের নির্মাণ উপকরণে তৈরি আধুনিক প্রপার্টি।',
      category: newProp.category,
      location: newProp.location,
      locationBn: newProp.locationBn || newProp.location,
      district: newProp.district,
      districtBn: newProp.district,
      price: Number(newProp.price),
      priceUnit: newProp.priceUnit,
      area: Number(newProp.area),
      areaUnit: newProp.areaUnit,
      bedrooms: newProp.category === 'land_plot' ? undefined : Number(newProp.bedrooms),
      bathrooms: newProp.category === 'land_plot' ? undefined : Number(newProp.bathrooms),
      floorNumber: newProp.category === 'land_plot' ? undefined : Number(newProp.floorNumber),
      totalFloors: newProp.category === 'land_plot' ? undefined : Number(newProp.totalFloors),
      facing: newProp.category === 'land_plot' ? undefined : newProp.facing,
      completionStatus: newProp.completionStatus,
      estimatedCompletion: newProp.completionStatus === 'under_construction' ? newProp.estimatedCompletion : undefined,
      availabilityStatus: 'available',
      listingStatus: 'published',
      companyId: activeCompany.id,
      images: [
        {
          id: `img-${Date.now()}`,
          url: newProp.imageUrl,
          alt: newProp.title,
          isPrimary: true,
        },
      ],
      features: newProp.features,
      featuresBn: newProp.features,
      verificationStatus: newProp.dagNumber ? 'available' : 'unavailable',
      dagNumber: newProp.dagNumber || undefined,
      mouzaName: newProp.mouzaName || undefined,
      isFeatured: false,
    });

    setShowAddModal(false);
  };

  // Filter listings
  const filteredProperties = companyProperties.filter(p => {
    if (filterStatus !== 'all' && p.listingStatus !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
    }
    return true;
  });

  const totalViews = companyProperties.reduce((acc, p) => acc + p.viewCount, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header & Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-sm"
              style={{ backgroundColor: activeCompany?.logoColor || '#166534' }}
            >
              {activeCompany?.logo || 'CO'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-gray-900">
                  {lang === 'bn' ? activeCompany?.nameBn : activeCompany?.name}
                </h1>
                <span className={clsx(
                  'text-[10px] font-bold px-2 py-0.5 rounded-full uppercase',
                  activeCompany?.verificationStatus === 'verified'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-amber-100 text-amber-800'
                )}>
                  {activeCompany?.verificationStatus === 'verified'
                    ? (lang === 'bn' ? 'যাচাইকৃত পার্টনার' : 'Verified Partner')
                    : (lang === 'bn' ? 'নিবন্ধিত' : 'Registered')}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {lang === 'bn' ? 'কোম্পানি ড্যাশবোর্ড ও লিস্টিং ব্যবস্থাপনা' : 'Company Dashboard & Listing Manager'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Active Company Switcher */}
            <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-xl text-xs">
              <span className="text-gray-500 font-medium">
                {lang === 'bn' ? 'কোম্পানি পরিবর্তন:' : 'Switch:'}
              </span>
              <select
                value={activeCompany?.id}
                onChange={e => setActiveCompanyId(e.target.value)}
                className="bg-transparent font-bold text-gray-800 focus:outline-none cursor-pointer"
              >
                {companies.map(c => (
                  <option key={c.id} value={c.id}>
                    {lang === 'bn' ? c.nameBn : c.name}
                  </option>
                ))}
              </select>
            </div>

            <Link
              to="/nirbash/register-company"
              className="px-3 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-semibold transition-colors"
            >
              {lang === 'bn' ? '+ নতুন কোম্পানি নিবন্ধন' : '+ Register New Company'}
            </Link>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-green-800 hover:bg-green-900 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'bn' ? 'নতুন প্রপার্টি যোগ করুন' : 'Add Property'}</span>
            </button>
          </div>
        </div>

        {/* Analytics Statistics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-xs text-gray-500 font-medium">
              {lang === 'bn' ? 'মোট প্রপার্টি' : 'Total Listings'}
            </div>
            <div className="text-2xl font-black text-gray-900 mt-1">
              {companyProperties.length}
            </div>
            <div className="text-[11px] text-green-700 font-semibold mt-1">
              {companyProperties.filter(p => p.listingStatus === 'published').length} {lang === 'bn' ? 'সক্রিয়' : 'Active'}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-xs text-gray-500 font-medium">
              {lang === 'bn' ? 'মোট ভিউয়ার' : 'Total Views'}
            </div>
            <div className="text-2xl font-black text-gray-900 mt-1">
              {totalViews}
            </div>
            <div className="text-[11px] text-gray-400 mt-1">
              {lang === 'bn' ? 'সকল লিস্টিং জুড়ে' : 'Across all listings'}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-xs text-gray-500 font-medium">
              {lang === 'bn' ? 'প্রাপ্ত অনুসন্ধান' : 'Customer Inquiries'}
            </div>
            <div className="text-2xl font-black text-gray-900 mt-1">
              {companyInquiries.length}
            </div>
            <div className="text-[11px] text-orange-600 font-semibold mt-1">
              {companyInquiries.filter(i => i.status === 'pending').length} {lang === 'bn' ? 'অপেক্ষমাণ' : 'Pending'}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-xs text-gray-500 font-medium">
              {lang === 'bn' ? 'বিক্রিত প্রপার্টি' : 'Properties Sold'}
            </div>
            <div className="text-2xl font-black text-gray-900 mt-1">
              {companyProperties.filter(p => p.availabilityStatus === 'sold' || p.listingStatus === 'sold').length}
            </div>
            <div className="text-[11px] text-blue-600 font-semibold mt-1">
              {lang === 'bn' ? 'সফল চুক্তি' : 'Completed Deals'}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 gap-6 text-sm font-semibold text-gray-500">
          <button
            onClick={() => setActiveTab('properties')}
            className={clsx(
              'pb-3 border-b-2 transition-colors flex items-center gap-2',
              activeTab === 'properties' ? 'border-green-800 text-green-900' : 'border-transparent hover:text-gray-900'
            )}
          >
            <Building2 className="w-4 h-4" />
            <span>{lang === 'bn' ? 'প্রপার্টি তালিকা' : 'My Properties'} ({companyProperties.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={clsx(
              'pb-3 border-b-2 transition-colors flex items-center gap-2',
              activeTab === 'inquiries' ? 'border-green-800 text-green-900' : 'border-transparent hover:text-gray-900'
            )}
          >
            <MessageSquare className="w-4 h-4" />
            <span>{lang === 'bn' ? 'ক্রেতার বার্তা ও বুকিং' : 'Inquiries & Bookings'} ({companyInquiries.length})</span>
            {companyInquiries.filter(i => i.status === 'pending').length > 0 && (
              <span className="w-2 h-2 rounded-full bg-orange-500" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={clsx(
              'pb-3 border-b-2 transition-colors flex items-center gap-2',
              activeTab === 'profile' ? 'border-green-800 text-green-900' : 'border-transparent hover:text-gray-900'
            )}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{lang === 'bn' ? 'কোম্পানি প্রোফাইল ও লাইসেন্স' : 'Company Profile & Audit'}</span>
          </button>
        </div>

        {/* TAB 1: PROPERTIES */}
        {activeTab === 'properties' && (
          <div className="space-y-4">
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={lang === 'bn' ? 'প্রপার্টি সার্চ করুন...' : 'Search listings...'}
                  className="text-xs focus:outline-none w-full sm:w-64"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <Filter className="w-3.5 h-3.5 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 font-medium text-gray-700"
                >
                  <option value="all">{lang === 'bn' ? 'সব স্ট্যাটাস' : 'All Statuses'}</option>
                  <option value="published">{lang === 'bn' ? 'প্রকাশিত' : 'Published'}</option>
                  <option value="draft">{lang === 'bn' ? 'ড্রাফট' : 'Draft'}</option>
                  <option value="sold">{lang === 'bn' ? 'বিক্রিত' : 'Sold'}</option>
                  <option value="unpublished">{lang === 'bn' ? 'অপ্রকাশিত' : 'Unpublished'}</option>
                </select>
              </div>
            </div>

            {/* Properties Table / Cards */}
            {filteredProperties.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-500">
                <p className="text-sm font-semibold">{lang === 'bn' ? 'কোনো প্রপার্টি পাওয়া যায়নি।' : 'No properties found.'}</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="mt-3 px-4 py-2 bg-green-800 text-white rounded-xl text-xs font-bold"
                >
                  {lang === 'bn' ? 'নতুন প্রপার্টি তৈরি করুন' : 'Create First Property'}
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-500 uppercase tracking-wider font-semibold">
                        <th className="p-3.5">{lang === 'bn' ? 'প্রপার্টি' : 'Property'}</th>
                        <th className="p-3.5">{lang === 'bn' ? 'ক্যাটাগরি' : 'Category'}</th>
                        <th className="p-3.5">{lang === 'bn' ? 'মূল্য' : 'Price'}</th>
                        <th className="p-3.5">{lang === 'bn' ? 'ডিএনএ অবস্থা' : 'Land DNA'}</th>
                        <th className="p-3.5">{lang === 'bn' ? 'স্ট্যাটাস' : 'Listing Status'}</th>
                        <th className="p-3.5 text-right">{lang === 'bn' ? 'অ্যাকশন' : 'Actions'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredProperties.map(prop => {
                        const primaryImg = prop.images.find(img => img.isPrimary) || prop.images[0];
                        const verif = getVerificationBadge(prop.verificationStatus, lang);
                        return (
                          <tr key={prop.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="p-3.5">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                  {primaryImg ? (
                                    <img src={primaryImg.url} alt={prop.title} className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full bg-green-900 flex items-center justify-center text-white text-[10px]">P</div>
                                  )}
                                </div>
                                <div>
                                  <Link
                                    to={`/nirbash/properties/${prop.id}`}
                                    className="font-bold text-gray-900 hover:text-green-800 line-clamp-1"
                                  >
                                    {lang === 'bn' ? prop.titleBn : prop.title}
                                  </Link>
                                  <div className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                                    <MapPin className="w-3 h-3 text-green-700" />
                                    <span>{lang === 'bn' ? prop.locationBn : prop.location}</span>
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="p-3.5 text-gray-700 font-medium">
                              {getCategoryLabel(prop.category, lang)}
                            </td>

                            <td className="p-3.5 font-bold text-green-800">
                              {formatPrice(prop.price, lang)}
                            </td>

                            <td className="p-3.5">
                              <span
                                className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                                style={{ background: verif.bg, color: verif.color }}
                              >
                                {verif.label}
                              </span>
                            </td>

                            <td className="p-3.5">
                              <select
                                value={prop.listingStatus}
                                onChange={e => updateProperty(prop.id, { listingStatus: e.target.value as any })}
                                className={clsx(
                                  'text-[11px] font-bold rounded-lg px-2 py-1 border',
                                  prop.listingStatus === 'published' && 'bg-green-50 text-green-800 border-green-200',
                                  prop.listingStatus === 'draft' && 'bg-gray-50 text-gray-700 border-gray-200',
                                  prop.listingStatus === 'sold' && 'bg-red-50 text-red-800 border-red-200',
                                  prop.listingStatus === 'unpublished' && 'bg-amber-50 text-amber-800 border-amber-200'
                                )}
                              >
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                                <option value="unpublished">Unpublished</option>
                                <option value="sold">Sold</option>
                              </select>
                            </td>

                            <td className="p-3.5 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Link
                                  to={`/nirbash/properties/${prop.id}`}
                                  className="p-1.5 text-gray-500 hover:text-green-800 rounded-lg hover:bg-gray-100"
                                  title="View on site"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </Link>
                                <button
                                  onClick={() => {
                                    if (confirm(lang === 'bn' ? 'মুছে ফেলতে চান?' : 'Delete listing?')) {
                                      deleteProperty(prop.id);
                                    }
                                  }}
                                  className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: INQUIRIES & BOOKING REQUESTS */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold text-gray-900">
              {lang === 'bn' ? 'প্রাপ্ত বার্তা ও সাইট ভিজিট অনুসন্ধান' : 'Customer Leads & Booking Requests'}
            </h3>

            {companyInquiries.length === 0 ? (
              <p className="text-xs text-gray-500 text-center py-6">
                {lang === 'bn' ? 'এখনো কোনো অনুসন্ধান জমা পড়েনি।' : 'No inquiries received yet.'}
              </p>
            ) : (
              <div className="divide-y divide-gray-100">
                {companyInquiries.map(inq => (
                  <div key={inq.id} className="py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-sm">{inq.name}</span>
                        <span className={clsx(
                          'text-[10px] font-bold px-2 py-0.5 rounded-full',
                          inq.inquiryType === 'booking' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                        )}>
                          {inq.inquiryType === 'booking' ? 'Site Visit / Booking' : 'General Inquiry'}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {new Date(inq.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">
                        <span className="font-semibold text-gray-800">Property: </span>
                        {inq.propertyTitle}
                      </div>
                      <p className="text-xs text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-100 mt-1 max-w-xl">
                        "{inq.message}"
                      </p>
                      <div className="text-[11px] text-gray-500 flex items-center gap-3 pt-1">
                        <span>📞 {inq.phone}</span>
                        <span>✉️ {inq.email}</span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end gap-2 flex-shrink-0">
                      <select
                        value={inq.status}
                        onChange={e => updateInquiryStatus(inq.id, e.target.value as any)}
                        className="text-xs border rounded-lg px-2.5 py-1 font-semibold text-gray-700 bg-white"
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="responded">Responded</option>
                        <option value="closed">Closed</option>
                      </select>
                      <a
                        href={`tel:${inq.phone}`}
                        className="px-3 py-1 bg-green-800 hover:bg-green-900 text-white rounded-lg text-xs font-semibold"
                      >
                        {lang === 'bn' ? 'কল করুন' : 'Call Buyer'}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: COMPANY PROFILE */}
        {activeTab === 'profile' && activeCompany && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  {lang === 'bn' ? 'কোম্পানি তথ্য ও প্রোফাইল' : 'Company Profile Information'}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {lang === 'bn' ? 'পাবলিক ক্রেতাদের দেখানো তথ্য' : 'Information visible to public property buyers'}
                </p>
              </div>

              <div className="px-3 py-1 bg-green-50 border border-green-200 rounded-xl text-green-800 text-xs font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-green-700" />
                <span>Status: {activeCompany.verificationStatus.toUpperCase()}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-gray-500 font-semibold block mb-1">Company Name (English)</label>
                <div className="p-2.5 bg-gray-50 rounded-xl font-bold text-gray-800">{activeCompany.name}</div>
              </div>
              <div>
                <label className="text-gray-500 font-semibold block mb-1">Company Name (Bangla)</label>
                <div className="p-2.5 bg-gray-50 rounded-xl font-bold text-gray-800">{activeCompany.nameBn}</div>
              </div>
              <div>
                <label className="text-gray-500 font-semibold block mb-1">Official Email</label>
                <div className="p-2.5 bg-gray-50 rounded-xl font-bold text-gray-800">{activeCompany.email}</div>
              </div>
              <div>
                <label className="text-gray-500 font-semibold block mb-1">Official Phone</label>
                <div className="p-2.5 bg-gray-50 rounded-xl font-bold text-gray-800">{activeCompany.phone}</div>
              </div>
              <div className="sm:col-span-2">
                <label className="text-gray-500 font-semibold block mb-1">Office Address</label>
                <div className="p-2.5 bg-gray-50 rounded-xl font-bold text-gray-800">{activeCompany.address}</div>
              </div>
              <div className="sm:col-span-2">
                <label className="text-gray-500 font-semibold block mb-1">About Company</label>
                <div className="p-3 bg-gray-50 rounded-xl text-gray-700 leading-relaxed">{activeCompany.description}</div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: ADD PROPERTY */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-gray-100 my-8 space-y-5 animate-scale-up max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-100 text-green-800 flex items-center justify-center font-bold">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">
                      {lang === 'bn' ? 'নতুন প্রপার্টি লিস্টিং তৈরি করুন' : 'Add New Property Listing'}
                    </h3>
                    <p className="text-[11px] text-gray-500">
                      {lang === 'bn' ? `${activeCompany?.name} এর জন্য লিস্টিং` : `Listing for ${activeCompany?.name}`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-full hover:bg-gray-100 text-gray-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateProperty} className="space-y-4 text-xs">
                {/* Title */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">
                      {lang === 'bn' ? 'প্রপার্টি টাইটেল (ইংরেজি) *' : 'Property Title (English) *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={newProp.title}
                      onChange={e => setNewProp({ ...newProp, title: e.target.value })}
                      placeholder="e.g. Modern 3BHK Flat in Banani"
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-1 focus:ring-green-800"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">
                      {lang === 'bn' ? 'প্রপার্টি টাইটেল (বাংলা)' : 'Property Title (Bangla)'}
                    </label>
                    <input
                      type="text"
                      value={newProp.titleBn}
                      onChange={e => setNewProp({ ...newProp, titleBn: e.target.value })}
                      placeholder="উদাঃ বনানীতে আধুনিক ৩-বেড ফ্ল্যাট"
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-1 focus:ring-green-800"
                    />
                  </div>
                </div>

                {/* Category & Completion */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">
                      {lang === 'bn' ? 'ক্যাটাগরি *' : 'Property Category *'}
                    </label>
                    <select
                      value={newProp.category}
                      onChange={e => setNewProp({ ...newProp, category: e.target.value as PropertyCategory })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white focus:ring-1 focus:ring-green-800 font-semibold"
                    >
                      <option value="residential_flat">Residential Flat</option>
                      <option value="ready_to_move">Ready to Move Flat</option>
                      <option value="under_construction">Under Construction Flat</option>
                      <option value="land_plot">Land Plot</option>
                      <option value="commercial_property">Commercial Property</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">
                      {lang === 'bn' ? 'সমাপ্তির অবস্থা' : 'Completion Status'}
                    </label>
                    <select
                      value={newProp.completionStatus}
                      onChange={e => setNewProp({ ...newProp, completionStatus: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white focus:ring-1 focus:ring-green-800"
                    >
                      <option value="ready">Ready to move</option>
                      <option value="under_construction">Under Construction</option>
                      <option value="not_applicable">Not Applicable (Land)</option>
                    </select>
                  </div>
                </div>

                {/* Under construction handover date */}
                {newProp.completionStatus === 'under_construction' && (
                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">
                      {lang === 'bn' ? 'সম্ভাব্য হস্তান্তর তারিখ' : 'Estimated Handover Date'}
                    </label>
                    <input
                      type="text"
                      value={newProp.estimatedCompletion}
                      onChange={e => setNewProp({ ...newProp, estimatedCompletion: e.target.value })}
                      placeholder="e.g. December 2026"
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                    />
                  </div>
                )}

                {/* Price & Area */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="col-span-2">
                    <label className="font-semibold text-gray-700 block mb-1">
                      {lang === 'bn' ? 'মূল্য (টাকা) *' : 'Total Price (Tk) *'}
                    </label>
                    <input
                      type="number"
                      required
                      value={newProp.price}
                      onChange={e => setNewProp({ ...newProp, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold text-green-900"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">
                      {lang === 'bn' ? 'আয়তন *' : 'Area *'}
                    </label>
                    <input
                      type="number"
                      required
                      value={newProp.area}
                      onChange={e => setNewProp({ ...newProp, area: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">
                      {lang === 'bn' ? 'একক' : 'Unit'}
                    </label>
                    <select
                      value={newProp.areaUnit}
                      onChange={e => setNewProp({ ...newProp, areaUnit: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white"
                    >
                      <option value="sqft">Sq.ft</option>
                      <option value="katha">Katha</option>
                      <option value="decimal">Decimal</option>
                      <option value="bigha">Bigha</option>
                    </select>
                  </div>
                </div>

                {/* Category specific dynamic fields (Flats) */}
                {newProp.category !== 'land_plot' && (
                  <div className="grid grid-cols-3 gap-3 p-3 bg-gray-50 rounded-xl">
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">Bedrooms</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={newProp.bedrooms}
                        onChange={e => setNewProp({ ...newProp, bedrooms: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">Bathrooms</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={newProp.bathrooms}
                        onChange={e => setNewProp({ ...newProp, bathrooms: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">Floor No.</label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={newProp.floorNumber}
                        onChange={e => setNewProp({ ...newProp, floorNumber: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-white"
                      />
                    </div>
                  </div>
                )}

                {/* Land DNA Fields (DAG & Mouza) */}
                <div className="p-3 bg-green-50/70 border border-green-200/70 rounded-xl space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-green-900">
                    <ShieldCheck className="w-4 h-4 text-green-700" />
                    <span>JOMI-SHARE Land DNA Integration</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">Dag Number (Optional)</label>
                      <input
                        type="text"
                        value={newProp.dagNumber}
                        onChange={e => setNewProp({ ...newProp, dagNumber: e.target.value })}
                        placeholder="e.g. CS-452 / RS-891"
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">Mouza Name (Optional)</label>
                      <input
                        type="text"
                        value={newProp.mouzaName}
                        onChange={e => setNewProp({ ...newProp, mouzaName: e.target.value })}
                        placeholder="e.g. Badda, Mouza JL-14"
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Location & District */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Location Details *</label>
                    <input
                      type="text"
                      required
                      value={newProp.location}
                      onChange={e => setNewProp({ ...newProp, location: e.target.value })}
                      placeholder="e.g. Block D, Road 11, Banani"
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">District *</label>
                    <select
                      value={newProp.district}
                      onChange={e => setNewProp({ ...newProp, district: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white"
                    >
                      {DISTRICTS_BD.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Photo Image URL</label>
                  <input
                    type="url"
                    value={newProp.imageUrl}
                    onChange={e => setNewProp({ ...newProp, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-mono"
                  />
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-green-800 hover:bg-green-900 text-white rounded-xl font-bold shadow-md shadow-green-800/20"
                  >
                    Publish Listing
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
