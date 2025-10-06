import {useSearchParams} from "react-router-dom";
import {PaymentReturnForm} from "@/pages/payment-return/components/payment-return-form.tsx";

export function PaymentReturn() {
  const [searchParams, setSearchParams] = useSearchParams();

  const statusCode = searchParams.get("vnp_ResponseCode");
  const orderId = searchParams.get("order_id");
  const paymentId = searchParams.get("payment_id");
  const transactionId = searchParams.get("vnp_TransactionNo");

  return (
    <>
      <PaymentReturnForm
        orderId={orderId}
        paymentId={paymentId}
        statusCode={statusCode}
        transactionId={transactionId}
      />
    </>
  )
}