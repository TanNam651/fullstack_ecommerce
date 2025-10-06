import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";
import {Link} from "react-router-dom";

export type BreadcrumbsType = {
  title: string,
  href: string
}

interface BreadcrumbsProductProps {
  breadcrumbs: BreadcrumbsType[]
}

export const BreadcrumbsProduct: React.FC<BreadcrumbsProductProps> = ({
                                                                        breadcrumbs
                                                                      }) => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList className="whitespace-nowrap flex-nowrap overflow-x-auto py-1">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="text-base">Trang chủ</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbs.map((breadcrumb) => (
            <div key={breadcrumb.href} className="relative flex items-center gap-1.5 sm:gap-2.5">
              <BreadcrumbSeparator>
                <span>/</span>
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={breadcrumb.href} className="text-base">{breadcrumb.title}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  )
}
