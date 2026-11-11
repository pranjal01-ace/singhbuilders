import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { Search, Compass, SlidersHorizontal } from "lucide-react";
import "./RequirementFinder.css";

export default function RequirementFinder({
  id = "requirement-finder-section",
  title = "Tell Us What You're Looking For",
  subtitle = "Our discovery approach is shaped around your exact mandate rather than generic catalog listings.",
  className = ""
}) {
  const navigate = useNavigate();

  const [category, setCategory] = useState("residential");
  const [location, setLocation] = useState("South Delhi");
  const [purpose, setPurpose] = useState("Buy");
  const [budget, setBudget] = useState("Select Budget");

  const budgetOptionsResidential = [
    "Select Budget",
    "₹ 1 Cr – ₹ 2.5 Cr",
    "₹ 2.5 Cr – ₹ 5 Cr",
    "₹ 5 Cr – ₹ 10 Cr",
    "₹ 10 Cr – ₹ 25 Cr",
    "₹ 25 Cr+"
  ];

  const budgetOptionsCommercial = [
    "Select Budget",
    "₹ 2 Cr – ₹ 5 Cr",
    "₹ 5 Cr – ₹ 15 Cr",
    "₹ 15 Cr – ₹ 50 Cr",
    "₹ 50 Cr+"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Build query params to pass seamlessly into /requirement
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (location) params.set("location", location);
    if (purpose) params.set("purpose", purpose);
    if (budget && budget !== "Select Budget") params.set("budget", budget);

    navigate(`/requirement?${params.toString()}`);
  };

  const activeBudgetOptions =
    category === "commercial" ? budgetOptionsCommercial : budgetOptionsResidential;

  return (
    <section id={id} className={`requirement-finder-wrap ${className}`}>
      <Container>
        <div className="requirement-finder-card">
          <div className="finder-header">
            <div className="finder-label-wrap">
              <Compass size={16} className="finder-icon" />
              <span className="editorial-label">BESPOKE DISCOVERY</span>
            </div>
            <h2 className="finder-title">{title}</h2>
            <p className="finder-subtitle">{subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="finder-form">
            <div className="finder-grid">
              {/* Category */}
              <div className="finder-col">
                <label htmlFor="finder-category" className="finder-field-label">
                  I AM LOOKING FOR
                </label>
                <div className="finder-select-wrap">
                  <select
                    id="finder-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="finder-select"
                  >
                    <option value="residential">Residential Real Estate</option>
                    <option value="commercial">Commercial Real Estate</option>
                  </select>
                </div>
              </div>

              {/* Location */}
              <div className="finder-col">
                <label htmlFor="finder-location" className="finder-field-label">
                  LOCATION
                </label>
                <div className="finder-select-wrap">
                  <select
                    id="finder-location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="finder-select"
                  >
                    <option value="South Delhi">South Delhi</option>
                    <option value="Delhi">Delhi (All Corridors)</option>
                    <option value="Gurugram">Gurugram</option>
                  </select>
                </div>
              </div>

              {/* Purpose */}
              <div className="finder-col">
                <label htmlFor="finder-purpose" className="finder-field-label">
                  PURPOSE
                </label>
                <div className="finder-select-wrap">
                  <select
                    id="finder-purpose"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="finder-select"
                  >
                    <option value="Buy">Buy (Primary Residence / Asset)</option>
                    <option value="Invest">Invest (Growth &amp; Yield)</option>
                    <option value="Business">Business / Commercial Use</option>
                  </select>
                </div>
              </div>

              {/* Budget */}
              <div className="finder-col">
                <label htmlFor="finder-budget" className="finder-field-label">
                  BUDGET
                </label>
                <div className="finder-select-wrap">
                  <select
                    id="finder-budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="finder-select"
                  >
                    {activeBudgetOptions.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Submit & Note */}
            <div className="finder-footer">
              <div className="finder-note">
                <SlidersHorizontal size={14} />
                <span>
                  Our team curates opportunities directly matching this profile.
                </span>
              </div>
              <Button type="submit" variant="primary" size="md" className="finder-submit-btn">
                <Search size={16} />
                <span>Find Opportunities</span>
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
