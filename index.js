require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Product = require("./model/product.model");

app.use(express.json());

app.post("/api/product", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDb!"))
  .catch(() => console.log("Not connected to MongoDb!"));

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
