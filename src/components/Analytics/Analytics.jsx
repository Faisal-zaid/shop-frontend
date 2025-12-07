import { useEffect, useState } from "react";
import "./Analytics.css";

export default function Analytics() {
  const [salesSummary, setSalesSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        // Fetch products
        const productsRes = await fetch("http://localhost:8000/Product");
        if (!productsRes.ok) throw new Error("Failed to fetch products");
        const productsData = await productsRes.json();

        // Fetch categories
        const categoriesRes = await fetch("http://localhost:8000/Category");
        if (!categoriesRes.ok) throw new Error("Failed to fetch categories");
        const categoriesData = await categoriesRes.json();

        // Fetch orders
        const ordersRes = await fetch("http://localhost:8000/Order");
        if (!ordersRes.ok) throw new Error("Failed to fetch orders");
        const ordersData = await ordersRes.json();

        // Aggregate total quantity sold per product
        const salesByProduct = {};
        ordersData.forEach((order) => {
          const productId = Number(order.product_id);
          const quantity = Number(order.quantity);

          const productExists = productsData.some((p) => p.id === productId);
          if (!productExists) return;

          if (!salesByProduct[productId]) salesByProduct[productId] = 0;
          salesByProduct[productId] += quantity;
        });

        // Build analytics array for all products
        const salesArray = productsData.map((product) => {
          const totalSold = salesByProduct[Number(product.id)] || 0;
          const remainingStock = Number(product.stock) - totalSold;
          const category = categoriesData.find(c => c.id === product.category_id);

          return {
            product_id: product.id,
            product_name: product.name,
            category_name: category ? category.name : "Unknown",
            total_quantity_sold: totalSold,
            remaining_stock: remainingStock >= 0 ? remainingStock : 0,
          };
        });

        // Sort by highest sold
        salesArray.sort((a, b) => b.total_quantity_sold - a.total_quantity_sold);

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
        {!loading && salesSummary.length === 0 && <div>No products available.</div>}

        <ul>
          {salesSummary.map((product) => (
            <li key={product.product_id}>
              <div className="product-info">
                <span className="product-name">{product.product_name}</span>
                <span className="product-category">{product.category_name}</span>
              </div>
              <div className="product-stats">
                <span className="sold">Sold: {product.total_quantity_sold}</span>

                <span className="remaining">Remaining: {product.remaining_stock}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
