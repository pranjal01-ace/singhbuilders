import React from "react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { siteConfig } from "../../data/siteData";
import {
  Compass,
  Search,
  Users2,
  Scale,
  MessagesSquare,
  ShieldCheck
} from "lucide-react";
import "./HowWeWork.css";

const stepIcons = [
  Compass,
  Search,
  Users2,
  Scale,
  MessagesSquare,
  ShieldCheck
];

export default function HowWeWork() {
  return (
    <section className="section-pad section-dark how-we-work-section" aria-label="Methodology and Approach">
      <Container>
        <SectionHeading
          label="05 — SIGNATURE METHODOLOGY"
          title="How We Work"
          subtitle="A relationship-led approach to real estate. We don't push listings; we build an architecture of genuine understanding and enduring trust."
          align="center"
          theme="dark"
        />

        {/* Steps Flow Grid */}
        <div className="how-we-work-grid">
          {siteConfig.howWeWork.map((step, index) => {
            const IconComponent = stepIcons[index] || Compass;
            return (
              <div key={step.number} className="work-step-card">
                {/* Watermark Giant Number */}
                <span className="step-watermark">{step.number}</span>

                <div className="step-card-header">
                  <div className="step-icon-wrap">
                    <IconComponent size={20} />
                  </div>
                  <span className="step-label">PHASE {step.number}</span>
                </div>

                <h3 className="step-card-title">{step.title}</h3>
                <p className="step-card-summary">{step.summary}</p>
                <p className="step-card-detail">{step.description}</p>

                <div className="step-card-indicator" />
              </div>
            );
          })}
        </div>

        {/* Central Brand Axiom */}
        <div className="how-we-work-banner">
          <div className="axiom-badge">CORE FOUNDATION</div>
          <div className="axiom-equation">
            <span>People</span>
            <span className="equation-plus">+</span>
            <span>Requirements</span>
            <span className="equation-plus">+</span>
            <span>Relationships</span>
            <span className="equation-plus">+</span>
            <span>Useful Spaces</span>
            <span className="equation-plus">+</span>
            <span>Opportunities</span>
          </div>
          <p className="axiom-subtext">
            &ldquo;We don't simply display property. We understand requirements, connect
            people with opportunities, coordinate relationships, and build trust.&rdquo;
          </p>
        </div>
      </Container>
    </section>
  );
}
