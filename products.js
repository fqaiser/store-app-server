const express = require("express");
const router = express.Router();
const verifyToken = require("./utils/verifyToken");
const db = require("./utils/db");

const getProducts = async (req, res) => {
  try {
    const products = await db.query("select * from `store_products`;", []);
    return res.status(200).json({ products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addProduct = async (req, res) => {
  const { name, description, imgUrl, price } = req.body;
  // add code for validation of data before storing it.
  try {
    await db.query(
      " INSERT INTO `store_products` " +
        "(`store_products_name`, `store_products_description`, `store_products_imageUrl`, `store_products_price`) " +
        "values (?, ?, ?, ?)",
      [name, description, imgUrl, price]
    );
    return res.status(201).json({ message: "Product Successfully Added" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  //add code for validation here
  try {
    const product = await db.query(
      "select * from `store_products` where `store_products_id` = ?;",
      [id]
    );

    return res.status(200).json({ product });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

router.get("/", getProducts);
router.post("/", verifyToken, addProduct);
router.get("/:id", getProduct);

router.all("*", (req, res) => {
  res.redirect("/other");
});

module.exports = router;
