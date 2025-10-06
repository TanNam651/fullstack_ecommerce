import {CardWrapper} from "@/components/auth/card-wrapper.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";

import {Actions} from "@/reducers/appReducer";
import {connect} from "react-redux";
import * as z from "zod";
import {LoginSchema} from "@/schemas";
import {IState} from "@/reducers/appReducer/InitState.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import FormSuccess from "@/components/form-success.tsx";
import FormError from "@/components/form-error.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState, useTransition} from "react";
import {useAppNavigate} from "@/hooks/use-navigate.ts";

type Response = {
  success?: string,
  error?: string,
  role?: string,
}

interface LoginFormProps {
  UserLogin: (value: z.infer<typeof LoginSchema>) => Promise<Response>;
  app?: IState
}

const LoginForm = (props: LoginFormProps) => {

  const navigate = useAppNavigate();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

const handleNavigate = (role:string)=>{
  switch (role.toUpperCase()){
    case "ADMIN":
      navigate("/admin/dashboard");
      break;
    default:
      navigate("/");
      break;
  }
}
  const onSubmit = (value: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const response: Response = await props.UserLogin(value);
      if (response?.success) {
        setSuccess(response.success);
        if (response.role){
          handleNavigate(response.role);
          return;
        }
      } else if (response.error){
        setError(response.error);
      }
    });
  }

  return (
    <CardWrapper
      titleLabel="🔐 Auth"
      headerLabel="Welcom back"
      backButtonLabel="Don't have account"
      backButtonHref="/auth/register"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@example.com"
                      disabled={isPending}
                      {...field}
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
                      placeholder="********"
                      type="password"
                      disabled={isPending}
                      {...field}
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
            Login
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
  UserLogin: Actions.UserLogin
}
export default connect(mapState, mapDispatchToProps)(LoginForm);