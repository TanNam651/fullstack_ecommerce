import React, {useState} from "react";
import {Category} from "@/pages/admin/categories/categoryId/components/category-form.tsx";
import {AlertModal} from "@/components/modal/alert-modal.tsx";
import {Heading} from "@/components/heading.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Trash} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import * as z from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Combobox} from "@/components/ui/combobox.tsx";
import {UploadImage} from "@/components/ui/upload-image.tsx";
import {ProductService} from "@/services/ProductService.ts";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "sonner";
import {Editor} from "@/components/ui/editor.tsx";

export type Product = {
  id: string,
  name: string,
  slug: string,
  isFeatured: boolean,
  isArchived: boolean,
  originPrice: number,
  salePrice: number,
  studentPrice: number,
  quantity: number,
  description?: string,
  imageUrl: string,
  hoverImg: string,
  categoryId: string,
  createdAt?: string,
  updatedAt?: string,
}

export type Thumbnail = {
  productId: string,
  thumbnailUrl: string,
  order: number
}

interface ProductFormProps {
  initialData: (Product & {
    images: Thumbnail[] | null
  }) | null;
  categories: Category[];
}

const formSchema = z.object({
  name: z.string().min(1),
  // slug: z.string().min(1),
  originPrice: z.coerce.number().min(0),
  salePrice: z.coerce.number().min(0),
  studentPrice: z.coerce.number().min(0),
  quantity: z.coerce.number().min(0),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  imageUrl: z.object({file: z.instanceof(File).optional(), url: z.string()}),
  hoverImage: z.object({file: z.instanceof(File).optional(), url: z.string()}),
  description: z.string(),
  categoryId: z.string(),
  thumbnails: z.object({file: z.instanceof(File).optional(), url: z.string()}).array()
})

type ProductFormValue = z.infer<typeof formSchema>;
export const ProductForm: React.FC<ProductFormProps> = ({
                                                          initialData,
                                                          categories,
                                                        }) => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const title = initialData ? "Edit product" : "Create product";
  const description = initialData ? "Edit a product" : "Create a product";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<ProductFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
        ...initialData,
        // originPrice: initialData.originPrice ?? 0,
        // salePrice: initialData.salePrice ?? 0,
        // studentPrice: initialData.studentPrice ?? 0,
        // quantity: initialData.quantity ?? 0,
        // isFeatured: initialData.isFeatured ?? false,
        // isArchived: initialData.isArchived ?? false,
        hoverImage: {url: initialData.hoverImg},
        imageUrl: {url: initialData.imageUrl},
        thumbnails: initialData.images?.map((img) => ({url: img.thumbnailUrl})) ?? [],
      } : {
        name: "",
        // slug: "",
        quantity: 0,
        imageUrl: {},
        hoverImage: {},
        originPrice: 0,
        description: "",
        salePrice: 0,
        studentPrice: 0,
        isFeatured: false,
        isArchived: false,
        categoryId: "",
        thumbnails: [],
      }
  });

  const onSubmit = async (data: ProductFormValue) => {
    setLoading(true);
    if (initialData && id) {
      // console.log("aaa")
      const result = await ProductService.UpdateProduct(id, data);
      console.log("Result: ", result)
      if (result?.success) {
        console.log("xxx")
        toast.success(result.success, {
          // unstyled:true,
          className: "bg-emerald-500/15 text-emerald-500",
        });
        navigate("/admin/products")
      } else {
        toast.error(result?.error, {
          // unstyled:true,
          className: "bg-destructive/15 text-destructive",
        });
      }
    } else {
      await ProductService.CreateProduct(data)
        .then((data) => {
          if (data?.success) toast.success(data.success)
          form.reset();
        })
    }
    setLoading(false);
    // console.log("aaa: ", data)
  };


  return (
    <>
      <AlertModal
        isOpen={open}
        onclose={() => setOpen(false)}
        onConfirm={() => {
        }}
        loading={false}
      />
      <div className="flex items-center justify-between">
        <Heading
          title={title}
          description={description}
        />
        {initialData && (
          <Button
            disabled={false}
            variant="destructive"
            size="icon"
            onClick={() => {
            }}
            className="cursor-pointer"
          >
            <Trash className="w-4 h-4"/>
          </Button>
        )}
      </div>
      <Separator/>
      <Form {...form}>
        <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="originPrice"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Origin price</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Origin price"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salePrice"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Sale price</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Sale price"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studentPrice"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Student sale</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Student sale"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Combobox
                      items={categories}
                      loading={false}
                      onchange={field.onChange}
                      value={field.value}
                      disabled={loading}
                      searchable
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Quantity"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({field}) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 p-2 border rounded-md">
                  <FormControl>
                    <Checkbox
                      disabled={loading}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Is featured</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({field}) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 p-2 border rounded-md">
                  <FormControl>
                    <Checkbox
                      disabled={loading}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Is archived</FormLabel>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-y-5">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({field}) => {
                return (
                  <FormItem>
                    <FormLabel>Image product</FormLabel>
                    <FormControl>
                      <UploadImage
                        name={"imageUrl"}
                        value={field.value?.url ? [field.value] : []} disable={false}
                        onChange={(value) => {
                          field.onChange(value[0])
                        }}
                        onRemove={(value) => {
                          field.onChange({})
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="hoverImage"
              render={({field}) => {
                return (
                  <FormItem>
                    <FormLabel>Hover image</FormLabel>
                    <FormControl>
                      <UploadImage
                        name={"hoverImage"}
                        value={field.value?.url ? [field.value] : []}
                        disable={loading}
                        onChange={(value) => {
                          field.onChange(value[0])
                        }}
                        onRemove={(value) => {
                          field.onChange({})
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="thumbnails"
              render={({field}) => {
                return (
                  <FormItem>
                    <FormLabel>Thumbnails image</FormLabel>
                    <FormControl>
                      <UploadImage
                        name={"thumbnails"}
                        value={field.value} disable={false}
                        onChange={(value) => {
                          field.onChange([...field.value, ...value])
                        }
                        }
                        onRemove={(value) => {
                          field.onChange([
                            ...field.value.filter((current) => current.url !== value.url)
                          ])
                        }
                        }
                      />
                    </FormControl>
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="description"
              render={({field}) => {
                return (
                  <FormItem>
                    <FormLabel>Description product</FormLabel>
                    <FormControl>
                      <Editor content={field.value} onChange={(value) => field.onChange(value)}/>
                    </FormControl>
                  </FormItem>
                )
              }}
            />

          </div>
          <Button
            disabled={loading}
            type="submit"
            className="cursor-pointer"
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}

