
import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider } from "./ui/sidebar";
import AppSidebar from "./AppSidebar";

interface LayoutProps {
  setIsAuthenticated: (value: boolean) => void;
}

const Layout = ({ setIsAuthenticated }: LayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar onLogout={handleLogout} />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
