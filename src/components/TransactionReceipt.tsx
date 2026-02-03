import { createSignal, onMount, Show, type Component } from 'solid-js';
import type { TransactionData } from '../types';
import { maskCardNumber } from '../utils';

const TransactionReceipt: Component = () => {
  const [transaction, setTransaction] = createSignal<TransactionData | null>(null);
  const [isLoading, setIsLoading] = createSignal(true);

  onMount(() => {
    // Parse URL parameters
    const params = new URLSearchParams(window.location.search);
    
    const name = params.get('name');
    const card = params.get('card');
    const expiry = params.get('expiry');
    const amount = params.get('amount');
    const txnId = params.get('txnId');
    const timestamp = params.get('timestamp');

    if (name && card && expiry && amount && txnId && timestamp) {
      setTimeout(() => {
        setTransaction({
          cardholderName: name,
          cardNumber: card,
          expiryDate: expiry,
          cvv: '***', // Never store/display actual CVV
          amount: amount,
          transactionId: txnId,
          status: 'success',
          timestamp: timestamp,
        });
        setIsLoading(false);
      }, 500);
    } else {
      // If no transaction data, redirect to home
      window.location.href = '/';
    }
  });

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatAmount = (amount: string): string => {
    return parseFloat(amount).toFixed(2);
  };

  const handleNewPayment = () => {
    window.location.href = '/';
  };

  const handleDownloadReceipt = () => {
    const data = transaction();
    if (!data) return;

    const receiptText = `
PAYMENT RECEIPT
=====================================

Transaction ID: ${data.transactionId}
Status: ${data.status.toUpperCase()}
Date: ${formatDate(data.timestamp)}

PAYMENT DETAILS
-------------------------------------
Cardholder: ${data.cardholderName}
Card Number: ${maskCardNumber(data.cardNumber)}
Expiry Date: ${data.expiryDate}
Amount: $${formatAmount(data.amount)}

Thank you for your payment!
=====================================
    `.trim();

    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${data.transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div class="w-full max-w-2xl mx-auto px-4 py-12">
      <Show 
        when={!isLoading()}
        fallback={
          <div class="flex items-center justify-center min-h-[400px]">
            <div class="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600"></div>
          </div>
        }
      >
        <Show when={transaction()}>
          {(txn) => (
            <div class="animate-scale-in">
              {/* Success Icon */}
              <div class="text-center mb-8">
                <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4 animate-pulse">
                  <svg 
                    class="w-10 h-10 text-green-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="3" 
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h1 class="font-display text-5xl md:text-6xl text-green-600 mb-2">
                  Payment Successful
                </h1>
                <p class="text-lg text-gray-600">
                  Your transaction has been processed
                </p>
              </div>

              {/* Receipt Card */}
              <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-primary-100">
                {/* Header */}
                <div class="bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-6">
                  <h2 class="font-display text-2xl text-white mb-1">
                    Transaction Receipt
                  </h2>
                  <p class="text-primary-50 text-sm">
                    {formatDate(txn().timestamp)}
                  </p>
                </div>

                {/* Receipt Details */}
                <div class="p-8 space-y-6">
                  {/* Transaction ID */}
                  <div class="pb-6 border-b-2 border-dashed border-gray-200">
                    <p class="text-sm text-gray-500 mb-1">Transaction ID</p>
                    <p class="font-mono text-lg font-semibold text-gray-900 break-all">
                      {txn().transactionId}
                    </p>
                  </div>

                  {/* Status */}
                  <div class="flex items-center justify-between pb-6 border-b-2 border-dashed border-gray-200">
                    <p class="text-sm text-gray-500">Status</p>
                    <span class="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                      <span class="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                      Success
                    </span>
                  </div>

                  {/* Cardholder Name */}
                  <div class="flex items-center justify-between">
                    <p class="text-sm text-gray-500">Cardholder Name</p>
                    <p class="font-semibold text-gray-900">{txn().cardholderName}</p>
                  </div>

                  {/* Card Number */}
                  <div class="flex items-center justify-between">
                    <p class="text-sm text-gray-500">Card Number</p>
                    <p class="font-mono font-semibold text-gray-900">
                      {maskCardNumber(txn().cardNumber)}
                    </p>
                  </div>

                  {/* Expiry Date */}
                  <div class="flex items-center justify-between">
                    <p class="text-sm text-gray-500">Expiry Date</p>
                    <p class="font-mono font-semibold text-gray-900">{txn().expiryDate}</p>
                  </div>

                  {/* Amount - Highlighted */}
                  <div class="bg-gradient-to-br from-accent-50 to-primary-50 rounded-2xl p-6 mt-6 border-2 border-primary-200">
                    <div class="flex items-center justify-between">
                      <p class="text-gray-700 font-medium">Payment Amount</p>
                      <p class="font-display text-4xl text-primary-700">
                        ${formatAmount(txn().amount)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div class="px-8 pb-8 space-y-3">
                  <button
                    onClick={handleDownloadReceipt}
                    class="w-full bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    📥 Download Receipt
                  </button>
                  
                  <button
                    onClick={handleNewPayment}
                    class="w-full bg-white border-2 border-primary-200 hover:border-primary-300 text-primary-700 font-semibold py-3 rounded-xl hover:bg-primary-50 transition-all duration-200"
                  >
                    Make Another Payment
                  </button>
                </div>
              </div>

              {/* Footer Note */}
              <p class="text-center text-sm text-gray-500 mt-6">
                Please save this receipt for your records
              </p>
            </div>
          )}
        </Show>
      </Show>
    </div>
  );
};

export default TransactionReceipt;
