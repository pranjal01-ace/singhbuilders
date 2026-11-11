import React from "react";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import SEO from "../components/ui/SEO";
import { siteConfig } from "../data/siteData";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import "./ServicesPage.css";

const serviceVisuals = {
  residential: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  commercial: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  developers: "https://images.unsplash.com/photo-1541888946425-d0fbb1861564?auto=format&fit=crop&w=1200&q=80",
  opportunities: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  partnerships: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80"
};

export default function ServicesPage() {
  return (
    <div className="services-page">
      <SEO
        title="Services | Real Estate With Purpose | Singh Builder's"
        description="Comprehensive real-estate practices: residential, commercial, builder & developer activities, bespoke property opportunities, and strategic partnerships."
      />

      {/* Services Hero */}
      <section className="services-hero">
        <Container>
          <div className="services-hero-content">
            <span className="editorial-label">EXPERTISE &amp; DISCIPLINES</span>
            <h1 className="services-hero-title">Real Estate With Purpose.</h1>
            <p className="services-hero-subtitle">
              We connect clear customer requirements with high-utility spaces, enduring
              relationships, and verified opportunities across Delhi and Gurugram.
            </p>
          </div>
        </Container>
      </section>

      {/* Services Editorial Sections */}
      <section className="section-pad services-practices-section">
        <Container>
          <div className="services-deep-list">
            {siteConfig.services.map((service, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={service.id}
                  className={`service-practice-row ${isEven ? "row-reverse" : ""}`}
                >
                  <div className="practice-media-col">
                    <img
                      src={serviceVisuals[service.id]}
                      alt={service.title}
                      className="practice-img"
                      loading="lazy"
                    />
                    <span className="practice-num-floating">{service.number}</span>
                  </div>

                  <div className="practice-text-col">
                    <span className="editorial-label">SERVICE {service.number}</span>
                    <h2 className="practice-title">{service.title}</h2>
                    <p className="practice-desc">{service.fullDescription}</p>

                    <div className="practice-points">
                      {service.focusPoints.map((point, i) => (
                        <div key={i} className="practice-point-item">
                          <CheckCircle2 size={16} className="point-icon" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>

                    <div className="practice-action-wrap">
                      <Button to={service.route} variant="primary" size="md">
                        <span>Learn More</span>
                        <ArrowRight size={15} />
                      </Button>
                      <Button to="/requirement" variant="secondary" size="md">
                        Discuss Requirement
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
