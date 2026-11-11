import React from "react";
import { Link } from "react-router-dom";
import { Phone, MessageCircle, FileText } from "lucide-react";
import { siteConfig } from "../../data/siteData";
import "./MobileActionBar.css";

export default function MobileActionBar() {
  const primaryPhone = siteConfig.primaryPhone;
  // WhatsApp using confirmed number:
  const whatsappUrl = `https://wa.me/91${primaryPhone}?text=${encodeURIComponent(
    "Hello Singh Builder's, I am interested in discussing property opportunities across Delhi-NCR."
  )}`;

  return (
    <div className="mobile-action-bar" aria-label="Quick mobile contacts">
      <a
        href={`tel:${primaryPhone}`}
        className="action-bar-btn"
        aria-label="Call Singh Builder's"
      >
        <Phone size={17} />
        <span>Call</span>
      </a>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="action-bar-btn action-bar-whatsapp"
        aria-label="Message on WhatsApp"
      >
        <MessageCircle size={17} />
        <span>WhatsApp</span>
      </a>

      <Link
        to="/requirement"
        className="action-bar-btn action-bar-enquire"
        aria-label="Submit Requirement"
      >
        <FileText size={17} />
        <span>Enquire</span>
      </Link>
    </div>
  );
}
