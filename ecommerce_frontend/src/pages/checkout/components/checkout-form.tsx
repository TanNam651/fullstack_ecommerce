import {Link, useNavigate} from "react-router-dom";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAppContext} from "@/hooks/use-app-context.ts";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";

import HeaderIcon from "@/assets/chu_ki_mail_b62c6cf5ff4e47e39589493faf37dbc4_grande.webp";
import CashLogo from "@/assets/cod.svg";
import PayLogo from "@/assets/other.svg";
import {Button} from "@/components/ui/button.tsx";
import {CartProductItem} from "@/pages/cart/components/cart-product-item.tsx";
import {Cart} from "@/helpers/types.ts";
import {useTransition} from "react";
import {OrderService} from "@/services/OrderService.ts";
import {formatter} from "@/helpers/utils.ts";
import {toast} from "sonner";

type Order = {
  name: string,
  email: string,
  phone: string,
  address: string,
  payment_method: 'cash' | 'vnpay',
  order: Cart
}

const FormSchema = z.object({
  name: z.string().min(1, {message: "Name is required"}),
  email: z.string().email({message: "Email is required!"}),
  phone: z.string().regex(/^\+?[\d\s\-().]{7,15}$/),
  address: z.string({message: "Address is required"}),
  paymentMethod: z.enum(['cash', 'vnpay']),
});

export const CheckoutForm = () => {
  const {cart, cartDispatch} = useAppContext();
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      address: "",
      paymentMethod: 'cash',
    }
  });

  const onSubmit = (value: z.infer<typeof FormSchema>) => {
    const order: Order = {
      name: value.name,
      email: value.email,
      phone: value.phone,
      address: value.address,
      payment_method: value.paymentMethod,
      order: cart
    }

    // console.log(order);
    startTransition(async () => {
      const res = await OrderService.CreateOrder(order);
      if (res.url) {
        window.location.href = res.url;
        return;
      }

      toast.success("order create");
      cartDispatch({type: "RESET_CART"});
      navigate("/");
      console.log(res);
    });
  }

  return (
    <>
      <div className="flex flex-[1_0_auto] w-[90%] max-w-[1100px] pl-[5%] pr-[5%] mr-auto ml-auto flex-row-reverse">
        <div className="w-[45%] pt-14 pl-[4%]">
          <div>
            {cart.products.map((product) => (
              <CartProductItem key={product.slug} product={product} disable={true}/>
            ))}
          </div>
          <div className="flex justify-between py-5">
            <span>Tổng cộng</span>
            <span>
              <span className="mr-2">VND</span>
              <span>{formatter.format(cart.total)}</span>
            </span>
          </div>
        </div>
        <div className="flex-[1_0_auto] w-[52%]">
          <div className="pb-3.5">
            <Link to="/" className="hover:brightness-110">
              <img src={HeaderIcon} alt="Logo" className="h-16"/>
            </Link>
          </div>
          <div className="relative">
            <div className="relative mb-5">
              <h2 className="text-base font-normal">Thông tin giao hàng</h2>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            {...field}
                            className="rounded-sm float-left"
                            placeholder="Họ và tên"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            {...field}
                            className="rounded-sm float-left"
                            placeholder="Email"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({field}) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            {...field}
                            className="rounded-sm float-right"
                            placeholder="Phone"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({field}) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            {...field}
                            className="rounded-sm float-left"
                            placeholder="Địa chỉ"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div>
                    <div className="relative mb-5">
                      <h2 className="font-semibold">
                        Phương thức thanh toán
                      </h2>
                    </div>
                    <div className=" rounded-sm">
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({field}) => (
                          <FormItem className="shadow-[0_0_0_1px_#e5e7eb] rounded-sm">
                            <FormControl>
                              <RadioGroup
                                disabled={isPending}
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormItem>
                                  <FormControl>
                                    <Label className="cursor-pointer p-5">
                                      <RadioGroupItem value="cash" className="mr-2"/>
                                      <div>
                                        <img src={CashLogo} alt="cash" className="inline-block align-middle mr-2"/>
                                        <span>Thanh toán khi nhận hàng (nhận hàng từ 3-5 ngày)</span>
                                      </div>
                                    </Label>
                                  </FormControl>
                                </FormItem>
                                <FormItem>
                                  <FormControl>
                                    <Label className="cursor-pointer p-5 border-t">
                                      <RadioGroupItem value="vnpay" className="mr-2"/>
                                      <div className="inline-block">
                                        <img src={PayLogo} alt="vnpay" className="inline-block mr-2 align-middle"/>
                                        <span>Chuyển khoản qua ngân hàng</span>
                                      </div>
                                    </Label>
                                  </FormControl>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                          </FormItem>
                        )}/>
                    </div>
                  </div>
                </div>
                <div>
                  <Button
                    disabled={isPending}
                    type="button"
                    variant="link"
                    className="text-cyan-600 hover:text-destructive hover:no-underline cursor-pointer "
                  >Giỏ hàng
                  </Button>
                  <Button
                    disabled={isPending}
                    type="submit"
                    className="cursor-pointer"
                  >Thanh toán</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}