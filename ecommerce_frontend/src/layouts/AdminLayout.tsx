import {Outlet, useNavigate} from "react-router-dom";
import {connect} from "react-redux";

import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import AppSidebar from "@/components/navbar/app-sidebar.tsx";
import {Actions} from "@/reducers/appReducer";
import {useEffect, useState} from "react";

type Response = {
  success?: string,
  error?: string
}

interface AdminLayoutProps {
  UserAuthenticated: () => Promise<Response>;
  app: any
}

const AdminLayout = (props: AdminLayoutProps) => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState<boolean>(true);
  const checkAuth = async () => {
    await props.UserAuthenticated()
      .then((data) => {
        if (data?.success) {
          setAuthenticated(true);
        }
        if (data?.error) {
          setAuthenticated(false)
        }
      });
  };

  useEffect(() => {
    (async () => {
      await checkAuth();
    })()
  }, []);

  useEffect(() => {
    if (!authenticated) {
      navigate("/auth/login");
    }
    if (props.app.Role === "USER") navigate("/")
  }, [authenticated]);

  return (
    <SidebarProvider className="selection:bg-primary selection:text-primary-foreground">
      <AppSidebar/>
      <main className="w-full">
        <SidebarTrigger/>
        <Outlet/>
      </main>
    </SidebarProvider>
  )
}

const mapState = ({...state}) => ({
  app: state.app
});

const mapDispatchToProps = {
  UserAuthenticated: Actions.UserAuthenticated
}

export default connect(mapState, mapDispatchToProps)(AdminLayout)