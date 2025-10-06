import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState, useTransition} from "react";
import {ProductService} from "@/services/ProductService.ts";
import {Product, ProductForm, Thumbnail} from "@/pages/admin/products/productId/components/product-form.tsx";
import {Category} from "@/pages/admin/categories/categoryId/components/category-form.tsx";
import CategoryService from "@/services/CategoryService.ts";
import {format} from "date-fns";

type ProductAndThumbnail = Product & {
  images: Thumbnail[] | null
} | null
export default function ProductPage() {
  const {id} = useParams();
  const [product, setProduct] = useState<ProductAndThumbnail>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();

  const getProduct = async (id: string) => {
    const res = await ProductService.GetProductBySlug(id);
    console.log("Result: ", res)
    if (res.success) {
      const result = res.data
      const thumbnails = result.thumbnails;

      const formattedThumbnails: Thumbnail[] = thumbnails.map((thumbnail) => ({
        productId: thumbnail.product_id,
        thumbnailUrl: thumbnail.thumbnail_url,
        order: thumbnail.order
      }))

      const formattedProduct: ProductAndThumbnail = {
        id: result.id,
        name: result.name,
        categoryId: result.category_id,
        isArchived: result.is_archived,
        isFeatured: result.is_featured,
        originPrice: result.origin_price,
        salePrice: result.sale_price,
        studentPrice: result.student_price,
        slug: result.slug,
        createdAt: result.created_at,
        updatedAt: result.updated_at,
        hoverImg: result.hover_image,
        quantity: result.quantity,
        description: result.description,
        imageUrl: result.image_url,
        images: formattedThumbnails
      }
      setProduct(formattedProduct);
    }
  }
  const getCategories = async () => {
    const result = await CategoryService.GetListCategory({is_last: true});
    if (result.success) {
      const listCategories = result.data;
      const formattedCategories: Category[] = listCategories.map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        parentId: category.parent_id,
        isLast: category.is_last,
        createdAt: format(category.created_at, 'MMM do,yyyy'),
        updatedAt: format(category.updated_at, 'MMM do,yyyy'),
      }));
      formattedCategories.unshift({
        id: "",
        name: "null",
        slug: "",
        isLast: true,
        parentId: "",
        createdAt: "",
        updatedAt: ""
      })
      setCategories(formattedCategories);
    }
  }

  useEffect(() => {
    if (!id) {
      navigate('admin/products');
      return;
    }
  }, []);

  useEffect(() => {
    startTransition(async () => {
      await getProduct(id as string);
      await getCategories()
    });

  }, []);
  useEffect(() => {
    console.log("Product: ", product);
    console.log("Category: ", categories);
  }, [product, categories]);
  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          {!isPending && (
            <ProductForm
              initialData={product}
              categories={categories}
            />
          )}
        </div>
      </div>
    </>
  )
}