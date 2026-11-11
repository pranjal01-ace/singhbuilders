/**
 * Enquiry & Requirement Service
 * Connects frontend mandate submissions, contact forms, and property inquiries
 * directly to the FastAPI backend at POST /api/v1/enquiries.
 */

import { apiClient } from "./api";
import { submitPartnershipEnquiry as partnershipSubmit } from "./partnershipService";

/**
 * Re-export partnership submission for backwards compatibility
 */
export const submitPartnershipEnquiry = partnershipSubmit;

/**
 * Map frontend interest type string to backend InterestType enum
 */
function mapInterestType(type) {
  if (!type) return "RESIDENTIAL";
  const normalized = type.toLowerCase();
  if (normalized.includes("commercial")) return "COMMERCIAL";
  if (normalized.includes("investment")) return "INVESTMENT";
  if (normalized.includes("partnership")) return "PARTNERSHIP";
  if (normalized.includes("development")) return "DEVELOPMENT";
  return "RESIDENTIAL";
}

/**
 * Validate UUID format before passing to backend property_id
 */
function isValidUuid(id) {
  if (!id || typeof id !== "string") return false;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}

/**
 * Submit a customer requirement or property-specific enquiry
 * @param {Object} data - { name, phone, email, interestType, preferredLocation, budget, requirement, message, propertyId }
 * @returns {Promise<{ success: boolean, message: string, id?: string }>}
 */
export async function submitRequirement(data) {
  try {
    const rawEmail = data.email ? data.email.trim() : null;
    const cleanEmail = rawEmail && rawEmail.includes("@") ? rawEmail : null;

    const propertyId = data.propertyId || data.property_id;
    const validPropertyId = isValidUuid(propertyId) ? propertyId : null;

    const payload = {
      name: (data.name || "").trim(),
      phone: (data.phone || "").trim(),
      email: cleanEmail,
      interest_type: mapInterestType(data.interestType || data.interest_type),
      preferred_location:
        (data.preferredLocation || data.preferred_location || data.location || "").trim() || null,
      budget:
        data.budget && data.budget !== "Select Budget Range" ? data.budget.trim() : null,
      message: (data.requirement || data.message || "").trim(),
      property_id: validPropertyId,
      source: validPropertyId ? "PROPERTY_PAGE" : "REQUIREMENT_FORM",
    };

    // Ensure message has at least 5 characters per backend schema
    if (payload.message.length < 5) {
      payload.message = `Mandate submission for ${payload.interest_type.toLowerCase()} property.`;
    }

    const result = await apiClient("/api/v1/enquiries", {
      method: "POST",
      body: payload,
    });

    return {
      success: true,
      message:
        (result.data && result.data.message) ||
        "Thank you. We have received your requirement. Our team will review the details and connect with you shortly.",
      id: result.data ? result.data.id : undefined,
    };
  } catch (error) {
    console.warn("Requirement submission error:", error.message);
    return {
      success: false,
      message:
        error.message ||
        "Unable to submit requirement at this time. Please try contacting us directly.",
    };
  }
}

/**
 * Submit a general contact inquiry
 * @param {Object} data - { name, phone, email, subject, message }
 * @returns {Promise<{ success: boolean, message: string, id?: string }>}
 */
export async function submitContactEnquiry(data) {
  try {
    const rawEmail = data.email ? data.email.trim() : null;
    const cleanEmail = rawEmail && rawEmail.includes("@") ? rawEmail : null;

    let interestType = "RESIDENTIAL";
    const subject = (data.subject || "").toLowerCase();
    if (subject.includes("commercial") || subject.includes("office") || subject.includes("retail")) {
      interestType = "COMMERCIAL";
    } else if (subject.includes("invest")) {
      interestType = "INVESTMENT";
    } else if (subject.includes("partner")) {
      interestType = "PARTNERSHIP";
    }

    let messageContent = (data.message || "").trim();
    if (data.subject && data.subject.trim()) {
      messageContent = `[Subject: ${data.subject.trim()}] ${messageContent}`;
    }

    if (messageContent.length < 5) {
      messageContent = `Contact inquiry from website visitor: ${messageContent}`;
    }

    const payload = {
      name: (data.name || "").trim(),
      phone: (data.phone || "").trim(),
      email: cleanEmail,
      interest_type: interestType,
      preferred_location: null,
      budget: null,
      message: messageContent,
      property_id: null,
      source: "CONTACT_FORM",
    };

    const result = await apiClient("/api/v1/enquiries", {
      method: "POST",
      body: payload,
    });

    return {
      success: true,
      message:
        (result.data && result.data.message) ||
        "Thank you for contacting Singh Builder's. Our team will be in touch with you.",
      id: result.data ? result.data.id : undefined,
    };
  } catch (error) {
    console.warn("Contact inquiry submission error:", error.message);
    return {
      success: false,
      message:
        error.message ||
        "Failed to send message. Please contact us directly via phone or email.",
    };
  }
}

const enquiryService = {
  submitRequirement,
  submitContactEnquiry,
  submitPartnershipEnquiry,
};

export default enquiryService;
