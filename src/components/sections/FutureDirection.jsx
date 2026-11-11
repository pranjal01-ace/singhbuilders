import React from "react";
import Container from "../ui/Container";
import { siteConfig } from "../../data/siteData";
import { HeartHandshake, Award, Sparkles } from "lucide-react";
import "./FutureDirection.css";

const pillarIcons = [HeartHandshake, Award, Sparkles];

export default function FutureDirection() {
  const { futureDirection } = siteConfig;

  return (
    <section className="section-pad section-dark future-direction-section" aria-label="Future Direction">
      <Container>
        <div className="future-direction-header">
          <span className="editorial-label editorial-label-dark">09 — FORWARD HORIZON</span>
          <h2 className="future-section-title">{futureDirection.heading}</h2>
          <p className="future-statement-headline">
            &ldquo;{futureDirection.statement}&rdquo;
          </p>
        </div>

        <div className="future-pillars-grid">
          {futureDirection.pillars.map((pillar, i) => {
            const Icon = pillarIcons[i] || Sparkles;
            return (
              <div key={i} className="future-pillar-card">
                <div className="future-pillar-icon-wrap">
                  <Icon size={22} />
                </div>
                <span className="future-pillar-num">PILLAR 0{i + 1}</span>
                <h3 className="future-pillar-title">{pillar.title}</h3>
                <p className="future-pillar-desc">{pillar.description}</p>
                <div className="future-pillar-bar" />
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
