import {connect, useDispatch} from "react-redux";
import {Actions} from "@/reducers/appReducer";
import {CardWrapper} from "@/components/auth/card-wrapper.tsx";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx";
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {OTPSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import FormError from "@/components/form-error.tsx";
import FormSuccess from "@/components/form-success.tsx";
import {Button} from "@/components/ui/button.tsx";
import {REGEXP_ONLY_DIGITS} from "input-otp";
import {useEffect, useState, useTransition} from "react";

type Response = {
  success?: string,
  error?: string
}

interface NewVerifyFormProps {
  UserNewVerify?: (value: any) => Promise<Response>;
  app?: any;
  id: string;
}

const NewVerifyForm = (props: NewVerifyFormProps) => {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransaction] = useTransition();

  useEffect(() => {
    console.log("Error: ", error);
    console.log("Success: ", success)
  }, [error, success]);

  const form = useForm<z.infer<typeof OTPSchema>>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      token: "",
      id:props.id
    }
  });

  const onSubmit = (value: z.infer<typeof OTPSchema>) => {
    setSuccess("");
    setError("");
    startTransaction(() => {
      if (props.UserNewVerify) {
        props.UserNewVerify(value).then((data) => {
          setError(data.error);
          setSuccess(data.success);
        });
      }
    });
  }

  return (
    <CardWrapper
      titleLabel="🔐 Auth"
      headerLabel="Verify email"
      backButtonLabel="Back to login"
      backButtonHref="/auth"
    >
      <Form {...form}>
        <form onSubmit={form.control.handleSubmit(onSubmit)}
              className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="token"
              render={({field}) => (
                <FormItem>
                  {/*<FormLabel>Verify email OTP</FormLabel>*/}
                  <FormControl className="flex justify-center items-center">
                    <InputOTP maxLength={6} {...field} pattern={REGEXP_ONLY_DIGITS} disabled={isPending}>
                      <InputOTPGroup className="items-center">
                        <InputOTPSlot index={0} className="h-12 w-12 text-3xl"/>
                        <InputOTPSlot index={1} className="h-12 w-12 text-3xl"/>
                        <InputOTPSlot index={2} className="h-12 w-12 text-3xl"/>
                        <InputOTPSlot index={3} className="h-12 w-12 text-3xl"/>
                        <InputOTPSlot index={4} className="h-12 w-12 text-3xl"/>
                        <InputOTPSlot index={5} className="h-12 w-12 text-3xl"/>
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>Please enter OTP code in email</FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <FormError message={error}/>
          <FormSuccess message={success}/>
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isPending}
          >
            Verify account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

const mapState = ({...state}) => ({
  app: state.app
});

const mapDispatchToProps = {
  UserNewVerify: Actions.UserNewVerify
}

export default connect(mapState, mapDispatchToProps)(NewVerifyForm)