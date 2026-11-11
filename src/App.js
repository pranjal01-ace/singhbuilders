import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import MobileActionBar from "./components/layout/MobileActionBar";
import ScrollToTop from "./components/layout/ScrollToTop";

// Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PropertiesPage from "./pages/PropertiesPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import LocationsPage from "./pages/LocationsPage";
import LocationDetailPage from "./pages/LocationDetailPage";
import HowWeWorkPage from "./pages/HowWeWorkPage";
import PartnershipsPage from "./pages/PartnershipsPage";
import RequirementPage from "./pages/RequirementPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import DisclaimerPage from "./pages/DisclaimerPage";
import NotFoundPage from "./pages/NotFoundPage";

import "./styles/globals.css";
import "./styles/animations.css";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-wrapper">
        <Header />
        <main id="main-content" className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Properties Routes */}
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/properties/residential" element={<PropertiesPage />} />
            <Route path="/properties/commercial" element={<PropertiesPage />} />
            <Route path="/properties/:slug" element={<PropertyDetailPage />} />

            {/* Services Routes */}
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/residential" element={<ServiceDetailPage />} />
            <Route path="/services/commercial" element={<ServiceDetailPage />} />
            <Route path="/services/developers" element={<ServiceDetailPage />} />
            <Route path="/services/partnerships" element={<ServiceDetailPage />} />

            {/* Signature Approach & Markets */}
            <Route path="/how-we-work" element={<HowWeWorkPage />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/locations/delhi" element={<LocationDetailPage />} />
            <Route path="/locations/south-delhi" element={<LocationDetailPage />} />
            <Route path="/locations/gurugram" element={<LocationDetailPage />} />

            {/* Direct Conversion & Partnership Pages */}
            <Route path="/partnerships" element={<PartnershipsPage />} />
            <Route path="/requirement" element={<RequirementPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Compliance & Legal */}
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-conditions" element={<TermsPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />

            {/* 404 Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <MobileActionBar />
      </div>
    </Router>
  );
}
