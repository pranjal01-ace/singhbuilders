import React, { useState, useEffect } from "react";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import SEO from "../components/ui/SEO";
import { siteConfig } from "../data/siteData";
import { getLocations } from "../services/locationService";
import { MapPin, ArrowRight, Check } from "lucide-react";
import "./LocationsPage.css";

const locationImages = {
  "south-delhi": "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80",
  "delhi": "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80",
  "gurugram": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
};

export default function LocationsPage() {
  const [markets, setMarkets] = useState(siteConfig.markets);

  useEffect(() => {
    let isMounted = true;
    async function loadBackendLocations() {
      try {
        const data = await getLocations();
        if (isMounted && Array.isArray(data) && data.length > 0) {
          // Merge backend locations with editorial config
          const merged = data.map((loc) => {
            const editorial = siteConfig.markets.find(
              (m) => m.slug === loc.slug || m.name.toLowerCase() === loc.name.toLowerCase()
            );
            return {
              id: loc.id || loc.slug,
              slug: loc.slug,
              name: loc.name,
              subtitle: editorial ? editorial.subtitle : `${loc.city}, ${loc.state}`,
              description: loc.description || (editorial ? editorial.description : `Prime properties and commercial developments across ${loc.name}.`),
              highlights: editorial ? editorial.highlights : ["Prime property portfolio", "Verified ownership title", "Direct advisory assistance"],
              route: `/locations/${loc.slug}`,
              image: locationImages[loc.slug] || "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80"
            };
          });
          setMarkets(merged);
        }
      } catch (err) {
        // Fallback to static siteConfig
        if (isMounted) setMarkets(siteConfig.markets);
      }
    }

    loadBackendLocations();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="locations-page">
      <SEO
        title="Primary Markets | Delhi, South Delhi & Gurugram | Singh Builder's"
        description="Singh Builder's operates across premier Delhi-NCR corridors: South Delhi's heritage enclaves, the capital's central avenues, and Gurugram's modern skyline."
      />

      <section className="locations-hero">
        <Container>
          <div className="locations-hero-content">
            <span className="editorial-label">PRIMARY GEOGRAPHIES</span>
            <h1 className="locations-hero-title">Our Operating Markets</h1>
            <p className="locations-hero-subtitle">
              Strategic real-estate presence concentrated in the most dynamic, high-value
              corridors of Delhi-NCR since 2007.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-pad locations-list-section">
        <Container>
          <div className="locations-deep-grid">
            {markets.map((market) => (
              <div key={market.id || market.slug} className="location-deep-card">
                <div className="location-card-media">
                  <img
                    src={market.image || locationImages[market.slug] || "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80"}
                    alt={market.name}
                    className="location-card-img"
                    loading="lazy"
                  />
                  <div className="location-tag-badge">
                    <MapPin size={13} />
                    <span>{market.name}</span>
                  </div>
                </div>

                <div className="location-card-body">
                  <span className="editorial-label">MARKET PROFILE</span>
                  <h2 className="loc-card-title">{market.name}</h2>
                  <p className="loc-card-subtitle">{market.subtitle}</p>
                  <p className="loc-card-desc">{market.description}</p>

                  <div className="loc-card-highlights">
                    {market.highlights && market.highlights.map((h, i) => (
                      <div key={i} className="loc-h-item">
                        <Check size={14} className="h-check" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="loc-card-actions">
                    <Button to={market.route || `/locations/${market.slug}`} variant="primary" size="md">
                      <span>Explore {market.name}</span>
                      <ArrowRight size={15} />
                    </Button>
                    <Button
                      to={`/requirement?location=${encodeURIComponent(market.name)}`}
                      variant="secondary"
                      size="md"
                    >
                      Submit Requirement
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
