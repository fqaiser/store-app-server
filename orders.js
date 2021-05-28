const express = require("express");
const router = express.Router();

const verifyToken = require("./utils/verifyToken");
const db = require("./utils/db");

const getOrders = async (req, res) => {
  //get any saved orders for the user in the db

  console.log("req orders userid", req.userId);
  try {
    const result = await db.query(
      "SELECT * FROM store_orders WHERE store_orders_user = ?;",
      [req.userId]
    );

    return res.status(200).json({ result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const saveOrder = async (req, res) => {
  const { product, quantity, amount } = req.body;
  const reference = `STORE-ORDER-${parseInt(
    Math.random() * 1000000000000,
    10
  )}`;

  //add code for validating the req.body here

  //save the orders to the database
  try {
    const result = await db.query(
      "INSERT INTO store_orders " +
        "(store_orders_product, store_orders_quantity, store_orders_reference, store_orders_amount, store_orders_user) " +
        "VALUES (?, ?, ?, ?, ?)",
      [product, quantity, reference, amount, req.userId]
    );

    return res.status(200).json({ message: "Order Saved" });
  } catch (err) {
    console.err(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

router.get("/", verifyToken, getOrders);
router.post("/", verifyToken, saveOrder);

module.exports = router;
