import { useEffect, useState } from "react";
//import { apiGet, apiPost, apiDelete } from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category_id: "",
    user_id: "",
  });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setProducts(await apiGet("/products"));
    setUsers(await apiGet("/users"));
    setCategories(await apiGet("/categories"));
  }

  async function create(e) {
    e.preventDefault();
    await apiPost("/products", form);
    load();
  }

  async function remove(id) {
    await apiDelete(`/products/${id}`);
    load();
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Products</h2>

      <form onSubmit={create}>
        <input
          placeholder="Product name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Price"
          type="number"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          placeholder="Stock"
          type="number"
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />

        <select onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
          <option>Select Category</option>
          {categories.map((c) => (
            <option value={c.id}>{c.name}</option>
          ))}
        </select>

        <select onChange={(e) => setForm({ ...form, user_id: e.target.value })}>
          <option>Select User</option>
          {users.map((u) => (
            <option value={u.id}>{u.name}</option>
          ))}
        </select>

        <button>Add Product</button>
      </form>

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} — {p.price} KES
            <button onClick={() => remove(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
