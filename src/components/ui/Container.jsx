import React from "react";

export default function Container({
  children,
  narrow = false,
  className = "",
  as: Component = "div",
  ...props
}) {
  const containerClass = narrow ? "site-container-narrow" : "site-container";
  return (
    <Component className={`${containerClass} ${className}`} {...props}>
      {children}
    </Component>
  );
}
