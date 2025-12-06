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

        // Convert aggregated data into an array with product information
        const salesArray = Object.keys(salesByProduct).map((productId) => {
          const product = productsData.find(
            (productItem) => productItem.id === parseInt(productId)
          );
          return {
            product_id: productId,
            product_name: product ? product.name : "Unknown Product",
            total_quantity_sold: salesByProduct[productId],
          };
        });

        // Sort products by total quantity sold, highest first
        salesArray.sort(
          (productA, productB) =>
            productB.total_quantity_sold - productA.total_quantity_sold
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
    <div style={{ padding: 20 }}>
      <h2>Sales Analytics (From Highest Sold to Lowest Sold)</h2>

      {loading && <div>Loading sales data...</div>}

      {error && <div style={{ color: "red" }}>Error: {error}</div>}

      {!loading && salesSummary.length === 0 && <div>No sales yet.</div>}

      {!loading && salesSummary.length > 0 && (
        <ul>
          {salesSummary.map((product) => (
            <li key={product.product_id} style={{ marginBottom: 8 }}>
              <strong>{product.product_name}</strong> — Total Quantity Sold:{" "}
              {product.total_quantity_sold}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
