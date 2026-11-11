import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Container from "../components/ui/Container";
import PropertyFilters from "../components/property/PropertyFilters";
import PropertyGrid from "../components/property/PropertyGrid";
import SEO from "../components/ui/SEO";
import { getProperties } from "../services/propertyService";
import { getLocations } from "../services/locationService";
import "./PropertiesPage.css";

export default function PropertiesPage() {
  const location = useLocation();
  const params = useParams();

  // If path is /properties/residential or /properties/commercial
  const pathCategory = params.category || (
    location.pathname.includes("residential")
      ? "residential"
      : location.pathname.includes("commercial")
      ? "commercial"
      : "all"
  );

  const [filters, setFilters] = useState({
    category: pathCategory,
    location: "all",
    type: "all",
    budget: "all"
  });

  const [properties, setProperties] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [availableLocations, setAvailableLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dynamic location list for filter dropdown
  useEffect(() => {
    let isMounted = true;
    async function loadFilterLocations() {
      try {
        const locs = await getLocations();
        if (isMounted && Array.isArray(locs) && locs.length > 0) {
          setAvailableLocations(
            locs.map((loc) => ({
              value: loc.slug,
              label: loc.name
            }))
          );
        }
      } catch (e) {
        // Retain default static locations
      }
    }
    loadFilterLocations();
    return () => {
      isMounted = false;
    };
  }, []);

  // Update filters if URL path changes
  useEffect(() => {
    if (location.pathname.includes("residential")) {
      setFilters((prev) => ({ ...prev, category: "residential" }));
    } else if (location.pathname.includes("commercial")) {
      setFilters((prev) => ({ ...prev, category: "commercial" }));
    }
  }, [location.pathname]);

  // Fetch properties whenever filters change
  useEffect(() => {
    let isMounted = true;
    async function fetchListings() {
      try {
        setLoading(true);
        const res = await getProperties(filters);
        if (isMounted) {
          setProperties(res.data || []);
          setTotalCount(res.total || 0);
        }
      } catch (err) {
        if (isMounted) {
          setProperties([]);
          setTotalCount(0);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchListings();
    return () => {
      isMounted = false;
    };
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: "all",
      location: "all",
      type: "all",
      budget: "all"
    });
  };

  const pageTitle =
    filters.category === "residential"
      ? "Residential Real Estate | Singh Builder's"
      : filters.category === "commercial"
      ? "Commercial Real Estate | Singh Builder's"
      : "Property Opportunities | Singh Builder's";

  return (
    <div className="properties-page">
      <SEO
        title={pageTitle}
        description="Explore residential and commercial real-estate opportunities across South Delhi, Delhi, and Gurugram with Singh Builder's."
      />

      <section className="properties-hero">
        <Container>
          <div className="properties-hero-content">
            <span className="editorial-label">CURATED NCR PORTFOLIO</span>
            <h1 className="properties-hero-title">Property Opportunities</h1>
            <p className="properties-hero-subtitle">
              We connect client requirements with verified residential apartments, independent
              builder floors, and commercial assets across Delhi and Gurugram.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-pad properties-catalog-section">
        <Container>
          {/* Filter Bar with dynamic locations */}
          <PropertyFilters
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
            totalResults={totalCount || properties.length}
            locationOptions={availableLocations}
          />

          {/* Results Grid with polite empty state */}
          <PropertyGrid
            properties={properties}
            loading={loading}
            emptyTitle="PROPERTY CATALOGUE BEING UPDATED"
            emptySubtitle="Our verified listings across South Delhi and Gurugram are actively handled through direct requirement matching."
            emptyNote="Looking for something specific? Tell us your exact criteria and our advisory team will share matching, off-market opportunities."
          />
        </Container>
      </section>
    </div>
  );
}
