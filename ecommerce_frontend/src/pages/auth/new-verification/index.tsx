import NewVerifyForm from "@/components/auth/new-verify-form.tsx";
import {useParams} from "react-router-dom";

export default function NewVerification(){
  const {id} = useParams();
  if (!id) return "";
  return (
    <div>
      <NewVerifyForm id={id}/>
    </div>
  )
}