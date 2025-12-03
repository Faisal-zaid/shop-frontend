import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RoleSelect() {
  const { setRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const chooseRole = (selected) => {
    setRole(selected);
    navigate("/dashboard");
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Select Your Role</h2>

      <button onClick={() => chooseRole("employee")}>Employee</button>
      <button onClick={() => chooseRole("manager")}>Manager</button>
      <button onClick={() => chooseRole("owner")}>Shop Owner</button>
    </div>
  );
}
