
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Package2, QrCode, Settings, LogOut } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

interface AppSidebarProps {
  onLogout: () => void;
}

const AppSidebar = ({ onLogout }: AppSidebarProps) => {
  const location = useLocation();

  const items = [
    {
      title: "Inventaire",
      url: "/inventory",
      icon: Package2,
    },
    {
      title: "Gestion des Produits",
      url: "/product-management",
      icon: Settings,
    },
    {
      title: "Scanner QR",
      url: "/scan",
      icon: QrCode,
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    active={location.pathname === item.url}
                  >
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton onClick={onLogout} className="flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
