import { create } from "zustand";
import { PaymentApi } from "../api/PaymentApi";

export interface PaymentResult {
  status: "success" | "failed" | null;
  amount: number | null;
}

interface PaymentState {
  paymentResult: PaymentResult;
  createPayment: (amount: number) => Promise<any>;
  clearPaymentResult: () => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  paymentResult: {
    status: null,
    amount: null,
  },

  createPayment: async (amount: number) => {
    try {
      const res = await PaymentApi.createPayment(amount);
      return res.data;
    } catch (error: any) {
      set({ paymentResult: { status: "failed", amount: amount } });
      console.error("Failed to create payment:", error);
      throw error;
    }
  },

  clearPaymentResult: () => {
    set({ paymentResult: { status: null, amount: null } });
  },
}));
