import React from "react";
import { useParams, Link } from "react-router-dom";
import Container from "../components/ui/Container";
import SEO from "../components/ui/SEO";
import RequirementForm from "../components/forms/RequirementForm";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import "./ServiceDetailPage.css";

const serviceDetailsData = {
  residential: {
    number: "01",
    title: "Residential Real Estate",
    tagline: "Shaped Around Location, Usability, Lifestyle & Budget",
    heroImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    overview:
      "Helping customers identify residential opportunities based on location, property type, intended use, requirements and budget. From boutique builder floors in South Delhi to luxury condominiums in Gurugram, our residential team ensures verified titles, high architectural standards, and lifestyle harmony.",
    pillars: [
      {
        title: "Independent Builder Floors",
        desc: "Exclusive low-density living across South Delhi's premier residential enclaves."
      },
      {
        title: "Condominiums & High-Rises",
        desc: "World-class gated communities offering amenities, security, and expansive layouts in Gurugram."
      },
      {
        title: "Family Estates & Plots",
        desc: "Land parcels suited for custom architectural construction and multigenerational residences."
      },
      {
        title: "Private Portfolio Advisory",
        desc: "Assisting individuals and family offices in strategic residential acquisition and divestment."
      }
    ]
  },
  commercial: {
    number: "02",
    title: "Commercial Real Estate",
    tagline: "Supporting Businesses, Entrepreneurs & Investors With Strategic Spaces",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    overview:
      "Commercial real-estate opportunities for businesses, entrepreneurs and investors seeking relevant spaces and strategic locations. We evaluate transit connectivity, employee catchment, lease covenants, and capital appreciation potential.",
    pillars: [
      {
        title: "Corporate Office Plates",
        desc: "Grade-A bare-shell and fitted floor plates in key commercial hubs of Delhi & Gurugram."
      },
      {
        title: "High-Street Retail",
        desc: "Prime frontage retail spaces engineered for sustained footfall and premium brand positioning."
      },
      {
        title: "Commercial Investment Assets",
        desc: "Pre-leased and high-yielding commercial assets structured for steady rental income."
      },
      {
        title: "Institutional Land Parcels",
        desc: "Commercial and IT-zoned land opportunities for long-term corporate campuses and development."
      }
    ]
  },
  developers: {
    number: "03",
    title: "Builder & Developer Activities",
    tagline: "Development Opportunities, Trusted Brands & Industry Relationships",
    heroImage: "https://images.unsplash.com/photo-1541888946425-d0fbb1861564?auto=format&fit=crop&w=1600&q=80",
    overview:
      "Working around development opportunities, developers, trusted brands and industry relationships. Singh Builder's acts as a relationship catalyst—identifying high-potential joint development agreements, project marketing mandates, and collaborative ventures.",
    pillars: [
      {
        title: "Joint Venture & Development",
        desc: "Connecting landowners with verified, reputable developers with transparent profit-sharing structures."
      },
      {
        title: "Project Positioning & Advisory",
        desc: "Guiding developers on optimal unit layouts, pricing frameworks, and customer requirement trends."
      },
      {
        title: "Land Aggregation & Structuring",
        desc: "Assisting developers in evaluating strategic land acquisitions with clear due diligence."
      },
      {
        title: "Exclusive Mandates",
        desc: "Targeted, discreet representation for select high-value residential or commercial inventory."
      }
    ]
  },
  partnerships: {
    number: "05",
    title: "Strategic Partnerships",
    tagline: "Building Relationships With Developers, Brands, Businesses & Stakeholders",
    heroImage: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=80",
    overview:
      "Building relationships with developers, brands, businesses and industry stakeholders. We believe meaningful real-estate opportunities are forged when shared values, patient capital, and execution excellence converge.",
    pillars: [
      {
        title: "Developer Alliances",
        desc: "Long-term collaboration frameworks across multi-site Delhi-NCR developments."
      },
      {
        title: "Brand Flagships",
        desc: "Direct coordination with national retail, hospitality, and corporate brands for tailored real estate."
      },
      {
        title: "Investor Syndicates",
        desc: "Curated co-investment syndicates for evaluated real-estate opportunities."
      },
      {
        title: "Strategic Advisory",
        desc: "Ongoing consultation for corporate entities re-aligning their Delhi-NCR real-estate footprints."
      }
    ]
  }
};

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const serviceKey = slug || "residential";
  const service = serviceDetailsData[serviceKey] || serviceDetailsData.residential;

  return (
    <div className="service-detail-page">
      <SEO
        title={`${service.title} | Singh Builder's Practice`}
        description={service.tagline}
      />

      {/* Header Banner */}
      <section className="service-detail-hero">
        <div className="service-hero-img-wrap">
          <img src={service.heroImage} alt={service.title} className="service-hero-img" />
          <div className="service-hero-overlay" />
        </div>

        <Container className="service-hero-container">
          <div className="service-hero-breadcrumbs">
            <Link to="/services" className="back-link">
              <ArrowLeft size={16} />
              <span>All Practices</span>
            </Link>
          </div>

          <span className="editorial-label editorial-label-dark">
            PRACTICE {service.number}
          </span>
          <h1 className="service-hero-title">{service.title}</h1>
          <p className="service-hero-tagline">{service.tagline}</p>
        </Container>
      </section>

      {/* Overview & Scope */}
      <section className="section-pad service-overview-section">
        <Container>
          <div className="service-overview-grid">
            <div className="service-overview-text">
              <span className="editorial-label">COMPREHENSIVE PRACTICE</span>
              <h2 className="service-overview-heading">Understanding the Opportunity</h2>
              <p className="service-overview-body">{service.overview}</p>

              <div className="service-trust-note">
                <ShieldCheck size={20} className="trust-icon" />
                <div>
                  <span className="trust-title">Relationship-Led Standard</span>
                  <span className="trust-desc">
                    Every mandate is handled with discretion, legal diligence, and direct accountability.
                  </span>
                </div>
              </div>
            </div>

            {/* Scope Pillars */}
            <div className="service-pillars-col">
              <h3 className="pillars-heading">Practice Focus Areas</h3>
              <div className="pillars-list">
                {service.pillars.map((p, i) => (
                  <div key={i} className="pillar-item-card">
                    <div className="pillar-card-num">0{i + 1}</div>
                    <div className="pillar-card-content">
                      <h4 className="pillar-item-title">{p.title}</h4>
                      <p className="pillar-item-desc">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Embedded Requirement Form */}
      <section className="section-pad section-surface service-form-section">
        <Container narrow>
          <RequirementForm
            title={`Discuss Your ${service.title} Requirement`}
            subtitle="Share your intended scope and our team will coordinate matching verified opportunities."
            initialValues={{
              interestType:
                serviceKey === "commercial"
                  ? "Commercial"
                  : serviceKey === "developers"
                  ? "Development Opportunity"
                  : serviceKey === "partnerships"
                  ? "Partnership"
                  : "Residential"
            }}
          />
        </Container>
      </section>
    </div>
  );
}
