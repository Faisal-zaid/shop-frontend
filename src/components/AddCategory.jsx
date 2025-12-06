import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function AddCategory() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/Category').then((res)=>res.json()).then((data)=>{
      setCategories(data);
    });
  }, []);//empty dependancy runs only once when the website is rendered

  const createCategory = async (e) => {
  e.preventDefault(); // IMPORTANT

  const newCategory = {
    name: form.name,
    description: form.description,
  };

  try {
    const res = await fetch("http://localhost:8000/Category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCategory),
    });

    if (!res.ok) throw new Error("Failed to create category");

    // reload categories
    const created = await res.json();
    setCategories((prev) => [...prev, created]);

    // clear form
    setForm({ name: "", description: "" });

  } catch (err) {
    console.error(err);
  }
};


  

  const deleteCategory = async (id) => {
  try {
    const res = await fetch(`http://localhost:8000/Category/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete category");

    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div style={{ padding: 20 }}>
      <h2>Add Category</h2>

      <form onSubmit={createCategory} style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 8 }}>
          <input
            placeholder="Category name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{ padding: 8, width: 300 }}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <input
            placeholder="Description (optional)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            style={{ padding: 8, width: 300 }}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Category"}
        </button>
      </form>

      {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}

      <h3>Existing Categories</h3>

      {loading && categories.length === 0 ? (
        <div>Loading...</div>
      ) : categories.length === 0 ? (
        <div>No categories yet.</div>
      ) : (
        <ul>
          {categories.map((c) => (
            <li key={c.id} style={{ marginBottom: 8 }}>
              <strong>{c.name}</strong>
              {c.description ? <span> — {c.description}</span> : null}
              <button
                style={{ marginLeft: 12 }}
                onClick={() => deleteCategory(c.id)}
                disabled={loading}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
