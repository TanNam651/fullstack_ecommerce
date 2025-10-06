import {useEffect, useState, useTransition} from "react";
import {ProductClient} from "@/pages/admin/products/components/client.tsx";
import {ProductColumn} from "@/pages/admin/products/components/columns.tsx";
import {ProductService} from "@/services/ProductService.ts";
import {format} from "date-fns";
import {formatter} from "@/helpers/utils.ts";

export default function Products() {
  const [products, setProducts] = useState<ProductColumn[]>([]);
  const [isPending, startTransition] = useTransition();

  const listProducts = async () => {
    const listData = await ProductService.GetProducts();
    if (listData.success) return listData.data;
    return [];
  }

  useEffect(() => {
    startTransition(async () => {
      const data = await listProducts();
      const formattedProducts: ProductColumn[] = data.map((product: any) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        isFeatured: product.is_featured,
        isArchived: product.is_archived,
        originPrice: formatter.format(product.origin_price),
        salePrice: formatter.format(product.sale_price),
        quantity: product.quantity,
        createdAt: format(product.created_at, "MMM do, yyyy"),
        category: product.category.name
      }));
      console.log(formattedProducts)
      setProducts(formattedProducts);
    })
  }, []);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-6 p-8 pt-6">
        <ProductClient data={products} loading={isPending}/>
      </div>
    </div>
  )
}

// <UploadImage
//   value={thumbnails}
//   onChange={(change)=>{
//     setThumbnails((prev)=>[...prev, ...change]);
//   }}
//   disable={true}
//   onRemove={(value)=>{
//     setThumbnails((prev)=>
//       prev.filter((item)=>{
//         if (item.file === value.file){
//           URL.revokeObjectURL(item.preview);
//         }
//         return item.file !== value.file;
//       })
//     )
//   }}
// />