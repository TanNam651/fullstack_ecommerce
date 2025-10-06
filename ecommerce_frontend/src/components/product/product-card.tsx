import {Product} from "@/pages/admin/products/productId/components/product-form.tsx";
import React from "react";
import {Link} from "react-router-dom";
import {formatter} from "@/helpers/utils.ts";

interface ProductCardProps {
  data: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({
                                                          data
                                                        }) => {
  return (
    <>
      <div className="pl-3.5 mb-3.5 flex flex-col max-md:pl-2">
        <div
          className="h-full border border-gray-100 flex flex-1 flex-col relative overflow-hidden hover:shadow-[0_20px_20px_rgba(0,0,0,0.03),0_8px_5px_rgba(0,0,0,0.08)] pb-2.5">
          <div className="relative text-center overflow-hidden w-full p-1 group">
            <Link to={`/products/${data.slug}`}
                  className="block relative before:content-[''] before:block before:pb-[100%]">
              <img src={data.imageUrl} alt={data.slug}
                   className="absolute left-0 top-0 object-contain block w-full h-full visible group-hover:opacity-0 group-hover:invisible transition-opacity"/>
              <img src={data.hoverImg} alt={data.slug}
                   className="absolute left-0 top-0 object-contain block w-full h-full invisible opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity"/>
            </Link>
          </div>
          <div className="flex flex-col px-2">
            <strong className="text-sm font-medium text-ellipsis text-2 line-clamp-2">{data.name}</strong>
            <div>
              <p className="flex flex-wrap items-center">
                <span
                  className="text-destructive font-medium mr-2 max-md:text-sm">{data.salePrice === 0 ? formatter.format(data.originPrice) : formatter.format(data.salePrice)}</span>
                <del
                  className="text-sm text-gray-500 font-medium max-md:text-sm">{data.salePrice !== 0 && formatter.format(data.originPrice)}</del>
              </p>
              {data.studentPrice.toString().length > 3 && (
                <div className="text-white font-bold px-1.5 py-1 rounded-sm w-fit bg-destructive max-md:text-sm mt-1">
                  <p>Giá HSSV:{formatter.format(data.studentPrice)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}