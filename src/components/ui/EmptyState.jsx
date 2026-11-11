import React from "react";
import Button from "./Button";
import "./EmptyState.css";

export default function EmptyState({
  title = "PROPERTY OPPORTUNITIES ARE BEING CURATED",
  subtitle = "Our current property catalogue is being updated with verified Delhi and Gurugram inventory.",
  note = "Looking for something specific? Tell us your spatial and locational requirements.",
  actionText = "Discuss Your Requirement",
  actionTo = "/requirement",
  className = ""
}) {
  return (
    <div className={`empty-state-box ${className}`}>
      <div className="empty-state-inner">
        <span className="editorial-label">CURATED DISCOVERY</span>
        <h3 className="empty-state-title">{title}</h3>
        <p className="empty-state-desc">{subtitle}</p>
        {note && <p className="empty-state-note">{note}</p>}
        <div className="empty-state-actions">
          <Button to={actionTo} variant="primary" size="md">
            {actionText}
          </Button>
          <Button to="/contact" variant="secondary" size="md">
            Speak to Our Advisors
          </Button>
        </div>
      </div>
    </div>
  );
}
