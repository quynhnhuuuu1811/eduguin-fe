export interface PaymentResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    order_url: string;
    sub_return_message: string;
  };
}

export interface PaymentRequest {
  amount: number;
}