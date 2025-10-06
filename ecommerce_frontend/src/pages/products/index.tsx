import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState, useTransition} from "react";
import {ProductService} from "@/services/ProductService.ts";
import {Thumbnail} from "@/pages/admin/products/productId/components/product-form.tsx";
import {Category} from "@/pages/admin/categories/categoryId/components/category-form.tsx";
import {format} from "date-fns";
import {DetailProduct, FormDetail} from "@/pages/products/components/form-detail.tsx";
import ReviewService from "@/services/ReviewService.ts";
import {Review} from "@/pages/products/components/user-review.tsx";
import {BreadcrumbsType} from "@/components/breadcrumbs-product.tsx";

export default function ProductSlugPage() {
  const {slug} = useParams();
  const [product, setProduct] = useState<DetailProduct>();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbsType[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isPending, startTransition] = useTransition();

  const navigate = useNavigate();

  const getProduct = async (slug: string) => {
    const res = await ProductService.GetProductBySlug(slug);
    if (res.success) {
      const result = res.data;
      const categories = result.categories;
      const thumbnails = result.thumbnails;
      const formattedThumbnails: Thumbnail[] = thumbnails.map((thumbnail) => ({
        productId: thumbnail.product_id,
        thumbnailUrl: thumbnail.thumbnail_url,
        order: parseInt(thumbnail.order) + 2
      }));

      formattedThumbnails.unshift({
          productId: result.id,
          thumbnailUrl: result.image_url,
          order: 1
        },
        {
          productId: result.id,
          thumbnailUrl: result.hover_image,
          order: 2
        });

      const formattedCategories: Category[] = categories.map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        parentId: category.parent_id,
        isLast: category.is_last,
        createdAt: format(category.created_at, "MMM do,yyyy"),
        updatedAt: format(category.updated_at, "MMMM do,yyyy"),
      }));

      const formattedProduct: DetailProduct = ({
        id: result.id,
        name: result.name,
        slug: result.slug,
        hoverImg: result.hover_image,
        imageUrl: result.image_url,
        studentPrice: result.student_price,
        originPrice: result.origin_price,
        salePrice: result.sale_price,
        isArchived: result.is_archived,
        isFeatured: result.is_featured,
        quantity: result.quantity,
        description: result.description,
        categoryId: result.category_id,
        thumbnails: formattedThumbnails,
        categories: formattedCategories,
        createdAt: format(result.created_at, "MMM do,yyyy"),
        updatedAt: format(result.updated_at, "MMM do,yyyy")
      });

      const breadcrumbs: BreadcrumbsType[] = formattedCategories.reverse().map((category) => ({
        title: category.name,
        href: category.slug ? `/collections/${category.slug}` : "/",
      }));
      breadcrumbs.push({
        title: formattedProduct.name,
        href: ""
      });
      setBreadcrumbs(breadcrumbs);
      setProduct(formattedProduct);
    }
  }
  const getReviews = async () => {
    const res = await ReviewService.GetReviews();
    if (res.success) {
      const listReview = res.reviews
      const formattedReviews: Review[] = listReview.map((review) => ({
        id: review.id,
        email: review.email,
        name: review.name,
        phone: review.phone,
        status: review.status,
        productId: review.product_id,
        rating: review.rating,
        review: review.review,
        createdAt: format(review.created_at, 'MMM do,yyyy'),
        updatedAt: format(review.created_at, 'MMM do,yyyy'),
      }));

      setReviews(formattedReviews);
    }
  }

  useEffect(() => {
    if (!slug) {
      navigate('/');
    }
    startTransition(async () => {
      await getProduct(slug as string);
      await getReviews();
    })
  }, [slug]);

  return (
    <>
      {!isPending && (
        <FormDetail data={product} reviews={reviews} breadcrumbs={breadcrumbs}/>
      )}
    </>
  )
}