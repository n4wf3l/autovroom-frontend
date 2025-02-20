import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Inventory from "./pages/Inventory";
import ProductManagement from "./pages/ProductManagement";
import ScanQR from "./pages/ScanQR";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import EditProduct from "./pages/EditProduct";
import History from "./pages/History";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout setIsAuthenticated={() => {}} />}>
          <Route index element={<Index />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          <Route path="product-management" element={<ProductManagement />} />
          <Route path="scan" element={<ScanQR />} />
          <Route path="history" element={<History />} />
          <Route
            path="login"
            element={<Login setIsAuthenticated={() => {}} />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
