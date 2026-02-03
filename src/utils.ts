import type { PaymentFormData, ValidationErrors } from "./types";

export const validateCardNumber = (cardNumber: string): boolean => {
  // Remove spaces and check if it's 16 digits
  const cleaned = cardNumber.replace(/\s/g, "");
  return /^\d{16}$/.test(cleaned);
};

export const validateExpiryDate = (expiryDate: string): boolean => {
  // Format: MM/YY
  if (!/^\d{2}\/\d{2}$/.test(expiryDate)) return false;

  const [month, year] = expiryDate.split("/").map(Number);
  if (month < 1 || month > 12) return false;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;

  return true;
};

export const validateCVV = (cvv: string): boolean => {
  return /^\d{3}$/.test(cvv);
};

export const validateAmount = (amount: string): boolean => {
  const num = parseFloat(amount);
  const decimals = amount.split(".")[1]?.length || 0;
  return !isNaN(num) && num > 0 && decimals <= 2;
};

export const validateForm = (data: PaymentFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.cardholderName.trim()) {
    errors.cardholderName = "Cardholder name is required";
  } else if (/\d/.test(data.cardholderName)) {
    errors.cardholderName = "Cardholder name cannot contain numbers";
  }

  if (!validateCardNumber(data.cardNumber)) {
    errors.cardNumber = "Invalid card number (16 digits required)";
  }

  if (!validateExpiryDate(data.expiryDate)) {
    errors.expiryDate =
      "Invalid expiry date (MM/YY format, must be future date)";
  }

  if (!validateCVV(data.cvv)) {
    errors.cvv = "Invalid CVV (3 digits required)";
  }

  if (!validateAmount(data.amount)) {
    errors.amount = "Invalid amount (must be greater than 0)";
  }

  return errors;
};

export const formatCardNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, "");
  const chunks = cleaned.match(/.{1,4}/g);
  return chunks ? chunks.join(" ") : cleaned;
};

export const formatExpiryDate = (value: string): string => {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length >= 2) {
    return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
  }
  return cleaned;
};

export const maskCardNumber = (cardNumber: string): string => {
  const cleaned = cardNumber.replace(/\s/g, "");
  return "**** **** **** " + cleaned.slice(-4);
};

export const generateTransactionId = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 9);
  return `TXN-${timestamp}-${random}`.toUpperCase();
};
