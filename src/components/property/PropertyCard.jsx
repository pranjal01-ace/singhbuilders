import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency, formatArea } from "../../utils/formatters";
import { MapPin, Maximize, Bed, Bath, ArrowRight } from "lucide-react";
import "./PropertyCard.css";

export default function PropertyCard({ property }) {
  if (!property) return null;

  const {
    slug,
    title,
    category,
    type,
    location,
    locality,
    city,
    price,
    area,
    areaUnit,
    bedrooms,
    bathrooms,
    coverImage,
    featured
  } = property;

  const displayLocation = locality ? `${locality}, ${city || location}` : location || city;

  return (
    <article className="property-card" aria-label={title}>
      <Link to={`/properties/${slug}`} className="property-card-media">
        {coverImage ? (
          <img
            src={coverImage}
            alt={title}
            className="property-card-img"
            loading="lazy"
          />
        ) : (
          <div className="property-placeholder-img">
            <span>Singh Builder's &bull; Curated Opportunity</span>
          </div>
        )}

        <div className="property-badge-wrap">
          {category && <span className="property-tag-category">{category}</span>}
          {featured && <span className="property-tag-featured">Featured</span>}
        </div>
      </Link>

      <div className="property-card-content">
        <div className="property-type-label">{type || "Exclusive Space"}</div>

        <h3 className="property-card-title">
          <Link to={`/properties/${slug}`}>{title}</Link>
        </h3>

        {displayLocation && (
          <div className="property-card-location">
            <MapPin size={14} className="location-icon" />
            <span>{displayLocation}</span>
          </div>
        )}

        {/* Spatial specs if present */}
        {(bedrooms || bathrooms || area) && (
          <div className="property-card-specs">
            {bedrooms && (
              <span className="spec-item">
                <Bed size={14} /> {bedrooms} BHK
              </span>
            )}
            {bathrooms && (
              <span className="spec-item">
                <Bath size={14} /> {bathrooms} Baths
              </span>
            )}
            {area && (
              <span className="spec-item">
                <Maximize size={14} /> {formatArea(area, areaUnit)}
              </span>
            )}
          </div>
        )}

        <div className="property-card-footer">
          <div className="property-card-price">
            <span className="price-label">ESTIMATED VALUE</span>
            <span className="price-value">{formatCurrency(price)}</span>
          </div>

          <Link to={`/properties/${slug}`} className="property-card-arrow" aria-label="View Details">
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
