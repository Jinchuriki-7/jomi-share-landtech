import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Language,
  TRANSLATIONS,
  toBnDigits,
  formatBnNumber,
  formatArea as formatAreaUtil,
  formatCurrency as formatCurrencyUtil,
} from '../i18n/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof TRANSLATIONS['en'];
  toBn: (val: string | number) => string;
  formatNumber: (val: string | number) => string;
  formatArea: (dec: number) => string;
  formatCurrency: (amount: number) => string;
}

const STORAGE_KEY = 'jomi_lang';
const ABOUT_STORAGE_KEY = 'jomi_about_lang';

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(ABOUT_STORAGE_KEY);
      return saved === 'bn' || saved === 'en' ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
      localStorage.setItem(ABOUT_STORAGE_KEY, newLang);
    } catch {
      // storage unavailable
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      localStorage.setItem(ABOUT_STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }, [lang]);

  const toBn = useCallback((val: string | number) => {
    return toBnDigits(val);
  }, []);

  const formatNumber = useCallback((val: string | number) => {
    return formatBnNumber(val, lang);
  }, [lang]);

  const formatArea = useCallback((dec: number) => {
    return formatAreaUtil(dec, lang);
  }, [lang]);

  const formatCurrency = useCallback((amount: number) => {
    return formatCurrencyUtil(amount, lang);
  }, [lang]);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t: TRANSLATIONS[lang],
        toBn,
        formatNumber,
        formatArea,
        formatCurrency,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
