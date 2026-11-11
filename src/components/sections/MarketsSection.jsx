import React from "react";
import { Link } from "react-router-dom";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { siteConfig } from "../../data/siteData";
import { ArrowUpRight, MapPin, Check } from "lucide-react";
import "./MarketsSection.css";

const marketImages = {
  "south-delhi": "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80",
  "delhi": "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80",
  "gurugram": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
};

export default function MarketsSection() {
  return (
    <section className="section-pad markets-section" aria-label="Our Operating Markets">
      <Container>
        <SectionHeading
          label="06 — OPERATING TERRITORIES"
          title="Our Markets"
          subtitle="Deep regional expertise concentrated in three premier NCR corridors."
          align="center"
        />

        <div className="markets-grid">
          {siteConfig.markets.map((market) => (
            <div key={market.id} className="market-card">
              <div className="market-img-wrap">
                <img
                  src={marketImages[market.slug]}
                  alt={`${market.name} architecture`}
                  className="market-img"
                  loading="lazy"
                />
                <div className="market-overlay" />
                <div className="market-tag">
                  <MapPin size={13} />
                  <span>{market.name.toUpperCase()}</span>
                </div>
              </div>

              <div className="market-body">
                <span className="editorial-label">CORRIDOR</span>
                <h3 className="market-name">{market.name}</h3>
                <p className="market-subtitle-text">{market.subtitle}</p>
                <p className="market-desc">{market.description}</p>

                <div className="market-highlights">
                  {market.highlights.map((h, i) => (
                    <div key={i} className="market-highlight-item">
                      <Check size={14} className="highlight-check" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="market-card-footer">
                  <Link to={market.route} className="market-action-link">
                    <span>Explore {market.name}</span>
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
