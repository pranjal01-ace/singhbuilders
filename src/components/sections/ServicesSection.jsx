import React from "react";
import { Link } from "react-router-dom";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { siteConfig } from "../../data/siteData";
import { ArrowUpRight } from "lucide-react";
import "./ServicesSection.css";

export default function ServicesSection() {
  return (
    <section className="section-pad services-section" aria-label="Services Section">
      <Container>
        <div className="services-section-header">
          <SectionHeading
            label="03 — EXPERTISE &amp; OFFERINGS"
            title="What We Do"
            subtitle="Five specialized practice areas designed around verified client criteria, developer relationships, and strategic execution."
          />
        </div>

        <div className="services-editorial-list">
          {siteConfig.services.map((service) => (
            <div key={service.id} className="service-row-item">
              <div className="service-col-num">
                <span className="service-giant-num">{service.number}</span>
              </div>

              <div className="service-col-content">
                <span className="editorial-label">PRACTICE {service.number}</span>
                <h3 className="service-row-title">{service.title}</h3>
                <p className="service-row-desc">{service.shortDescription}</p>

                <div className="service-focus-pills">
                  {service.focusPoints.map((point, idx) => (
                    <span key={idx} className="focus-pill">
                      {point}
                    </span>
                  ))}
                </div>
              </div>

              <div className="service-col-action">
                <Link
                  to={service.route}
                  className="service-explore-link"
                  aria-label={`Explore ${service.title}`}
                >
                  <span className="link-text">Explore Practice</span>
                  <div className="link-icon-box">
                    <ArrowUpRight size={18} />
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
