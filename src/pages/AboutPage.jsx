import React from "react";
import Container from "../components/ui/Container";
import SectionHeading from "../components/ui/SectionHeading";
import LeadershipCard from "../components/sections/LeadershipCard";
import Button from "../components/ui/Button";
import SEO from "../components/ui/SEO";
import { siteConfig } from "../data/siteData";
import { Shield, CheckCircle2, ArrowRight } from "lucide-react";
import "./AboutPage.css";

const journeyMilestones = [
  {
    phase: "01",
    year: "2007",
    title: "Foundation",
    description: "Singh Builder's was established on 7 July 2007 under the visionary leadership of Mr. Dildar Singh, built upon transparent real-estate ethics."
  },
  {
    phase: "02",
    year: "2007 – 2018",
    title: "Market Relationships",
    description: "Deepening rooted networks across South Delhi, Central Delhi, and Gurugram with landowners, developers, and discerning clients."
  },
  {
    phase: "03",
    year: "2018 – Present",
    title: "Present Leadership",
    description: "Advancing into modern residential floors, commercial investment spaces, and strategic developer collaborations under Mr. Varun Singh."
  },
  {
    phase: "04",
    year: "Horizon",
    title: "Future Growth",
    description: "Pioneering requirement-driven discovery, digital transparency, and institutional partnerships across Delhi-NCR's premier corridors."
  }
];

export default function AboutPage() {
  return (
    <div className="about-page">
      <SEO
        title="About Us | Singh Builder's — Built on Trust Since 2007"
        description="Established on 7 July 2007 under Mr. Dildar Singh, Singh Builder's provides relationship-led residential and commercial real estate across Delhi and Gurugram."
      />

      {/* Page Hero */}
      <section className="about-hero">
        <Container>
          <div className="about-hero-content">
            <span className="editorial-label">ESTABLISHED 7 JULY 2007</span>
            <h1 className="about-hero-title">A Journey Built on Trust.</h1>
            <p className="about-hero-subtitle">
              For nearly two decades, Singh Builder's has stood as a steady, trusted bridge
              in Delhi-NCR real estate—guiding individuals, families, and businesses to
              meaningful spaces.
            </p>
          </div>
        </Container>
      </section>

      {/* Our Foundation & Philosophy Section */}
      <section className="section-pad about-beginning-section">
        <Container>
          <div className="about-beginning-grid">
            <div className="beginning-text-col">
              <SectionHeading
                label="OUR FOUNDATION & PHILOSOPHY"
                title="Built on Trust, Guided by Purpose"
              />
              <p className="beginning-lead">
                Rooted in the heart of South Delhi, Singh Builders was founded with a clear vision:
                to redefine real estate through trust, transparency, and a client-first approach.
                From the very beginning, our philosophy has been simple: properties are never just
                commodities; every client's requirement is a responsibility we uphold with utmost
                dedication.
              </p>
              <p className="beginning-body">
                Guided by uncompromising integrity, transparent property evaluations, and consistent
                communication, we have built relationships that extend beyond transactions. Our
                commitment to excellence has enabled us to cultivate lasting, generational relationships
                across both residential and commercial real estate.
              </p>
              <p className="beginning-body">
                At Singh Builders, we don't just build spaces or facilitate investments, we build trust,
                create opportunities, and establish relationships that stand the test of time.
              </p>

              <div className="beginning-features">
                <div className="b-feature">
                  <CheckCircle2 size={16} className="b-feature-icon" />
                  <span>Relationship-Led Approach</span>
                </div>
                <div className="b-feature">
                  <CheckCircle2 size={16} className="b-feature-icon" />
                  <span>Bespoke Requirement Matching</span>
                </div>
                <div className="b-feature">
                  <CheckCircle2 size={16} className="b-feature-icon" />
                  <span>Verified Legal &amp; Architectural Clarity</span>
                </div>
              </div>
            </div>

            <div className="beginning-visual-col">
              <div className="beginning-img-card">
                <img
                  src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80"
                  alt="Architectural heritage and modern structures in Delhi"
                  className="beginning-img"
                  loading="lazy"
                />
                <div className="beginning-badge">
                  <Shield size={18} />
                  <div>
                    <span className="b-badge-title">ESTABLISHED 2007</span>
                    <span className="b-badge-sub">Delhi-NCR Real Estate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Journey Timeline */}
      <section className="section-pad section-surface about-journey-section">
        <Container>
          <SectionHeading
            label="THE TIMELINE"
            title="Our Four-Stage Journey"
            subtitle="From foundation to sustainable expansion across Delhi and Gurugram."
            align="center"
          />

          <div className="journey-timeline">
            {journeyMilestones.map((m, idx) => (
              <div key={idx} className="timeline-node">
                <div className="timeline-marker">
                  <span className="marker-number">{m.phase}</span>
                </div>
                <div className="timeline-card">
                  <span className="timeline-year">{m.year}</span>
                  <h3 className="timeline-title">{m.title}</h3>
                  <p className="timeline-desc">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Leadership Section */}
      <section className="section-pad about-leadership-section">
        <Container>
          <SectionHeading
            label="THE STEWARDS"
            title="Company Leadership"
            subtitle="Guiding Singh Builder's with clarity, market knowledge, and unyielding commitment to client interests."
            align="center"
          />

          <div className="leadership-cards-grid">
            {siteConfig.leadership.map((leader, i) => (
              <LeadershipCard key={i} leader={leader} />
            ))}
          </div>
        </Container>
      </section>

      {/* Call to Action Banner */}
      <section className="about-cta-banner">
        <Container>
          <div className="about-cta-box">
            <span className="editorial-label editorial-label-dark">LET'S CONNECT</span>
            <h2 className="about-cta-title">Experience the Singh Builder's Difference</h2>
            <p className="about-cta-subtitle">
              Whether you are looking to purchase, invest, develop, or partner, we welcome the
              opportunity to understand your vision.
            </p>
            <div className="about-cta-btns">
              <Button to="/requirement" variant="brass" size="lg">
                <span>Discuss Your Requirement</span>
                <ArrowRight size={16} />
              </Button>
              <Button to="/contact" variant="dark-outline" size="lg">
                Contact Our Office
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
