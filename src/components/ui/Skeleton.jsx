import React from "react";
import "./Skeleton.css";

export default function Skeleton({
  variant = "rectangular", // "text" | "rectangular" | "circle"
  width,
  height,
  className = ""
}) {
  const style = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <div
      className={`skeleton skeleton-${variant} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

export function PropertyCardSkeleton() {
  return (
    <div className="property-card-skeleton">
      <Skeleton variant="rectangular" height="260px" />
      <div className="skeleton-content">
        <Skeleton variant="text" width="40%" height="16px" />
        <Skeleton variant="text" width="85%" height="24px" />
        <Skeleton variant="text" width="60%" height="18px" />
        <div className="skeleton-row">
          <Skeleton variant="text" width="25%" height="16px" />
          <Skeleton variant="text" width="25%" height="16px" />
          <Skeleton variant="text" width="25%" height="16px" />
        </div>
      </div>
    </div>
  );
}
