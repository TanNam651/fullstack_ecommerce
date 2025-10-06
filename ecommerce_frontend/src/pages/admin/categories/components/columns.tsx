import { ColumnDef } from "@tanstack/react-table"
import {CellAction} from "@/pages/admin/categories/components/cell-action.tsx";

export type CategoryColumn = {
  id: string;
  name: string;
  slug: string;
  parentId: string;
  createdAt: string;
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "parentId",
    header: "Parent ID",
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
