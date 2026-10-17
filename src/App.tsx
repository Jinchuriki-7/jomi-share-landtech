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
            {/* ── Existing JOMI-SHARE routes (unchanged) ── */}
            <Route element={<AppLayout />}>
              <Route path="/"                  element={<OverviewPage />} />
              <Route path="/map"               element={<MapPage />} />
              <Route path="/land-dna"          element={<LandDNAPage />} />
              <Route path="/verification"      element={<VerificationPage />} />
              <Route path="/inheritance"       element={<InheritancePage />} />
              <Route path="/partition"         element={<PartitionPage />} />
              <Route path="/heatmap"           element={<HeatmapPage />} />
              <Route path="/simulator"         element={<SimulatorPage />} />
              <Route path="/reports"           element={<ReportsPage />} />
              <Route path="/about"             element={<AboutPage />} />
              <Route path="/about-limitations" element={<AboutPage />} />
              <Route path="*"                  element={<OverviewPage />} />
            </Route>

            {/* ── NIRBASH Module routes ── */}
            <Route element={<NirbashLayout />}>
              <Route path="/nirbash"                        element={<NirbashHomePage />} />
              <Route path="/nirbash/properties"             element={<NirbashPropertiesPage />} />
              <Route path="/nirbash/properties/:id"         element={<NirbashPropertyDetailPage />} />
              <Route path="/nirbash/agents"                 element={<NirbashAgentsPage />} />
              <Route path="/nirbash/services"               element={<NirbashServicesPage />} />
              <Route path="/nirbash/all-services"           element={<NirbashServicesPage />} />
              <Route path="/nirbash/blog"                   element={<NirbashBlogPage />} />
              <Route path="/nirbash/about"                  element={<NirbashAboutPage />} />
              <Route path="/nirbash/contact"                element={<NirbashContactPage />} />
              <Route path="/nirbash/legal"                  element={<NirbashDisclaimerPage />} />
              <Route path="/nirbash/disclaimer"             element={<NirbashDisclaimerPage />} />
              <Route path="/nirbash/privacy"                element={<NirbashPrivacyPage />} />
              <Route path="/nirbash/privacy-policy"         element={<NirbashPrivacyPage />} />
              <Route path="/nirbash/terms"                  element={<NirbashTermsPage />} />
              <Route path="/nirbash/terms-and-conditions"   element={<NirbashTermsPage />} />
              <Route path="/nirbash/listing-guidelines"      element={<NirbashListingGuidelinesPage />} />
              <Route path="/nirbash/companies"              element={<NirbashCompaniesPage />} />
              <Route path="/nirbash/companies/:id"          element={<NirbashCompanyProfilePage />} />
              <Route path="/nirbash/compare"                element={<NirbashComparePage />} />
              <Route path="/nirbash/saved"                  element={<NirbashSavedPropertiesPage />} />
              <Route path="/nirbash/register-company"       element={<NirbashRegisterCompanyPage />} />
              <Route path="/nirbash/company-dashboard"      element={<NirbashCompanyDashboardPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </LanguageProvider>
  );
}
