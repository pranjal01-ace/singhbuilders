import React from "react";
import Container from "../components/ui/Container";
import SEO from "../components/ui/SEO";
import { siteConfig } from "../data/siteData";

export default function TermsPage() {
  return (
    <div className="legal-page" style={{ paddingTop: "var(--header-height)", backgroundColor: "var(--color-ivory)", minHeight: "80vh" }}>
      <SEO
        title="Terms & Conditions | Singh Builder's"
        description="Terms and conditions for utilizing the Singh Builder's discovery and advisory services."
      />
      <section style={{ backgroundColor: "var(--color-charcoal)", color: "var(--color-white)", padding: "4rem 0" }}>
        <Container narrow>
          <span className="editorial-label">LEGAL &amp; COMPLIANCE</span>
          <h1 style={{ color: "var(--color-white)", margin: "0.5rem 0" }}>Terms &amp; Conditions</h1>
          <p style={{ color: "rgba(255,255,255,0.75)" }}>Effective Date: September 2026</p>
        </Container>
      </section>

      <section className="section-pad">
        <Container narrow>
          <div style={{ backgroundColor: "var(--color-white)", border: "1px solid var(--color-border)", padding: "clamp(2rem, 4vw, 3.5rem)", borderRadius: "var(--radius-xs)" }}>
            <h3 style={{ marginBottom: "1rem", color: "var(--color-charcoal)" }}>1. Advisory &amp; Discovery Services</h3>
            <p style={{ marginBottom: "1.5rem" }}>
              {siteConfig.name} operates as a builder, developer, and real-estate advisory enterprise established in 2007. Information presented on this website is for requirement capture, strategic introduction, and preliminary orientation.
            </p>

            <h3 style={{ marginBottom: "1rem", color: "var(--color-charcoal)" }}>2. Independent Due Diligence</h3>
            <p style={{ marginBottom: "1.5rem" }}>
              While {siteConfig.name} coordinates rigorous verification of titles and approvals, all property purchasers and institutional partners are advised to conduct independent legal, financial, and regulatory checks prior to formal agreements.
            </p>

            <h3 style={{ marginBottom: "1rem", color: "var(--color-charcoal)" }}>3. Intellectual Property</h3>
            <p style={{ marginBottom: "1.5rem" }}>
              All brand marks, editorial structures, custom copy, and design architecture on this website are the property of {siteConfig.name}. Unauthorized reproduction is prohibited.
            </p>

            <h3 style={{ marginBottom: "1rem", color: "var(--color-charcoal)" }}>4. Jurisdiction</h3>
            <p>
              Any disputes arising in connection with services rendered through this portal are subject to the exclusive jurisdiction of the competent courts in New Delhi, India.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
