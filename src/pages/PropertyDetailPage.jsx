import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "../components/ui/Container";
import EmptyState from "../components/ui/EmptyState";
import SEO from "../components/ui/SEO";
import RequirementForm from "../components/forms/RequirementForm";
import { getPropertyBySlug } from "../services/propertyService";
import { formatCurrency, formatArea } from "../utils/formatters";
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  CheckCircle2,
  ArrowLeft
} from "lucide-react";
import "./PropertyDetailPage.css";

export default function PropertyDetailPage() {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadProperty() {
      try {
        setLoading(true);
        const data = await getPropertyBySlug(slug);
        if (isMounted) {
          setProperty(data);
        }
      } catch (err) {
        if (isMounted) setProperty(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadProperty();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const requirementInitialValues = useMemo(() => ({
    propertyId: property?.id,
    interestType: property?.category === "commercial" ? "Commercial" : "Residential",
    preferredLocation: property?.locality || property?.location || property?.city || "Delhi-NCR",
    requirement: `Inquiring regarding opportunity: ${property?.title || slug}`
  }), [property?.id, property?.category, property?.locality, property?.location, property?.city, property?.title, slug]);

  // If no property found (default state per strict content restriction)
  if (!loading && !property) {
    return (
      <div className="property-detail-page property-not-found-page">
        <SEO
          title="Property Opportunity | Singh Builder's"
          description="Opportunity details. Singh Builder's curates residential and commercial properties in Delhi and Gurugram."
        />
        <Container>
          <div className="detail-breadcrumb">
            <Link to="/properties" className="back-link">
              <ArrowLeft size={16} />
              <span>Back to Opportunities</span>
            </Link>
          </div>

          <EmptyState
            title="OPPORTUNITY DETAILS ARE BEING CURATED"
            subtitle={`The property profile for "${slug}" is currently being verified or has been transitioned into private advisory.`}
            note="Looking for spaces in this category or locality? Share your specifications and our team will present matching verified opportunities."
            actionText="Discuss Your Requirement"
            actionTo={`/requirement?ref=${encodeURIComponent(slug)}`}
          />
        </Container>
      </div>
    );
  }

  // Full future-ready layout when a property is present
  return (
    <div className="property-detail-page">
      <SEO
        title={`${property?.title || "Property"} | Singh Builder's`}
        description={property?.description || "Explore opportunity specifications with Singh Builder's."}
      />

      <Container>
        <div className="detail-breadcrumb">
          <Link to="/properties" className="back-link">
            <ArrowLeft size={16} />
            <span>Back to Opportunities</span>
          </Link>
        </div>

        {/* Gallery / Cover */}
        <div className="property-detail-hero">
          {property?.images && property.images.length > 0 ? (
            <div className="detail-gallery-grid">
              {property.images.map((img, i) => (
                <img key={i} src={img} alt={`${property.title} - ${i}`} className="gallery-img" />
              ))}
            </div>
          ) : (
            <div className="detail-single-hero-img">
              <img
                src={property?.coverImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"}
                alt={property?.title}
              />
            </div>
          )}
        </div>

        {/* Main Content Layout */}
        <div className="property-detail-layout">
          {/* Left: Specs & Overview */}
          <div className="property-detail-main">
            <div className="property-meta-tags">
              <span className="editorial-label">{property?.category?.toUpperCase()}</span>
              {property?.type && <span className="meta-pill">{property.type}</span>}
              {property?.status && <span className="meta-pill">{property.status}</span>}
            </div>

            <h1 className="detail-property-title">{property?.title}</h1>

            <div className="detail-location-row">
              <MapPin size={18} className="detail-location-icon" />
              <span>
                {property?.locality ? `${property.locality}, ` : ""}
                {property?.location || property?.city || "Delhi-NCR"}
              </span>
            </div>

            <div className="detail-price-box">
              <span className="price-tag-label">ESTIMATED VALUATION</span>
              <span className="price-tag-value">{formatCurrency(property?.price)}</span>
            </div>

            {/* Quick Specs */}
            <div className="detail-specs-bar">
              {property?.bedrooms && (
                <div className="detail-spec-cell">
                  <Bed size={20} />
                  <div>
                    <span className="spec-cell-label">Bedrooms</span>
                    <span className="spec-cell-val">{property.bedrooms} BHK</span>
                  </div>
                </div>
              )}
              {property?.bathrooms && (
                <div className="detail-spec-cell">
                  <Bath size={20} />
                  <div>
                    <span className="spec-cell-label">Bathrooms</span>
                    <span className="spec-cell-val">{property.bathrooms} Baths</span>
                  </div>
                </div>
              )}
              {property?.area && (
                <div className="detail-spec-cell">
                  <Maximize size={20} />
                  <div>
                    <span className="spec-cell-label">Super Area</span>
                    <span className="spec-cell-val">
                      {formatArea(property.area, property.areaUnit)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="detail-section-block">
              <h2 className="detail-block-title">Overview &amp; Architecture</h2>
              <p className="detail-block-body">{property?.description}</p>
            </div>

            {/* Amenities */}
            {property?.amenities && property.amenities.length > 0 && (
              <div className="detail-section-block">
                <h2 className="detail-block-title">Specifications &amp; Features</h2>
                <div className="detail-amenities-grid">
                  {property.amenities.map((item, i) => (
                    <div key={i} className="amenity-item">
                      <CheckCircle2 size={16} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Enquiry Sidebar */}
          <div className="property-detail-sidebar">
            <div className="enquiry-sidebar-card">
              <RequirementForm
                title="Inquire About This Space"
                subtitle="Request a confidential briefing, floor plates, or site walkthrough."
                initialValues={requirementInitialValues}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
