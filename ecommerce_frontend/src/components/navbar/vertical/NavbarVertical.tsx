import {SidebarProvider} from "@/components/ui/sidebar.tsx";
import AppSidebar from "@/components/navbar/app-sidebar.tsx";

const NavbarVertical = () => {
  return (
    <SidebarProvider>
      <AppSidebar/>
    </SidebarProvider>
  )
}

export default NavbarVertical