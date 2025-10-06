import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState, useTransition} from "react";
import CategoryService from "@/services/CategoryService.ts";
import {Category, CategoryForm} from "@/pages/admin/categories/categoryId/components/category-form.tsx";
import {format} from "date-fns";


export default function CategoryPage() {
  const {id} = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const getCategory = async (id: string) => {
    try {
      const result = await CategoryService.GetCategoryById(id);
      if (!result.data || Array.isArray(result.data) && result.data.length ===0) return null;
      const data = result.data;
      const category:Category = {
        id:data.id,
        name:data.name,
        slug:data.slug,
        parentId: data.parent_id,
        isLast: data.is_last,
        createdAt: format(data.created_at, "MMM do, yyyy"),
        updatedAt: format(data.updated_at, "MMM do, yyyy"),
      }
      return category;
    } catch (error) {
     return null;
    }
  }


  useEffect(() => {
    if (!id) {
      navigate('admin/category');
      return;
    }

      startTransition(async ()=>{
        await getCategory(id)
          .then((data) => {
            setCategory(data);
          })
      })

  }, [id]);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {!isPending&&(
          <CategoryForm initialData={category} />
        )}
        {/*<CategoryForm initialData={category} />*/}
      </div>
    </div>
  )
}