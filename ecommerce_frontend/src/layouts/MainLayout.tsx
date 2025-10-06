import {Outlet, useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {IState} from "@/reducers/appReducer/InitState";
import {useContext, useEffect, useState} from "react";
import AppContext from "@/context/context.ts";
import {getCookie} from "@/helpers/utils.ts";
import {useAppNavigate} from "@/hooks/use-navigate.ts";
import {Actions} from "@/reducers/appReducer";
import {HeaderTop} from "@/components/navbar/top/header-top.tsx";

type Response = {
  success?: string;
  error?: string,
}

interface MainLayoutProps {
  UserAuthenticated: () => Promise<Response>;
  app: any;
}

const MainLayout = (props: MainLayoutProps) => {
  // const {config: {isDark}} = useContext(AppContext);

  const navigate = useAppNavigate();
  const [authenticated, setAuthenticated] = useState<boolean>(true);

  const handleNavigate = (role: string) => {
    switch (role.toUpperCase()) {
      case "ADMIN":
        navigate("/admin/dashboard", {requiredAuth: false});
        break;
      default:
        navigate("/", {requiredAuth: false})
    }
  }

  const checkAuth = async () => {
    const tokenAuthenticated = getCookie("auth_token");

    if (!tokenAuthenticated) {
      setAuthenticated(false);
      return;
    }

    if (props.app.Name) {
      setAuthenticated(true);
      handleNavigate(props.app.Role);
      return;
    }

    const verifiedUser = await props.UserAuthenticated();
    if (verifiedUser?.success) {
      setAuthenticated(true);
      handleNavigate(verifiedUser.role);
      return;
    } else {
      setAuthenticated(false);
    }
  }

  useEffect(() => {
    (async () => {
      await checkAuth()
    })()
  }, []);
  return (
    <>
      <div className=" bg-gray-100 min-h-full">
        <HeaderTop/>
        <Outlet/>
      </div>
    </>
  )
}

const mapState = ({...state}) => ({
  app: state.app
});

const mapDispatchToProps = {
  UserAuthenticated: Actions.UserAuthenticated
};

export default connect(mapState, mapDispatchToProps)(MainLayout)

