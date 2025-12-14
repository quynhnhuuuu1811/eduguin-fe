import instance from "@/lib/httpService";

export const PaymentApi = {
  createPayment(amount: number): Promise<any> {
    return instance.post("/zalo-payment/link-payment", { amount });
  },
};