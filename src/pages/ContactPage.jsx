import React, { useState } from "react";
import Container from "../components/ui/Container";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import SEO from "../components/ui/SEO";
import { siteConfig } from "../data/siteData";
import { formatPhone } from "../utils/formatters";
import { submitContactEnquiry } from "../services/enquiryService";
import { Phone, Mail, MapPin, Globe, CheckCircle2, AlertCircle, Send } from "lucide-react";
import "./ContactPage.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: ""
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
    if (!formData.name.trim()) errs.name = "Full name is required.";
    if (!formData.phone.trim()) errs.phone = "Phone number is required.";
    if (!formData.message.trim()) errs.message = "Message cannot be empty.";
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = "Please enter a valid email address.";
      }
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
      const res = await submitContactEnquiry(formData);
      if (res.success) {
        setStatus("success");
        setStatusMessage(res.message);
      } else {
        setStatus("error");
        setStatusMessage(res.message || "Failed to submit message.");
      }
    } catch (err) {
      setStatus("error");
      setStatusMessage("An unexpected error occurred. Please contact us directly by phone.");
    }
  };

  return (
    <div className="contact-page">
      <SEO
        title="Contact Us | Singh Builder's — South Delhi & Gurugram"
        description="Connect with Singh Builder's. Direct telephone, email, and office contact in South Delhi, New Delhi – 110030."
      />

      <section className="contact-hero">
        <Container>
          <div className="contact-hero-content">
            <span className="editorial-label">COMMUNICATION &amp; ADVISORY</span>
            <h1 className="contact-hero-title">Connect With Our Team</h1>
            <p className="contact-hero-subtitle">
              We welcome inquiries from buyers, developers, investors, and strategic partners.
              Connect directly with our South Delhi headquarters.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-pad contact-body-section">
        <Container>
          <div className="contact-layout-grid">
            {/* Left: Verified Contact Information */}
            <div className="contact-info-col">
              <span className="editorial-label">DIRECT DETAILS</span>
              <h2 className="contact-col-title">Singh Builder's</h2>
              <p className="contact-col-desc">
                Builders &amp; Developers &bull; Real Estate Built on Trust Since 2007.
              </p>

              <div className="contact-cards-list">
                {/* Telephone */}
                <div className="contact-detail-card">
                  <div className="detail-icon-wrap">
                    <Phone size={20} />
                  </div>
                  <div className="detail-card-text">
                    <span className="detail-card-label">DIRECT TELEPHONE</span>
                    <div className="detail-phones-list">
                      {siteConfig.phones.map((phone) => (
                        <a key={phone} href={`tel:${phone}`} className="phone-clickable">
                          {formatPhone(phone)}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-detail-card">
                  <div className="detail-icon-wrap">
                    <Mail size={20} />
                  </div>
                  <div className="detail-card-text">
                    <span className="detail-card-label">OFFICIAL EMAIL</span>
                    <a href={`mailto:${siteConfig.email}`} className="email-clickable">
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="contact-detail-card">
                  <div className="detail-icon-wrap">
                    <MapPin size={20} />
                  </div>
                  <div className="detail-card-text">
                    <span className="detail-card-label">OFFICE LOCATION</span>
                    <span className="location-static-text">{siteConfig.location.region}</span>
                  </div>
                </div>

                {/* Website */}
                <div className="contact-detail-card">
                  <div className="detail-icon-wrap">
                    <Globe size={20} />
                  </div>
                  <div className="detail-card-text">
                    <span className="detail-card-label">OFFICIAL PORTAL</span>
                    <span className="location-static-text">{siteConfig.website}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Message Form */}
            <div className="contact-form-col">
              <div className="contact-form-card">
                <span className="editorial-label">ENQUIRY FORM</span>
                <h3 className="cform-title">Send a Message</h3>
                <p className="cform-subtitle">
                  We will respond promptly to coordinate your query.
                </p>

                {status === "success" ? (
                  <div className="contact-form-success">
                    <CheckCircle2 size={44} className="c-success-icon" />
                    <h4 className="c-success-title">Message Received</h4>
                    <p className="c-success-desc">
                      Thank you for contacting Singh Builder's. Our team will review your inquiry
                      and connect with you shortly.
                    </p>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => {
                        setStatus("idle");
                        setFormData({
                          name: "",
                          phone: "",
                          email: "",
                          subject: "",
                          message: ""
                        });
                      }}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    {status === "error" && (
                      <div className="form-alert form-alert-error" role="alert">
                        <AlertCircle size={18} />
                        <span>{statusMessage}</span>
                      </div>
                    )}

                    <div className="cform-grid">
                      <Input
                        label="Full Name"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        required
                        disabled={status === "loading"}
                      />

                      <Input
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        placeholder="10-digit number"
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                        required
                        disabled={status === "loading"}
                      />
                    </div>

                    <div className="cform-grid">
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

                      <Input
                        label="Subject / Topic"
                        name="subject"
                        placeholder="e.g. Residential Inquiry / Partnership"
                        value={formData.subject}
                        onChange={handleChange}
                        disabled={status === "loading"}
                      />
                    </div>

                    <Input
                      label="Your Message"
                      name="message"
                      type="textarea"
                      rows={4}
                      placeholder="Please let us know how we can assist you..."
                      value={formData.message}
                      onChange={handleChange}
                      error={errors.message}
                      required
                      disabled={status === "loading"}
                    />

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      loading={status === "loading"}
                      className="cform-submit-btn"
                    >
                      <Send size={16} />
                      <span>Send Message</span>
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
