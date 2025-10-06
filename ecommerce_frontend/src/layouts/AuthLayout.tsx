import {connect} from "react-redux";
import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import {Actions} from "@/reducers/appReducer";
import {getCookie} from "@/helpers/utils.ts";
import {handleNavigate, useAppNavigate} from "@/hooks/use-navigate.ts";


interface AuthLayoutProps {
  UserAuthenticated: () => Promise<any>;
  app: any
}

const AuthLayout = (props: AuthLayoutProps) => {
  const [authenticated, setAuthenticated] = useState<boolean>(true);
  const navigate = useAppNavigate();

  const checkAuth = async () => {
    const tokenAuthenticated = getCookie("auth_token");

    if (!tokenAuthenticated) {
      setAuthenticated(false);
      return;
    }

    if (props.app.Name) {
      setAuthenticated(true);
      handleNavigate(navigate,props.app.Role);
      return;
    }

    const verifiedUser = await props.UserAuthenticated();
    if (verifiedUser?.success){
      setAuthenticated(true);
      handleNavigate(navigate,verifiedUser.role);
      return;
    } else {
      setAuthenticated(false);
    }
  }

  useEffect(() => {
    (async()=>{
       await checkAuth()
    })()
  }, []);



  return !authenticated&&(
    <div
      className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-radial-[at_50%_50%] from-sky-400 to-blue-800">
      <Outlet/>
    </div>
  )
}

const mapState = ({...state}) => ({
  app: state.app
});
const mapDispatchToProps = {
  UserAuthenticated: Actions.UserAuthenticated
};

export default connect(mapState, mapDispatchToProps)(AuthLayout);

// export default AuthLayout;