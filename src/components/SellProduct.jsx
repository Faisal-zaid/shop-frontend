import { useState } from "react";
import { api } from "../api/api";

export default function SellProduct() {
  const [product_id, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [user_id] = useState(1); // temp
  
  const sell = async () => {
    await api.post("/Order", {
      product_id: parseInt(product_id),
      user_id,
      quantity: parseInt(quantity),
    });
    alert("Product sold!");
  };

  return (
    <div>
      <h2>Sell Product</h2>
      <input placeholder="Product ID" onChange={(e) => setProduct(e.target.value)} />
      <input placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)} />
      <button onClick={sell}>Sell</button>
    </div>
  );
}
