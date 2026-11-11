import React from "react";
import Container from "../components/ui/Container";
import SEO from "../components/ui/SEO";
import { siteConfig } from "../data/siteData";

export default function DisclaimerPage() {
  return (
    <div className="legal-page" style={{ paddingTop: "var(--header-height)", backgroundColor: "var(--color-ivory)", minHeight: "80vh" }}>
      <SEO
        title="Disclaimer | Singh Builder's"
        description="Legal disclaimer regarding real estate offerings and informational material."
      />
      <section style={{ backgroundColor: "var(--color-charcoal)", color: "var(--color-white)", padding: "4rem 0" }}>
        <Container narrow>
          <span className="editorial-label">LEGAL &amp; COMPLIANCE</span>
          <h1 style={{ color: "var(--color-white)", margin: "0.5rem 0" }}>Disclaimer</h1>
          <p style={{ color: "rgba(255,255,255,0.75)" }}>General Notice</p>
        </Container>
      </section>

      <section className="section-pad">
        <Container narrow>
          <div style={{ backgroundColor: "var(--color-white)", border: "1px solid var(--color-border)", padding: "clamp(2rem, 4vw, 3.5rem)", borderRadius: "var(--radius-xs)" }}>
            <h3 style={{ marginBottom: "1rem", color: "var(--color-charcoal)" }}>Informational Purpose Only</h3>
            <p style={{ marginBottom: "1.5rem" }}>
              The visual illustrations, architectural renders, and written descriptions on this website are conceptual and meant for illustrative representation. They do not constitute an offer, warranty, or contractual commitment on behalf of {siteConfig.name}.
            </p>

            <h3 style={{ marginBottom: "1rem", color: "var(--color-charcoal)" }}>No Invented Project Claims</h3>
            <p style={{ marginBottom: "1.5rem" }}>
              {siteConfig.name} does not publish unsubstantiated inventory claims. All project offerings are reviewed on a mandate-specific basis with verified documentation, sanctioned layout plans, and relevant statutory approvals.
            </p>

            <h3 style={{ marginBottom: "1rem", color: "var(--color-charcoal)" }}>Statutory Compliance (RERA)</h3>
            <p>
              Wherever applicable under the Real Estate (Regulation and Development) Act, relevant project RERA registration details are verified directly before initiating transaction contracts.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
