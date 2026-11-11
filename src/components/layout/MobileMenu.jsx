import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Phone, Mail, ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import { formatPhone } from "../../utils/formatters";
import "./MobileMenu.css";

export default function MobileMenu({
  isOpen,
  onClose,
  links,
  siteConfig,
  currentPath
}) {
  const [expandedSection, setExpandedSection] = useState(null);

  if (!isOpen) return null;

  const toggleSection = (label) => {
    setExpandedSection(expandedSection === label ? null : label);
  };

  return (
    <div className="mobile-menu-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="mobile-menu-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mobile-menu-header">
          <div>
            <div className="mobile-brand-title">SINGH BUILDER'S</div>
            <div className="mobile-brand-subtitle">BUILDERS &amp; DEVELOPERS &bull; ESTD 2007</div>
          </div>
        </div>

        <nav className="mobile-nav" aria-label="Mobile Navigation">
          <ul className="mobile-nav-list">
            {links.map((item) => {
              const hasSub = item.subLinks && item.subLinks.length > 0;
              const isActive =
                item.path === "/"
                  ? currentPath === "/"
                  : currentPath.startsWith(item.path);

              return (
                <li key={item.label} className="mobile-nav-item">
                  <div className="mobile-nav-row">
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className={`mobile-nav-link ${isActive ? "active" : ""}`}
                    >
                      {item.label}
                    </Link>
                    {hasSub && (
                      <button
                        type="button"
                        className="mobile-expand-btn"
                        onClick={() => toggleSection(item.label)}
                        aria-label={`Toggle ${item.label} submenu`}
                      >
                        <ChevronDown
                          size={18}
                          className={expandedSection === item.label ? "expanded" : ""}
                        />
                      </button>
                    )}
                  </div>

                  {hasSub && expandedSection === item.label && (
                    <ul className="mobile-sub-list">
                      {item.subLinks.map((sub) => (
                        <li key={sub.path}>
                          <Link
                            to={sub.path}
                            onClick={onClose}
                            className={`mobile-sub-link ${
                              currentPath === sub.path ? "active" : ""
                            }`}
                          >
                            <ArrowRight size={13} />
                            <span>{sub.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action button */}
        <div className="mobile-menu-cta-wrap">
          <Button
            to="/requirement"
            variant="primary"
            size="md"
            className="mobile-requirement-btn"
            onClick={onClose}
          >
            Discuss Your Requirement
          </Button>
        </div>

        {/* Contact info footer in menu */}
        <div className="mobile-menu-footer">
          <div className="mobile-contact-item">
            <Phone size={15} className="mobile-contact-icon" />
            <a href={`tel:${siteConfig.primaryPhone}`}>
              {formatPhone(siteConfig.primaryPhone)}
            </a>
          </div>
          <div className="mobile-contact-item">
            <Mail size={15} className="mobile-contact-icon" />
            <a href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
          </div>
          <p className="mobile-footer-market">
            Operating in South Delhi, Delhi &amp; Gurugram
          </p>
        </div>
      </div>
    </div>
  );
}
