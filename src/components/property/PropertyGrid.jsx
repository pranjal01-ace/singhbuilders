import React from "react";
import PropertyCard from "./PropertyCard";
import EmptyState from "../ui/EmptyState";
import { PropertyCardSkeleton } from "../ui/Skeleton";
import "./PropertyGrid.css";

export default function PropertyGrid({
  properties = [],
  loading = false,
  emptyTitle,
  emptySubtitle,
  emptyNote,
  className = ""
}) {
  if (loading) {
    return (
      <div className={`property-grid ${className}`}>
        <PropertyCardSkeleton />
        <PropertyCardSkeleton />
        <PropertyCardSkeleton />
      </div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <EmptyState
        title={emptyTitle || "OPPORTUNITIES ARE BEING CURATED"}
        subtitle={
          emptySubtitle ||
          "Our verified portfolio across South Delhi, Delhi, and Gurugram is currently updated in private consultation."
        }
        note={
          emptyNote ||
          "Tell us what you're looking for and our advisory team will present relevant verified opportunities."
        }
        actionText="Discuss Your Requirement"
        actionTo="/requirement"
      />
    );
  }

  return (
    <div className={`property-grid ${className}`}>
      {properties.map((property) => (
        <PropertyCard key={property.id || property.slug} property={property} />
      ))}
    </div>
  );
}
