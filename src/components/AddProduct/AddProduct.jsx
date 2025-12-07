import { useState, useEffect } from "react";
import "./AddProduct.css";

import { api } from "../../api/api";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [user_id] = useState(1);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/Category")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []); //empty dependancy runs only once when the website is rendered

  useEffect(() => {
  fetch("http://localhost:8000/Product")
    .then((res) => res.json())
    .then((data) => {
      setProducts(data);
    });
}, []);


  async function submit() {
    if (!name || !price || !stock || !category_id) {
      alert("All fields are required!");
      return;
    }

    const productData = {
      name,
      price: Number(price),
      stock: Number(stock),
      category_id: Number(category_id),
      user_id,
    };

    try {
      const res = await fetch("http://localhost:8000/Product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        throw new Error("Failed to add product");
      }

      const data = await res.json();
      alert("Product added successfully!");
      console.log(data);
    } catch (error) {
      console.error(error);
      alert("Error adding product");
    }
  }

  // DELETE Product
  async function deleteProduct(id) {
    try {
      const res = await fetch(`http://localhost:8000/Product/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      alert("Product deleted");

      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
      alert("Error deleting");
    }
  }

  return (
    <div className="main">
    <div className='container'>
      <h2>Add Product</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
      <input
        placeholder="Total Stock"
        onChange={(e) => setStock(e.target.value)}
      />

      <select onChange={(e) => setCategoryId(e.target.value)}>
        <option value="">-- Choose Category --</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <button onClick={submit}>Add</button>

      <h3>Existing Products</h3>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name}
            <button onClick={() => deleteProduct(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}
