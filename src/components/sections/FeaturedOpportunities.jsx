import React, { useState, useEffect } from "react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import PropertyGrid from "../property/PropertyGrid";
import { getProperties } from "../../services/propertyService";
import "./FeaturedOpportunities.css";

export default function FeaturedOpportunities() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadFeatured() {
      try {
        setLoading(true);
        const res = await getProperties({ featured: true });
        if (isMounted) {
          setProperties(res.data || []);
        }
      } catch (err) {
        if (isMounted) setProperties([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadFeatured();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="section-pad featured-opportunities-section" aria-label="Featured Opportunities">
      <Container>
        <SectionHeading
          label="04 — SELECT OPPORTUNITIES"
          title="Featured Opportunities"
          subtitle="A tailored portfolio across residential and commercial developments in Delhi and Gurugram."
          align="center"
        />

        <div className="featured-opportunities-content">
          <PropertyGrid
            properties={properties}
            loading={loading}
            emptyTitle="OPPORTUNITIES ARE BEING CURATED"
            emptySubtitle="Our verified property opportunities across South Delhi, Delhi, and Gurugram are actively coordinated on a direct mandate basis."
            emptyNote="Tell us what you're looking for and our team will identify matching opportunities tailored to your timeframe and budget."
          />
        </div>
      </Container>
    </section>
  );
}
