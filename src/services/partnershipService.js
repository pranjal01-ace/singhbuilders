/**
 * Partnership Service
 * Handles strategic partner, developer, brand, and investor submissions
 * against FastAPI backend endpoint POST /api/v1/partnerships.
 */

import { apiClient } from "./api";

/**
 * Map frontend partner category selection to backend PartnerType enum
 */
function mapPartnerType(type) {
  if (!type) return "OTHER";
  const normalized = type.toLowerCase();
  if (normalized.includes("developer") || normalized.includes("landowner")) {
    return "DEVELOPER";
  }
  if (normalized.includes("brand") || normalized.includes("retail")) {
    return "BRAND";
  }
  if (normalized.includes("investor") || normalized.includes("institutional") || normalized.includes("hni")) {
    return "INVESTOR";
  }
  if (normalized.includes("strategic") || normalized.includes("partner")) {
    return "BUSINESS_PARTNER";
  }
  return "OTHER";
}

/**
 * Submit strategic partnership proposal
 * @param {Object} data - { partnerType, organization, contactPerson, name, phone, email, scope, message }
 * @returns {Promise<{ success: boolean, message: string, id?: string }>}
 */
export async function submitPartnershipEnquiry(data) {
  try {
    const payload = {
      name: (data.contactPerson || data.name || "").trim(),
      company: (data.organization || data.company || "").trim() || null,
      email: (data.email || "").trim(),
      phone: (data.phone || "").trim(),
      partner_type: mapPartnerType(data.partnerType || data.partner_type),
      message: (data.scope || data.message || "").trim(),
    };

    const result = await apiClient("/api/v1/partnerships", {
      method: "POST",
      body: payload,
    });

    return {
      success: true,
      message:
        (result.data && result.data.message) ||
        "Thank you for reaching out. We look forward to exploring collaborative opportunities together.",
      id: result.data ? result.data.id : undefined,
    };
  } catch (error) {
    console.warn("Partnership enquiry submission error:", error.message);
    return {
      success: false,
      message:
        error.message ||
        "Unable to submit partnership inquiry at this time. Please contact us directly.",
    };
  }
}

const partnershipService = {
  submitPartnershipEnquiry,
};

export default partnershipService;
