import { useState } from "react";
import { api } from "../api/api";

export default function Products() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [user_id, setUserId] = useState(1); // temp

  const submit = async () => {
    await api.post("/Product", {
      name,
      price: parseInt(price),
      stock: parseInt(stock),
      category_id: parseInt(category_id),
      user_id,
    });
    alert("Product added!");
  };

  return (
    <div>
      <h2>Add Product</h2>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
      <input placeholder="Stock" onChange={(e) => setStock(e.target.value)} />
      <input placeholder="Category ID" onChange={(e) => setCategoryId(e.target.value)} />
      <button onClick={submit}>Add</button>
    </div>
  );
}
