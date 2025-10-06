import {CategoryColumn} from "@/pages/admin/categories/components/columns.tsx";
import React, {useState} from "react";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Edit, MoreHorizontal, Trash} from "lucide-react";
import { useNavigate} from "react-router-dom";
import CategoryService from "@/services/CategoryService.ts";
import {toast} from "sonner";
import {AlertModal} from "@/components/modal/alert-modal.tsx";

interface CellActionProps{
  data:CategoryColumn,
}
export const CellAction:React.FC<CellActionProps> = ({
  data
                                                     })=>{
const navigate = useNavigate();
const [loading, setLoading] = useState<boolean>(false);
const [open, setOpen] = useState<boolean>(false);
  const onDelete = async () => {
    try {
      setLoading(true);
      await CategoryService.DeleteCategory(data.id)
        .then((data)=>{
          if (data.success) {
            toast.success(data.success);
            window.location.reload();
          } else {
            toast.error(data.error)
          }
        })
    } catch (error) {
      toast.error("Make sure you removed all products using this size or sub-categories depend on this category first");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return(
    <>
      <AlertModal
        isOpen={open}
        onclose={()=>setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-8 h-8 p-0"
          >
            <span className="sr-only">
              Open menu
            </span>
            <MoreHorizontal className="w-4 h-4"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            Actions
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={()=>navigate(`${data.id}`)}>
            <Edit className="mr-2 h-4 w-4"/>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=>setOpen(true)}>
            <Trash className="mr-2 h-4 w-4"/>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}