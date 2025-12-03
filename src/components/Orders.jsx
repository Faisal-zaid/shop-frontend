import { useEffect, useState } from "react";
//import { apiGet, apiPost, apiDelete } from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    product_id: "",
    user_id: "",
    quantity: "",
  });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setOrders(await apiGet("/orders"));
    setProducts(await apiGet("/products"));
    setUsers(await apiGet("/users"));
  }

  async function create(e) {
    e.preventDefault();
    await apiPost("/orders", form);
    load();
  }

  async function remove(id) {
    await apiDelete(`/orders/${id}`);
    load();
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Orders</h2>

      <form onSubmit={create}>
        <select onChange={(e) => setForm({ ...form, product_id: e.target.value })}>
          <option>Select Product</option>
          {products.map((p) => (
            <option value={p.id}>{p.name}</option>
          ))}
        </select>

        <select onChange={(e) => setForm({ ...form, user_id: e.target.value })}>
          <option>Select Staff</option>
          {users.map((u) => (
            <option value={u.id}>{u.name}</option>
          ))}
        </select>

        <input
          placeholder="Quantity"
          type="number"
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />

        <button>Add Order</button>
      </form>

      <ul>
        {orders.map((o) => (
          <li key={o.id}>
            Order #{o.id} — Product {o.product_id} — Qty {o.quantity}
            <button onClick={() => remove(o.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
