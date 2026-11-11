import React from "react";
import { Filter, RotateCcw } from "lucide-react";
import "./PropertyFilters.css";

export default function PropertyFilters({
  filters,
  onChange,
  onReset,
  totalResults = 0,
  locationOptions = null,
  className = ""
}) {
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" }
  ];

  const locations = locationOptions && locationOptions.length > 0
    ? [{ value: "all", label: "All Locations" }, ...locationOptions]
    : [
        { value: "all", label: "All Locations" },
        { value: "south-delhi", label: "South Delhi" },
        { value: "delhi", label: "Delhi Corridors" },
        { value: "gurugram", label: "Gurugram" }
      ];

  const types = [
    { value: "all", label: "All Property Types" },
    { value: "apartment", label: "Apartment / Flat" },
    { value: "builder-floor", label: "Independent Builder Floor" },
    { value: "penthouse", label: "Penthouse / Sky Villa" },
    { value: "office", label: "Commercial Office Plate" },
    { value: "retail", label: "High-Street Retail" },
    { value: "plot", label: "Residential / Commercial Land" }
  ];

  const budgets = [
    { value: "all", label: "Any Budget" },
    { value: "under-3cr", label: "Under ₹ 3 Cr" },
    { value: "3cr-7cr", label: "₹ 3 Cr – ₹ 7 Cr" },
    { value: "7cr-15cr", label: "₹ 7 Cr – ₹ 15 Cr" },
    { value: "15cr-plus", label: "₹ 15 Cr & Above" }
  ];

  return (
    <div className={`property-filters-panel ${className}`}>
      <div className="filters-header">
        <div className="filters-title-wrap">
          <Filter size={16} className="filter-icon" />
          <span className="filters-title">Filter Opportunities</span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="filters-reset-btn"
          aria-label="Reset all filters"
        >
          <RotateCcw size={13} />
          <span>Reset</span>
        </button>
      </div>

      <div className="filters-grid">
        {/* Category */}
        <div className="filter-group">
          <label htmlFor="filter-category" className="filter-label">
            Category
          </label>
          <div className="filter-select-wrap">
            <select
              id="filter-category"
              value={filters.category || "all"}
              onChange={(e) => onChange("category", e.target.value)}
              className="filter-select"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Location */}
        <div className="filter-group">
          <label htmlFor="filter-location" className="filter-label">
            Location
          </label>
          <div className="filter-select-wrap">
            <select
              id="filter-location"
              value={filters.location || "all"}
              onChange={(e) => onChange("location", e.target.value)}
              className="filter-select"
            >
              {locations.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Property Type */}
        <div className="filter-group">
          <label htmlFor="filter-type" className="filter-label">
            Property Type
          </label>
          <div className="filter-select-wrap">
            <select
              id="filter-type"
              value={filters.type || "all"}
              onChange={(e) => onChange("type", e.target.value)}
              className="filter-select"
            >
              {types.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Budget */}
        <div className="filter-group">
          <label htmlFor="filter-budget" className="filter-label">
            Budget
          </label>
          <div className="filter-select-wrap">
            <select
              id="filter-budget"
              value={filters.budget || "all"}
              onChange={(e) => onChange("budget", e.target.value)}
              className="filter-select"
            >
              {budgets.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
