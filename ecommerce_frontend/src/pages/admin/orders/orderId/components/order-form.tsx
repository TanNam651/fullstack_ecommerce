import {Heading} from "@/components/heading.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Header} from "@/components/auth/header.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";

import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {useEffect} from "react";
import {Combobox} from "@/components/ui/combobox.tsx";
import {TableProduct} from "@/components/ui/table-product.tsx";

export type User = {
  name: string,
  email: string
}

export type Product = {
  id: string,
  name: string,
  slug: string,
  originPrice: string,
  imageUrl: string,
  category: string,
  root_category: string,
  quantity: string,
  price: string,
  total: string
}

export type Order = {
  status: string,
  total: string,
  shippingAddress: string,
  createdAt: string,
  user: User,
}

export type Status = {
  id: string,
  name: string,
}

interface OrderFormProps {
  initialData: Order|null;
  listStatus: Status[];
  products: Product[];
  loading: boolean;
}

const formSchema = z.object({
  status: z.string(),
  total: z.string(),
  shippingAddress: z.string(),
  createdAt: z.string(),
  user: z.object({
    name: z.string(),
    email: z.string()
  }),
})

export const OrderForm: React.FC<OrderFormProps> = ({
  initialData,
  listStatus,
  products,
  loading
}) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      status: "",
      shippingAddress: "",
      total: "",
      createdAt: "",
      user: {
        name: "",
        email: ""
      }
    }
  });



  const onSubmit = () => {

  }

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title="Order details"
          description="Detail for list products"
        />
      </div>
      <Separator/>
      <div className="flex justify-center">
        <div className="w-full max-w-[750px] border rounded-sm p-0 md:p-5">
          <Header
            title="Order"
            label="Detail for order"
          />
          <Separator/>
          <div className="w-full p-2 md:p-4">
            <h3 className="text-2xl py-2 font-semibold pb-4">Customer information</h3>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 w-full"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="user.name"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Customer name</FormLabel>
                        <FormControl>
                          <Input disabled {...field} placeholder="Customer name" className=" disabled:opacity-100"/>
                        </FormControl>
                      </FormItem>
                    )}/>
                  <FormField
                    control={form.control}
                    name="user.email"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input disabled {...field} placeholder="example@gmail.com" className=" disabled:opacity-100"/>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="shippingAddress"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Shipping address</FormLabel>
                        <FormControl>
                          <Input disabled {...field} placeholder="Address" className=" disabled:opacity-100"/>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Separator/>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-semibold py-2">Order information</h3>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between">
                        <span className="text-[16px] font-semibold">Order status</span>
                        <FormField
                          control={form.control}
                          name="status"
                          render={({field}) => (
                            <FormItem>
                              <FormControl>
                                <Combobox
                                  items={listStatus}
                                  loading={false}
                                  onchange={field.onChange}
                                  value={field.value}
                                  searchable={false}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[16px] font-semibold">Payment status</span>
                        <FormField
                          control={form.control}
                          name="status"
                          render={({field}) => (
                            <FormItem>
                              <FormControl>
                                <Combobox
                                  items={[]}
                                  loading={false}
                                  onchange={field.onChange}
                                  value={field.value}
                                  searchable={false}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[16px] font-semibold">Order date</span>
                        <FormField
                          control={form.control}
                          name="createdAt"
                          render={({field}) => (
                            <span>{field.value}</span>
                          )}
                        />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[16px] font-semibold">Total</span>
                        <FormField
                          control={form.control}
                          name="total"
                          render={({field}) => (
                            <span className="font-semibold">{field.value}</span>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
            <Separator className="mt-5"/>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold py-2">List products</h3>
              <div>
                <TableProduct items={products}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}