import { useEffect, useState } from "react";
import "./AddCategory.css"; // adjust the file name for each component




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
    <div className="main">
  <div className="container">
    <h2>Add Category</h2>

    <form onSubmit={createCategory}>
      <input
        placeholder="Category name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Description (optional)"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Add Category"}
      </button>
    </form>

    {error && <div style={{ color: "red" }}>{error}</div>}

    <h3>Existing Categories</h3>

    <ul>
      {categories.length === 0 ? (
        <div>No categories yet.</div>
      ) : (
        categories.map((c) => (
          <li key={c.id}>
            <span>
              <strong>{c.name}</strong> — {c.description}
            </span>
            <button onClick={() => deleteCategory(c.id)}>Delete</button>
          </li>
        ))
      )}
    </ul>
  </div>
  </div>
);

}
