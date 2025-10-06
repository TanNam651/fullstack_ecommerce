import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import {
  Boxes,
  InboxIcon,
  NotebookPenIcon,
  ScrollTextIcon,
  BotMessageSquareIcon,
  PanelsLeftBottomIcon
} from "lucide-react";
import {Link, useLocation} from "react-router-dom";
import {useEffect} from "react";


const AppSidebar = () => {
  const {pathname} = useLocation();

  const items = [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: PanelsLeftBottomIcon,
      active: pathname === "/admin/dashboard" || pathname === "/admin"
    },
    {
      title: "Products",
      url: "/admin/products",
      icon: Boxes,
      active: pathname === "/admin/products"
    },
    {
      title: "Categories",
      url: "/admin/categories",
      icon: InboxIcon,
      active: pathname === "/admin/categories"
    },
    {
      title: "Orders",
      url: "/admin/orders",
      icon: NotebookPenIcon,
      active: pathname === "/admin/orders"
    },
    {
      title: "Payment",
      url: "/admin/payments",
      icon: ScrollTextIcon,
      active: pathname === "/admin/payments"
    },
    {
      title: "Reviews",
      url: "/admin/reviews",
      icon: BotMessageSquareIcon,
      active: pathname === "/admin/reviews"
    },
  ]

  useEffect(() => {
    console.log(pathname)
  }, [pathname]);
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={item.active}>
                  <Link to={item.url}>
                    <item.icon/>
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar;