import {Input} from "@/components/ui/input.tsx";
import {Form, FormField} from "@/components/ui/form.tsx";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useRef, useState, useTransition} from "react";

import {ProductService} from "@/services/ProductService.ts";
import {Product} from "@/pages/admin/products/productId/components/product-form.tsx";
import {SearchProductItem} from "@/components/navbar/top/search-product-item.tsx";
import {useClickOutside} from "@/hooks/use-click-outside.ts";
import {cn} from "@/lib/utils.ts";
import {Loader2} from "lucide-react";
import {useIsMobile} from "@/hooks/use-mobile.ts";

export type ProductSearch = {
  name: string,
  slug: string,
  imageUrl: string,
  originPrice: number,
  salePrice: number,

}

const FormSchema = z.object({
  value: z.string(),
});

export const SearchBox = () => {
  const [results, setResults] = useState<ProductSearch[]>([]);
  const [total, setTotal] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(true);
  const [isPending, startTransition] = useTransition();
  const isMobile = useIsMobile();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      value: ""
    }
  });

  const getProductBySearch = async (search: string) => {
    const res = await ProductService.GetProductBySearch(search);
    if (res.success) {
      const products = res.products;
      const total = res.total;
      const formattedProducts: Product[] = products.map((product: any) => ({
        name: product.name,
        slug: product.slug,
        imageUrl: product.image_url,
        originPrice: product.origin_price,
        salePrice: product.sale_price
      }));
      console.log(formattedProducts)

      setResults(formattedProducts);
      setTotal(total);
    }
  }

  useClickOutside(ref, () => {
    setOpen(false);
    console.log("outside");
  });

  useEffect(() => {
    const search = form.getValues("value");
    if (search) {
      setOpen(true);
      const timer = setTimeout(() => {
        console.log("SEARCH: ", search)
        startTransition(async () => {
          await getProductBySearch(search);
        });
      }, 500);
      return () => clearTimeout(timer)
    } else {
      setOpen(false);
    }
  }, [form.watch('value')]);

  return (
    <>
      <div className="relative bg-white rounded-md w-full" ref={ref}>
        <Form {...form}>
          <form className="relative">
            <FormField
              control={form.control}
              name="value"
              render={({field}) => (
                <div className="relative">
                  <Input {...field} placeholder="Search" type="search" autoComplete="off"/>
                  {/*<Button className="absolute right-1 top-0">*/}
                  {/*  <Search/>*/}
                  {/*</Button>*/}
                </div>
              )}
            />
          </form>
        </Form>

        {!isMobile ? (
          <div className={cn("absolute w-full bg-white z-100", open ? "block" : "hidden")}>
            <div className="relative w-full py-2 max-h-[450px] overflow-y-auto">
              <div className="mb-2 uppercase text-center">
                <h2 className="font-semibold text-base">Kết quả tìm kiếm</h2>
              </div>
              <div className="bg-primary/5 flex justify-between px-2 py-1 mb-1">
                <span className="font-semibold uppercase text-base">Sản phẩm</span>
                <span>{total} Sản phẩm</span>
              </div>
              <div className="px-2">
                {isPending ? (
                  <div className="flex justify-center items-center">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-600 flex justify-center"/>
                  </div>
                ) : (
                  <>
                    {Array.isArray(results) && results.length > 0 ? (
                      <>
                        {results.map((product: ProductSearch) => (
                          <SearchProductItem key={product.slug} item={product}/>
                        ))}
                      </>
                    ) : (
                      <p className="text-center text-base font-semibold">Không tìm thấy sản phẩm</p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="fixed inset-0 top-[50px] bg-white z-999 w-full py-2 overflow-y-auto">
            <div className="mb-2 uppercase text-center">
              <h2 className="font-semibold text-base">Kết quả tìm kiếm</h2>
            </div>
            <div className="bg-primary/5 flex justify-between px-2 py-1 mb-1">
              <span className="font-semibold uppercase text-base">Sản phẩm</span>
              <span>{total} Sản phẩm</span>
            </div>
            <div className="px-2">
              {isPending ? (
                <div className="flex justify-center items-center">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-600 flex justify-center"/>
                </div>
              ) : (
                <>
                  {
                    Array.isArray(results) && results.length > 0 ? (
                      <>
                        {results.map((product: ProductSearch) => (
                          <SearchProductItem key={product.slug} item={product}/>
                        ))}
                      </>
                    ) : (
                      <div className="relative flex items-center justify-center py-6">
                        <p>Không tìm thấy sản phẩm</p>
                      </div>
                    )
                  }
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}