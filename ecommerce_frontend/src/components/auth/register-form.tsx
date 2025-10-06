import {CardWrapper} from "@/components/auth/card-wrapper.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";

import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import {RegisterSchema} from "@/schemas";
import {Button} from "@/components/ui/button.tsx";
import FormSuccess from "@/components/form-success.tsx";
import FormError from "@/components/form-error.tsx";
import {Actions} from "@/reducers/appReducer";
import {connect} from "react-redux";
import {useEffect, useState, useTransition} from "react";
import {useNavigate} from "react-router-dom";
import {IState} from "@/reducers/appReducer/InitState.ts";
import {objectInputType, objectOutputType, TypeOf, ZodEffects, ZodObject, ZodString, ZodTypeAny} from "zod";

type Response = {
  success?: string | undefined,
  error?: string | undefined,
  expire_id?: string | undefined,
}

interface RegisterFormProps {
  UserRegister?: (value: z.infer<typeof RegisterSchema>) => Promise<Response>,
  app?: IState
}

const RegisterForm = (props: RegisterFormProps) => {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [idVerify, setIdVerify] = useState<string | undefined>("");
  const [isPending, startTransaction] = useTransition();

  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      console.log("Success: ", success);
      navigate(`/auth/verify-email/${idVerify}`)
    }
  }, [success, idVerify, navigate])

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    }
  })
  const onSubmit = async (value: z.infer<typeof RegisterSchema>) => {
    // console.log(value);
    // console.log(isPending)
    startTransaction(async () => {
      // console.log(isPending)
      if (props.UserRegister) {
        await props.UserRegister(value).then((data) => {
          setError(data.error);
          setSuccess(data.success);
          setIdVerify(data.expire_id)
        });
      }
    });
  }

  return (
    <CardWrapper
      titleLabel="🔐 Auth"
      headerLabel="Create an account"
      backButtonLabel="Already have account?"
      backButtonHref="/auth"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Full name"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="john@example.com"
                      type="email"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password_confirmation"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Confirmation</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormSuccess message={success}/>
          <FormError message={error}/>
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isPending}
          >
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

const mapState = ({...state}) => ({
  app: state.app
})
const mapDispatchToProps = {
  UserRegister: Actions.UserRegister
}

export default connect(mapState, mapDispatchToProps)(RegisterForm)