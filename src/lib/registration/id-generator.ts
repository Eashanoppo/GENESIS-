/**
 * Generates a human-friendly registration identifier
 * Format: GEN-2026-XXXXX (e.g., GEN-2026-00042)
 */
export function formatRegistrationId(sequenceNumber: number, year: string = "2026"): string {
  const padded = String(sequenceNumber).padStart(5, "0");
  return `GEN-${year}-${padded}`;
}

export function generateFallbackRegistrationId(year: string = "2026"): string {
  const randomPart = Math.floor(10000 + Math.random() * 90000);
  return `GEN-${year}-${randomPart}`;
}
