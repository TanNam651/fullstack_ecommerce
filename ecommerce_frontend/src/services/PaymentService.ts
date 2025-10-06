import axios from "axios";

export const PaymentService = {
  UpdatePayment: async (data: any) => {
    const formattedData = {
      order_id: data.orderId,
      payment_id: data.paymentId,
      status_code: data.statusCode,
      transaction_id: data.transactionId
    }
    const res = await axios.put("http://127.0.0.1:8000/api/payment-return",
      formattedData,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

    if (res.status === 200) {
      return {
        success: "Thanh toan thanh cong."
      }
    }
    return {
      error: "Thanh toan that bai."
    }
  }
}