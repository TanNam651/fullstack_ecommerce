import { CategoryColumn} from "@/pages/admin/categories/components/columns.tsx";
import {CategoryClient} from "@/pages/admin/categories/components/client.tsx";
import CategoryService from "@/services/CategoryService.ts";
import {useEffect, useState, useTransition} from "react";
import {format} from "date-fns";
export default  function Categories(){
const [categories, setCategories] = useState<CategoryColumn[]>([]);
const [isPending, startTransition] = useTransition();

const listCategory = async ()=>{
  const listData = await CategoryService.GetListCategory();
  if (listData.success) return listData.data;

  return [];
}

  useEffect(() => {
    startTransition(async ()=>{
      const data = await  listCategory();

      const formattedCategories:CategoryColumn[] = data.map((item)=>({
        id:item.id,
        name:item.name,
        slug:item.slug,
        parentId:item.parent_id,
        createdAt:format(item.created_at, "MMM do, yyyy")
      }));
      setCategories(formattedCategories);
    })
  },[]);

  return(
    <div className="flex-col ">
      <div className="flex-1 space-y-8 p-8 pt-6">
        <CategoryClient loading={isPending} data={categories}/>
      </div>
    </div>
  );
}