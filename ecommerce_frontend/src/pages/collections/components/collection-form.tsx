import React, {useEffect, useState, useTransition} from "react";
import {ProductService} from "@/services/ProductService.ts";
import {Product} from "@/pages/admin/products/productId/components/product-form.tsx";
import {ProductCard} from "@/components/product/product-card.tsx";
import {getFilterByKey} from "@/helpers/utils.ts";

import * as z from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {BreadcrumbsProduct} from "@/components/breadcrumbs-product.tsx";

import {cn} from "@/lib/utils.ts";
import {X} from "lucide-react";

type FilterType = {
  name: string,
  value: string
}

interface CollectionFormProps {
  params: string
}

const FormSchema = z.object({
  category: z.string(),
  brand: z.array(z.string()),
  price_range: z.array(z.string())
});

const listSort = [
  {
    title: "Nổi bật",
    active: "prominent"
  },
  {
    title: "Giá: Tăng dần",
    active: "asc"
  },
  {
    title: "Giá: Giảm dần",
    active: "desc"
  },
  {
    title: "Mới nhất",
    active: "latest"
  },
]

export const CollectionForm: React.FC<CollectionFormProps> = ({
                                                                params
                                                              }) => {
  const [isPending, startTransition] = useTransition();
  const [sort, setSort] = useState<string>("prominent");
  const [products, setProducts] = useState<Product[]>([]);
  const [searchFilters, setSearchFilters] = useState(getFilterByKey(params));
  const [resultTags, setResultTags] = useState<FilterType[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: params,
      brand: ['default'],
      price_range: ['default']
    }
  });

  const brands = form.watch("brand");
  const category = form.watch("category");
  const priceRange = form.watch("price_range");

  const getProducts = async (query: string) => {
    const result = await ProductService.GetProductByParams(query);
    const listProducts = result.products;

    const formattedProducts: Product[] = listProducts.map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      isFeatured: product.is_featured,
      isArchived: product.is_archived,
      originPrice: product.origin_price,
      salePrice: product.sale_price,
      studentPrice: product.student_price,
      imageUrl: product.image_url,
      hoverImg: product.hover_image,
      quantity: product.quantity,
      categoryId: product.category_id
    }));

    setProducts(formattedProducts);
  }

  const handleSort = (sortBy: string) => {
    let sorted = [...products];
    if (sortBy === "prominent") {
      sorted = sorted.sort((a, b) => Number(a.isFeatured) - Number(b.isFeatured));
      setProducts(sorted);
    }
    if (sortBy === 'asc') {
      sorted = sorted.sort((a, b) => a.salePrice - b.salePrice);
      setProducts(sorted)
    }
    if (sortBy === 'desc') {
      sorted = sorted.sort((a, b) => b.salePrice - a.salePrice);
      setProducts(sorted)
    }
  }

  const handleTag = () => {
    const tags = [...searchFilters.brands.children.filter((item) => form.getValues("brand").includes(item.value)), ...searchFilters.price_ranges.children.filter((item) => form.getValues("price_range").includes(item.value))].filter((item) => item.value !== 'default');
    if (tags.length) {
      tags.push({name: "Xóa hết", value: "default"});
    }
    setResultTags(tags);
  }

  const convertToQuery = () => {
    const query = new URLSearchParams();

    query.append('category', form.getValues("category"));
    form.getValues("brand").map((brand) => query.append('brand[]', brand));
    form.getValues("price_range").map((range) => query.append('price_range[]', range));

    return query.toString();
  }

  useEffect(() => {
    if (params !== form.getValues("category")) {
      setSearchFilters(getFilterByKey(params));
      form.setValue("category", params);
    }
    handleTag();
    const query =
      convertToQuery();
    startTransition(async () => {
      await getProducts(query);
    });

  }, [brands, category, priceRange, params, searchFilters]);

  useEffect(() => {
    handleSort(sort);
  }, [sort]);

  return (
    <section className="pt-2">
      <div className="pl-3.5 pr-3.5 container max-w-7xl mr-auto ml-auto">
        <div className="relative p-3">
          <BreadcrumbsProduct breadcrumbs={searchFilters.breadcrumbs}/>
        </div>
        <div className=" relative flex flex-wrap">
          <div
            className="hidden lg:block lg:px-3.5 rounded-xs lg:relative lg:w-[25%]">
            <div className="bg-white">
              <Form {...form}>
                <form>
                  <FormField
                    control={form.control}
                    name="brand"
                    render={() => (
                      <div className="p-2">
                        <h2 className="mb-4 font-semibold">{searchFilters.brands.title}</h2>
                        <FormItem className="grid grid-cols-2 gap-y-3">
                          {
                            searchFilters.brands.children.map((brand) => (
                              <FormField
                                key={brand.value}
                                control={form.control}
                                name="brand"
                                render={({field}) => (
                                  <FormItem className="flex flex-row items-center gap-2">
                                    <FormControl>
                                      <Checkbox
                                        className="cursor-pointer"
                                        checked={field.value?.includes(brand.value)}
                                        onCheckedChange={(checked) => {
                                          if (brand.value === "default") {
                                            return checked ? field.onChange([brand.value]) : field.onChange(field.value?.filter(
                                              (value) => value !== brand.value
                                            ));
                                          } else {
                                            return checked ? field.onChange([...field.value.filter((value) => value !== "default"), brand.value]) : field.onChange(field.value?.filter(
                                              (value) => value !== brand.value
                                            ));
                                          }
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">{brand.name}</FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))
                          }
                        </FormItem>
                      </div>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price_range"
                    render={() => (
                      <div className="p-2">
                        <h2 className="mb-4 font-semibold">{searchFilters.price_ranges.title}</h2>
                        <FormItem className="">
                          {
                            searchFilters.price_ranges.children.map((price) => (
                              <FormField
                                key={price.value}
                                control={form.control}
                                name="price_range"
                                render={({field}) => (
                                  <FormItem className="flex flex-row items-center gap-2">
                                    <FormControl>
                                      <Checkbox
                                        className="cursor-pointer"
                                        checked={field.value?.includes(price.value)}
                                        onCheckedChange={(checked) => {
                                          if (price.value === "default") {
                                            return checked ? field.onChange([price.value]) : field.onChange(field.value?.filter(
                                              (value) => value !== price.value
                                            ));
                                          } else {
                                            return checked ? field.onChange([...field.value.filter((value) => value !== "default"), price.value]) : field.onChange(field.value?.filter(
                                              (value) => value !== price.value
                                            ));
                                          }
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">{price.name}</FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))
                          }
                        </FormItem>
                      </div>
                    )}
                  />
                </form>
              </Form>
            </div>
          </div>
          <div className="p-3 relative bg-white rounded-xs max-md:p-2 w-full lg:w-[75%]">
            <div className="mb-4">
              <ul className="flex py-2 overflow-x-auto whitespace-nowrap flex-nowrap items-center gap-x-1">
                {listSort.map((item) => (
                  <li key={item.active}
                      onClick={() => setSort(item.active)}
                      className={cn("border rounded-sm py-1 px-2 cursor-pointer", item.active === sort ? "bg-destructive" : "bg-primary-foreground")}>
                    <span
                      className={cn("font-semibold", item.active === sort ? "text-white" : "text-primary")}>{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative my-2.5">
              <ul className="flex gap-x-1 flex-nowrap overflow-x-auto">
                {resultTags.map((tag) => (
                  <li
                    key={tag.value}
                    className="flex items-center flex-nowrap text-nowrap gap-x-1 px-2 py-1 rounded-sm bg-destructive text-white font-semibold cursor-pointer"
                    onClick={() => {
                      if (tag.value === "default") {
                        form.setValue("brand", ["default"]);
                        form.setValue("price_range", ["default"]);
                      } else {
                        form.setValue("brand", [...form.getValues("brand").filter((item) => item !== tag.value)]);
                        form.setValue("price_range", [...form.getValues("price_range").filter((item) => item !== tag.value)])
                      }
                    }}
                  >
                    {tag.name}
                    <X strokeWidth={5} className="w-4 h-4"/>
                  </li>
                ))}
              </ul>
            </div>
            {
              <div>
                {
                  products.length ? (
                    <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 -ml-3.5 max-md:-ml-2">
                      {
                        products.map((product) => (
                          <ProductCard key={product.slug} data={product}/>
                        ))
                      }
                    </div>
                  ) : (
                    <p className="text-base">Không tìm thấy sản phẩm phù hợp</p>
                  )
                }
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  );
}