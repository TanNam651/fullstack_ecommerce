import {useNavigate} from "react-router-dom";
import {getCookie} from "@/helpers/utils.ts";
export const useAppNavigate = () => {

  const navigate = useNavigate();
  return (
    path: string, options: { replace?: boolean, requiredAuth?: boolean } = {}
  ) => {
    if (options.requiredAuth && !getCookie('auth_token')) {
      navigate("auth/login", {replace: true});
      return;
    }
    navigate(path, {replace: options.replace ?? false})
  }
}

type AppNavigationFunction = ReturnType<typeof useAppNavigate>

export const handleNavigate = (navigate:AppNavigationFunction, role: string) => {
  switch (role.toUpperCase()) {
    case "ADMIN":
      navigate("/admin/dashboard", {requiredAuth: false});
      break;
    default:
      navigate("/", {requiredAuth: false})
  }
}