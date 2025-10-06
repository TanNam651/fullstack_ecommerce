import {UrlType} from "@/components/product/group-product.tsx";
import React from "react";
import {Link} from "react-router-dom";

interface GroupUrlButtonProps {
  data: UrlType[]
}

export const GroupUrlButton: React.FC<GroupUrlButtonProps> = ({
                                                                data
                                                              }) => {
  return (
    <>
      <ul className="flex flex-nowrap py-2.5 mb-3.5 overflow-auto">
        {data.map((item, index) => (
          <li key={index} className="pl-2 first:pl-0">
            <Link to={item.url}
                  className="bg-gray-100 p-2 border border-gray-100 rounded-sm hover:border-destructive hover:bg-destructive hover:text-white transition-all whitespace-nowrap">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}