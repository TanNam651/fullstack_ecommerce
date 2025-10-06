import {Heading} from "@/components/heading.tsx";
import {columns, OrderColumn} from "@/pages/admin/orders/components/column.tsx";
import React from "react";
import {Separator} from "@/components/ui/separator.tsx";
import {DataTable} from "@/components/ui/data-table.tsx";

interface OrderClientProps{
  data:OrderColumn[],
  loading:boolean
}

export const OrderClient:React.FC<OrderClientProps> = ({
  data,
  loading
}) => {

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Orders"
          description="Manager order for your store"
        />
      </div>
      <Separator/>
      <DataTable columns={columns} data={data} loading={loading}/>
    </>
  )
}