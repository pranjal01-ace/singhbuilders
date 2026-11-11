import React from "react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import { ArrowRight, Compass, Shield, Users, Building2 } from "lucide-react";
import "./CompanyIntro.css";

export default function CompanyIntro() {
  return (
    <section className="section-pad company-intro-section" aria-label="Company Overview">
      <Container>
        <div className="company-intro-grid">
          {/* Left Column: Narrative & Verified Fact Blocks */}
          <div className="company-intro-left">
            <SectionHeading
              label="01 — ABOUT THE COMPANY"
              title="Building Relationships. Creating Opportunities."
              subtitle="Singh Builder's is a Delhi-NCR based real-estate company established in 2007, working across residential and commercial real estate in Delhi and Gurugram."
            />

            <p className="company-narrative-extra">
              We operate around a singular foundation: real estate is not merely a catalogue
              of square footage, but an alignment between people, precise spatial requirements,
              enduring relationships, and forward-looking opportunities.
            </p>

            {/* Verified Fact Blocks */}
            <div className="intro-fact-blocks">
              <div className="fact-block">
                <span className="fact-block-label">ESTABLISHED</span>
                <span className="fact-block-value">2007</span>
                <span className="fact-block-note">Under Mr. Dildar Singh</span>
              </div>

              <div className="fact-block">
                <span className="fact-block-label">MARKETS</span>
                <span className="fact-block-value">Delhi &bull; Gurugram</span>
                <span className="fact-block-note">Including South Delhi</span>
              </div>

              <div className="fact-block">
                <span className="fact-block-label">SEGMENTS</span>
                <span className="fact-block-value">Residential &bull; Commercial</span>
                <span className="fact-block-note">Acquisitions &amp; Development</span>
              </div>

              <div className="fact-block">
                <span className="fact-block-label">APPROACH</span>
                <span className="fact-block-value">Relationship-Led</span>
                <span className="fact-block-note">Long-Term Trust</span>
              </div>
            </div>

            <div className="company-intro-cta">
              <Button to="/about" variant="secondary" size="md">
                <span>Discover Our Story</span>
                <ArrowRight size={15} />
              </Button>
            </div>
          </div>

          {/* Right Column: Architectural Visual & Philosophy Card */}
          <div className="company-intro-right">
            <div className="intro-image-frame">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
                alt="Contemporary architectural facade in South Delhi"
                className="intro-image"
                loading="lazy"
              />
              <div className="intro-floating-card">
                <div className="floating-card-icon">
                  <Shield size={20} />
                </div>
                <div className="floating-card-body">
                  <span className="floating-card-title">Real Estate. Built on Trust.</span>
                  <span className="floating-card-text">
                    &ldquo;We build the lives people want.&rdquo;
                  </span>
                </div>
              </div>
            </div>

            {/* Micro Pillars */}
            <div className="intro-micro-pillars">
              <div className="micro-pillar">
                <Users size={16} />
                <span>People &amp; Intent</span>
              </div>
              <div className="micro-pillar">
                <Compass size={16} />
                <span>Requirements First</span>
              </div>
              <div className="micro-pillar">
                <Building2 size={16} />
                <span>Useful Spaces</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
