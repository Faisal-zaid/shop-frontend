import { useEffect, useState } from "react";
import { apiGet, apiPost, apiDelete } from "../services/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const data = await apiGet("/users");
    setUsers(data);
  }

  async function createUser(e) {
    e.preventDefault();
    await apiPost("/users", form);
    setForm({ name: "", email: "" });
    loadUsers();
  }

  async function deleteUser(id) {
    await apiDelete(`/users/${id}`);
    loadUsers();
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Users</h2>

      <form onSubmit={createUser}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <button>Add User</button>
      </form>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} — {u.email}
            <button onClick={() => deleteUser(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
