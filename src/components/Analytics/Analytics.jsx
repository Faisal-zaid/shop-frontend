import { useEffect, useState } from "react";

export default function Analytics() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [salesSummary, setSalesSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        // Fetch all orders
        const ordersResponse = await fetch("http://localhost:8000/Order");
        if (!ordersResponse.ok) throw new Error("Failed to fetch orders");
        const ordersData = await ordersResponse.json();

        // Fetch all products
        const productsResponse = await fetch("http://localhost:8000/Product");
        if (!productsResponse.ok) throw new Error("Failed to fetch products");
        const productsData = await productsResponse.json();

        setOrders(ordersData);
        setProducts(productsData);

        // Aggregate total quantity sold per product
        const salesByProduct = {};
        ordersData.forEach((order) => {
          if (!salesByProduct[order.product_id]) {
            salesByProduct[order.product_id] = 0;
          }
          salesByProduct[order.product_id] += order.quantity;
        });

        // Build analytics array with remaining stock
        const salesArray = Object.keys(salesByProduct).map((productId) => {
          const product = productsData.find(
            (p) => p.id === parseInt(productId)
          );

          const totalSold = salesByProduct[productId];

          return {
            product_id: productId,
            product_name: product ? product.name : "Unknown Product",
            total_quantity_sold: totalSold,
            remaining_stock: product ? product.stock : 0, // <-- CORRECT FIELD
          };
        });

        // Sort by highest sold
        salesArray.sort(
          (a, b) => b.total_quantity_sold - a.total_quantity_sold
        );

        setSalesSummary(salesArray);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="main">
    <div className="container">
      <h2>Sales Analytics (From Highest Sold to Lowest Sold)</h2>

      {loading && <div>Loading sales data...</div>}
      {error && <div>Error: {error}</div>}
      {!loading && salesSummary.length === 0 && <div>No sales yet.</div>}

      <ul>
        {salesSummary.map((product) => (
          <li key={product.product_id}>
            {product.product_name} — Sold: {product.total_quantity_sold} — 
            Remaining: {product.remaining_stock}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}
