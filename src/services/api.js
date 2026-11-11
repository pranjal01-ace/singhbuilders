/**
 * Centralized API Client
 * Facilitates HTTP communication between React Frontend and FastAPI Backend.
 * Standardizes headers, authentication tokens, timeout, and FastAPI error response parsing.
 */

const RAW_BASE_URL =
  process.env.REACT_APP_API_URL ||
  process.env.REACT_APP_API_BASE_URL ||
  "http://localhost:8000/api/v1";

// Ensure trailing slash is removed
const CLEAN_BASE_URL = RAW_BASE_URL.replace(/\/+$/, "");

/**
 * Resolve full endpoint URL safely avoiding duplicated /api/v1 prefixes
 */
function resolveUrl(endpoint) {
  if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) {
    return endpoint;
  }
  let path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  if (CLEAN_BASE_URL.endsWith("/api/v1") && path.startsWith("/api/v1/")) {
    path = path.replace(/^\/api\/v1/, "");
  }

  return `${CLEAN_BASE_URL}${path}`;
}

/**
 * Format FastAPI validation error details into a human-readable string
 */
function extractErrorMessage(errorData, status) {
  if (!errorData) {
    return `Request failed with status ${status}`;
  }

  if (typeof errorData.detail === "string") {
    return errorData.detail;
  }

  if (Array.isArray(errorData.detail)) {
    // FastAPI 422 Unprocessable Entity returns an array of error objects
    return errorData.detail
      .map((err) => {
        const field = Array.isArray(err.loc) ? err.loc.slice(1).join(" -> ") : "field";
        return `${field}: ${err.msg}`;
      })
      .join("; ");
  }

  if (errorData.message) {
    return errorData.message;
  }

  return `Request failed with status ${status}`;
}

/**
 * Universal API Client
 * @param {string} endpoint - API path (e.g. "/properties" or "/api/v1/properties")
 * @param {Object} options - { method, body, headers, timeout, params }
 * @returns {Promise<{ data: any, status: number, isMock: boolean }>}
 */
export async function apiClient(
  endpoint,
  { method = "GET", body = null, headers = {}, timeout = 10000, params = null } = {}
) {
  let targetUrl = resolveUrl(endpoint);

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      targetUrl += (targetUrl.includes("?") ? "&" : "?") + queryString;
    }
  }

  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("access_token") ||
    localStorage.getItem("auth_token");

  const requestHeaders = {
    Accept: "application/json",
    ...headers,
  };

  if (!(body instanceof FormData) && !requestHeaders["Content-Type"]) {
    requestHeaders["Content-Type"] = "application/json";
  }

  if (token && !requestHeaders["Authorization"]) {
    requestHeaders["Authorization"] = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const config = {
      method,
      headers: requestHeaders,
      signal: controller.signal,
    };

    if (body) {
      config.body = body instanceof FormData ? body : JSON.stringify(body);
    }

    const res = await fetch(targetUrl, config);
    clearTimeout(timer);

    if (!res.ok) {
      const errorJson = await res.json().catch(() => null);
      const message = extractErrorMessage(errorJson, res.status);
      const error = new Error(message);
      error.status = res.status;
      error.data = errorJson;
      throw error;
    }

    // Handle 204 No Content
    if (res.status === 204) {
      return { data: null, status: res.status, isMock: false };
    }

    const data = await res.json();
    return { data, status: res.status, isMock: false };
  } catch (error) {
    clearTimeout(timer);
    if (error.name === "AbortError") {
      const timeoutError = new Error(`Request to ${endpoint} timed out after ${timeout}ms`);
      timeoutError.status = 408;
      throw timeoutError;
    }
    throw error;
  }
}

export default apiClient;
