import React from "react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { siteConfig } from "../../data/siteData";
import { Eye, Target } from "lucide-react";
import "./ValuesSection.css";

export default function ValuesSection() {
  return (
    <section className="section-pad values-section" aria-label="Vision Mission and Values">
      <Container>
        {/* Vision & Mission Split Cards */}
        <div className="vision-mission-grid">
          <div className="vm-card">
            <div className="vm-icon-row">
              <Eye size={20} className="vm-icon" />
              <span className="editorial-label">LONG-TERM ASPIRATION</span>
            </div>
            <h3 className="vm-title">Our Vision</h3>
            <p className="vm-text">{siteConfig.vision}</p>
          </div>

          <div className="vm-card">
            <div className="vm-icon-row">
              <Target size={20} className="vm-icon" />
              <span className="editorial-label">DAILY PURPOSE</span>
            </div>
            <h3 className="vm-title">Our Mission</h3>
            <p className="vm-text">{siteConfig.mission}</p>
          </div>
        </div>

        {/* Six Elegant Core Values */}
        <div className="values-header-wrap">
          <SectionHeading
            label="08 — GUIDING PRINCIPLES"
            title="Our Values"
            subtitle="The enduring standards governing every client engagement, developer handshake, and spatial recommendation since 2007."
            align="center"
          />
        </div>

        <div className="values-grid">
          {siteConfig.values.map((val, idx) => (
            <div key={idx} className="value-item">
              <div className="value-header">
                <span className="value-num">0{idx + 1}</span>
                <span className="value-accent-line" />
              </div>
              <h4 className="value-title">{val.title}</h4>
              <p className="value-desc">{val.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
