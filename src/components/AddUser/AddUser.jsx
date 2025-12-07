import { useState } from "react";
import "./AddUser.css";


function AddUser({ onUserCreated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !role) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/User", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to create user");
        return;
      }

      alert("✅ User created successfully!");

      // Clear form
      setName("");
      setEmail("");
      setRole("");

      // Call parent callback to update dropdown
      if (onUserCreated) onUserCreated(data.user);

    } catch (err) {
      console.error(err);
      alert("Error creating user");
    }
  };

  return (
    <div className="main">
    <div className="container">
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: 8, width: 250 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: 8, width: 250 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ padding: 8, width: 250 }}
          >
            <option value="">-- Select Role --</option>
            <option value="owner">Owner</option>
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        <button type="submit">Create User</button>
      </form>
    </div>
    </div>
  );
}

export default AddUser;
