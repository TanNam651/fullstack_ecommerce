import {OrderColumn} from "@/pages/admin/orders/components/column.tsx";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {FileCode, MoreHorizontal} from "lucide-react";
import {useNavigate} from "react-router-dom";

interface CellActionProps{
  data:OrderColumn;
}

export const CellAction:React.FC<CellActionProps> = ({
  data
                                                     })=>{
  const navigate = useNavigate();
  return(
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
        <DropdownMenuItem onClick={()=>{navigate(`${data.id}`)}}>
          <FileCode className="w-4 h-4 mr-2"/>
          Details
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}