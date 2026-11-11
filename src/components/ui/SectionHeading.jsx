import React from "react";
import "./SectionHeading.css";

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "left", // "left" | "center"
  theme = "light", // "light" | "dark"
  large = false,
  className = "",
  titleClassName = ""
}) {
  const isDark = theme === "dark";

  return (
    <div
      className={`section-heading align-${align} theme-${theme} ${large ? "heading-lg" : ""} ${className}`}
    >
      {label && (
        <span
          className={`editorial-label ${isDark ? "editorial-label-dark" : ""}`}
        >
          {label}
        </span>
      )}
      {title && (
        <h2 className={`heading-title ${titleClassName}`}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="heading-subtitle">
          {subtitle}
        </p>
      )}
    </div>
  );
}
