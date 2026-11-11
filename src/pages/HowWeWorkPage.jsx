import React from "react";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import SEO from "../components/ui/SEO";
import { siteConfig } from "../data/siteData";
import { Compass, Search, Users2, Scale, MessagesSquare, ShieldCheck, ArrowRight } from "lucide-react";
import "./HowWeWorkPage.css";

const stepIcons = [Compass, Search, Users2, Scale, MessagesSquare, ShieldCheck];

export default function HowWeWorkPage() {
  return (
    <div className="how-we-work-page">
      <SEO
        title="How We Work | Singh Builder's Methodology"
        description="A relationship-led approach to real estate across Delhi and Gurugram: Understand, Identify, Connect, Evaluate, Coordinate, Build Trust."
      />

      <section className="hww-hero">
        <Container>
          <div className="hww-hero-content">
            <span className="editorial-label">PHILOSOPHY &amp; PROCESS</span>
            <h1 className="hww-hero-title">A Relationship-Led Approach to Real Estate</h1>
            <p className="hww-hero-subtitle">
              We reject the volume-driven portal model. Real estate is built on enduring
              relationships, rigorous due diligence, and finding spaces that fulfill genuine human intent.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-pad hww-stages-section">
        <Container>
          <div className="hww-stages-stack">
            {siteConfig.howWeWork.map((step, idx) => {
              const Icon = stepIcons[idx] || Compass;
              return (
                <div key={step.number} className="hww-stage-card">
                  <div className="hww-stage-num-col">
                    <span className="hww-giant-number">{step.number}</span>
                  </div>

                  <div className="hww-stage-content-col">
                    <div className="hww-stage-badge">
                      <Icon size={16} />
                      <span>PHASE {step.number}</span>
                    </div>

                    <h2 className="hww-stage-name">{step.title}</h2>
                    <h3 className="hww-stage-summary">{step.summary}</h3>
                    <p className="hww-stage-body">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Axiom Section */}
          <div className="hww-axiom-container">
            <span className="editorial-label">THE CORE EQUATION</span>
            <h3 className="axiom-title">People &bull; Requirements &bull; Relationships &bull; Useful Spaces &bull; Opportunities</h3>
            <p className="axiom-quote">
              &ldquo;We don't simply display property. We understand requirements, connect people
              with opportunities, coordinate relationships, and build trust.&rdquo;
            </p>
            <Button to="/requirement" variant="primary" size="lg" className="axiom-btn">
              <span>Discuss Your Requirement</span>
              <ArrowRight size={16} />
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
