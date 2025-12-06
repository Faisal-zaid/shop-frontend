import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import RoleSelect from "./components/RoleSelect";
import Dashboard from "./components/Dashboard";
import AddProduct from "./components/AddProduct";
import AddCategory from "./components/AddCategory";
import SellProduct from "./components/SellProduct";
import Analytics from "./components/Analytics";
import AddUser from "./components/AddUser";
import UsersList from "./components/UsersList"; // OR Users.js (pick ONE)

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Default */}
          <Route path="/" element={<RoleSelect />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* --- Manager + Owner Routes --- */}
          <Route
            path="/add-product"
            element={
              <ProtectedRoute allowed={["manager", "owner"]}>
                <AddProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-category"
            element={
              <ProtectedRoute allowed={["manager", "owner"]}>
                <AddCategory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <ProtectedRoute allowed={["manager", "owner"]}>
                <Analytics />
              </ProtectedRoute>
            }
          />

          {/* User Management (Owner Only) */}
          <Route
            path="/add-user"
            element={
              <ProtectedRoute allowed={["owner"]}>
                <AddUser />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute allowed={["owner"]}>
                <UsersList />
              </ProtectedRoute>
            }
          />

          {/* Everyone */}
          <Route path="/sell" element={<SellProduct />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
