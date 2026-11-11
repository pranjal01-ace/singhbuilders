import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useScrollHeader } from "../../hooks/useScrollHeader";
import { mainNavLinks } from "../../data/navigation";
import { siteConfig } from "../../data/siteData";
import MobileMenu from "./MobileMenu";
import Button from "../ui/Button";
import { Menu, X, ChevronDown } from "lucide-react";
import "./Header.css";

export default function Header() {
  const isScrolled = useScrollHeader(30);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Is home page? (Transparent header allowed on home page when top)
  const isHome = location.pathname === "/";
  const headerThemeClass = !isScrolled && isHome ? "header-transparent" : "header-solid";

  return (
    <>
      <header className={`site-header ${headerThemeClass}`}>
        <div className="site-container header-container">
          {/* Brand Logo */}
          <Link to="/" className="header-brand" aria-label="Singh Builder's Home">
            <span className="brand-title">SINGH BUILDER'S</span>
            <span className="brand-subtitle">BUILDERS &amp; DEVELOPERS &bull; ESTD 2007</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="header-nav" aria-label="Primary navigation">
            <ul className="nav-list">
              {mainNavLinks.map((item) => {
                const isActive =
                  item.path === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.path);

                const hasSub = item.subLinks && item.subLinks.length > 0;

                return (
                  <li
                    key={item.label}
                    className={`nav-item ${hasSub ? "has-dropdown" : ""} ${
                      isActive ? "active" : ""
                    }`}
                    onMouseEnter={() => hasSub && setActiveDropdown(item.label)}
                    onMouseLeave={() => hasSub && setActiveDropdown(null)}
                  >
                    <Link
                      to={item.path}
                      className={`nav-link ${isActive ? "active" : ""}`}
                    >
                      {item.label}
                      {hasSub && <ChevronDown size={14} className="dropdown-arrow" />}
                    </Link>

                    {hasSub && (
                      <div
                        className={`nav-dropdown ${
                          activeDropdown === item.label ? "dropdown-visible" : ""
                        }`}
                      >
                        {item.subLinks.map((sub) => (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            className={`dropdown-link ${
                              location.pathname === sub.path ? "active" : ""
                            }`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Header Action Button */}
          <div className="header-actions">
            <Button
              to="/requirement"
              variant={!isScrolled && isHome ? "dark-outline" : "primary"}
              size="sm"
              className="header-cta"
            >
              Discuss Your Requirement
            </Button>

            {/* Mobile Toggle Button */}
            <button
              type="button"
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={mainNavLinks}
        siteConfig={siteConfig}
        currentPath={location.pathname}
      />
    </>
  );
}
