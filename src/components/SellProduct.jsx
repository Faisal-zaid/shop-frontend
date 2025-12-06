import { useEffect, useState } from "react";

export default function SellProduct() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [quantity, setQuantity] = useState("");
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const [user_id] = useState(1); // Hardcoded for now

  // Fetch categories from backend
  useEffect(() => {
    fetch("http://localhost:8000/Category")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch products when category changes
  useEffect(() => {
    if (!selectedCategory) return;

    fetch("http://localhost:8000/Product")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (p) => p.category_id === parseInt(selectedCategory)
        );
        setProducts(filtered);
      })
      .catch((err) => console.error(err));
  }, [selectedCategory]);

  // Calculate total and validate stock
  useEffect(() => {
    if (selectedProduct && quantity) {
      setTotal(selectedProduct.price * quantity);

      if (quantity > selectedProduct.stock) {
        setError("❌ Quantity cannot exceed available stock!");
      } else {
        setError("");
      }
    }
  }, [quantity, selectedProduct]);

  // Sell product and update backend
  async function sell() {
    if (!selectedProduct) {
      alert("Select a product first!");
      return;
    }

    if (quantity > selectedProduct.stock) {
      alert("❌ Error: Quantity is greater than stock!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/Order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: selectedProduct.id,
          user_id,
          quantity: parseInt(quantity),
        }),
      });

      if (!res.ok) throw new Error("Failed to create order");

      const data = await res.json();
      alert("✅ Product sold successfully!");

      // Update stock locally
      setSelectedProduct({
        ...selectedProduct,
        stock: data.remaining_stock,
      });

      setQuantity("");
      setTotal(0);
    } catch (err) {
      console.error(err);
      alert("Error selling product");
    }
  }

  return (
    <div>
      <h2>Sell Product</h2>

      {/* PICK CATEGORY */}
      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">-- Choose Category --</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* PICK PRODUCT */}
      <select
        onChange={(e) => {
          const product = products.find(
            (p) => p.id === parseInt(e.target.value)
          );
          setSelectedProduct(product);
          setQuantity("");
          setError("");
        }}
      >
        <option value="">-- Choose Product --</option>
        {products.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name} — Ksh {p.price} (Stock: {p.stock})
          </option>
        ))}
      </select>

      {selectedProduct && (
        <p>
          <b>Available Stock:</b> {selectedProduct.stock}
        </p>
      )}

      <input
        placeholder="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {selectedProduct && quantity && !error && (
        <p>
          <b>Total Price:</b> Ksh {total}
        </p>
      )}

      <button onClick={sell}>Sell</button>
    </div>
  );
}
