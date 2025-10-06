import {ProductColumn} from "@/pages/admin/products/components/columns.tsx";
import React, {useState} from "react";
import {AlertModal} from "@/components/modal/alert-modal.tsx";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Edit, MoreHorizontal, Trash} from "lucide-react";
import {useNavigate} from "react-router-dom";

interface CellActionProps{
  data:ProductColumn
}

export const CellAction:React.FC<CellActionProps>=({
  data
})=>{
  const [open,setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  return(
    <>
      <AlertModal
        isOpen={open}
        onclose={()=>setOpen(false)}
        onConfirm={()=>{}}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-8 h-8 p-0"
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            Actions
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={()=>navigate(`${data.slug}`)}>
            <Edit className="mr-2 h-4 w-4"/>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash className="mr-2 h-4 w-4"/>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}