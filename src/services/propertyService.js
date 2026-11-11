/**
 * Property Service
 * Handles listing, filtering, pagination, and detail queries against FastAPI backend.
 * Adapts backend responses into normalized frontend structures without fabricating inventory.
 */

import { apiClient } from "./api";

/**
 * Format and normalize backend property object for seamless UI rendering
 * @param {Object} raw - Raw property payload from backend
 * @returns {Object|null} Normalized property object
 */
export function formatProperty(raw) {
  if (!raw) return null;

  // Extract cover image and all image URLs
  let coverImage = "";
  let imageUrls = [];

  if (Array.isArray(raw.images) && raw.images.length > 0) {
    const coverObj = raw.images.find((img) => img && (img.is_cover || img.isCover));
    if (coverObj && coverObj.url) {
      coverImage = coverObj.url;
    } else if (raw.images[0]) {
      coverImage = typeof raw.images[0] === "string" ? raw.images[0] : raw.images[0].url || "";
    }

    imageUrls = raw.images.map((img) => (typeof img === "string" ? img : img.url || "")).filter(Boolean);
  } else if (raw.cover_image || raw.coverImage) {
    coverImage = raw.cover_image || raw.coverImage;
    imageUrls = [coverImage];
  }

  // Format type human-readably (e.g. BUILDER_FLOOR -> Builder Floor)
  const rawType = raw.property_type || raw.type || "";
  const formattedType = rawType
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  // Format location info
  let locationName = "";
  let cityName = "";
  let localityName = "";

  if (raw.location && typeof raw.location === "object") {
    locationName = raw.location.name || "";
    cityName = raw.location.city || "";
    localityName = raw.location.name || "";
  } else if (typeof raw.location === "string") {
    locationName = raw.location;
    cityName = raw.city || "";
    localityName = raw.locality || raw.location;
  } else {
    cityName = raw.city || "Delhi-NCR";
    localityName = raw.locality || "";
  }

  // Format amenities into list of string names
  const amenitiesList = Array.isArray(raw.amenities)
    ? raw.amenities.map((a) => (typeof a === "string" ? a : a.name || "")).filter(Boolean)
    : [];

  return {
    id: raw.id,
    title: raw.title || "",
    slug: raw.slug || "",
    category: (raw.category || "").toLowerCase(),
    propertyType: raw.property_type || raw.type || "",
    type: formattedType || "Exclusive Property",
    description: raw.description || "",
    price: raw.price !== null && raw.price !== undefined ? Number(raw.price) : null,
    priceType: raw.price_type || "FIXED",
    area: raw.area !== null && raw.area !== undefined ? Number(raw.area) : null,
    areaUnit: raw.area_unit || raw.areaUnit || "sq.ft.",
    bedrooms: raw.bedrooms !== null && raw.bedrooms !== undefined ? Number(raw.bedrooms) : null,
    bathrooms: raw.bathrooms !== null && raw.bathrooms !== undefined ? Number(raw.bathrooms) : null,
    status: raw.status || "PUBLISHED",
    featured: Boolean(raw.featured),
    developer: raw.developer_name || raw.developer || "",
    possession: raw.possession || "",
    reraNumber: raw.rera_number || raw.reraNumber || "",
    latitude: raw.latitude,
    longitude: raw.longitude,
    location: locationName,
    locality: localityName,
    city: cityName,
    rawLocation: raw.location,
    coverImage,
    images: imageUrls,
    amenities: amenitiesList,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

/**
 * Fetch published properties with comprehensive filtering & pagination
 * @param {Object} filters
 * @returns {Promise<{ data: Array, total: number, page: number, pages: number, limit: number }>}
 */
export async function getProperties(filters = {}) {
  try {
    const params = {};

    // Category mapping
    if (filters.category && filters.category !== "all") {
      params.category = filters.category.toUpperCase();
    }

    // Property Type mapping (e.g. builder-floor -> BUILDER_FLOOR)
    if (filters.type && filters.type !== "all") {
      params.property_type = filters.type.replace(/-/g, "_").toUpperCase();
    }

    // Location mapping
    if (filters.location && filters.location !== "all") {
      params.location_slug = filters.location;
    }
    if (filters.location_slug) {
      params.location_slug = filters.location_slug;
    }
    if (filters.location_id) {
      params.location_id = filters.location_id;
    }

    // Featured filter
    if (filters.featured !== undefined && filters.featured !== null) {
      params.featured = Boolean(filters.featured);
    }

    // Budget range mapping
    if (filters.budget && filters.budget !== "all") {
      switch (filters.budget) {
        case "under-3cr":
          params.max_price = 30000000;
          break;
        case "3cr-7cr":
          params.min_price = 30000000;
          params.max_price = 70000000;
          break;
        case "7cr-15cr":
          params.min_price = 70000000;
          params.max_price = 150000000;
          break;
        case "15cr-plus":
          params.min_price = 150000000;
          break;
        default:
          break;
      }
    }

    // Explicit price bounds
    if (filters.min_price !== undefined) params.min_price = filters.min_price;
    if (filters.max_price !== undefined) params.max_price = filters.max_price;
    if (filters.minPrice !== undefined) params.min_price = filters.minPrice;
    if (filters.maxPrice !== undefined) params.max_price = filters.maxPrice;

    // Search query
    if (filters.search && filters.search.trim()) {
      params.search = filters.search.trim();
    }

    // Bedrooms
    if (filters.bedrooms !== undefined && filters.bedrooms !== "all") {
      params.bedrooms = Number(filters.bedrooms);
    }

    // Pagination & Sorting
    params.page = filters.page || 1;
    params.limit = filters.limit || 12;
    params.sort = filters.sort || "newest";

    const result = await apiClient("/api/v1/properties", { params });

    if (result && result.data) {
      const items = Array.isArray(result.data.items)
        ? result.data.items.map(formatProperty)
        : Array.isArray(result.data)
        ? result.data.map(formatProperty)
        : [];

      return {
        data: items,
        total: result.data.total !== undefined ? result.data.total : items.length,
        page: result.data.page || 1,
        pages: result.data.pages || 1,
        limit: result.data.limit || items.length,
      };
    }

    return { data: [], total: 0, page: 1, pages: 1, limit: 12 };
  } catch (error) {
    console.warn("Failed to load properties:", error.message);
    return { data: [], total: 0, page: 1, pages: 1, limit: 12, error: error.message };
  }
}

/**
 * Fetch single published property by its unique slug
 * @param {string} slug
 * @returns {Promise<Object|null>}
 */
export async function getPropertyBySlug(slug) {
  if (!slug) return null;
  try {
    const result = await apiClient(`/api/v1/properties/${slug}`);
    if (result && result.data) {
      return formatProperty(result.data);
    }
    return null;
  } catch (error) {
    if (error.status !== 404) {
      console.warn(`Failed to fetch property "${slug}":`, error.message);
    }
    return null;
  }
}

const propertyService = {
  getProperties,
  getPropertyBySlug,
  formatProperty,
};

export default propertyService;
