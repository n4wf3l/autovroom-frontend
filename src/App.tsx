
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Inventory from "./pages/Inventory";
import ProductManagement from "./pages/ProductManagement";
import ScanQR from "./pages/ScanQR";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    setIsAuthenticated(!!auth);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route
              element={
                isAuthenticated ? (
                  <Layout setIsAuthenticated={setIsAuthenticated} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            >
              <Route path="/" element={<Navigate to="/inventory" />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/product-management" element={<ProductManagement />} />
              <Route path="/scan" element={<ScanQR />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
