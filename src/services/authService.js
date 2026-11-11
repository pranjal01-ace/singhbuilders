/**
 * Authentication Service
 * Manages JWT tokens, session lifecycle, and communication with auth endpoints:
 * POST /api/v1/auth/login
 * GET  /api/v1/auth/me
 */

import { apiClient } from "./api";

const TOKEN_KEY = "token";
const USER_KEY = "auth_user";

/**
 * Retrieve current JWT token from storage
 * @returns {string|null}
 */
export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (e) {
    return null;
  }
}

/**
 * Check if a token exists in storage
 * @returns {boolean}
 */
export function isAuthenticated() {
  return Boolean(getToken());
}

/**
 * Authenticate with credentials and store token
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ success: boolean, token?: string, user?: Object, error?: string }>}
 */
export async function login(email, password) {
  try {
    const result = await apiClient("/api/v1/auth/login", {
      method: "POST",
      body: { email, password },
    });

    if (result && result.data && result.data.access_token) {
      const token = result.data.access_token;
      localStorage.setItem(TOKEN_KEY, token);

      // Fetch user profile immediately
      const userResult = await getCurrentUser();
      return { success: true, token, user: userResult };
    }

    return { success: false, error: "Invalid response from server" };
  } catch (error) {
    return { success: false, error: error.message || "Authentication failed" };
  }
}

/**
 * Fetch profile of currently authenticated user
 * @returns {Promise<Object|null>}
 */
export async function getCurrentUser() {
  if (!isAuthenticated()) return null;
  try {
    const result = await apiClient("/api/v1/auth/me");
    if (result && result.data) {
      localStorage.setItem(USER_KEY, JSON.stringify(result.data));
      return result.data;
    }
    return null;
  } catch (error) {
    if (error.status === 401) {
      logout();
    }
    return null;
  }
}

/**
 * Get cached user details synchronously
 * @returns {Object|null}
 */
export function getStoredUser() {
  try {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  } catch (e) {
    return null;
  }
}

/**
 * Log out and clear stored session tokens
 */
export function logout() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch (e) {
    // Ignore storage errors
  }
}

const authService = {
  getToken,
  isAuthenticated,
  login,
  getCurrentUser,
  getStoredUser,
  logout,
};

export default authService;
