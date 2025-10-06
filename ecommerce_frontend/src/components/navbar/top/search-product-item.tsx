import {ProductSearch} from "@/components/navbar/top/search-box.tsx";
import React from "react";
import {Link} from "react-router-dom";
import {formatter} from "@/helpers/utils.ts";

interface SearchProductItemProps {
  item: ProductSearch
}

export const SearchProductItem: React.FC<SearchProductItemProps> = ({
                                                                      item
                                                                    }) => {
  return (
    <>
      <div className="flex mb-1">
        <div className="relative w-20 flex-[0_0_100px] pr-2.5 h-20">
          <Link to={`/products/${item.slug}`}>
            <img src={item.imageUrl} alt={item.name}/>
          </Link>
        </div>
        <div>
          <Link to={`/products/${item.slug}`} className="">
            <h2
              className="font-normal text-base line-clamp-2 text-ellipsis hover:text-destructive transition-all">{item.name}</h2>
          </Link>
          <p className="text-destructive">{formatter.format(item.salePrice)}
            <del className="ml-2 text-primary">{formatter.format(item.originPrice)}</del>
          </p>
        </div>
      </div>
    </>
  )
}