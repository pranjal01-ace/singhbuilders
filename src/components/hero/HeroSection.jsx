import React from "react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { ArrowDown, ShieldCheck, Clock, MapPin } from "lucide-react";
import "./HeroSection.css";

export default function HeroSection() {
  const scrollToContent = () => {
    const finderEl = document.getElementById("requirement-finder-section");
    if (finderEl) {
      finderEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section" aria-label="Hero Introduction">
      {/* Background Architectural Image & Gradient Overlay */}
      <div className="hero-backdrop">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
          alt="Modern architectural residence representing premium real estate in Delhi-NCR"
          className="hero-image"
          loading="eager"
        />
        <div className="hero-overlay" />
        <div className="hero-mesh-gradient" />
      </div>

      <Container className="hero-container">
        <div className="hero-content">
          {/* Subtle Brand Statement Badge */}
          <div className="hero-badge-wrap anim-fade-down">
            <span className="hero-badge">
              <ShieldCheck size={14} className="hero-badge-icon" />
              <span>DELHI &bull; SOUTH DELHI &bull; GURUGRAM &bull; ESTD 2007</span>
            </span>
          </div>

          {/* Main Cinematic Heading */}
          <h1 className="hero-title anim-fade-up">
            REAL ESTATE.
            <span className="hero-title-accent">BUILT ON TRUST.</span>
          </h1>

          {/* Supporting Text */}
          <p className="hero-subtitle anim-fade-up">
            Residential, commercial and development opportunities across Delhi and Gurugram.
          </p>

          <div className="hero-brand-line anim-fade-up">
            &ldquo;We build the lives people want.&rdquo;
          </div>

          {/* Call to Actions */}
          <div className="hero-actions anim-fade-up">
            <Button
              to="/properties"
              variant="brass"
              size="lg"
              className="hero-primary-btn"
            >
              Explore Opportunities
            </Button>

            <Button
              to="/requirement"
              variant="dark-outline"
              size="lg"
              className="hero-secondary-btn"
            >
              Discuss Your Requirement
            </Button>
          </div>

          {/* Quick Metrics / Signals */}
          <div className="hero-indicators anim-fade-up">
            <div className="hero-indicator-item">
              <Clock size={16} className="indicator-icon" />
              <div>
                <span className="indicator-label">ESTABLISHED</span>
                <span className="indicator-val">2007 in Delhi-NCR</span>
              </div>
            </div>
            <div className="hero-indicator-divider" />
            <div className="hero-indicator-item">
              <MapPin size={16} className="indicator-icon" />
              <div>
                <span className="indicator-label">PRIMARY HUBS</span>
                <span className="indicator-val">Delhi &bull; Gurugram</span>
              </div>
            </div>
            <div className="hero-indicator-divider" />
            <div className="hero-indicator-item">
              <ShieldCheck size={16} className="indicator-icon" />
              <div>
                <span className="indicator-label">APPROACH</span>
                <span className="indicator-val">Relationship-Led</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          type="button"
          onClick={scrollToContent}
          className="hero-scroll-btn"
          aria-label="Scroll down to requirement finder"
        >
          <span className="scroll-text">DISCOVER MORE</span>
          <ArrowDown size={15} className="scroll-arrow" />
        </button>
      </Container>
    </section>
  );
}
