import { RegistrationFormData, CustomerTrackingRecord } from '../types';

export const BASE_SR_START = 165050;

/**
 * Calculates the next unique sequential SR number starting from 165050.
 * Examines all existing registration and tracking records in state and storage.
 */
export function calculateNextSrNumber(
  existingRegistrations: RegistrationFormData[] = [],
  trackingRecords: CustomerTrackingRecord[] = []
): string {
  let highestSr = BASE_SR_START - 1;

  // Scan registrations
  for (const reg of existingRegistrations) {
    if (reg.noSr) {
      const numericPart = parseInt(reg.noSr.replace(/\D/g, ''), 10);
      if (!isNaN(numericPart) && numericPart >= BASE_SR_START && numericPart > highestSr) {
        highestSr = numericPart;
      }
    }
  }

  // Scan tracking records
  for (const tr of trackingRecords) {
    if (tr.noSr) {
      const numericPart = parseInt(tr.noSr.replace(/\D/g, ''), 10);
      if (!isNaN(numericPart) && numericPart >= BASE_SR_START && numericPart > highestSr) {
        highestSr = numericPart;
      }
    }
  }

  // Also check localStorage as backup
  try {
    const savedRegs = localStorage.getItem('aetra_registrations');
    if (savedRegs) {
      const parsed: RegistrationFormData[] = JSON.parse(savedRegs);
      for (const reg of parsed) {
        if (reg.noSr) {
          const numericPart = parseInt(reg.noSr.replace(/\D/g, ''), 10);
          if (!isNaN(numericPart) && numericPart >= BASE_SR_START && numericPart > highestSr) {
            highestSr = numericPart;
          }
        }
      }
    }
  } catch {
    // Ignore storage parse error
  }

  return String(highestSr + 1);
}
