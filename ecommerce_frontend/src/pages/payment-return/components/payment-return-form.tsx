import {CardWrapper} from "@/components/auth/card-wrapper.tsx";
import React, {useCallback, useEffect, useState} from "react";
import {BeatLoader} from "react-spinners";
import FormSuccess from "@/components/form-success.tsx";
import FormError from "@/components/form-error.tsx";
import {PaymentService} from "@/services/PaymentService.ts";
import {useAppContext} from "@/hooks/use-app-context.ts";
import {useNavigate} from "react-router-dom";

interface PaymentReturnFormProps {
  orderId: string | null,
  paymentId: string | null,
  statusCode: string | null,
  transactionId: string | null,
}

export const PaymentReturnForm: React.FC<PaymentReturnFormProps> = ({
                                                                      orderId,
                                                                      paymentId,
                                                                      statusCode,
                                                                      transactionId
                                                                    }) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const {cartDispatch} = useAppContext();
  const navigate = useNavigate();

  const onSubmit = useCallback(() => {
    if (!orderId && !paymentId && !statusCode && !transactionId) {
      setError("Thiếu thông tin.");
      return;
    }
    PaymentService.UpdatePayment({orderId, paymentId, statusCode, transactionId})
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      }).catch(() => {
      setError("Lỗi không xác định");
    });
    if (success) {
      cartDispatch({type: "RESET_CART"});
      navigate("/");
    }
  }, [orderId, paymentId, statusCode, transactionId, cartDispatch, success, navigate]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <div>
      <CardWrapper
        titleLabel="Kết quả thanh toán"
        headerLabel="Result of payment"
        backButtonLabel="Quay về trang chủ"
        backButtonHref="/"
      >
        <div className="flex items-center w-full justify-center">
          {!success && !error && (
            <BeatLoader/>
          )}
          <FormSuccess message={success}/>
          <FormError message={error}/>
        </div>
      </CardWrapper>
    </div>
  )
}