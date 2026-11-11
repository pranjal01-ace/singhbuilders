import React from "react";
import Container from "../components/ui/Container";
import SEO from "../components/ui/SEO";
import { siteConfig } from "../data/siteData";

export default function PrivacyPolicyPage() {
  return (
    <div className="legal-page" style={{ paddingTop: "var(--header-height)", backgroundColor: "var(--color-ivory)", minHeight: "80vh" }}>
      <SEO
        title="Privacy Policy | Singh Builder's"
        description="Privacy policy and data protection principles of Singh Builder's."
      />
      <section style={{ backgroundColor: "var(--color-charcoal)", color: "var(--color-white)", padding: "4rem 0" }}>
        <Container narrow>
          <span className="editorial-label">LEGAL &amp; COMPLIANCE</span>
          <h1 style={{ color: "var(--color-white)", margin: "0.5rem 0" }}>Privacy Policy</h1>
          <p style={{ color: "rgba(255,255,255,0.75)" }}>Last updated: September 2026</p>
        </Container>
      </section>

      <section className="section-pad">
        <Container narrow>
          <div style={{ backgroundColor: "var(--color-white)", border: "1px solid var(--color-border)", padding: "clamp(2rem, 4vw, 3.5rem)", borderRadius: "var(--radius-xs)" }}>
            <h3 style={{ marginBottom: "1rem", color: "var(--color-charcoal)" }}>1. Our Commitment to Discretion</h3>
            <p style={{ marginBottom: "1.5rem" }}>
              At {siteConfig.name}, we hold client confidentiality as an uncompromising principle. Any contact information, property criteria, or financial framework shared with us is used strictly for requirement-led real estate advisory and direct communications.
            </p>

            <h3 style={{ marginBottom: "1rem", color: "var(--color-charcoal)" }}>2. Information Collection</h3>
            <p style={{ marginBottom: "1.5rem" }}>
              We collect information provided voluntarily when you submit a property mandate, partnership inquiry, or contact form. This includes your name, contact phone number, email address, preferred locations across Delhi-NCR, and specific spatial requirements.
            </p>

            <h3 style={{ marginBottom: "1rem", color: "var(--color-charcoal)" }}>3. No Unsolicited Distribution</h3>
            <p style={{ marginBottom: "1.5rem" }}>
              We do not sell, rent, or distribute your private contact details to external marketing agencies or third-party lead generation aggregators.
            </p>

            <h3 style={{ marginBottom: "1rem", color: "var(--color-charcoal)" }}>4. Contact for Privacy Inquiries</h3>
            <p>
              If you have any questions regarding your information or wish to update your mandate, please reach out directly to us at{" "}
              <a href={`mailto:${siteConfig.email}`} style={{ color: "var(--color-brass)", fontWeight: 500 }}>
                {siteConfig.email}
              </a>{" "}
              or by phone at {siteConfig.primaryPhone}.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
