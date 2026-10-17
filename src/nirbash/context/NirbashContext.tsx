import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  type NirbashProperty,
  type NirbashCompany,
  type PropertyInquiry,
  NIRBASH_PROPERTIES,
  NIRBASH_COMPANIES,
} from '../data/nirbashData';

interface NirbashContextType {
  // Properties
  properties: NirbashProperty[];
  addProperty: (property: Omit<NirbashProperty, 'id' | 'createdAt' | 'updatedAt' | 'viewCount'>) => NirbashProperty;
  updateProperty: (id: string, updates: Partial<NirbashProperty>) => void;
  deleteProperty: (id: string) => void;
  
  // Companies
  companies: NirbashCompany[];
  registerCompany: (companyData: Omit<NirbashCompany, 'id' | 'createdAt' | 'totalListings'>) => NirbashCompany;
  updateCompany: (id: string, updates: Partial<NirbashCompany>) => void;
  activeCompanyId: string;
  setActiveCompanyId: (id: string) => void;
  
  // Inquiries
  inquiries: PropertyInquiry[];
  submitInquiry: (inquiryData: Omit<PropertyInquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: PropertyInquiry['status']) => void;
  
  // Saved / Wishlist
  savedIds: string[];
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
  
  // Comparison
  comparedIds: string[];
  toggleCompare: (id: string) => void;
  isCompared: (id: string) => boolean;
  clearCompare: () => void;
  removeFromCompare: (id: string) => void;
}

const NirbashContext = createContext<NirbashContextType | undefined>(undefined);

const INITIAL_INQUIRIES: PropertyInquiry[] = [
  {
    id: 'inq-001',
    propertyId: 'prop-001',
    propertyTitle: 'Luxury 3BHK Apartment in Gulshan-2',
    companyId: 'company-001',
    name: 'Rafiqul Islam',
    email: 'rafiqul@example.com',
    phone: '+880 1812-345678',
    message: 'I am interested in visiting the apartment this weekend. Is Friday morning suitable?',
    inquiryType: 'booking',
    status: 'pending',
    createdAt: '2025-04-10T10:30:00Z',
  },
  {
    id: 'inq-002',
    propertyId: 'prop-002',
    propertyTitle: '5 Katha Residential Plot in Savar DOHS',
    companyId: 'company-002',
    name: 'Farhana Ahmed',
    email: 'farhana@example.com',
    phone: '+880 1711-223344',
    message: 'Could you share the CS/RS Dag verification documents for this plot?',
    inquiryType: 'general',
    status: 'reviewed',
    createdAt: '2025-04-11T14:15:00Z',
  },
];

export function NirbashProvider({ children }: { children: React.ReactNode }) {
  // Properties state
  const [properties, setProperties] = useState<NirbashProperty[]>(() => {
    try {
      const stored = localStorage.getItem('nirbash_properties');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed reading nirbash_properties', e);
    }
    return NIRBASH_PROPERTIES;
  });

  // Companies state
  const [companies, setCompanies] = useState<NirbashCompany[]>(() => {
    try {
      const stored = localStorage.getItem('nirbash_companies');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed reading nirbash_companies', e);
    }
    return NIRBASH_COMPANIES;
  });

  // Active company ID (defaults to first company for portal demo)
  const [activeCompanyId, setActiveCompanyId] = useState<string>(() => {
    return localStorage.getItem('nirbash_active_company') || 'company-001';
  });

  // Inquiries state
  const [inquiries, setInquiries] = useState<PropertyInquiry[]>(() => {
    try {
      const stored = localStorage.getItem('nirbash_inquiries');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed reading nirbash_inquiries', e);
    }
    return INITIAL_INQUIRIES;
  });

  // Wishlist
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('nirbash_saved');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed reading nirbash_saved', e);
    }
    return ['prop-001', 'prop-004'];
  });

  // Comparison list (max 4)
  const [comparedIds, setComparedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('nirbash_compare');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed reading nirbash_compare', e);
    }
    return [];
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('nirbash_properties', JSON.stringify(properties));
    } catch (e) {
      console.error(e);
    }
  }, [properties]);

  useEffect(() => {
    try {
      localStorage.setItem('nirbash_companies', JSON.stringify(companies));
    } catch (e) {
      console.error(e);
    }
  }, [companies]);

  useEffect(() => {
    try {
      localStorage.setItem('nirbash_active_company', activeCompanyId);
    } catch (e) {
      console.error(e);
    }
  }, [activeCompanyId]);

  useEffect(() => {
    try {
      localStorage.setItem('nirbash_inquiries', JSON.stringify(inquiries));
    } catch (e) {
      console.error(e);
    }
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem('nirbash_saved', JSON.stringify(savedIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('nirbash_compare', JSON.stringify(comparedIds));
    } catch (e) {
      console.error(e);
    }
  }, [comparedIds]);

  // Actions
  const addProperty = (data: Omit<NirbashProperty, 'id' | 'createdAt' | 'updatedAt' | 'viewCount'>) => {
    const newProp: NirbashProperty = {
      ...data,
      id: `prop-custom-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      viewCount: 1,
    };
    setProperties(prev => [newProp, ...prev]);
    // update company listings count
    setCompanies(prev => prev.map(c => c.id === data.companyId ? { ...c, totalListings: c.totalListings + 1 } : c));
    return newProp;
  };

  const updateProperty = (id: string, updates: Partial<NirbashProperty>) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : p));
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
    setComparedIds(prev => prev.filter(item => item !== id));
    setSavedIds(prev => prev.filter(item => item !== id));
  };

  const registerCompany = (companyData: Omit<NirbashCompany, 'id' | 'createdAt' | 'totalListings'>) => {
    const newCompany: NirbashCompany = {
      ...companyData,
      id: `company-${Date.now()}`,
      totalListings: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCompanies(prev => [newCompany, ...prev]);
    setActiveCompanyId(newCompany.id);
    return newCompany;
  };

  const updateCompany = (id: string, updates: Partial<NirbashCompany>) => {
    setCompanies(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const submitInquiry = (inquiryData: Omit<PropertyInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: PropertyInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: PropertyInquiry['status']) => {
    setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status } : inq));
  };

  const toggleSaved = (id: string) => {
    setSavedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isSaved = (id: string) => savedIds.includes(id);

  const toggleCompare = (id: string) => {
    setComparedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      if (prev.length >= 4) {
        alert('You can compare up to 4 properties at a time.');
        return prev;
      }
      return [...prev, id];
    });
  };

  const removeFromCompare = (id: string) => {
    setComparedIds(prev => prev.filter(item => item !== id));
  };

  const isCompared = (id: string) => comparedIds.includes(id);

  const clearCompare = () => setComparedIds([]);

  return (
    <NirbashContext.Provider
      value={{
        properties,
        addProperty,
        updateProperty,
        deleteProperty,
        companies,
        registerCompany,
        updateCompany,
        activeCompanyId,
        setActiveCompanyId,
        inquiries,
        submitInquiry,
        updateInquiryStatus,
        savedIds,
        toggleSaved,
        isSaved,
        comparedIds,
        toggleCompare,
        isCompared,
        clearCompare,
        removeFromCompare,
      }}
    >
      {children}
    </NirbashContext.Provider>
  );
}

export function useNirbash() {
  const context = useContext(NirbashContext);
  if (!context) {
    throw new Error('useNirbash must be used within a NirbashProvider');
  }
  return context;
}
