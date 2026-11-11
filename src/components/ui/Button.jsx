import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

export default function Button({
  children,
  to,
  href,
  variant = "primary", // "primary" | "secondary" | "brass" | "ghost" | "dark-outline"
  size = "md", // "sm" | "md" | "lg"
  type = "button",
  disabled = false,
  loading = false,
  className = "",
  onClick,
  ...props
}) {
  const classes = `btn btn-${variant} btn-${size} ${loading ? "btn-loading" : ""} ${className}`;

  if (to && !disabled) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <span className="btn-spinner-wrap">
          <span className="btn-spinner" />
          <span>Processing...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
