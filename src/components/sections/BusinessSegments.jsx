import React from "react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import { ArrowRight, Home, Building, CheckCircle2 } from "lucide-react";
import "./BusinessSegments.css";

export default function BusinessSegments() {
  return (
    <section className="section-pad business-segments-section" aria-label="Core Business Segments">
      <Container>
        <SectionHeading
          label="02 — SECTORS OF EXCELLENCE"
          title="Shaped Around Purpose &amp; Lifestyle"
          subtitle="Whether acquiring a private family haven in South Delhi or securing a prime commercial asset in Gurugram, we focus on genuine spatial usability."
          align="center"
        />

        <div className="segments-editorial-grid">
          {/* Segment 1: Residential */}
          <div className="segment-card segment-residential">
            <div className="segment-media-wrap">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80"
                alt="Prime residential living space"
                className="segment-img"
                loading="lazy"
              />
              <div className="segment-badge">
                <Home size={15} />
                <span>RESIDENTIAL REAL ESTATE</span>
              </div>
            </div>

            <div className="segment-body">
              <span className="editorial-label">HOMES &amp; ESTATES</span>
              <h3 className="segment-title">Residential Real Estate</h3>
              <p className="segment-copy">
                Residential real-estate opportunities shaped around location, usability,
                connectivity, lifestyle, future plans and budget.
              </p>

              <div className="segment-concepts">
                <span className="concept-tag">
                  <CheckCircle2 size={13} /> Homes
                </span>
                <span className="concept-tag">
                  <CheckCircle2 size={13} /> Apartments
                </span>
                <span className="concept-tag">
                  <CheckCircle2 size={13} /> Residential Opportunities
                </span>
                <span className="concept-tag">
                  <CheckCircle2 size={13} /> Investment
                </span>
              </div>

              <div className="segment-action">
                <Button to="/services/residential" variant="primary" size="md">
                  <span>Explore Residential</span>
                  <ArrowRight size={15} />
                </Button>
              </div>
            </div>
          </div>

          {/* Segment 2: Commercial */}
          <div className="segment-card segment-commercial">
            <div className="segment-media-wrap">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80"
                alt="Modern commercial corporate tower"
                className="segment-img"
                loading="lazy"
              />
              <div className="segment-badge">
                <Building size={15} />
                <span>COMMERCIAL REAL ESTATE</span>
              </div>
            </div>

            <div className="segment-body">
              <span className="editorial-label">ENTERPRISE &amp; ASSETS</span>
              <h3 className="segment-title">Commercial Real Estate</h3>
              <p className="segment-copy">
                Commercial real-estate opportunities for businesses, entrepreneurs and
                investors seeking relevant spaces and strategic locations.
              </p>

              <div className="segment-concepts">
                <span className="concept-tag">
                  <CheckCircle2 size={13} /> Business Spaces
                </span>
                <span className="concept-tag">
                  <CheckCircle2 size={13} /> Commercial Opportunities
                </span>
                <span className="concept-tag">
                  <CheckCircle2 size={13} /> Investment
                </span>
                <span className="concept-tag">
                  <CheckCircle2 size={13} /> Strategic Locations
                </span>
              </div>

              <div className="segment-action">
                <Button to="/services/commercial" variant="primary" size="md">
                  <span>Explore Commercial</span>
                  <ArrowRight size={15} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
