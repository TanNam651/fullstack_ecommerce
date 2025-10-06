import React, {useEffect, useState, useTransition} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import * as z from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import {Combobox} from "@/components/ui/combobox.tsx";
import CategoryService from "@/services/CategoryService.ts";
import {format} from "date-fns";
import {Separator} from "@/components/ui/separator.tsx";
import {Heading} from "@/components/heading.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Trash} from "lucide-react";
import {AlertModal} from "@/components/modal/alert-modal.tsx";
import {toast} from "sonner";
import {Checkbox} from "@/components/ui/checkbox.tsx";

export type Category = {
  id: string,
  name: string,
  slug: string,
  parentId: string,
  isLast: boolean,
  createdAt: string,
  updatedAt: string,
}

interface CategoryFormProps {
  initialData: Category | null,
}

const formSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(0),
  parentId: z.string(),
  isLast: z.boolean(),
});

type CategoryFormValues = z.infer<typeof formSchema>;
export const CategoryForm: React.FC<CategoryFormProps> = ({
                                                            initialData
                                                          }) => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "",
      name: "null",
      slug: "",
      isLast: true,
      parentId: "",
      createdAt: "",
      updatedAt: ""
    }
  ]);


  const title = initialData ? "Edit category" : "Create category";
  const description = initialData ? "Edit a category" : "Add a new category";
  // const toastMessage = initialData ? "Category updated" : "Category created";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      slug: "",
      parentId: "",
      isLast: false
    }
  });

  const onSubmit = async (data:CategoryFormValues)=>{
    try{
      setLoading(true);
      if (initialData && id){
        await CategoryService.UpdateCategory(id, data)
          .then((data)=>{
            if (data.success) {
              toast.success(data.success);
              navigate("/admin/categories");
            } else {
              toast.error(data.error)
            }
          })
      } else {
        await CategoryService.CreateCategory(data)
          .then((data)=>{
            if (data.success) {
              toast.success(data.success);
              form.reset();

              const result = data.data;
              const formattedCategory = [{
                id: result.id,
                name: result.name,
                slug: result.slug,
                parentId: result.parent_id,
                isLast: result.is_last,
                createdAt: format(result.created_at, "MMM do, yyyy"),
                updatedAt: format(result.updated_at, "MMM do, yyyy")
              }]
              setCategories((prev) => [...prev, ...formattedCategory]);
            } else {
              toast.error(data.error)
            }
          })
      }
    } catch (error){
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true);
      await CategoryService.DeleteCategory(id as string)
        .then((data)=>{
          if (data.success) {
            toast.success(data.success);
            form.reset();
          } else {
            toast.error(data.error)
          }
        })
    } catch (error) {
      toast.error("Make sure you removed all products using this size or sub-categories depend on this category first");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  const listCategories = async () => {
    const categories = await CategoryService.GetListCategory({is_last:false});

    if (!categories.success) return [];
    const listData: Category[]= categories.data.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      parentId: category.parent_id,
      isLast: category.is_last,
      createdAt: format(category.created_at, "MMM do, yyyy"),
      updatedAt: format(category.updated_at, "MMM do, yyyy")
    }));

    return listData;
  }

  useEffect(() => {
    startTransition(async () => {
      await listCategories().then((data) => {
        setCategories((prev) => [...prev, ...data]);
      });
    })
  }, []);

  return (
    <>
      <AlertModal
        isOpen={open}
        onclose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex justify-between items-center">
        <Heading title={title} description={description}/>
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
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
                    <Input placeholder="Name" {...field}/>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="Slug" {...field}/>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parentId"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Parent Id</FormLabel>
                  <FormControl>
                    <Combobox items={categories} loading={isPending} onchange={field.onChange} value={field.value} searchable/>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isLast"
              render={({field}) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 border p-2 rounded-md">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Is last</FormLabel>
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={loading}
            className="ml-auto cursor-pointer"
            type="submit"
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
}