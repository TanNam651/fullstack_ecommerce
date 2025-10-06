import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const RemoveTrailingSlash = ()=>{
  const location = useLocation();
  const navigate =useNavigate();

  useEffect(() => {
    if (location.pathname!="/" && location.pathname.endsWith("/")){
      navigate(location.pathname.slice(0,-1)+location.search, {replace:true});
    }
  }, []);
  return null;
}