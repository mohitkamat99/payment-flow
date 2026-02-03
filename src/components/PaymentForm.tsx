import { createSignal, Show, type Component } from "solid-js";
import type { PaymentFormData, ValidationErrors } from "../types";
import {
  validateForm,
  formatCardNumber,
  formatExpiryDate,
  generateTransactionId,
} from "../utils";

const PaymentForm: Component = () => {
  const [formData, setFormData] = createSignal<PaymentFormData>({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    amount: "",
  });

  const [errors, setErrors] = createSignal<ValidationErrors>({});
  const [isProcessing, setIsProcessing] = createSignal(false);

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleCardNumberChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    let formatted = formatCardNumber(input.value);

    // Enforce 16 digits limit
    const digits = formatted.replace(/\s/g, "");
    if (digits.length > 16) {
      formatted = formatCardNumber(digits.slice(0, 16));
    }

    handleInputChange("cardNumber", formatted);

    // Force input value update if it doesn't match formatted (handles truncation case where state might not change)
    if (input.value !== formatted) {
      input.value = formatted;
    }
  };

  const handleExpiryDateChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const formatted = formatExpiryDate(input.value);
    if (formatted.replace(/\D/g, "").length <= 4) {
      handleInputChange("expiryDate", formatted);
    }
  };

  const handleCVVChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, "");
    if (value.length <= 3) {
      handleInputChange("cvv", value);
    }
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const validationErrors = validateForm(formData());

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate transaction data
    const transactionId = generateTransactionId();
    const timestamp = new Date().toISOString();

    // Store transaction data in URL params for the receipt page
    const params = new URLSearchParams({
      name: formData().cardholderName,
      card: formData().cardNumber,
      expiry: formData().expiryDate,
      amount: formData().amount,
      txnId: transactionId,
      timestamp: timestamp,
    });

    window.location.href = `/receipt?${params.toString()}`;
  };

  return (
    <div class="w-full max-w-2xl mx-auto px-4 py-12">
      <div class="animate-slide-up">
        <div class="text-center mb-8">
          <h1 class="font-display text-5xl md:text-6xl text-primary-900 mb-3">
            Secure Payment
          </h1>
          <p class="text-lg text-gray-600 font-light">
            Complete your transaction safely
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-10 border border-primary-100"
        >
          <div class="space-y-6">
            {/* Cardholder Name */}
            <div class="animate-fade-in" style={{ "animation-delay": "0.1s" }}>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                value={formData().cardholderName}
                onInput={(e) =>
                  handleInputChange("cardholderName", e.currentTarget.value)
                }
                placeholder="John Doe"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all duration-200"
              />
              <Show when={errors().cardholderName}>
                <p class="text-red-500 text-sm mt-1">
                  {errors().cardholderName}
                </p>
              </Show>
            </div>

            {/* Card Number */}
            <div class="animate-fade-in" style={{ "animation-delay": "0.2s" }}>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <input
                type="text"
                value={formData().cardNumber}
                onInput={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all duration-200 font-mono text-lg tracking-wider"
              />
              <Show when={errors().cardNumber}>
                <p class="text-red-500 text-sm mt-1">{errors().cardNumber}</p>
              </Show>
            </div>

            {/* Expiry and CVV */}
            <div
              class="grid grid-cols-2 gap-4 animate-fade-in"
              style={{ "animation-delay": "0.3s" }}
            >
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={formData().expiryDate}
                  onInput={handleExpiryDateChange}
                  placeholder="MM/YY"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all duration-200 font-mono"
                />
                <Show when={errors().expiryDate}>
                  <p class="text-red-500 text-sm mt-1">{errors().expiryDate}</p>
                </Show>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="password"
                  value={formData().cvv}
                  onInput={handleCVVChange}
                  placeholder="123"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all duration-200 font-mono"
                  maxlength="4"
                />
                <Show when={errors().cvv}>
                  <p class="text-red-500 text-sm mt-1">{errors().cvv}</p>
                </Show>
              </div>
            </div>

            {/* Amount */}
            <div class="animate-fade-in" style={{ "animation-delay": "0.4s" }}>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Payment Amount
              </label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-semibold">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  value={formData().amount}
                  onInput={(e) =>
                    handleInputChange("amount", e.currentTarget.value)
                  }
                  placeholder="0.00"
                  class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all duration-200 text-lg font-semibold"
                />
              </div>
              <Show when={errors().amount}>
                <p class="text-red-500 text-sm mt-1">{errors().amount}</p>
              </Show>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing()}
              class="w-full mt-8 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none animate-fade-in"
              style={{ "animation-delay": "0.5s" }}
            >
              <Show
                when={!isProcessing()}
                fallback={
                  <span class="flex items-center justify-center gap-2">
                    <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                        fill="none"
                      />
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing Payment...
                  </span>
                }
              >
                Pay Now
              </Show>
            </button>

            {/* Security Note */}
            <p
              class="text-center text-xs text-gray-500 mt-4 animate-fade-in"
              style={{ "animation-delay": "0.6s" }}
            >
              🔒 Your payment information is secure and encrypted
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
