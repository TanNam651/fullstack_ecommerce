import {ColumnDef} from "@tanstack/react-table"
import {CellAction} from "@/pages/admin/products/components/cell-action.tsx";

export type ProductColumn = {
  id: string;
  name: string;
  slug: string;
  category: string;
  isFeatured: boolean;
  isArchived: boolean;
  originPrice: string;
  salePrice: string;
  quantity: string;
  createdAt: string;
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({row}) => <p
      className="w-auto max-w-md line-clamp-2 whitespace-normal text-ellipsis">{row.original.name}</p>
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "originPrice",
    header: "Origin price",
  },
  {
    accessorKey: "salePrice",
    header: "Sale price",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original}/>
  }
]
