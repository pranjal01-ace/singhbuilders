import React from "react";
import Container from "../components/ui/Container";
import SectionHeading from "../components/ui/SectionHeading";
import PartnershipForm from "../components/forms/PartnershipForm";
import SEO from "../components/ui/SEO";
import { Building2, Sparkles, TrendingUp, Handshake, CheckCircle2 } from "lucide-react";
import "./PartnershipsPage.css";

const categories = [
  {
    icon: Building2,
    tag: "DEVELOPERS & BUILDERS",
    title: "Looking for a trusted real-estate relationship?",
    desc: "We partner with regional and national builders across Delhi-NCR to structure joint developments, refine unit configurations, assess land parcels, and present verified buyer mandates.",
    benefits: [
      "Targeted buyer requirement alignment",
      "Confidential land parcel structuring",
      "Reputable brand association"
    ]
  },
  {
    icon: Sparkles,
    tag: "BRANDS & RETAILERS",
    title: "Explore collaboration opportunities.",
    desc: "We assist retail, lifestyle, and corporate brands in securing high-visibility flagship locations, high-street retail spaces, and boutique headquarters in prime corridors.",
    benefits: [
      "Footfall and transit catchment analysis",
      "Long-term commercial lease evaluation",
      "Strategic presence in South Delhi & Gurugram"
    ]
  },
  {
    icon: TrendingUp,
    tag: "INVESTORS & CAPITAL",
    title: "Discuss potential opportunities.",
    desc: "For family offices, HNI investors, and institutional funds seeking disciplined property exposure with transparent due diligence, rental yields, and capital growth.",
    benefits: [
      "Strict legal title verification",
      "Commercial yield evaluation",
      "Generational wealth preservation"
    ]
  },
  {
    icon: Handshake,
    tag: "STRATEGIC PARTNERS",
    title: "Let's create mutually aligned opportunities.",
    desc: "We build enduring alliances with architects, legal advisors, financial syndicates, and corporate networks to deliver comprehensive real-estate solutions.",
    benefits: [
      "Synergistic co-advisory relationships",
      "Transparent professional collaboration",
      "Established network operating since 2007"
    ]
  }
];

export default function PartnershipsPage() {
  return (
    <div className="partnerships-page">
      <SEO
        title="Strategic Partnerships | Singh Builder's"
        description="Let's build together. Strategic alliances with developers, brands, investors, and business partners across Delhi and Gurugram."
      />

      <section className="partnerships-hero">
        <Container>
          <div className="partnerships-hero-content">
            <span className="editorial-label">STRATEGIC ALLIANCES</span>
            <h1 className="partnerships-hero-title">Let's Build Together.</h1>
            <p className="partnerships-hero-subtitle">
              We believe meaningful real-estate opportunities are built through strong
              relationships, aligned objectives, and shared long-term value.
            </p>
          </div>
        </Container>
      </section>

      {/* 4 Partnership Categories Deep Grid */}
      <section className="section-pad partners-categories-section">
        <Container>
          <SectionHeading
            label="COLLABORATION CATEGORIES"
            title="Who We Partner With"
            subtitle="Four distinct stakeholder networks designed for sustainable real-estate development and asset growth."
            align="center"
          />

          <div className="partner-categories-deep-grid">
            {categories.map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={i} className="partner-cat-card">
                  <div className="cat-card-header">
                    <div className="cat-icon-wrap">
                      <Icon size={22} />
                    </div>
                    <span className="cat-tag">{c.tag}</span>
                  </div>

                  <h3 className="cat-card-title">{c.title}</h3>
                  <p className="cat-card-desc">{c.desc}</p>

                  <div className="cat-benefits-list">
                    {c.benefits.map((b, idx) => (
                      <div key={idx} className="cat-benefit-item">
                        <CheckCircle2 size={15} />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Embedded Partnership Form */}
      <section className="section-pad section-surface partners-form-section">
        <Container narrow>
          <PartnershipForm />
        </Container>
      </section>
    </div>
  );
}
