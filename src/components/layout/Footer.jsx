import React from "react";
import { Link } from "react-router-dom";
import Container from "../ui/Container";
import { siteConfig } from "../../data/siteData";
import {
  footerQuickLinks,
  footerServicesLinks,
  footerLocationLinks
} from "../../data/navigation";
import { formatPhone } from "../../utils/formatters";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Container>
          <div className="footer-grid">
            {/* Column 1: Brand & Philosophy */}
            <div className="footer-col footer-col-brand">
              <Link to="/" className="footer-brand-title">
                SINGH BUILDER'S
              </Link>
              <div className="footer-tagline">
                Builders &amp; Developers &bull; Estd. 2007
              </div>
              <p className="footer-brand-desc">
                Real estate built on trust. Connecting customer requirements with
                discerning residential, commercial, and development opportunities across
                South Delhi, Delhi, and Gurugram.
              </p>
              <div className="footer-statement">
                &ldquo;We build the lives people want.&rdquo;
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div className="footer-col">
              <h4 className="footer-heading">Navigation</h4>
              <ul className="footer-link-list">
                {footerQuickLinks.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="footer-link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services */}
            <div className="footer-col">
              <h4 className="footer-heading">Services</h4>
              <ul className="footer-link-list">
                {footerServicesLinks.map((item, idx) => (
                  <li key={idx}>
                    <Link to={item.path} className="footer-link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact & Locations */}
            <div className="footer-col footer-col-contact">
              <h4 className="footer-heading">Direct Contact</h4>
              <div className="footer-contact-block">
                <div className="footer-contact-item">
                  <Phone size={15} className="footer-icon" />
                  <div className="footer-phones">
                    {siteConfig.phones.map((phone) => (
                      <a key={phone} href={`tel:${phone}`} className="footer-phone-link">
                        {formatPhone(phone)}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="footer-contact-item">
                  <Mail size={15} className="footer-icon" />
                  <a href={`mailto:${siteConfig.email}`} className="footer-link">
                    {siteConfig.email}
                  </a>
                </div>

                <div className="footer-contact-item">
                  <MapPin size={15} className="footer-icon" />
                  <span className="footer-text">{siteConfig.location.region}</span>
                </div>
              </div>

              <div className="footer-markets-wrap">
                <span className="footer-subheading">Operating Corridors</span>
                <div className="footer-market-tags">
                  {footerLocationLinks.map((loc) => (
                    <Link key={loc.path} to={loc.path} className="market-tag-link">
                      {loc.label} <ArrowUpRight size={11} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom">
        <Container>
          <div className="footer-bottom-inner">
            <div className="footer-copyright">
              &copy; {currentYear} {siteConfig.name} &mdash; All Rights Reserved.
            </div>
            <div className="footer-legal-links">
              <Link to="/privacy-policy" className="legal-link">
                Privacy Policy
              </Link>
              <span className="legal-sep">&bull;</span>
              <Link to="/terms-conditions" className="legal-link">
                Terms &amp; Conditions
              </Link>
              <span className="legal-sep">&bull;</span>
              <Link to="/disclaimer" className="legal-link">
                Disclaimer
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
