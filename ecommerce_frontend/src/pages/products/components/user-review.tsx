import {Form, FormControl, FormField} from "@/components/ui/form.tsx";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import {Combobox, DataValueType} from "@/components/ui/combobox.tsx";
import React, {useEffect, useState, useTransition} from "react";
import {Rating} from "@/components/ui/rating.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import ReviewService from "@/services/ReviewService.ts";
import {UserComment} from "@/pages/products/components/user-comment.tsx";

const FormSchema = z.object({
  productId: z.string(),
  name: z.string(),
  email: z.string().email({message: "Email must required"}),
  phone: z.string().regex(/^([0-9\s-+()]{10,15})$/, {
    message: "Phone number is required"
  }),
  status: z.string(),
  rating: z.number(),
  review: z.string(),
});

export type Review = {
  id: string,
  productId: string,
  email: string,
  name: string,
  status: string,
  phone: string,
  rating: number,
  review: string,
  createdAt: string,
  updatedAt: string,
}

interface UserReviewProps {
  productId: string;
  reviews?: Review[];
}

export const UserReview: React.FC<UserReviewProps> = ({
                                                        productId,
                                                        reviews
                                                      }) => {
  const [statusReview, setStatusReview] = useState<DataValueType | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      productId: productId,
      email: "",
      name: "",
      phone: "",
      status: "",
      rating: 0,
      review: "",
    }
  });

  const listStatusReview: DataValueType[] = [
    {
      id: "da-mua-tai-xgear",
      name: "Đã mua tại xgear"
    },
    {
      id: "dang-dung-san-pham",
      name: "Đang dùng sản phẩm"
    },
    {
      id: "dang-quan-tam-san-pham",
      name: "Đang quan tâm sản phẩm"
    },
  ];

  useEffect(() => {
    form.setValue("status", listStatusReview[0].name)
  }, []);

  const onSubmit = (value: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      const result = await ReviewService.CreateReview(value);
      console.log("Review: ", result);
    });
  }

  return (
    <>
      <div className="relative w-full">
        {reviews?.map((review) => (
          <div key={review.id} className="border-b border-dashed p-4">
            <UserComment comment={review}/>
          </div>
        ))}
      </div>
      <div className="w-full">
        <h3 className="relative text-xl font-semibold mb-3.5">
          Viết đánh giá
        </h3>
        <Form {...form}>
          <form className="relative space-y-4 w-full md:max-w-[600px]" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormControl>
                    <Input placeholder="Tên của bạn" {...field} className="rounded-none" disabled={isPending}/>
                  </FormControl>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} className="rounded-none" disabled={isPending}/>
                  </FormControl>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({field}) => (
                  <FormControl>
                    <Combobox
                      items={listStatusReview}
                      disabled={isPending}
                      loading={false}
                      onchange={(value) => {
                        const selected: DataValueType = listStatusReview.find((item: DataValueType) => item.id === value) ?? listStatusReview[0];
                        setStatusReview(selected);
                        field.onChange(statusReview?.name)
                      }}
                      value={statusReview?.id || listStatusReview[0].id}
                      searchable={false}/>
                  </FormControl>
                )
                }
              />
              <FormField
                control={form.control}
                name="phone"
                render={({field}) => (
                  <FormControl>
                    <Input placeholder="Số điện thoại" {...field} className="rounded-none" disabled={isPending}/>
                  </FormControl>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="rating"
                render={({field}) => (
                  <FormControl>
                    <Rating
                      label="Đánh giá"
                      spacing="gap-x-2"
                      value={field.value}
                      disable={isPending}
                      onChange={field.onChange}
                    />
                  </FormControl>
                )}
              />
              <FormField
                control={form.control}
                name="review"
                render={({field}) => (
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      placeholder="Viết nội dung đánh giá"
                      {...field}
                      className="rounded-none"
                    />
                  </FormControl>
                )}
              />
            </div>
            <div className="mt-3 py-2">
              <Button
                type="submit"
                variant="default"
                disabled={isPending}
                className="w-full relative cursor-pointer">
                Gửi đánh giá
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}