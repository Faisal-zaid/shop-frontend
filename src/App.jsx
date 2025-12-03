import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import RoleSelect from "./pages/RoleSelect";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import AddCategory from "./pages/AddCategory";
import SellProduct from "./pages/SellProduct";
import Analytics from "./pages/Analytics";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<RoleSelect />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Manager + Owner */}
          <Route path="/add-product" element={
            <ProtectedRoute allowed={["manager", "owner"]}>
              <AddProduct />
            </ProtectedRoute>
          } />

          <Route path="/add-category" element={
            <ProtectedRoute allowed={["manager", "owner"]}>
              <AddCategory />
            </ProtectedRoute>
          } />

          <Route path="/analytics" element={
            <ProtectedRoute allowed={["manager", "owner"]}>
              <Analytics />
            </ProtectedRoute>
          } />

          {/* All roles */}
          <Route path="/sell" element={<SellProduct />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
