import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { submitPartnershipEnquiry } from "../../services/partnershipService";
import { CheckCircle2, AlertCircle, Handshake, ShieldCheck } from "lucide-react";
import "./PartnershipForm.css";

const partnerTypes = [
  "Developer / Landowner",
  "Corporate Brand / Retail",
  "Institutional / HNI Investor",
  "Strategic Business Partner"
];

export default function PartnershipForm({ className = "" }) {
  const [formData, setFormData] = useState({
    partnerType: "Developer / Landowner",
    organization: "",
    contactPerson: "",
    phone: "",
    email: "",
    scope: ""
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.contactPerson.trim()) {
      errs.contactPerson = "Contact person name is required.";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required.";
    }
    if (!formData.email.trim()) {
      errs.email = "Email address is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = "Please enter a valid email address.";
      }
    }
    if (!formData.scope.trim()) {
      errs.scope = "Please describe the collaboration or partnership scope.";
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setStatus("loading");
      const res = await submitPartnershipEnquiry(formData);
      if (res.success) {
        setStatus("success");
        setStatusMessage(res.message);
      } else {
        setStatus("error");
        setStatusMessage(res.message || "Failed to submit partnership enquiry.");
      }
    } catch (err) {
      setStatus("error");
      setStatusMessage("An unexpected error occurred. Please try contacting us by phone.");
    }
  };

  if (status === "success") {
    return (
      <div className={`partnership-form-card partnership-success-state ${className}`}>
        <div className="partnership-success-icon-wrap">
          <CheckCircle2 size={44} />
        </div>
        <h3 className="success-title">Collaboration Inquiry Received</h3>
        <p className="success-body">
          {statusMessage ||
            "Thank you for reaching out. A senior partner from Singh Builder's will initiate contact to explore mutual alignment."}
        </p>
        <Button
          variant="primary"
          size="md"
          onClick={() => {
            setStatus("idle");
            setFormData({
              partnerType: "Developer / Landowner",
              organization: "",
              contactPerson: "",
              phone: "",
              email: "",
              scope: ""
            });
          }}
        >
          Submit Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <div className={`partnership-form-card ${className}`}>
      <div className="partnership-form-header">
        <span className="editorial-label">INSTITUTIONAL &amp; BUILDER ALLIANCES</span>
        <h3 className="partner-form-title">Initiate a Strategic Partnership</h3>
        <p className="partner-form-subtitle">
          Connect directly with business leadership to explore land syndication, brand
          flagships, or capital deployment.
        </p>
      </div>

      {status === "error" && (
        <div className="form-alert form-alert-error" role="alert">
          <AlertCircle size={18} />
          <span>{statusMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="partner-type-selector">
          <label className="form-label">
            PARTNER CATEGORY <span className="required-star">*</span>
          </label>
          <div className="partner-pills">
            {partnerTypes.map((type) => (
              <button
                key={type}
                type="button"
                className={`partner-pill ${
                  formData.partnerType === type ? "selected" : ""
                }`}
                onClick={() => setFormData((prev) => ({ ...prev, partnerType: type }))}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="partner-form-grid">
          <Input
            label="Organization / Entity"
            name="organization"
            placeholder="e.g. Apex Living Developers / Retail Pvt Ltd"
            value={formData.organization}
            onChange={handleChange}
            disabled={status === "loading"}
          />

          <Input
            label="Key Contact Person"
            name="contactPerson"
            placeholder="e.g. Vikram Malhotra"
            value={formData.contactPerson}
            onChange={handleChange}
            error={errors.contactPerson}
            required
            disabled={status === "loading"}
          />
        </div>

        <div className="partner-form-grid">
          <Input
            label="Contact Number"
            name="phone"
            type="tel"
            placeholder="10-digit mobile number"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            required
            disabled={status === "loading"}
          />

          <Input
            label="Official Email"
            name="email"
            type="email"
            placeholder="name@organization.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
            disabled={status === "loading"}
          />
        </div>

        <Input
          label="Scope of Proposed Collaboration"
          name="scope"
          type="textarea"
          rows={4}
          placeholder="Please outline the land parcel, project profile, commercial retail requirement, or investment objective..."
          value={formData.scope}
          onChange={handleChange}
          error={errors.scope}
          required
          disabled={status === "loading"}
        />

        <div className="partner-form-footer">
          <div className="privacy-reassurance">
            <ShieldCheck size={16} />
            <span>High-level confidentiality and direct principal review.</span>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={status === "loading"}
            className="partner-submit-btn"
          >
            <Handshake size={17} />
            <span>Submit Proposal</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
