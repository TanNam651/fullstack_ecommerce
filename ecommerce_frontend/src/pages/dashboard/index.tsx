import {GroupProduct, UrlType} from "@/components/product/group-product.tsx";
import {ProductService} from "@/services/ProductService.ts";
import {useEffect, useState, useTransition} from "react";
import {Product} from "@/pages/admin/products/productId/components/product-form.tsx";
import {formatter} from "@/helpers/utils.ts";
import {format} from "date-fns";

export default function DashboardPage() {
  const [laptops, setLaptops] = useState<Product[]>([]);

  const [isPending, startTransition] = useTransition();

  const headerLaptops: UrlType[] = [
    {
      url: "",
      title: "Thương hiệu"
    },
    {
      url: "",
      title: "Giá bán"
    },
    {
      url: "",
      title: "Card đồ họa"
    },
    {
      url: "",
      title: "CPU Intel - AMD"
    },
    {
      url: "",
      title: "MSI Gaming"
    },
    {
      url: "",
      title: "LENOVO Gaming"
    },
    {
      url: "",
      title: "ASUS | ROG Gaming"
    },

  ]

  const getProducts = async () => {
    const listData = await ProductService.GetProducts();
    if (listData.success) return listData.data;
    return [];
  }

  useEffect(() => {
    startTransition(async () => {
      const data = await getProducts();
      const formattedProduct: Product[] = data.map((product) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        isFeatured: product.is_featured,
        isArchived: product.is_archived,
        originPrice: product.origin_price,
        studentPrice: product.student_price,
        imageUrl: product.image_url,
        hoverImg: product.hover_image,
        salePrice: product.sale_price,
        quantity: product.quantity,
        createdAt: format(product.created_at, "MMM do,yyyy"),
        updatedAt: format(product.updated_at, "MMM do,yyyy"),
        category: product.category.name
      }));
      setLaptops(formattedProduct);
    })
  }, []);

  return (
    <>
      <GroupProduct
        title="Laptop"
        products={laptops}
        listUrl={headerLaptops}
        navigateHref="/collections/laptop"
      />
    </>
  )
}