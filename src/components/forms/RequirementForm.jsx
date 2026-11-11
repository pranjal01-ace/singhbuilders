import React, { useState, useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { submitRequirement } from "../../services/enquiryService";
import { CheckCircle2, AlertCircle, Send, ShieldCheck } from "lucide-react";
import "./RequirementForm.css";

const interestTypes = [
  "Residential",
  "Commercial",
  "Investment",
  "Partnership",
  "Development Opportunity"
];

const preferredLocations = [
  "South Delhi",
  "Delhi (Central / West / North / South)",
  "Gurugram (Golf Course / Extn / Cyber City / SPR)",
  "Delhi-NCR (Flexible)"
];

const budgetRanges = [
  "Select Budget Range",
  "Under ₹ 2 Cr",
  "₹ 2 Cr – ₹ 5 Cr",
  "₹ 5 Cr – ₹ 10 Cr",
  "₹ 10 Cr – ₹ 25 Cr",
  "₹ 25 Cr – ₹ 50 Cr",
  "₹ 50 Cr+"
];

export default function RequirementForm({
  initialValues = {},
  title = "Tell Us What You're Looking For",
  subtitle = "Direct mandate submission. Our leadership and advisory team will review your specifications.",
  className = ""
}) {
  const [formData, setFormData] = useState({
    interestType: "Residential",
    name: "",
    phone: "",
    email: "",
    preferredLocation: "South Delhi",
    budget: "Select Budget Range",
    requirement: "",
    propertyId: initialValues?.propertyId || null
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"
  const [statusMessage, setStatusMessage] = useState("");

  // Sync initial query params if provided without triggering infinite renders
  useEffect(() => {
    if (initialValues && typeof initialValues === "object") {
      setFormData((prev) => {
        let changed = false;
        const next = { ...prev };
        Object.entries(initialValues).forEach(([k, v]) => {
          if (v !== undefined && v !== prev[k]) {
            next[k] = v;
            changed = true;
          }
        });
        return changed ? next : prev;
      });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleInterestSelect = (type) => {
    setFormData((prev) => ({ ...prev, interestType: type }));
    if (errors.interestType) {
      setErrors((prev) => ({ ...prev, interestType: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = "Full name is required.";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Contact phone number is required.";
    } else {
      const cleanPhone = formData.phone.replace(/\D/g, "");
      if (cleanPhone.length < 10) {
        errs.phone = "Please enter a valid 10-digit phone number.";
      }
    }
    if (formData.email && formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = "Please enter a valid email address.";
      }
    }
    if (!formData.interestType) {
      errs.interestType = "Please select an interest type.";
    }
    if (!formData.requirement.trim()) {
      errs.requirement = "Please describe your requirement or spatial preferences.";
    } else if (formData.requirement.trim().length < 10) {
      errs.requirement = "Please provide a few more details about your requirement.";
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
      setErrors({});
      const res = await submitRequirement(formData);
      if (res.success) {
        setStatus("success");
        setStatusMessage(res.message);
      } else {
        setStatus("error");
        setStatusMessage(res.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setStatusMessage("An unexpected error occurred. Please try contacting us by phone.");
    }
  };

  const handleReset = () => {
    setFormData({
      interestType: "Residential",
      name: "",
      phone: "",
      email: "",
      preferredLocation: "South Delhi",
      budget: "Select Budget Range",
      requirement: ""
    });
    setStatus("idle");
    setErrors({});
  };

  if (status === "success") {
    return (
      <div className={`requirement-form-card requirement-success-state ${className}`}>
        <div className="success-icon-wrap">
          <CheckCircle2 size={48} className="success-icon" />
        </div>
        <h3 className="success-title">Thank You.</h3>
        <p className="success-headline">We've received your requirement.</p>
        <p className="success-body">
          Our team will review the details and get in touch with you to coordinate
          relevant, verified opportunities.
        </p>
        <div className="success-actions">
          <Button variant="primary" size="md" onClick={handleReset}>
            Submit Another Requirement
          </Button>
          <Button variant="secondary" size="md" to="/contact">
            Direct Contact
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`requirement-form-card ${className}`}>
      <div className="req-form-header">
        <span className="editorial-label">MANDATE SUBMISSION</span>
        <h3 className="req-form-title">{title}</h3>
        <p className="req-form-subtitle">{subtitle}</p>
      </div>

      {status === "error" && (
        <div className="form-alert form-alert-error" role="alert">
          <AlertCircle size={18} />
          <span>{statusMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Interest Type Selector */}
        <div className="req-field-group">
          <label className="form-label">
            INTEREST TYPE <span className="required-star">*</span>
          </label>
          <div className="interest-type-pills">
            {interestTypes.map((type) => (
              <button
                key={type}
                type="button"
                className={`interest-pill ${
                  formData.interestType === type ? "selected" : ""
                }`}
                onClick={() => handleInterestSelect(type)}
              >
                {type}
              </button>
            ))}
          </div>
          {errors.interestType && (
            <span className="field-message error-message">{errors.interestType}</span>
          )}
        </div>

        <div className="req-form-grid">
          {/* Name */}
          <Input
            label="Full Name"
            name="name"
            placeholder="e.g. Rajesh Malhotra"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
            disabled={status === "loading"}
          />

          {/* Phone */}
          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            placeholder="10-digit mobile number"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            required
            disabled={status === "loading"}
          />
        </div>

        <div className="req-form-grid">
          {/* Email */}
          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="name@domain.com (optional)"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            disabled={status === "loading"}
          />

          {/* Preferred Location */}
          <Input
            label="Preferred Location"
            name="preferredLocation"
            type="select"
            value={formData.preferredLocation}
            onChange={handleChange}
            options={preferredLocations}
            disabled={status === "loading"}
          />
        </div>

        {/* Budget */}
        <Input
          label="Budget Expectation"
          name="budget"
          type="select"
          value={formData.budget}
          onChange={handleChange}
          options={budgetRanges}
          disabled={status === "loading"}
        />

        {/* Requirement */}
        <Input
          label="Requirement Details"
          name="requirement"
          type="textarea"
          rows={4}
          placeholder="Describe your desired space, dimensions, intended use, preferred sectors, or timeframe..."
          value={formData.requirement}
          onChange={handleChange}
          error={errors.requirement}
          required
          disabled={status === "loading"}
          helperText="Include any specific preferences: floor preference, parking needs, or corporate specifications."
        />

        {/* Trust Note & Submit Button */}
        <div className="req-form-footer">
          <div className="privacy-reassurance">
            <ShieldCheck size={16} />
            <span>Strict privacy. Direct advisory without unsolicited marketing calls.</span>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={status === "loading"}
            className="req-submit-btn"
          >
            <Send size={16} />
            <span>Submit Requirement</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
