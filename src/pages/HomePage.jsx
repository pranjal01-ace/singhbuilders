import React from "react";
import HeroSection from "../components/hero/HeroSection";
import RequirementFinder from "../components/forms/RequirementFinder";
import CompanyIntro from "../components/sections/CompanyIntro";
import BusinessSegments from "../components/sections/BusinessSegments";
import ServicesSection from "../components/sections/ServicesSection";
import FeaturedOpportunities from "../components/sections/FeaturedOpportunities";
import HowWeWork from "../components/sections/HowWeWork";
import MarketsSection from "../components/sections/MarketsSection";
import PartnershipsSection from "../components/sections/PartnershipsSection";
import ValuesSection from "../components/sections/ValuesSection";
import FutureDirection from "../components/sections/FutureDirection";
import RequirementForm from "../components/forms/RequirementForm";
import Container from "../components/ui/Container";
import SEO from "../components/ui/SEO";
import { siteConfig } from "../data/siteData";
import { formatPhone } from "../utils/formatters";
import { Phone, Mail, MapPin } from "lucide-react";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home-page">
      <SEO
        title="Singh Builder's | Real Estate. Built on Trust."
        description="Singh Builder's — Delhi-NCR real-estate company established in 2007. Residential, commercial, and development opportunities across Delhi and Gurugram."
      />

      {/* 1. Cinematic Hero */}
      <HeroSection />

      {/* 2. Requirement Finder */}
      <RequirementFinder />

      {/* 3. Company Introduction */}
      <CompanyIntro />

      {/* 4. Business Segments (Residential & Commercial) */}
      <BusinessSegments />

      {/* 5. Services (01 to 05) */}
      <ServicesSection />

      {/* 6. Featured Opportunities (Curated Empty State Architecture) */}
      <FeaturedOpportunities />

      {/* 7. Signature How We Work Methodology */}
      <HowWeWork />

      {/* 8. Regional Markets (South Delhi, Delhi, Gurugram) */}
      <MarketsSection />

      {/* 9. Strategic Partnerships */}
      <PartnershipsSection />

      {/* 10. Vision, Mission & Values */}
      <ValuesSection />

      {/* 11. Future Direction (The Next Chapter) */}
      <FutureDirection />

      {/* 12. Direct Requirement Submission Section */}
      <section className="section-pad home-requirement-section" aria-label="Direct Mandate">
        <Container narrow>
          <RequirementForm
            title="Discuss Your Real-Estate Requirement"
            subtitle="Let our team understand your locational priorities, spatial scope, and investment parameters."
          />
        </Container>
      </section>

      {/* 13. Direct Contact Strip */}
      <section className="home-contact-strip" aria-label="Quick Contact Strip">
        <Container>
          <div className="contact-strip-grid">
            <div className="strip-item">
              <Phone size={20} className="strip-icon" />
              <div>
                <span className="strip-label">DIRECT CALL</span>
                <div className="strip-phone-links">
                  {siteConfig.phones.map((phone) => (
                    <a key={phone} href={`tel:${phone}`} className="strip-link">
                      {formatPhone(phone)}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="strip-item">
              <Mail size={20} className="strip-icon" />
              <div>
                <span className="strip-label">OFFICIAL EMAIL</span>
                <a href={`mailto:${siteConfig.email}`} className="strip-link">
                  {siteConfig.email}
                </a>
              </div>
            </div>

            <div className="strip-item">
              <MapPin size={20} className="strip-icon" />
              <div>
                <span className="strip-label">HEADQUARTERS</span>
                <span className="strip-text">{siteConfig.location.region}</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
