/**
 * Utility Formatters
 */

export function formatPhone(phone) {
  if (!phone) return "";
  const cleaned = ("" + phone).replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
}

export function formatCurrency(amount) {
  if (amount === null || amount === undefined) return "Price on Request";
  if (typeof amount === "string") return amount;
  
  if (amount >= 10000000) {
    const cr = (amount / 10000000).toFixed(2);
    return `₹ ${cr.replace(/\.00$/, "")} Cr`;
  }
  if (amount >= 100000) {
    const lk = (amount / 100000).toFixed(2);
    return `₹ ${lk.replace(/\.00$/, "")} L`;
  }
  return `₹ ${amount.toLocaleString("en-IN")}`;
}

export function formatArea(area, unit = "sq.ft.") {
  if (!area) return null;
  return `${Number(area).toLocaleString("en-IN")} ${unit}`;
}
