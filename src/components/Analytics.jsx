import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function Analytics() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/Order").then((res) => setOrders(res.data));
  }, []);

  return (
    <div>
      <h2>Sales Analytics</h2>

      {orders.map((o) => (
        <div key={o.id}>
          Product {o.product_id} — Qty: {o.quantity} — Ksh {o.total_price}
        </div>
      ))}
    </div>
  );
}
