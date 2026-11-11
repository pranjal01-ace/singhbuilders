/**
 * Location Service
 * Communicates with FastAPI backend for active operating market locations.
 */

import { apiClient } from "./api";

/**
 * Fetch list of active market locations
 * @param {Object} options - { city, search }
 * @returns {Promise<Array>} List of location objects
 */
export async function getLocations({ city, search } = {}) {
  try {
    const params = {};
    if (city) params.city = city;
    if (search) params.search = search;

    const result = await apiClient("/api/v1/locations", { params });
    if (result && Array.isArray(result.data)) {
      return result.data;
    }
    return [];
  } catch (error) {
    console.warn("Failed to fetch locations:", error.message);
    return [];
  }
}

/**
 * Fetch specific market location by slug
 * @param {string} slug
 * @returns {Promise<Object|null>} Location details
 */
export async function getLocationBySlug(slug) {
  if (!slug) return null;
  try {
    const result = await apiClient(`/api/v1/locations/${slug}`);
    if (result && result.data) {
      return result.data;
    }
    return null;
  } catch (error) {
    if (error.status !== 404) {
      console.warn(`Failed to fetch location "${slug}":`, error.message);
    }
    return null;
  }
}

const locationService = {
  getLocations,
  getLocationBySlug,
};

export default locationService;
