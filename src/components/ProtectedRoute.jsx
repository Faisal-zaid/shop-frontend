import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowed }) {
  const { role } = useContext(AuthContext);

  if (!allowed.includes(role)) return <Navigate to="/" />;
  return children;
}
