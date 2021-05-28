require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const auth = require("./auth");
const products = require("./products");
const orders = require("./orders");
const port = process.env.PORT || 9000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/auth", auth);
app.use("/products", products);
app.use("/orders", orders);

app.get("/", (req, res) => {
  res.status(200).json({ message: "home" });
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "Resource Not Found" });
});

app.listen(port, () => {
  console.log("server is running");
});
