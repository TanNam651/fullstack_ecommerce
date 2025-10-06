import  * as z from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email({message:"Email is required!"}),
  password:z.string().min(6, {
    message:"Minimum 6 characters required!"
  }),
  password_confirmation:z.string().min(6,{
    message:"Minimum 6 characters required!"
  }),
  name:z.string().min(1,{
    message:"Name is required!"
  }),
}).refine((data)=>data.password ===data.password_confirmation,{
  message:"Password do not match",
  path:["password_confirmation"]
});

export const LoginSchema = z.object({
  email:z.string().email({message:"Email is required!"}),
  password:z.string().min(6,{
    message:"Minimum 6 characters required!"
  })
});

export const OTPSchema = z.object({
  id:z.string().min(1,{
    message:"Id is required"
  }),
  token:z.string().min(6,{
    message:"OTP is required!"
  }),
});