import React from "react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import { Handshake, Building2, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import "./PartnershipsSection.css";

const categories = [
  {
    icon: Building2,
    title: "DEVELOPERS",
    question: "Looking for a trusted real-estate relationship?",
    detail: "Collaborate on project positioning, verified client mandates, land syndication, and ethical representation."
  },
  {
    icon: Sparkles,
    title: "BRANDS",
    question: "Explore collaboration opportunities.",
    detail: "Discover high-visibility retail locations, corporate flags, and bespoke commercial destinations across Delhi-NCR."
  },
  {
    icon: TrendingUp,
    title: "INVESTORS",
    question: "Discuss potential opportunities.",
    detail: "Access evaluated residential plots, builder floor developments, and commercial yield assets vetted for legal safety."
  },
  {
    icon: Handshake,
    title: "BUSINESS PARTNERS",
    question: "Let's create mutually aligned opportunities.",
    detail: "Unite cross-industry capital, architecture, and advisory capabilities with our established 2007 network."
  }
];

export default function PartnershipsSection() {
  return (
    <section className="section-pad partnerships-section" aria-label="Partnerships Section">
      <Container>
        <div className="partnerships-header-wrap">
          <SectionHeading
            label="07 — STRATEGIC ALLIANCES"
            title="Let's Build Together."
            subtitle="We believe meaningful real-estate opportunities are built through strong relationships."
            align="center"
          />
        </div>

        <div className="partnerships-categories-grid">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div key={i} className="partnership-box">
                <div className="partnership-icon-wrap">
                  <Icon size={22} />
                </div>
                <h3 className="partnership-title">{cat.title}</h3>
                <p className="partnership-question">{cat.question}</p>
                <p className="partnership-detail">{cat.detail}</p>
                <div className="partnership-box-accent" />
              </div>
            );
          })}
        </div>

        <div className="partnerships-cta-row">
          <Button to="/partnerships" variant="primary" size="lg">
            <span>Start a Conversation</span>
            <ArrowRight size={16} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
