/**
 * Navigation items and links
 */

export const mainNavLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { 
    label: "Properties", 
    path: "/properties",
    subLinks: [
      { label: "All Opportunities", path: "/properties" },
      { label: "Residential", path: "/properties/residential" },
      { label: "Commercial", path: "/properties/commercial" }
    ]
  },
  { 
    label: "Services", 
    path: "/services",
    subLinks: [
      { label: "All Services", path: "/services" },
      { label: "Residential Real Estate", path: "/services/residential" },
      { label: "Commercial Real Estate", path: "/services/commercial" },
      { label: "Builder & Developer", path: "/services/developers" },
      { label: "Strategic Partnerships", path: "/services/partnerships" }
    ]
  },
  { label: "How We Work", path: "/how-we-work" },
  { 
    label: "Locations", 
    path: "/locations",
    subLinks: [
      { label: "Overview", path: "/locations" },
      { label: "South Delhi", path: "/locations/south-delhi" },
      { label: "Delhi", path: "/locations/delhi" },
      { label: "Gurugram", path: "/locations/gurugram" }
    ]
  },
  { label: "Partnerships", path: "/partnerships" },
  { label: "Contact", path: "/contact" }
];

export const footerQuickLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "How We Work", path: "/how-we-work" },
  { label: "Property Opportunities", path: "/properties" },
  { label: "Strategic Partnerships", path: "/partnerships" },
  { label: "Discuss Requirement", path: "/requirement" },
  { label: "Contact Us", path: "/contact" }
];

export const footerServicesLinks = [
  { label: "Residential Real Estate", path: "/services/residential" },
  { label: "Commercial Real Estate", path: "/services/commercial" },
  { label: "Builder & Developer Activities", path: "/services/developers" },
  { label: "Property Opportunities", path: "/requirement" },
  { label: "Strategic Partnerships", path: "/services/partnerships" }
];

export const footerLocationLinks = [
  { label: "South Delhi", path: "/locations/south-delhi" },
  { label: "Delhi Urban Corridors", path: "/locations/delhi" },
  { label: "Gurugram Millennium City", path: "/locations/gurugram" }
];
