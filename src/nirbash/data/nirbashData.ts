// ============================================================
// NIRBASH — SYNTHETIC DEMO DATA
// All companies, properties, prices, and locations are fictional.
// This is demo data for the NIRBASH real estate marketplace module.
// ============================================================

export type PropertyCategory =
  | 'land_plot'
  | 'residential_flat'
  | 'commercial_property'
  | 'ready_to_move'
  | 'under_construction';

export type CompletionStatus = 'ready' | 'under_construction' | 'not_applicable';
export type AvailabilityStatus = 'available' | 'sold' | 'reserved' | 'unavailable';
export type ListingStatus = 'draft' | 'pending_review' | 'published' | 'unpublished' | 'sold' | 'unavailable';
export type VerificationStatus = 'available' | 'pending' | 'mismatch' | 'unavailable';
export type InquiryStatus = 'pending' | 'reviewed' | 'responded' | 'closed';

export interface NirbashCompany {
  id: string;
  name: string;
  nameBn: string;
  logo: string;
  logoColor: string;
  description: string;
  descriptionBn: string;
  address: string;
  addressBn: string;
  email: string;
  phone: string;
  website?: string;
  established: number;
  totalListings: number;
  verificationStatus: 'registered' | 'pending' | 'verified';
  createdAt: string;
}

export interface NirbashAgent {
  id: string;
  name: string;
  nameBn: string;
  phone: string;
  whatsapp: string;
  agency: string;
  agencyBn: string;
  location: string;
  locationBn: string;
  avatar: string;
  verified: boolean;
  activeListings: number;
}

export interface PropertyImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface NirbashProperty {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  category: PropertyCategory;
  location: string;
  locationBn: string;
  district: string;
  districtBn: string;
  upazila?: string;
  price: number;
  priceUnit?: string;
  area: number;
  areaUnit: 'katha' | 'decimal' | 'sqft' | 'bigha' | 'shotok';
  bedrooms?: number;
  bathrooms?: number;
  floorNumber?: number;
  totalFloors?: number;
  facing?: string;
  completionStatus: CompletionStatus;
  estimatedCompletion?: string;
  availabilityStatus: AvailabilityStatus;
  listingStatus: ListingStatus;
  companyId: string;
  images: PropertyImage[];
  features: string[];
  featuresBn: string[];
  verificationStatus: VerificationStatus;
  dagNumber?: string;
  mouzaName?: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
}

export interface PropertyInquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  companyId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  inquiryType: 'general' | 'booking';
  status: InquiryStatus;
  createdAt: string;
}

// ============================================================
// DEMO COMPANIES
// ============================================================
export const NIRBASH_COMPANIES: NirbashCompany[] = [
  {
    id: 'company-001',
    name: 'Dhaka Realty Ltd.',
    nameBn: 'ঢাকা রিয়েলটি লিমিটেড',
    logo: 'DR',
    logoColor: '#166534',
    description: 'A leading real estate developer in Dhaka with over 15 years of experience in residential and commercial projects. We are committed to delivering quality homes at affordable prices.',
    descriptionBn: 'ঢাকায় ১৫ বছরেরও বেশি অভিজ্ঞতাসম্পন্ন একটি শীর্ষস্থানীয় রিয়েল এস্টেট ডেভেলপার। আমরা সাশ্রয়ী মূল্যে মানসম্মত বাড়ি সরবরাহে প্রতিশ্রুতিবদ্ধ।',
    address: 'House 12, Road 5, Gulshan-1, Dhaka-1212',
    addressBn: 'বাড়ি ১২, রোড ৫, গুলশান-১, ঢাকা-১২১২',
    email: 'info@dhakarealty-demo.com',
    phone: '+880 1700-000001',
    website: 'www.dhakarealty-demo.com',
    established: 2009,
    totalListings: 8,
    verificationStatus: 'verified',
    createdAt: '2024-01-15',
  },
  {
    id: 'company-002',
    name: 'Savar Lands & Properties',
    nameBn: 'সাভার ল্যান্ডস অ্যান্ড প্রপার্টিজ',
    logo: 'SL',
    logoColor: '#1e3a5f',
    description: 'Specializing in land plots and affordable housing in Savar, Gazipur, and surrounding areas. Your trusted partner for land investment in peri-urban Bangladesh.',
    descriptionBn: 'সাভার, গাজীপুর ও পার্শ্ববর্তী এলাকায় জমির প্লট ও সাশ্রয়ী আবাসনে বিশেষজ্ঞ। পেরি-আর্বান বাংলাদেশে জমি বিনিয়োগের জন্য আপনার বিশ্বস্ত অংশীদার।',
    address: 'Plot 45, Savar DOHS, Dhaka-1340',
    addressBn: 'প্লট ৪৫, সাভার ডিওএইচএস, ঢাকা-১৩৪০',
    email: 'contact@savarlands-demo.com',
    phone: '+880 1700-000002',
    established: 2015,
    totalListings: 6,
    verificationStatus: 'verified',
    createdAt: '2024-02-20',
  },
  {
    id: 'company-003',
    name: 'Chittagong Heights Developers',
    nameBn: 'চট্টগ্রাম হাইটস ডেভেলপার্স',
    logo: 'CH',
    logoColor: '#92400e',
    description: 'Premium residential and commercial developments in Chittagong. We specialize in high-rise apartments with modern amenities overlooking the Bay of Bengal.',
    descriptionBn: 'চট্টগ্রামে প্রিমিয়াম আবাসিক ও বাণিজ্যিক উন্নয়ন। আমরা বঙ্গোপসাগরের দৃশ্য সহ আধুনিক সুযোগ-সুবিধাসম্পন্ন উচ্চ-উঠান অ্যাপার্টমেন্টে বিশেষজ্ঞ।',
    address: 'GEC Circle, Nasirabad, Chittagong-4000',
    addressBn: 'জিইসি সার্কেল, নাসিরাবাদ, চট্টগ্রাম-৪০০০',
    email: 'sales@ctgheights-demo.com',
    phone: '+880 1700-000003',
    established: 2012,
    totalListings: 5,
    verificationStatus: 'verified',
    createdAt: '2024-03-10',
  },
  {
    id: 'company-004',
    name: 'Sylhet Green Living',
    nameBn: 'সিলেট গ্রিন লিভিং',
    logo: 'SG',
    logoColor: '#065f46',
    description: 'Eco-friendly residential projects in the tea-garden hills of Sylhet. We create sustainable communities that blend modern living with natural beauty.',
    descriptionBn: 'সিলেটের চা বাগানের পাহাড়ে পরিবেশবান্ধব আবাসিক প্রকল্প। আমরা আধুনিক জীবনযাত্রার সাথে প্রাকৃতিক সৌন্দর্যের সমন্বয়ে টেকসই সম্প্রদায় তৈরি করি।',
    address: 'Ambarkhana, Sylhet-3100',
    addressBn: 'আম্বরখানা, সিলেট-৩১০০',
    email: 'hello@sylhetgreen-demo.com',
    phone: '+880 1700-000004',
    established: 2018,
    totalListings: 4,
    verificationStatus: 'pending',
    createdAt: '2024-04-05',
  },
];

export const JOMIBAZAR_AGENTS: NirbashAgent[] = [
  {
    id: 'agent-001',
    name: 'Md. Didarul Alam',
    nameBn: 'মোঃ দিদারুল আলম',
    phone: '+880 1822-456789',
    whatsapp: '8801822456789',
    agency: 'Fatickchhari Land & Agro Mart',
    agencyBn: 'ফটিকছড়ি ল্যান্ড অ্যান্ড এগ্রো মার্ট',
    location: 'Fatickchhari, Chittagong',
    locationBn: 'ফটিকছড়ি, চট্টগ্রাম',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    verified: true,
    activeListings: 12,
  },
  {
    id: 'agent-002',
    name: 'Engr. Noman Chowdhury',
    nameBn: 'ইঞ্জিঃ নোমান চৌধুরী',
    phone: '+880 1711-987654',
    whatsapp: '8801711987654',
    agency: 'Heako Real Estate & Land Agency',
    agencyBn: 'হেয়াকো রিয়েল এস্টেট অ্যান্ড ল্যান্ড এজেন্সি',
    location: 'Heako, Chittagong',
    locationBn: 'হেয়াকো, চট্টগ্রাম',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    verified: true,
    activeListings: 8,
  },
  {
    id: 'agent-003',
    name: 'Kazi Mominul Islam',
    nameBn: 'কাজী মমিনুল ইসলাম',
    phone: '+880 1912-334455',
    whatsapp: '8801912334455',
    agency: 'Dhaka Agro & Land Properties',
    agencyBn: 'ঢাকা এগ্রো অ্যান্ড ল্যান্ড প্রপার্টিজ',
    location: 'Savar & Uttara, Dhaka',
    locationBn: 'সাভার ও উত্তরা, ঢাকা',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    verified: true,
    activeListings: 15,
  },
];

// ============================================================
// DEMO PROPERTIES
// ============================================================
export const NIRBASH_PROPERTIES: NirbashProperty[] = [
  {
    id: 'jb-001',
    title: '144 Shotok Fish Hatchery Project Land for Sale',
    titleBn: 'মাছের প্রজেক্ট সহ ১৪৪শতক দখলীয় জায়গা বিক্রি করা হবে',
    description: '144 Shotok fertile and enclosed land suitable for commercial fish farming, agro project or dairy farming. Direct road connection with uninterrupted electricity and water access. Clean ownership records with immediate possession.',
    descriptionBn: 'মাছের প্রজেক্ট, এগ্রো ফার্ম বা ডেইরি ফার্মের জন্য অত্যন্ত উপযোগী ১৪৪ শতক উর্বর ও সুরক্ষিত জায়গা। সরাসরি পিচঢালা সড়ক সংযোগ, সার্বক্ষণিক বিদ্যুৎ ও পানির সুবিধা বিদ্যমান। বিরোধহীন পরিষ্কার রেকর্ড ও তাৎক্ষণিক দখল হস্তান্তর।',
    category: 'land_plot',
    location: 'Datmara, Fatickchhari, Chittagong',
    locationBn: 'দাঁতমারা, ফটিকছড়ি, চট্টগ্রাম',
    district: 'Chittagong',
    districtBn: 'চট্টগ্রাম',
    upazila: 'Fatickchhari',
    price: 14500000,
    priceUnit: 'total',
    area: 144,
    areaUnit: 'shotok',
    completionStatus: 'not_applicable',
    availabilityStatus: 'available',
    listingStatus: 'published',
    companyId: 'company-003',
    images: [
      { id: 'img-jb001', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80', alt: 'মাছের প্রজেক্ট সহ ১৪৪ শতক', isPrimary: true },
    ],
    features: ['Fish Project Ready', 'Electricity connection', 'Paved road frontage', 'Clear CS/RS dag'],
    featuresBn: ['মাছের প্রজেক্ট রেডি', 'বিদ্যুৎ সংযোগ', 'পাকা সড়ক ফ্রন্টেজ', 'পরিষ্কার সিএস/আরএস দাগ'],
    verificationStatus: 'available',
    dagNumber: 'CS-412 / RS-671',
    mouzaName: 'দাঁতমারা মৌজা',
    isFeatured: true,
    createdAt: '2026-09-15',
    updatedAt: '2026-10-12',
    viewCount: 420,
  },
  {
    id: 'jb-002',
    title: '80 Shotok Homestead Land behind Helal Nuri Bungalow',
    titleBn: 'হেলাল নূরীর বাংলোর পিছনে ৮০ শতক দখলীয় বসত ভিটা বিক্রি করা হবে',
    description: '80 Shotok elevated homestead land located in a quiet scenic locality right behind Helal Nuri Bungalow. Boundary walls in place, surrounded by fruit trees, high land with no flood risk.',
    descriptionBn: 'হেলাল নূরীর বাংলোর ঠিক পিছনে মনোরম শান্ত পরিবেশে ৮০ শতক উঁচু দখলীয় বসতভিটা। বাউন্ডারি ওয়াল করা, বিভিন্ন ফলদ বৃক্ষে শোভিত, উঁচু জমি এবং বন্যামুক্ত। জরুরি ভিত্তিতে বিক্রি হবে।',
    category: 'land_plot',
    location: 'Near Helal Nuri Bungalow, Fatickchhari, Chittagong',
    locationBn: 'হেলাল নূরীর বাংলোর পিছনে, ফটিকছড়ি, চট্টগ্রাম',
    district: 'Chittagong',
    districtBn: 'চট্টগ্রাম',
    upazila: 'Fatickchhari',
    price: 8200000,
    priceUnit: 'total',
    area: 80,
    areaUnit: 'shotok',
    completionStatus: 'not_applicable',
    availabilityStatus: 'available',
    listingStatus: 'published',
    companyId: 'company-003',
    images: [
      { id: 'img-jb002', url: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&auto=format&fit=crop&q=80', alt: 'বসত ভিটা জমি', isPrimary: true },
    ],
    features: ['Urgent Sale', 'Homestead Ready', 'Boundary Wall', 'Scenic Green Area'],
    featuresBn: ['আর্জেন্ট বিক্রি', 'বসতভিটা উপযোগী', 'বাউন্ডারি ওয়াল', 'সবুজ মনোরম পরিবেশ'],
    verificationStatus: 'available',
    dagNumber: 'CS-890 / SA-124',
    mouzaName: 'হেয়াকো মৌজা',
    isFeatured: true,
    createdAt: '2026-09-18',
    updatedAt: '2026-10-10',
    viewCount: 310,
  },
  {
    id: 'jb-004',
    title: 'Homestead Land (Vita Bhumi) for Urgent Sale',
    titleBn: 'ভিটা ভুমি বিক্রি',
    description: '35 Shotok prime homestead land (vita bhumi) located near Heako Bazar. High ground, direct 12-ft paved road access, immediate construction ready with all utility lines accessible.',
    descriptionBn: 'হেয়াকো বাজারের কাছে ৩৫ শতক চমৎকার বসতভিটা জমি। উঁচু সমতল জমি, ১২ ফুট প্রশস্ত পাকা সড়ক সংযোগ, বিদ্যুৎ লাইন সংযোগসহ অবিলম্বে বাড়ি নির্মাণের জন্য সম্পূর্ণ প্রস্তুত। জরুরি বিক্রয়।',
    category: 'land_plot',
    location: 'Heako Bazar, Fatickchhari, Chittagong',
    locationBn: 'হেয়াকো বাজার সংলগ্ন, ফটিকছড়ি, চট্টগ্রাম',
    district: 'Chittagong',
    districtBn: 'চট্টগ্রাম',
    upazila: 'Fatickchhari',
    price: 3800000,
    priceUnit: 'total',
    area: 35,
    areaUnit: 'shotok',
    completionStatus: 'not_applicable',
    availabilityStatus: 'available',
    listingStatus: 'published',
    companyId: 'company-003',
    images: [
      { id: 'img-jb004', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80', alt: 'ভিটা ভুমি', isPrimary: true },
    ],
    features: ['Urgent Sale', 'Paved Road', 'Electricity line', 'Vita Bhumi'],
    featuresBn: ['আর্জেন্ট বিক্রি', 'পাকা রাস্তা', 'বিদ্যুৎ লাইন', 'উঁচু বসতভিটা'],
    verificationStatus: 'available',
    dagNumber: 'CS-302 / RS-480',
    mouzaName: 'ফটিকছড়ি মৌজা',
    isFeatured: true,
    createdAt: '2026-09-25',
    updatedAt: '2026-10-14',
    viewCount: 390,
  },
  {
    id: 'prop-001',
    title: 'Prime Residential Plot in Savar',
    titleBn: 'সাভারে প্রাইম আবাসিক প্লট',
    description: 'A clean, road-facing residential plot in a developing area of Savar. Excellent connectivity to Dhaka via Dhaka-Aricha highway. Suitable for immediate construction. Utilities available.',
    descriptionBn: 'সাভারের একটি উন্নয়নশীল এলাকায় পরিষ্কার, রাস্তামুখী আবাসিক প্লট। ঢাকা-আরিচা মহাসড়ক দিয়ে ঢাকার সাথে চমৎকার যোগাযোগ। তাৎক্ষণিক নির্মাণের জন্য উপযুক্ত।',
    category: 'land_plot',
    location: 'Savar, Dhaka',
    locationBn: 'সাভার, ঢাকা',
    district: 'Dhaka',
    districtBn: 'ঢাকা',
    upazila: 'Savar',
    price: 3500000,
    priceUnit: 'total',
    area: 5,
    areaUnit: 'katha',
    completionStatus: 'not_applicable',
    availabilityStatus: 'available',
    listingStatus: 'published',
    companyId: 'company-002',
    images: [{ id: 'img-p001-1', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop', alt: 'Land plot view', isPrimary: true }],
    features: ['Road facing', 'Corner plot', 'Utilities available', 'Clear title'],
    featuresBn: ['রাস্তামুখী', 'কর্নার প্লট', 'ইউটিলিটি সংযোগ আছে', 'পরিষ্কার দলিল'],
    verificationStatus: 'available',
    dagNumber: 'DAG-4521 (SYNTHETIC)',
    mouzaName: 'Savar Demo Mouza (SYNTHETIC)',
    isFeatured: true,
    createdAt: '2026-09-01',
    updatedAt: '2026-10-01',
    viewCount: 142,
  },
  {
    id: 'prop-002',
    title: 'Agricultural Land in Gazipur',
    titleBn: 'গাজীপুরে কৃষি জমি',
    description: 'Fertile agricultural land suitable for cultivation or future residential development. Located near Gazipur district town. Good road access and water source available.',
    descriptionBn: 'চাষাবাদ বা ভবিষ্যৎ আবাসিক উন্নয়নের জন্য উপযুক্ত উর্বর কৃষি জমি। গাজীপুর জেলা শহরের কাছে অবস্থিত।',
    category: 'land_plot',
    location: 'Gazipur Sadar, Gazipur',
    locationBn: 'গাজীপুর সদর, গাজীপুর',
    district: 'Gazipur',
    districtBn: 'গাজীপুর',
    upazila: 'Gazipur Sadar',
    price: 1800000,
    priceUnit: 'total',
    area: 20,
    areaUnit: 'decimal',
    completionStatus: 'not_applicable',
    availabilityStatus: 'available',
    listingStatus: 'published',
    companyId: 'company-002',
    images: [{ id: 'img-p002-1', url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop', alt: 'Agricultural land', isPrimary: true }],
    features: ['Fertile soil', 'Water access', 'Road connectivity', 'Irrigation possible'],
    featuresBn: ['উর্বর মাটি', 'পানির সুবিধা', 'সড়ক সংযোগ', 'সেচ সুবিধা সম্ভব'],
    verificationStatus: 'pending',
    dagNumber: 'DAG-7892 (SYNTHETIC)',
    mouzaName: 'Gazipur Demo Mouza (SYNTHETIC)',
    isFeatured: false,
    createdAt: '2026-09-10',
    updatedAt: '2026-10-05',
    viewCount: 89,
  },
  {
    id: 'prop-003',
    title: 'Modern 3-BHK Apartment in Gulshan',
    titleBn: 'গুলশানে আধুনিক ৩ বিএইচকে অ্যাপার্টমেন্ট',
    description: 'A spacious, ready-to-move 3-bedroom apartment in the heart of Gulshan. Features premium finishes, 24/7 security, rooftop amenities, and underground parking. Walking distance to embassies and premium shopping.',
    descriptionBn: 'গুলশানের কেন্দ্রে প্রশস্ত, রেডি-টু-মুভ ৩ বেডরুমের অ্যাপার্টমেন্ট। প্রিমিয়াম ফিনিশিং, ২৪/৭ নিরাপত্তা, রুফটপ সুবিধা এবং আন্ডারগ্রাউন্ড পার্কিং সহ।',
    category: 'ready_to_move',
    location: 'Gulshan-2, Dhaka',
    locationBn: 'গুলশান-২, ঢাকা',
    district: 'Dhaka',
    districtBn: 'ঢাকা',
    price: 18500000,
    priceUnit: 'total',
    area: 2100,
    areaUnit: 'sqft',
    bedrooms: 3,
    bathrooms: 3,
    floorNumber: 8,
    totalFloors: 14,
    facing: 'South',
    completionStatus: 'ready',
    availabilityStatus: 'available',
    listingStatus: 'published',
    companyId: 'company-001',
    images: [
      { id: 'img-p003-1', url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop', alt: 'Luxury apartment', isPrimary: true },
      { id: 'img-p003-2', url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop', alt: 'Modern kitchen', isPrimary: false },
    ],
    features: ['24/7 Security', 'Generator backup', 'Rooftop garden', 'Underground parking', 'Gym', 'Intercom'],
    featuresBn: ['২৪/৭ নিরাপত্তা', 'জেনারেটর ব্যাকআপ', 'রুফটপ গার্ডেন', 'আন্ডারগ্রাউন্ড পার্কিং', 'জিম', 'ইন্টারকম'],
    verificationStatus: 'unavailable',
    isFeatured: true,
    createdAt: '2026-08-15',
    updatedAt: '2026-10-10',
    viewCount: 312,
  },
  {
    id: 'prop-004',
    title: '2-BHK Flat in Mirpur DOHS',
    titleBn: 'মিরপুর ডিওএইচএসে ২ বিএইচকে ফ্ল্যাট',
    description: 'Comfortable 2-bedroom flat in a secure DOHS housing complex. Ideal for small families. Comes with modern kitchen, attached bathrooms, and one reserved parking space.',
    descriptionBn: 'একটি নিরাপদ ডিওএইচএস হাউজিং কমপ্লেক্সে আরামদায়ক ২ বেডরুমের ফ্ল্যাট। ছোট পরিবারের জন্য আদর্শ।',
    category: 'ready_to_move',
    location: 'Mirpur DOHS, Dhaka',
    locationBn: 'মিরপুর ডিওএইচএস, ঢাকা',
    district: 'Dhaka',
    districtBn: 'ঢাকা',
    price: 8200000,
    priceUnit: 'total',
    area: 1350,
    areaUnit: 'sqft',
    bedrooms: 2,
    bathrooms: 2,
    floorNumber: 4,
    totalFloors: 8,
    facing: 'East',
    completionStatus: 'ready',
    availabilityStatus: 'available',
    listingStatus: 'published',
    companyId: 'company-001',
    images: [{ id: 'img-p004-1', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop', alt: 'Apartment exterior', isPrimary: true }],
    features: ['Reserved parking', 'Attached bathroom', 'Modern kitchen', 'CCTV', 'Gas connection'],
    featuresBn: ['সংরক্ষিত পার্কিং', 'এটাচড বাথরুম', 'আধুনিক রান্নাঘর', 'সিসিটিভি', 'গ্যাস সংযোগ'],
    verificationStatus: 'unavailable',
    isFeatured: false,
    createdAt: '2026-09-05',
    updatedAt: '2026-10-08',
    viewCount: 178,
  },
  {
    id: 'prop-005',
    title: 'Sky Residence — Under Construction Luxury Flat',
    titleBn: 'স্কাই রেসিডেন্স — নির্মাণাধীন লাক্সারি ফ্ল্যাট',
    description: 'A prestigious under-construction high-rise in Bashundhara Residential Area. Expected completion December 2027. Book now at pre-launch price. Features rooftop pool, gym, and children\'s play area.',
    descriptionBn: 'বসুন্ধরা আবাসিক এলাকায় একটি মর্যাদাপূর্ণ নির্মাণাধীন হাই-রাইজ। আনুমানিক সমাপ্তি ডিসেম্বর ২০২৭।',
    category: 'under_construction',
    location: 'Bashundhara R/A, Dhaka',
    locationBn: 'বসুন্ধরা আ/এ, ঢাকা',
    district: 'Dhaka',
    districtBn: 'ঢাকা',
    price: 12000000,
    priceUnit: 'total',
    area: 1750,
    areaUnit: 'sqft',
    bedrooms: 3,
    bathrooms: 3,
    floorNumber: 12,
    totalFloors: 20,
    facing: 'North-South',
    completionStatus: 'under_construction',
    estimatedCompletion: 'December 2027 (SYNTHETIC ESTIMATE)',
    availabilityStatus: 'available',
    listingStatus: 'published',
    companyId: 'company-001',
    images: [{ id: 'img-p005-1', url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&auto=format&fit=crop', alt: 'High-rise building', isPrimary: true }],
    features: ['Rooftop pool', 'Gym', 'Children playground', 'Double height lobby', 'Smart home ready'],
    featuresBn: ['রুফটপ পুল', 'জিম', 'শিশু খেলার মাঠ', 'ডাবল হাইট লবি', 'স্মার্ট হোম রেডি'],
    verificationStatus: 'unavailable',
    isFeatured: true,
    createdAt: '2026-07-20',
    updatedAt: '2026-10-12',
    viewCount: 445,
  },
  {
    id: 'prop-006',
    title: 'Hillside Residency — Chittagong',
    titleBn: 'হিলসাইড রেসিডেন্সি — চট্টগ্রাম',
    description: 'Under-construction apartment with stunning hill and sea views. Located in the prestigious Nasirabad area of Chittagong. Expected to be ready mid-2027.',
    descriptionBn: 'পাহাড় ও সমুদ্রের অপরূপ দৃশ্যসহ নির্মাণাধীন অ্যাপার্টমেন্ট। চট্টগ্রামের মর্যাদাপূর্ণ নাসিরাবাদ এলাকায় অবস্থিত।',
    category: 'under_construction',
    location: 'Nasirabad, Chittagong',
    locationBn: 'নাসিরাবাদ, চট্টগ্রাম',
    district: 'Chittagong',
    districtBn: 'চট্টগ্রাম',
    price: 9500000,
    priceUnit: 'total',
    area: 1580,
    areaUnit: 'sqft',
    bedrooms: 3,
    bathrooms: 2,
    floorNumber: 7,
    totalFloors: 16,
    facing: 'South (Sea View)',
    completionStatus: 'under_construction',
    estimatedCompletion: 'June 2027 (SYNTHETIC ESTIMATE)',
    availabilityStatus: 'available',
    listingStatus: 'published',
    companyId: 'company-003',
    images: [{ id: 'img-p006-1', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop', alt: 'Hillside apartment', isPrimary: true }],
    features: ['Sea view', 'Hill view', 'Balcony', 'Community swimming pool', 'Covered parking'],
    featuresBn: ['সমুদ্র দৃশ্য', 'পাহাড়ের দৃশ্য', 'বারান্দা', 'কমিউনিটি সুইমিং পুল', 'ঢাকা পার্কিং'],
    verificationStatus: 'unavailable',
    isFeatured: true,
    createdAt: '2026-08-01',
    updatedAt: '2026-10-11',
    viewCount: 289,
  },
  {
    id: 'prop-007',
    title: 'Prime Commercial Space — Motijheel',
    titleBn: 'প্রাইম কমার্শিয়াল স্পেস — মতিঝিল',
    description: 'A modern commercial floor in the heart of Motijheel business district. Suitable for banks, corporate offices, or showrooms. High footfall area with excellent visibility.',
    descriptionBn: 'মতিঝিল বাণিজ্যিক জেলার কেন্দ্রে একটি আধুনিক কমার্শিয়াল ফ্লোর। ব্যাংক, কর্পোরেট অফিস বা শোরুমের জন্য উপযুক্ত।',
    category: 'commercial_property',
    location: 'Motijheel, Dhaka',
    locationBn: 'মতিঝিল, ঢাকা',
    district: 'Dhaka',
    districtBn: 'ঢাকা',
    price: 25000000,
    priceUnit: 'total',
    area: 3200,
    areaUnit: 'sqft',
    floorNumber: 3,
    totalFloors: 12,
    facing: 'Road facing',
    completionStatus: 'ready',
    availabilityStatus: 'available',
    listingStatus: 'published',
    companyId: 'company-001',
    images: [{ id: 'img-p007-1', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop', alt: 'Commercial building', isPrimary: true }],
    features: ['Open floor plan', 'Lift access', 'Power backup', 'Dedicated parking', 'Broadband ready'],
    featuresBn: ['ওপেন ফ্লোর প্ল্যান', 'লিফট অ্যাক্সেস', 'পাওয়ার ব্যাকআপ', 'ডেডিকেটেড পার্কিং', 'ব্রডব্যান্ড রেডি'],
    verificationStatus: 'unavailable',
    isFeatured: false,
    createdAt: '2026-09-20',
    updatedAt: '2026-10-09',
    viewCount: 201,
  },
  {
    id: 'prop-008',
    title: 'Eco Garden Villa Plot — Sylhet',
    titleBn: 'ইকো গার্ডেন ভিলা প্লট — সিলেট',
    description: 'Beautiful villa plots within a gated eco-community in the tea garden hills of Sylhet. Stunning natural scenery, fresh air, and a serene environment.',
    descriptionBn: 'সিলেটের চা বাগানের পাহাড়ে একটি গেটেড ইকো-কমিউনিটিতে সুন্দর ভিলা প্লট। অপরূপ প্রাকৃতিক দৃশ্য, তাজা বাতাস এবং শান্ত পরিবেশ।',
    category: 'land_plot',
    location: 'Golapganj, Sylhet',
    locationBn: 'গোলাপগঞ্জ, সিলেট',
    district: 'Sylhet',
    districtBn: 'সিলেট',
    upazila: 'Golapganj',
    price: 4200000,
    priceUnit: 'total',
    area: 8,
    areaUnit: 'katha',
    completionStatus: 'not_applicable',
    availabilityStatus: 'available',
    listingStatus: 'published',
    companyId: 'company-004',
    images: [{ id: 'img-p008-1', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop', alt: 'Tea garden hillside', isPrimary: true }],
    features: ['Gated community', 'Hill view', 'Tea garden surroundings', 'Security', 'Utilities planned'],
    featuresBn: ['গেটেড কমিউনিটি', 'পাহাড়ের দৃশ্য', 'চা বাগান পরিবেশ', 'নিরাপত্তা', 'ইউটিলিটি পরিকল্পিত'],
    verificationStatus: 'pending',
    dagNumber: 'DAG-3301 (SYNTHETIC)',
    mouzaName: 'Golapganj Demo Mouza (SYNTHETIC)',
    isFeatured: false,
    createdAt: '2026-10-01',
    updatedAt: '2026-10-14',
    viewCount: 67,
  },
  {
    id: 'prop-009',
    title: '1-BHK Studio Flat — Uttara',
    titleBn: '১ বিএইচকে স্টুডিও ফ্ল্যাট — উত্তরা',
    description: 'Compact and affordable ready-to-move studio apartment in Uttara. Perfect for working professionals or newly-wed couples. Close to Hazrat Shahjalal Airport.',
    descriptionBn: 'উত্তরায় কমপ্যাক্ট ও সাশ্রয়ী মূল্যের রেডি-টু-মুভ স্টুডিও অ্যাপার্টমেন্ট। কর্মজীবী পেশাদার বা নবদম্পতিদের জন্য আদর্শ।',
    category: 'ready_to_move',
    location: 'Uttara Sector 7, Dhaka',
    locationBn: 'উত্তরা সেক্টর ৭, ঢাকা',
    district: 'Dhaka',
    districtBn: 'ঢাকা',
    price: 4500000,
    priceUnit: 'total',
    area: 750,
    areaUnit: 'sqft',
    bedrooms: 1,
    bathrooms: 1,
    floorNumber: 6,
    totalFloors: 10,
    facing: 'East',
    completionStatus: 'ready',
    availabilityStatus: 'available',
    listingStatus: 'published',
    companyId: 'company-001',
    images: [{ id: 'img-p009-1', url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop', alt: 'Studio apartment', isPrimary: true }],
    features: ['Near airport', 'Lift', 'Gas connection', 'CCTV', 'Roof access'],
    featuresBn: ['বিমানবন্দর কাছে', 'লিফট', 'গ্যাস সংযোগ', 'সিসিটিভি', 'ছাদে প্রবেশাধিকার'],
    verificationStatus: 'unavailable',
    isFeatured: false,
    createdAt: '2026-10-05',
    updatedAt: '2026-10-15',
    viewCount: 134,
  },
  {
    id: 'prop-010',
    title: 'Green Valley Residential Plot — Gazipur',
    titleBn: 'গ্রিন ভ্যালি আবাসিক প্লট — গাজীপুর',
    description: 'Ready plots in a planned residential community with wide internal roads, park, and utility connections. A peaceful retreat from city life, yet well-connected.',
    descriptionBn: 'প্রশস্ত অভ্যন্তরীণ রাস্তা, পার্ক এবং ইউটিলিটি সংযোগ সহ পরিকল্পিত আবাসিক কমিউনিটিতে প্রস্তুত প্লট।',
    category: 'land_plot',
    location: 'Kaliakair, Gazipur',
    locationBn: 'কালিয়াকৈর, গাজীপুর',
    district: 'Gazipur',
    districtBn: 'গাজীপুর',
    upazila: 'Kaliakair',
    price: 2800000,
    priceUnit: 'total',
    area: 3,
    areaUnit: 'katha',
    completionStatus: 'not_applicable',
    availabilityStatus: 'available',
    listingStatus: 'published',
    companyId: 'company-002',
    images: [{ id: 'img-p010-1', url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop', alt: 'Residential plot', isPrimary: true }],
    features: ['Wide internal roads', 'Community park', 'Utility connections', 'Boundary wall', 'Security gate'],
    featuresBn: ['প্রশস্ত অভ্যন্তরীণ রাস্তা', 'কমিউনিটি পার্ক', 'ইউটিলিটি সংযোগ', 'বাউন্ডারি ওয়াল', 'নিরাপত্তা গেট'],
    verificationStatus: 'available',
    dagNumber: 'DAG-6610 (SYNTHETIC)',
    mouzaName: 'Kaliakair Demo Mouza (SYNTHETIC)',
    isFeatured: false,
    createdAt: '2026-10-08',
    updatedAt: '2026-10-15',
    viewCount: 98,
  },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================
export function getPropertyById(id: string): NirbashProperty | undefined {
  return NIRBASH_PROPERTIES.find(p => p.id === id);
}

export function getCompanyById(id: string): NirbashCompany | undefined {
  return NIRBASH_COMPANIES.find(c => c.id === id);
}

export function getPropertiesByCompany(companyId: string): NirbashProperty[] {
  return NIRBASH_PROPERTIES.filter(p => p.companyId === companyId && p.listingStatus === 'published');
}

export function getFeaturedProperties(): NirbashProperty[] {
  return NIRBASH_PROPERTIES.filter(p => p.isFeatured && p.listingStatus === 'published');
}

export function getRecentProperties(count = 6): NirbashProperty[] {
  return [...NIRBASH_PROPERTIES]
    .filter(p => p.listingStatus === 'published')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, count);
}

export function getSimilarProperties(property: NirbashProperty, count = 3): NirbashProperty[] {
  return NIRBASH_PROPERTIES
    .filter(p => p.id !== property.id && p.category === property.category && p.listingStatus === 'published')
    .slice(0, count);
}

export const PROPERTY_CATEGORIES_DATA: { key: PropertyCategory; label: string; labelBn: string; description: string; descriptionBn: string; color: string; bgColor: string }[] = [
  { key: 'land_plot', label: 'Land Plots', labelBn: 'জমির প্লট', description: 'Residential & agricultural plots', descriptionBn: 'আবাসিক ও কৃষি প্লট', color: '#166534', bgColor: '#f0fdf4' },
  { key: 'residential_flat', label: 'Residential Flats', labelBn: 'আবাসিক ফ্ল্যাট', description: 'Apartments for families', descriptionBn: 'পরিবারের জন্য অ্যাপার্টমেন্ট', color: '#1e3a5f', bgColor: '#f0f4ff' },
  { key: 'commercial_property', label: 'Commercial', labelBn: 'বাণিজ্যিক', description: 'Office & commercial spaces', descriptionBn: 'অফিস ও বাণিজ্যিক স্পেস', color: '#92400e', bgColor: '#fffbeb' },
  { key: 'ready_to_move', label: 'Ready to Move', labelBn: 'রেডি-টু-মুভ', description: 'Completed flats available now', descriptionBn: 'এখনই পাওয়া যাচ্ছে', color: '#065f46', bgColor: '#ecfdf5' },
  { key: 'under_construction', label: 'Under Construction', labelBn: 'নির্মাণাধীন', description: 'Book at pre-launch prices', descriptionBn: 'প্রি-লঞ্চ মূল্যে বুক করুন', color: '#7c2d12', bgColor: '#fff7ed' },
];

export const DISTRICTS_BD = [
  'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna',
  'Barisal', 'Rangpur', 'Mymensingh', 'Gazipur', 'Narayanganj',
  'Comilla', 'Narsingdi', 'Manikganj', 'Munshiganj',
];

export function getCategoryLabel(category: PropertyCategory, lang: 'en' | 'bn'): string {
  const cat = PROPERTY_CATEGORIES_DATA.find(c => c.key === category);
  if (!cat) return category;
  return lang === 'bn' ? cat.labelBn : cat.label;
}

export function formatPrice(price: number, lang: 'en' | 'bn'): string {
  const lakh = 100000;
  const crore = 10000000;
  if (price >= crore) {
    const val = (price / crore).toFixed(2);
    return lang === 'bn' ? `৳${val} কোটি` : `৳${val} Cr`;
  }
  if (price >= lakh) {
    const val = (price / lakh).toFixed(2);
    return lang === 'bn' ? `৳${val} লক্ষ` : `৳${val} L`;
  }
  return `৳${price.toLocaleString('en-IN')}`;
}

export function getAreaLabel(area: number, unit: string, lang: 'en' | 'bn'): string {
  const unitLabels: Record<string, { en: string; bn: string }> = {
    katha: { en: 'Katha', bn: 'কাঠা' },
    decimal: { en: 'Decimal', bn: 'শতাংশ' },
    shotok: { en: 'Shotok', bn: 'শতক' },
    sqft: { en: 'sq.ft', bn: 'বর্গফুট' },
    bigha: { en: 'Bigha', bn: 'বিঘা' },
  };
  const unitLabel = unitLabels[unit] ? unitLabels[unit][lang] : unit;
  return `${area} ${unitLabel}`;
}

export function getVerificationBadge(status: VerificationStatus, lang: 'en' | 'bn'): { label: string; color: string; bg: string } {
  const map = {
    available: { en: 'DNA Verified', bn: 'ডিএনএ যাচাইকৃত', color: '#166534', bg: '#dcfce7' },
    pending: { en: 'Verification Pending', bn: 'যাচাই প্রক্রিয়াধীন', color: '#92400e', bg: '#fef3c7' },
    mismatch: { en: 'Mismatch Detected', bn: 'অসঙ্গতি পাওয়া গেছে', color: '#991b1b', bg: '#fee2e2' },
    unavailable: { en: 'Verification N/A', bn: 'যাচাই উপলব্ধ নয়', color: '#6b7280', bg: '#f3f4f6' },
  };
  const entry = map[status];
  return { label: lang === 'bn' ? entry.bn : entry.en, color: entry.color, bg: entry.bg };
}

export function getAvailabilityBadge(status: AvailabilityStatus, lang: 'en' | 'bn'): { label: string; color: string; bg: string } {
  const map = {
    available: { en: 'Available', bn: 'উপলব্ধ', color: '#166534', bg: '#dcfce7' },
    sold: { en: 'Sold', bn: 'বিক্রিত', color: '#991b1b', bg: '#fee2e2' },
    reserved: { en: 'Reserved', bn: 'সংরক্ষিত', color: '#92400e', bg: '#fef3c7' },
    unavailable: { en: 'Unavailable', bn: 'অনুপলব্ধ', color: '#6b7280', bg: '#f3f4f6' },
  };
  const entry = map[status];
  return { label: lang === 'bn' ? entry.bn : entry.en, color: entry.color, bg: entry.bg };
}
