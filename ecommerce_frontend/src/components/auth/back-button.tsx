import {Button} from "@/components/ui/button.tsx";
import { Link} from "react-router-dom";

interface BackButtonProps{
  label:string,
  href:string
}

export const BackButton = ({
label,
  href
}:BackButtonProps)=>{
  return(
    <Button
      variant="ghost"
      className="font-normal w-full"
      size="sm"
      asChild
    >
      <Link to={href}>
        {label}
      </Link>
    </Button>
  )
}