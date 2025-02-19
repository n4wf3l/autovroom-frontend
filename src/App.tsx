
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          <Route path="product-management" element={<ProductManagement />} />
          <Route path="scan-qr" element={<ScanQR />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
