import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AppLayout from './components/layout/AppLayout';
import NirbashLayout from './nirbash/components/NirbashLayout';
import OverviewPage from './pages/OverviewPage';
import MapPage from './pages/MapPage';
import LandDNAPage from './pages/LandDNAPage';
import VerificationPage from './pages/VerificationPage';
import InheritancePage from './pages/InheritancePage';
import PartitionPage from './pages/PartitionPage';
import HeatmapPage from './pages/HeatmapPage';
import SimulatorPage from './pages/SimulatorPage';
import ReportsPage from './pages/ReportsPage';
import AboutPage from './pages/AboutPage';

// NIRBASH Module Pages
import NirbashHomePage from './nirbash/pages/NirbashHomePage';
import NirbashPropertiesPage from './nirbash/pages/NirbashPropertiesPage';
import NirbashPropertyDetailPage from './nirbash/pages/NirbashPropertyDetailPage';
import NirbashCompaniesPage from './nirbash/pages/NirbashCompaniesPage';
import NirbashCompanyProfilePage from './nirbash/pages/NirbashCompanyProfilePage';
import NirbashComparePage from './nirbash/pages/NirbashComparePage';
import NirbashSavedPropertiesPage from './nirbash/pages/NirbashSavedPropertiesPage';
import NirbashRegisterCompanyPage from './nirbash/pages/NirbashRegisterCompanyPage';
import NirbashCompanyDashboardPage from './nirbash/pages/NirbashCompanyDashboardPage';
import NirbashAgentsPage from './nirbash/pages/NirbashAgentsPage';
import NirbashServicesPage from './nirbash/pages/NirbashServicesPage';
import NirbashBlogPage from './nirbash/pages/NirbashBlogPage';
import NirbashAboutPage from './nirbash/pages/NirbashAboutPage';
import NirbashContactPage from './nirbash/pages/NirbashContactPage';
import NirbashLegalPage from './nirbash/pages/NirbashLegalPage';
import NirbashDisclaimerPage from './nirbash/pages/NirbashDisclaimerPage';
import NirbashPrivacyPage from './nirbash/pages/NirbashPrivacyPage';
import NirbashTermsPage from './nirbash/pages/NirbashTermsPage';
import NirbashListingGuidelinesPage from './nirbash/pages/NirbashListingGuidelinesPage';

import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            {/* ── 1. NIRBASH (Main Frontend / Portal at root /) ── */}
            <Route element={<NirbashLayout />}>
              <Route path="/"                               element={<NirbashHomePage />} />
              <Route path="/nirbash"                        element={<NirbashHomePage />} />
              <Route path="/properties"                     element={<NirbashPropertiesPage />} />
              <Route path="/nirbash/properties"             element={<NirbashPropertiesPage />} />
              <Route path="/properties/:id"                 element={<NirbashPropertyDetailPage />} />
              <Route path="/nirbash/properties/:id"         element={<NirbashPropertyDetailPage />} />
              <Route path="/agents"                         element={<NirbashAgentsPage />} />
              <Route path="/nirbash/agents"                 element={<NirbashAgentsPage />} />
              <Route path="/services"                       element={<NirbashServicesPage />} />
              <Route path="/nirbash/services"               element={<NirbashServicesPage />} />
              <Route path="/nirbash/all-services"           element={<NirbashServicesPage />} />
              <Route path="/blog"                           element={<NirbashBlogPage />} />
              <Route path="/nirbash/blog"                   element={<NirbashBlogPage />} />
              <Route path="/about-nirbash"                  element={<NirbashAboutPage />} />
              <Route path="/nirbash/about"                  element={<NirbashAboutPage />} />
              <Route path="/contact"                        element={<NirbashContactPage />} />
              <Route path="/nirbash/contact"                element={<NirbashContactPage />} />
              <Route path="/legal"                          element={<NirbashDisclaimerPage />} />
              <Route path="/nirbash/legal"                  element={<NirbashDisclaimerPage />} />
              <Route path="/disclaimer"                     element={<NirbashDisclaimerPage />} />
              <Route path="/nirbash/disclaimer"             element={<NirbashDisclaimerPage />} />
              <Route path="/privacy"                        element={<NirbashPrivacyPage />} />
              <Route path="/nirbash/privacy"                element={<NirbashPrivacyPage />} />
              <Route path="/nirbash/privacy-policy"         element={<NirbashPrivacyPage />} />
              <Route path="/terms"                          element={<NirbashTermsPage />} />
              <Route path="/nirbash/terms"                  element={<NirbashTermsPage />} />
              <Route path="/nirbash/terms-and-conditions"   element={<NirbashTermsPage />} />
              <Route path="/listing-guidelines"             element={<NirbashListingGuidelinesPage />} />
              <Route path="/nirbash/listing-guidelines"      element={<NirbashListingGuidelinesPage />} />
              <Route path="/companies"                      element={<NirbashCompaniesPage />} />
              <Route path="/nirbash/companies"              element={<NirbashCompaniesPage />} />
              <Route path="/companies/:id"                  element={<NirbashCompanyProfilePage />} />
              <Route path="/nirbash/companies/:id"          element={<NirbashCompanyProfilePage />} />
              <Route path="/compare"                        element={<NirbashComparePage />} />
              <Route path="/nirbash/compare"                element={<NirbashComparePage />} />
              <Route path="/saved"                          element={<NirbashSavedPropertiesPage />} />
              <Route path="/nirbash/saved"                  element={<NirbashSavedPropertiesPage />} />
              <Route path="/register-company"               element={<NirbashRegisterCompanyPage />} />
              <Route path="/nirbash/register-company"       element={<NirbashRegisterCompanyPage />} />
              <Route path="/company-dashboard"              element={<NirbashCompanyDashboardPage />} />
              <Route path="/nirbash/company-dashboard"      element={<NirbashCompanyDashboardPage />} />
            </Route>

            {/* ── 2. JOMI-SHARE AI Land Intelligence Suite (Inside Nirbash) ── */}
            <Route element={<AppLayout />}>
              <Route path="/jomi-share"                     element={<OverviewPage />} />
              <Route path="/jomi-share/overview"            element={<OverviewPage />} />
              <Route path="/jomi-share/map"                 element={<MapPage />} />
              <Route path="/map"                            element={<MapPage />} />
              <Route path="/jomi-share/land-dna"            element={<LandDNAPage />} />
              <Route path="/land-dna"                       element={<LandDNAPage />} />
              <Route path="/jomi-share/verification"        element={<VerificationPage />} />
              <Route path="/verification"                   element={<VerificationPage />} />
              <Route path="/jomi-share/inheritance"         element={<InheritancePage />} />
              <Route path="/inheritance"                    element={<InheritancePage />} />
              <Route path="/jomi-share/partition"           element={<PartitionPage />} />
              <Route path="/partition"                      element={<PartitionPage />} />
              <Route path="/jomi-share/heatmap"             element={<HeatmapPage />} />
              <Route path="/heatmap"                        element={<HeatmapPage />} />
              <Route path="/jomi-share/simulator"           element={<SimulatorPage />} />
              <Route path="/simulator"                      element={<SimulatorPage />} />
              <Route path="/jomi-share/reports"             element={<ReportsPage />} />
              <Route path="/reports"                        element={<ReportsPage />} />
              <Route path="/jomi-share/about"               element={<AboutPage />} />
              <Route path="/about"                          element={<AboutPage />} />
              <Route path="/jomi-share/about-limitations"   element={<AboutPage />} />
              <Route path="/about-limitations"              element={<AboutPage />} />
            </Route>

            {/* Default fallback route */}
            <Route path="*" element={<NirbashHomePage />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </LanguageProvider>
  );
}
