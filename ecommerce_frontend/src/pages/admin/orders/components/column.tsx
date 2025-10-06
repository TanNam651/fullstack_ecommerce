import { ColumnDef } from "@tanstack/react-table"
import {CellAction} from "@/pages/admin/orders/components/cell-action.tsx";

export type OrderColumn = {
  id: string;
  user:string;
  email:string
  status: string;
  total: string;
  shippingAddress: string;
  createdAt: string;
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "user",
    header: "Client",
  },
  {
    accessorKey:"email",
    header:"Email"
  },
  {
    accessorKey: "shippingAddress",
    header: "Address",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "status",
    header: ()=>(
      <div className="text-center">Status</div>
    ),
    cell:({row})=>(
      <>
        {row.getValue("status") === "COMPLETED" ?(
          <p className="bg-emerald-500/15 text-emerald-500 text-center p-1 rounded-md">{row.getValue("status")}</p>
        ):(
          <p className="bg-destructive/15 text-destructive text-center p-1 rounded-md">{row.getValue("status")}</p>
        )}
      </>
    )
  },
  {
    accessorKey:"createdAt",
    header:"Date",
  },
  {
    id:"actions",
    cell:({row})=><CellAction data={row.original}/>
  }
]
