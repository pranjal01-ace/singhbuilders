import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import Container from "../components/ui/Container";
import RequirementForm from "../components/forms/RequirementForm";
import SEO from "../components/ui/SEO";
import { siteConfig } from "../data/siteData";
import { formatPhone } from "../utils/formatters";
import { ShieldCheck, Phone } from "lucide-react";
import "./RequirementPage.css";

export default function RequirementPage() {
  const location = useLocation();

  // Parse search parameters
  const initialFormValues = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    const cat = searchParams.get("category");
    const loc = searchParams.get("location");
    const purpose = searchParams.get("purpose");
    const budget = searchParams.get("budget");
    const ref = searchParams.get("ref");

    const mappedInterest =
      cat === "commercial"
        ? "Commercial"
        : purpose === "Invest"
        ? "Investment"
        : purpose === "Business"
        ? "Commercial"
        : "Residential";

    const initial = {};
    if (mappedInterest) initial.interestType = mappedInterest;
    if (loc) initial.preferredLocation = loc;
    if (budget) initial.budget = budget;
    if (ref) initial.requirement = `Inquiring regarding curated opportunity reference: ${ref}`;

    return initial;
  }, [location.search]);

  return (
    <div className="requirement-page">
      <SEO
        title="Discuss Your Requirement | Singh Builder's"
        description="Tell us what you're looking for. Our team will understand your exact requirements and connect you with the right opportunity across Delhi and Gurugram."
      />

      <section className="requirement-hero">
        <Container>
          <div className="requirement-hero-content">
            <span className="editorial-label">BESPOKE DISCOVERY</span>
            <h1 className="requirement-hero-title">Tell Us What You're Looking For</h1>
            <p className="requirement-hero-subtitle">
              We don't believe in pushing hundreds of generic property listings. Tell us
              your spatial vision, timeline, and financial framework, and we will identify
              the right verified opportunity.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-pad requirement-body-section">
        <Container>
          <div className="requirement-layout-grid">
            {/* Left: The Form */}
            <div className="requirement-form-col">
              <RequirementForm
                initialValues={initialFormValues}
                title="Property &amp; Space Mandate"
                subtitle="Complete this form to submit your mandate directly to Singh Builder's advisory team."
              />
            </div>

            {/* Right: How It Works & Direct Contact */}
            <div className="requirement-sidebar-col">
              <div className="req-process-box">
                <span className="editorial-label">THE EXPERIENCE</span>
                <h3 className="process-box-title">What Happens Next</h3>

                <div className="process-steps-list">
                  <div className="p-step-item">
                    <span className="p-step-num">01</span>
                    <div>
                      <h4 className="p-step-title">Mandate Review</h4>
                      <p className="p-step-desc">
                        Our leadership directly reviews your spatial and locational parameters.
                      </p>
                    </div>
                  </div>

                  <div className="p-step-item">
                    <span className="p-step-num">02</span>
                    <div>
                      <h4 className="p-step-title">Shortlist Verification</h4>
                      <p className="p-step-desc">
                        We screen verified Delhi &amp; Gurugram inventory matching your criteria.
                      </p>
                    </div>
                  </div>

                  <div className="p-step-item">
                    <span className="p-step-num">03</span>
                    <div>
                      <h4 className="p-step-title">Direct Consultation</h4>
                      <p className="p-step-desc">
                        A senior advisor presents clear options with objective legal and pricing diligence.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="process-assurance">
                  <ShieldCheck size={20} className="assurance-icon" />
                  <p>
                    Strict privacy. We do not distribute your contact information or engage in
                    unsolicited telemarketing.
                  </p>
                </div>
              </div>

              {/* Direct Urgent Assistance Box */}
              <div className="req-urgent-box">
                <h4 className="urgent-title">Prefer to Speak Directly?</h4>
                <p className="urgent-desc">
                  Our advisors are available for direct telephone consultation:
                </p>
                <div className="urgent-phone-list">
                  {siteConfig.phones.map((phone) => (
                    <a key={phone} href={`tel:${phone}`} className="urgent-phone-btn">
                      <Phone size={15} />
                      <span>{formatPhone(phone)}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
