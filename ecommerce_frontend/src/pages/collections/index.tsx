import {CollectionForm} from "@/pages/collections/components/collection-form.tsx";
import {useParams} from "react-router-dom";

export default function CollectionsPage() {
  const {params} = useParams();


  if (!params) {
    return null
  }
  return (
    <>
      <CollectionForm params={params}/>
    </>
  )
}