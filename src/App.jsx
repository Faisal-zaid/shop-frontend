import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import RoleSelect from "./components/RoleSelect/RoleSelect";
import Dashboard from "./components/Dashboard/Dashboard";
import AddProduct from "./components/AddProduct/AddProduct";
import AddCategory from "./components/AddCategory/AddCategory";
import SellProduct from "./components/SellProduct/SellProduct";
import Analytics from "./components/Analytics/Analytics";
import AddUser from "./components/AddUser/AddUser";
import UsersList from "./components/UserList/UsersList";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<RoleSelect />} />

          <Route path="/dashboard" element={<Dashboard />} />

          

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

          <Route path="/sell" element={<SellProduct />} />

          <Route path="/add-user" element={<AddUser />} />

          <Route path="/users" element={<UsersList />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
