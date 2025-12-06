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

  async function loadCategories() {
    try {
      setLoading(true);
      const res = await api.get("/Category");
      // axios returns data directly in res.data
      setCategories(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Could not load categories");
    } finally {
      setLoading(false);
    }
  }

  async function createCategory(e) {
    e.preventDefault();
    setError(null);
    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/Category", form);
      setForm({ name: "", description: "" });
      await loadCategories();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.detail || "Failed to create category");
    } finally {
      setLoading(false);
    }
  }

  async function deleteCategory(id) {
    if (!confirm("Delete this category?")) return;
    try {
      setLoading(true);
      await api.delete(`/Category/${id}`);
      await loadCategories();
    } catch (err) {
      console.error(err);
      setError("Failed to delete category");
    } finally {
      setLoading(false);
    }
  }

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
