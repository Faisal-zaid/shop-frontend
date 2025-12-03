import { useEffect, useState } from "react";
//import { apiGet, apiPost, apiDelete } from "../services/api";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await apiGet("/categories");
    setCategories(data);
  }

  async function create(e) {
    e.preventDefault();
    await apiPost("/categories", form);
    setForm({ name: "", description: "" });
    load();
  }

  async function remove(id) {
    await apiDelete(`/categories/${id}`);
    load();
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Categories</h2>

      <form onSubmit={create}>
        <input
          placeholder="Category name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button>Add Category</button>
      </form>

      <ul>
        {categories.map((c) => (
          <li key={c.id}>
            {c.name}
            <button onClick={() => remove(c.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
