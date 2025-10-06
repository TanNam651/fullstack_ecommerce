import React from "react";
import { Product } from "@/pages/admin/products/productId/components/product-form.tsx";
import { Link } from "react-router-dom";
import { ProductCard } from "@/components/product/product-card.tsx";
import { GroupUrlButton } from "@/components/product/group-url-button.tsx";

export type UrlType = {
  url: string,
  title: string
}

interface GroupProductProps {
  title?: string;
  listUrl: UrlType[];
  products: Product[];
  navigateHref: string;
  // showButton?: boolean;
}

export const GroupProduct: React.FC<GroupProductProps> = ({
  title,
  listUrl,
  products,
  navigateHref,
  // showButton
}) => {
  return (
    <section className="pt-7 relative">
      <div className="relative container max-w-7xl ml-auto mr-auto p-0 max-xl:p-1 ">
        <div className="p-3 bg-white rounded-md max-md:p-2">
          <div className="flex flex-wrap justify-between items-center">
            <h2 className="pl-3 border-l-[3px] border-primary mb-4 uppercase text-xl">{title}</h2>
            <GroupUrlButton data={listUrl} />
          </div>
          <div className="relative flex flex-1 flex-wrap">
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 -ml-3.5 max-md:-ml-2">
              {products.map((product) => (
                <ProductCard key={product.slug} data={product} />
              ))}
            </div>
          </div>
          <div className="text-center py-2">
            <Link to={navigateHref}
              className="inline-block px-5 py-2.5 rounded-sm min-w-52 border border-destructive text-white bg-destructive hover:bg-white hover:text-destructive transition-all">
              Xem tất cả »
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}