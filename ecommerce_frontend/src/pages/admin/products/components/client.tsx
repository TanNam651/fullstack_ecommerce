import {Heading} from "@/components/heading.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {DataTable} from "@/components/ui/data-table.tsx";
import {ProductColumn,columns} from "@/pages/admin/products/components/columns.tsx";
import React, {useEffect, useTransition} from "react";
import {ProductService} from "@/services/ProductService.ts";

interface ProductClientProps{
  data:ProductColumn[];
  loading:boolean;
}

export const ProductClient:React.FC<ProductClientProps> = ({
  data,
  loading
}) => {
  const navigate = useNavigate();
  // const [isPending, startTransition] = useTransition();

  // useEffect(() => {
  //   startTransition(async ()=>{
  //     await ProductService.GetProducts()
  //       .then((data)=>{
  //         console.log(data)
  //       })
  //   })
  // }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Products"
          description="Manager product for your store"
        />
        <Button
          className="cursor-pointer"
          onClick={()=>navigate("/admin/products/new")}
        >
          <Plus className="h-4 w-4"/>
          Add new
        </Button>
      </div>
      <DataTable columns={columns} data={data} loading={loading}/>
    </>
  )
}