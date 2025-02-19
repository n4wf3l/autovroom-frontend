
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { SidebarProvider } from "./ui/sidebar";
import AppSidebar from "./AppSidebar";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  setIsAuthenticated: (value: boolean) => void;
}

const Layout = ({ setIsAuthenticated }: LayoutProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
    navigate("/login");
  };

  if (isLoginPage) {
    return <Outlet />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-40">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85%] p-0">
              <AppSidebar onLogout={handleLogout} />
            </SheetContent>
          </Sheet>
        ) : (
          <AppSidebar onLogout={handleLogout} />
        )}
        <main className="flex-1 p-4 md:p-8 pt-16 md:pt-8">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
