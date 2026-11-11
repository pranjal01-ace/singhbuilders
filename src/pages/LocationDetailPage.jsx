import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "../components/ui/Container";
import SEO from "../components/ui/SEO";
import RequirementForm from "../components/forms/RequirementForm";
import { getLocationBySlug } from "../services/locationService";
import { ArrowLeft, Check, Building, Shield } from "lucide-react";
import "./LocationDetailPage.css";

const locationProfiles = {
  "south-delhi": {
    name: "South Delhi",
    slug: "south-delhi",
    eyebrow: "PRIME RESIDENTIAL ENCLAVES & BOUTIQUE OFFICES",
    title: "South Delhi Real Estate",
    heroImage: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1600&q=80",
    overview:
      "South Delhi represents the pinnacle of residential distinction in India's capital. Renowned for its tree-canopied avenues, low-density colony layouts, and enduring social prestige, South Delhi combines generational family living with distinguished boutique office addresses.",
    marketFocus: [
      {
        title: "Exclusive Builder Floors",
        desc: "Single-floor luxury residences with dedicated stilt parking, private elevators, and bespoke architectural finishes."
      },
      {
        title: "Prime Commercial & Retail Frontage",
        desc: "High-street retail spaces and boutique corporate houses positioned in landmark institutional avenues."
      },
      {
        title: "Generational Redevelopment",
        desc: "Transforming historic plots into modern architectural marvels while preserving land pedigree."
      }
    ],
    connectivity: [
      "Immediate proximity to Indira Gandhi International Airport (Terminal 3)",
      "Comprehensive Delhi Metro connectivity across Yellow, Magenta, and Violet lines",
      "Seamless arterial links via Ring Road and Outer Ring Road corridors"
    ]
  },
  "delhi": {
    name: "Delhi",
    slug: "delhi",
    eyebrow: "THE CAPITAL'S URBAN CORRIDORS & TRANSIT ARTERIES",
    title: "Delhi Urban Corridors",
    heroImage: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1600&q=80",
    overview:
      "Spanning Central, West, North, and transit-rich corridors of the National Capital Territory, Delhi's real-estate landscape offers established market infrastructure, rich commercial activity, and enduring property value.",
    marketFocus: [
      {
        title: "Strategic Transit Corridors",
        desc: "Properties situated along established mass-transit routes enabling fluid workforce accessibility."
      },
      {
        title: "Commercial & Mixed-Use Pockets",
        desc: "Vibrant trade, institutional, and commercial centers supporting enterprise growth."
      },
      {
        title: "Independent Urban Residences",
        desc: "High-utility residential units aligned with urban lifestyle, schools, and medical infrastructure."
      }
    ],
    connectivity: [
      "Extensive nationwide rail links through New Delhi, Nizamuddin, and Old Delhi terminals",
      "Direct rapid transit connecting all major industrial and commercial satellites",
      "Robust civic infrastructure and uninterrupted public utilities"
    ]
  },
  "gurugram": {
    name: "Gurugram",
    slug: "gurugram",
    eyebrow: "MILLENNIUM CITY'S CORPORATE HORIZON & LUXURY TOWERS",
    title: "Gurugram Real Estate",
    heroImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    overview:
      "Gurugram has emerged as India's premier corporate and luxury residential epicenter. Characterized by striking modern high-rises, expansive expressways, corporate multinational headquarters, and integrated lifestyle townships.",
    marketFocus: [
      {
        title: "Grade-A Corporate Towers",
        desc: "Institutional office plates offering international sustainability certifications and world-class facilities."
      },
      {
        title: "Luxury High-Rise Condominiums",
        desc: "Gated communities featuring golf vistas, Olympic-sized swimming pools, and dedicated concierge services."
      },
      {
        title: "Growth Corridors & Development Land",
        desc: "High-potential growth sectors along Dwarka Expressway, Southern Peripheral Road, and Golf Course Extension."
      }
    ],
    connectivity: [
      "Direct signal-free connectivity to Delhi via NH-48 and Dwarka Expressway",
      "Rapid Metro network integrated with Delhi Metro Yellow Line",
      "Seamless access to IGI Airport via multi-lane expressways"
    ]
  }
};

export default function LocationDetailPage() {
  const { slug } = useParams();
  const locationKey = slug || "south-delhi";
  const defaultProfile = locationProfiles[locationKey] || locationProfiles["south-delhi"];
  const [profile, setProfile] = useState(defaultProfile);

  useEffect(() => {
    let isMounted = true;
    async function loadBackendDetails() {
      try {
        const backendLoc = await getLocationBySlug(locationKey);
        if (isMounted && backendLoc) {
          setProfile((prev) => ({
            ...prev,
            name: backendLoc.name || prev.name,
            title: `${backendLoc.name} Real Estate`,
            overview: backendLoc.description || prev.overview,
          }));
        }
      } catch (err) {
        // Retain default static profile
      }
    }
    loadBackendDetails();
    return () => {
      isMounted = false;
    };
  }, [locationKey]);

  return (
    <div className="location-detail-page">
      <SEO
        title={`${profile.title} | Singh Builder's`}
        description={profile.overview}
      />

      {/* Hero Banner */}
      <section className="location-detail-hero">
        <div className="location-hero-img-wrap">
          <img src={profile.heroImage} alt={profile.name} className="location-hero-img" />
          <div className="location-hero-overlay" />
        </div>

        <Container className="location-hero-container">
          <div className="location-breadcrumbs">
            <Link to="/locations" className="back-link">
              <ArrowLeft size={16} />
              <span>All Operating Markets</span>
            </Link>
          </div>

          <span className="editorial-label editorial-label-dark">{profile.eyebrow}</span>
          <h1 className="location-hero-title">{profile.title}</h1>
          <p className="location-hero-lead">{profile.overview}</p>
        </Container>
      </section>

      {/* Market Character & Connectivity */}
      <section className="section-pad location-profile-section">
        <Container>
          <div className="location-profile-grid">
            {/* Left: Sectors of focus */}
            <div className="location-focus-col">
              <span className="editorial-label">OPPORTUNITY PROFILES</span>
              <h2 className="loc-section-heading">Key Spatial Opportunities</h2>

              <div className="focus-cards-stack">
                {profile.marketFocus.map((item, idx) => (
                  <div key={idx} className="focus-card">
                    <div className="focus-card-icon">
                      <Building size={20} />
                    </div>
                    <div>
                      <h3 className="focus-card-title">{item.title}</h3>
                      <p className="focus-card-desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Connectivity & Advantage */}
            <div className="location-advantage-col">
              <span className="editorial-label">STRATEGIC ADVANTAGE</span>
              <h2 className="loc-section-heading">Infrastructure &amp; Transit</h2>

              <div className="connectivity-box">
                <div className="connectivity-list">
                  {profile.connectivity.map((conn, i) => (
                    <div key={i} className="conn-item">
                      <Check size={16} className="conn-check" />
                      <span>{conn}</span>
                    </div>
                  ))}
                </div>

                <div className="conn-trust-callout">
                  <Shield size={18} className="callout-shield" />
                  <p>
                    Singh Builder's provides direct mandate representation across {profile.name},
                    safeguarding your interests with title clarity and verified market pricing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Requirement Form Pre-filled */}
      <section className="section-pad section-surface location-form-section">
        <Container narrow>
          <RequirementForm
            title={`Discuss Opportunities in ${profile.name}`}
            subtitle={`Share your residential or commercial criteria for ${profile.name} and our team will coordinate matching possibilities.`}
            initialValues={{
              preferredLocation: profile.name
            }}
          />
        </Container>
      </section>
    </div>
  );
}
