import {CategoryColumn, columns} from "@/pages/admin/categories/components/columns.tsx";
import React from "react";
import {Heading} from "@/components/heading.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {DataTable} from "@/components/ui/data-table.tsx";
import {useNavigate} from "react-router-dom";

interface CategoryClient{
  data:CategoryColumn[],
  loading:boolean,
}
export const CategoryClient:React.FC<CategoryClient> = ({
  data,
  loading
})=>{
  const navigate = useNavigate()
  return(
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Categories"
          description="Manager category for your store"
        />
        <Button
          className="cursor-pointer"
        onClick={()=>{navigate('/admin/categories/new')}}
        >
        <Plus className="h-4 w-4"/>
          Add new
        </Button>
      </div>
      <DataTable columns={columns} data={data} loading={loading}/>
    </>
  )
}