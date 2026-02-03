export interface PaymentFormData {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  amount: string;
}

export interface TransactionData extends PaymentFormData {
  transactionId: string;
  status: "success" | "failed";
  timestamp: string;
}

export interface ValidationErrors {
  cardholderName?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  amount?: string;
}
