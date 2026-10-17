import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search, SlidersHorizontal, X, ChevronDown, LayoutGrid, List,
  MapPin, ArrowUpDown, RefreshCcw,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useNirbash } from '../context/NirbashContext';
import PropertyCard from '../components/PropertyCard';
import {
  PROPERTY_CATEGORIES_DATA, DISTRICTS_BD,
  type PropertyCategory, type AvailabilityStatus,
} from '../data/nirbashData';
import clsx from 'clsx';

type SortKey = 'newest' | 'price_asc' | 'price_desc' | 'area_asc';

export default function NirbashPropertiesPage() {
  const { lang } = useLanguage();
  const { properties } = useNirbash();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  // Filter state
  const [search, setSearch] = useState(searchParams.get('q') ?? '');
  const [category, setCategory] = useState<PropertyCategory | ''>(
    (searchParams.get('category') as PropertyCategory) ?? ''
  );
  const [district, setDistrict] = useState(searchParams.get('district') ?? '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') ?? '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') ?? '');
  const [minArea, setMinArea] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const t = {
    en: {
      title: 'Browse Properties',
      subtitle: 'Find your perfect plot or flat across Bangladesh',
      search: 'Search by title or location…',
      filters: 'Filters',
      sortBy: 'Sort by',
      allCategories: 'All Categories',
      allDistricts: 'All Districts',
      minPrice: 'Min Price (Tk)',
      maxPrice: 'Max Price (Tk)',
      minArea: 'Min Area',
      bedrooms: 'Bedrooms',
      anyBed: 'Any Bedrooms',
      reset: 'Reset Filters',
      results: 'properties found',
      noResults: 'No properties match your search.',
      noResultsSub: 'Try adjusting your filters or search term.',
      newest: 'Newest First',
      priceAsc: 'Price: Low to High',
      priceDesc: 'Price: High to Low',
      areaAsc: 'Area: Smallest First',
      grid: 'Grid',
      list: 'List',
    },
    bn: {
      title: 'সম্পত্তি ব্রাউজ করুন',
      subtitle: 'সারা বাংলাদেশে আপনার আদর্শ প্লট বা ফ্ল্যাট খুঁজুন',
      search: 'শিরোনাম বা এলাকা দিয়ে খুঁজুন…',
      filters: 'ফিল্টার',
      sortBy: 'সাজান',
      allCategories: 'সব ক্যাটাগরি',
      allDistricts: 'সব জেলা',
      minPrice: 'সর্বনিম্ন মূল্য (টাকা)',
      maxPrice: 'সর্বোচ্চ মূল্য (টাকা)',
      minArea: 'সর্বনিম্ন পরিমাণ',
      bedrooms: 'বেডরুম',
      anyBed: 'যেকোনো',
      reset: 'ফিল্টার রিসেট',
      results: 'টি সম্পত্তি পাওয়া গেছে',
      noResults: 'আপনার অনুসন্ধানের সাথে কোনো সম্পত্তি মেলেনি।',
      noResultsSub: 'ফিল্টার বা অনুসন্ধান পরিবর্তন করে আবার চেষ্টা করুন।',
      newest: 'সবচেয়ে নতুন',
      priceAsc: 'মূল্য: কম থেকে বেশি',
      priceDesc: 'মূল্য: বেশি থেকে কম',
      areaAsc: 'পরিমাণ: ছোট থেকে বড়',
      grid: 'গ্রিড',
      list: 'তালিকা',
    },
  }[lang];

  const sortOptions: { value: SortKey; label: string }[] = [
    { value: 'newest', label: t.newest },
    { value: 'price_asc', label: t.priceAsc },
    { value: 'price_desc', label: t.priceDesc },
    { value: 'area_asc', label: t.areaAsc },
  ];

  const filtered = useMemo(() => {
    let list = properties.filter(p => p.listingStatus === 'published');

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.titleBn.includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.locationBn.includes(q) ||
        p.district.toLowerCase().includes(q)
      );
    }
    if (category) list = list.filter(p => p.category === category);
    if (district) list = list.filter(p => p.district === district);
    if (minPrice) list = list.filter(p => p.price >= Number(minPrice));
    if (maxPrice) list = list.filter(p => p.price <= Number(maxPrice));
    if (minArea) list = list.filter(p => p.area >= Number(minArea));
    if (bedrooms) list = list.filter(p => (p.bedrooms ?? 0) >= Number(bedrooms));

    // Sort
    if (sortKey === 'newest') list = [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    else if (sortKey === 'price_asc') list = [...list].sort((a, b) => a.price - b.price);
    else if (sortKey === 'price_desc') list = [...list].sort((a, b) => b.price - a.price);
    else if (sortKey === 'area_asc') list = [...list].sort((a, b) => a.area - b.area);

    return list;
  }, [search, category, district, minPrice, maxPrice, minArea, bedrooms, sortKey]);

  const handleReset = () => {
    setSearch('');
    setCategory('');
    setDistrict('');
    setMinPrice('');
    setMaxPrice('');
    setMinArea('');
    setBedrooms('');
    setSortKey('newest');
    setSearchParams({});
  };

  const hasActiveFilters = !!(search || category || district || minPrice || maxPrice || minArea || bedrooms);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-green-900 text-white py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-green-300 text-sm mb-2">
            <Link to="/nirbash" className="hover:text-white transition-colors">NIRBASH</Link>
            <span>/</span>
            <span>{lang === 'bn' ? 'সম্পত্তি' : 'Properties'}</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
          <p className="text-green-200 text-sm">{t.subtitle}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Search + Controls Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t.search}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(f => !f)}
            className={clsx(
              'flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors',
              showFilters ? 'bg-green-800 text-white border-green-800' : 'bg-white border-gray-200 text-gray-700 hover:border-green-600'
            )}
          >
            <SlidersHorizontal className="w-4 h-4" />
            {t.filters}
            {hasActiveFilters && <span className="w-2 h-2 bg-red-500 rounded-full" />}
          </button>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortKey}
              onChange={e => setSortKey(e.target.value as SortKey)}
              className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600 cursor-pointer"
            >
              {sortOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* View mode */}
          <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-white">
            <button
              onClick={() => setViewMode('grid')}
              className={clsx('px-3 py-2.5 transition-colors', viewMode === 'grid' ? 'bg-green-800 text-white' : 'text-gray-500 hover:bg-gray-50')}
              title="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={clsx('px-3 py-2.5 transition-colors', viewMode === 'list' ? 'bg-green-800 text-white' : 'text-gray-500 hover:bg-gray-50')}
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-5 animate-fade-in">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {/* Category */}
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  {lang === 'bn' ? 'ক্যাটাগরি' : 'Category'}
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as PropertyCategory | '')}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <option value="">{t.allCategories}</option>
                  {PROPERTY_CATEGORIES_DATA.map(c => (
                    <option key={c.key} value={c.key}>{lang === 'bn' ? c.labelBn : c.label}</option>
                  ))}
                </select>
              </div>

              {/* District */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  {lang === 'bn' ? 'জেলা' : 'District'}
                </label>
                <select
                  value={district}
                  onChange={e => setDistrict(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <option value="">{t.allDistricts}</option>
                  {DISTRICTS_BD.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* Min Price */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">{t.minPrice}</label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={e => setMinPrice(e.target.value)}
                  placeholder="0"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              {/* Max Price */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">{t.maxPrice}</label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                  placeholder="Any"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">{t.bedrooms}</label>
                <select
                  value={bedrooms}
                  onChange={e => setBedrooms(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <option value="">{t.anyBed}</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>

              {/* Reset */}
              <div className="flex items-end">
                <button
                  onClick={handleReset}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <RefreshCcw className="w-3.5 h-3.5" />
                  {t.reset}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Category quick filter pills */}
        <div className="flex flex-wrap gap-2 mb-5">
          <button
            onClick={() => setCategory('')}
            className={clsx(
              'px-3 py-1.5 rounded-full text-xs font-semibold border transition-all',
              !category ? 'bg-green-800 text-white border-green-800' : 'bg-white text-gray-600 border-gray-200 hover:border-green-600 hover:text-green-700'
            )}
          >
            {lang === 'bn' ? 'সব' : 'All'}
          </button>
          {PROPERTY_CATEGORIES_DATA.map(cat => (
            <button
              key={cat.key}
              onClick={() => setCategory(cat.key)}
              className={clsx(
                'px-3 py-1.5 rounded-full text-xs font-semibold border transition-all',
                category === cat.key ? 'text-white border-transparent' : 'bg-white text-gray-600 border-gray-200 hover:border-green-600 hover:text-green-700'
              )}
              style={category === cat.key ? { background: cat.color, borderColor: cat.color } : {}}
            >
              {lang === 'bn' ? cat.labelBn : cat.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{filtered.length}</span>
            {' '}{t.results}
          </p>
        </div>

        {/* Property Grid / List */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-700 font-semibold mb-1">{t.noResults}</p>
            <p className="text-gray-500 text-sm mb-4">{t.noResultsSub}</p>
            <button onClick={handleReset} className="px-5 py-2 bg-green-800 text-white rounded-xl text-sm font-medium hover:bg-green-900 transition-colors">
              {t.reset}
            </button>
          </div>
        ) : (
          <div className={clsx(
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
              : 'flex flex-col gap-4'
          )}>
            {filtered.map(p => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
