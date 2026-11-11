import React from "react";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import SEO from "../components/ui/SEO";
import { Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div
      style={{
        paddingTop: "calc(var(--header-height) + 3rem)",
        paddingBottom: "5rem",
        backgroundColor: "var(--color-ivory)",
        minHeight: "75vh",
        display: "flex",
        alignItems: "center"
      }}
    >
      <SEO
        title="Page Not Found | Singh Builder's"
        description="The requested page could not be located. Return to Singh Builder's home."
      />
      <Container narrow style={{ textAlign: "center" }}>
        <span className="editorial-label">ERROR 404</span>
        <h1
          style={{
            fontSize: "clamp(3rem, 6vw, 5.5rem)",
            color: "var(--color-charcoal)",
            margin: "0.5rem 0"
          }}
        >
          Page Not Located
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            color: "var(--color-text-secondary)",
            maxWidth: "560px",
            margin: "0 auto 2.5rem"
          }}
        >
          The page or opportunity reference you are looking for has been moved or is
          currently undergoing curation.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Button to="/" variant="primary" size="md">
            <Home size={16} />
            <span>Return to Home</span>
          </Button>
          <Button to="/properties" variant="secondary" size="md">
            <span>Explore Opportunities</span>
          </Button>
        </div>
      </Container>
    </div>
  );
}
