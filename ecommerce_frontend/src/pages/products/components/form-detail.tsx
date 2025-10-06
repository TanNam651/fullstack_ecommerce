import {Product, Thumbnail} from "@/pages/admin/products/productId/components/product-form.tsx";
import {Category} from "@/pages/admin/categories/categoryId/components/category-form.tsx";
import React from "react";
import {Link} from "react-router-dom";
import {formatter} from "@/helpers/utils";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormField} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {CircleCheck, Minus, Plus} from "lucide-react";
import {Carousel} from "@/components/ui/carousel ";
import {DescriptionProduct} from "@/pages/products/components/description-product.tsx";
import {Review, UserReview} from "@/pages/products/components/user-review.tsx";
import {useAppContext} from "@/hooks/use-app-context.ts";
import {BreadcrumbsProduct, BreadcrumbsType} from "@/components/breadcrumbs-product.tsx";


export type DetailProduct = Product & {
  thumbnails: Thumbnail[],
  categories: Category[]
}

interface FormDetailProps {
  data: DetailProduct | undefined;
  breadcrumbs: BreadcrumbsType[];
  reviews: Review[];
}

const formSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  img: z.string(),
  quantity: z.number().min(1),
  total: z.number().min(1),
  // price: z.number(),
});


export const FormDetail: React.FC<FormDetailProps> = ({
                                                        data,
                                                        breadcrumbs,
                                                        reviews
                                                      }) => {
  const {cart, cartDispatch} = useAppContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: data?.id ?? '',
      slug: data?.slug ?? '',
      name: data?.name ?? '',
      quantity: 1,
      img: data?.imageUrl ?? '',
      // price: data?.salePrice ?? 0,
      total: data?.salePrice ?? 0
    }
  });

  const listThumbnails = data?.thumbnails.map((thumbnail: Thumbnail) => thumbnail.thumbnailUrl) ?? [];

  const onSubmit = (value: z.infer<typeof formSchema>) => {
    const listCart = cart.products;
    console.log("Value: ", value)

    if (listCart) {
      const existingItem = listCart.find((item: z.infer<typeof formSchema>) => item.id === value.id);
      if (existingItem) {
        cartDispatch({type: "UPDATE_CART", payload: {productId: existingItem.id, product: value}})
        return;
      }
    }
    cartDispatch({type: "ADD_CART", payload: {product: value}});
  }

  if (!data) {
    return <div>Not found</div>;
  }

  return (
    <>
      <section className="relative mt-3.5">
        <div className="container max-w-7xl mr-auto ml-auto px-3.5">
          <div className="relative p-3">
            <BreadcrumbsProduct breadcrumbs={breadcrumbs}/>
          </div>
          <div className="bg-white h-full p-4 rounded-xs">
            <div className="grid grid-cols-2 max-md:grid-cols-1">
              <div className="relative overflow-hidden">
                <Carousel images={listThumbnails}/>
              </div>
              <div className="relative pl-0 md:pl-3">
                <div>
                  <div className="flex flex-wrap items-center mb-2.5">
                    <h1 className="text-2xl font-semibold">
                      {data?.name}
                    </h1>
                  </div>
                  <div className="flex flex-wrap mb-2.5">
                    <div>
                      <span>Thương hiệu: </span>
                      <Link to={`/collections/${data?.categories[0].slug}`} className="text-destructive font-semibold">
                        {data?.categories[0].name}
                      </Link>
                    </div>
                    <span className="mx-2.5">|</span>
                    <div>
                      <span>Loại: </span>
                      <Link to={`/collections/${data?.categories[data?.categories.length - 1].slug}`}
                            className="text-destructive font-semibold">
                        {data?.categories[data?.categories.length - 1].name}
                      </Link>
                    </div>
                  </div>
                  <div className="mt-2.5 space-x-1">
                    <span
                      className="inline-block text-white text-sm font-normal bg-red-600 py-0.5 px-2.5 rounded-md  cursor-pointer">Đã
                      bao
                      gồm VAT</span>
                    <span
                      className="inline-block text-white text-sm font-normal bg-red-600 py-0.5 px-2.5 rounded-md cursor-pointer">Bảo
                      hành 24 tháng chính hãng</span>
                  </div>
                  <div className="flex justify-between items-center bg-destructive/10 p-4 rounded-lg my-1.5">
                    <div className="flex-2 text-left">
                      <p className="text-xs">Mua ngay với giá</p>
                      <div className="flex items-center flex-wrap">
                        <span className="block text-xl font-bold">{formatter.format(data?.salePrice)}</span>
                      </div>
                    </div>
                    <div className="flex-1 text-center text-sm font-bold">
                      <p>Hoặc</p>
                    </div>
                    <div className="flex-2 text-right">
                      <p className="text-xs">Trả góp</p>
                      <span>
                        <strong className="text-xl">{formatter.format(data.salePrice / 12)}</strong>
                        <span>/tháng</span>
                      </span>
                    </div>
                  </div>
                  <div>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex">
                          <Button
                            type="button"
                            onClick={() => {
                              if (form.getValues("quantity") > 1) {
                                form.setValue("quantity", form.getValues("quantity") - 1)
                                form.setValue("total", data.salePrice * (form.getValues("quantity")))
                              }
                            }}
                            variant="secondary"
                            className="w-10 h-10 bg-transparent text-primary text-xl hover:bg-transparent outline-none cursor-pointer border rounded-none">
                            <Minus/>
                          </Button>
                          <FormField
                            control={form.control}
                            name="quantity"
                            render={({field}) => (
                              <input
                                disabled
                                type="text"
                                className="w-10 h-10 rounded-none p-0 font-semibold text-sm text-center border border-l-0 border-r-0"
                                {...field}
                              />
                            )}
                          />
                          <Button
                            type="button"
                            onClick={() => {
                              form.setValue("quantity", form.getValues("quantity") + 1)
                              // form.setValue("total", data.salePrice * (form.getValues("quantity")))
                            }}
                            variant="secondary"
                            className="w-10 h-10 bg-transparent border rounded-none text-primary text-xl hover:bg-transparent outline-none cursor-pointer">
                            <Plus/>
                          </Button>
                        </div>
                        <div className="my-4">
                          <div
                            className="flex items-center text-base text-destructive font-bold bg-destructive/10 px-2.5 py-2 rounded-tl-md rounded-tr-md">
                            <svg height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                 className="mr-2 fill-destructive">
                              <path
                                d="M152 0H154.2C186.1 0 215.7 16.91 231.9 44.45L256 85.46L280.1 44.45C296.3 16.91 325.9 0 357.8 0H360C408.6 0 448 39.4 448 88C448 102.4 444.5 115.1 438.4 128H480C497.7 128 512 142.3 512 160V224C512 241.7 497.7 256 480 256H32C14.33 256 0 241.7 0 224V160C0 142.3 14.33 128 32 128H73.6C67.46 115.1 64 102.4 64 88C64 39.4 103.4 0 152 0zM190.5 68.78C182.9 55.91 169.1 48 154.2 48H152C129.9 48 112 65.91 112 88C112 110.1 129.9 128 152 128H225.3L190.5 68.78zM360 48H357.8C342.9 48 329.1 55.91 321.5 68.78L286.7 128H360C382.1 128 400 110.1 400 88C400 65.91 382.1 48 360 48V48zM32 288H224V512H80C53.49 512 32 490.5 32 464V288zM288 512V288H480V464C480 490.5 458.5 512 432 512H288z"></path>
                            </svg>
                            Ưu đãi thêm
                          </div>
                          <div className="bg-gray-50 border border-gray-200 p-2.5">
                            <ul className="text-sm font-normal">
                              <li className="mb-1.5 block before:content-['']">
                                <CircleCheck className="inline-block mr-1.5 text-white fill-emerald-500"/>
                                <strong className="font-normal text-blue-400">Chuột không dây Logitech M650L
                                  Wireless/Bluetooth</strong>
                              </li>
                              <li className="mb-1.5 block before:content-['']">
                                <CircleCheck className="inline-block mr-1.5 text-white fill-emerald-500"/>
                                <strong className="font-normal text-blue-400">Balo Lenovo ideapad gaming
                                  backpack</strong>
                              </li>
                            </ul>
                            <p className="mb-1.5"><b>Xin lưu ý:</b> Tình trạng tồn kho của sản phẩm có thể thay đổi, quý
                              khách vui lòng liên hệ với nhân viên để được hỗ trợ và cập nhật thông tin chi tiết một
                              cách nhanh chóng</p>
                          </div>
                        </div>
                        <div className="pt-2.5">
                          <div className="">
                            <Button
                              variant="destructive"
                              className="w-full border-none bg-destructive h-fit flex flex-col gap-0 cursor-pointer rounded-sm"
                            >
                              <strong className="uppercase">Thêm vào giỏ hàng</strong>
                              <span className="">Giao hàng tận nơi hoặc nhận tại cửa hàng</span>
                            </Button>
                          </div>
                        </div>
                      </form>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative mt-3.5">
        <div className="container max-w-7xl mr-auto ml-auto px-3.5">
          <div className="bg-white h-full p-4 rounded-xs">
            <DescriptionProduct title="Mô tả sản phẩm" content={data.description}/>
          </div>
        </div>
      </section>
      <section className="relative mt-3.5">
        <div className="container max-w-7xl mr-auto ml-auto px-3.5">
          <div className="bg-white h-full p-4 rounded-xs">
            <UserReview productId={data.id} reviews={reviews}/>
          </div>
        </div>
      </section>
    </>
  )
}