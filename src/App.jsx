import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Users from "./components/Users";
import Categories from "./components/Categories";
import Products from "./components/Products";
import Orders from "./components/Orders";

function App() {
  return (
    <Router>
      <div style={{ display: "flex", gap: 20, padding: 20 }}>
        <Link to="/users">Users</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/products">Products</Link>
        <Link to="/orders">Orders</Link>
      </div>

      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
}

export default App;
