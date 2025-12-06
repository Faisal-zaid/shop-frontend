import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import RoleSelect from "./components/RoleSelect";
import Dashboard from "./components/Dashboard";
import AddProduct from "./components/AddProduct";
import AddCategory from "./components/AddCategory";
import SellProduct from "./components/SellProduct";
import Analytics from "./components/Analytics";

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
