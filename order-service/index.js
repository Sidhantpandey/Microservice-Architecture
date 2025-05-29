// order-service/index.js
import express from "express";
import Communicator from "../communicator/index.js";

const app = express();
const PORT = process.env.PORT || 3003;

const communicator = new Communicator();

// Use mock data or DB in real apps
const orders = [
  { id: 1, user_id: 1, product_id: 2 },
  { id: 2, user_id: 2, product_id: 3 }
];

app.get('/api/orders', async (req, res) => {
  try {
    const users = await communicator.getUsers();
    const products = await communicator.getProducts();

    const detailedOrders = orders.map(order => {
      const user = users.users.find(u => u.id === order.user_id);
      const product = products.products.find(p => p.id === order.product_id);
      return { ...order, user, product };
    });

    res.json({ orders: detailedOrders });
  } catch (error) {
    console.log("ERROR:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Order Service is running on port ${PORT}`);
});
