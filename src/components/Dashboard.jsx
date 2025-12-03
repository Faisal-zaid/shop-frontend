import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { role } = useContext(AuthContext);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome, {role}</h2>

      {/* Available to all */}
      <Link to="/sell">Sell Products</Link><br/>

      {/* Manager + Owner */}
      {(role === "manager" || role === "owner") && (
        <>
          <Link to="/add-product">Add Products</Link><br/>
          <Link to="/add-category">Add Category</Link><br/>
          <Link to="/analytics">View Analytics</Link><br/>
        </>
      )}
    </div>
  );
}
