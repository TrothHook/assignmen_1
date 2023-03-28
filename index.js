const express = require("express");
const mongoose = require("mongoose");

const Product = require("./schema");

mongoose
  .connect("mongodb://127.0.0.1:27017/productDB")
  .then(() => {
    console.log("connected to the database");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

app.use(express.json());


app.post("/", async (req, res) => {
  try {
    // console.log(req.body)
    const { productId, quantity, operation } = { ...req.body };
    const createProduct = await Product.create({
      productId,
      quantity,
      operation,
    });
    res.status(201).json({
      status: "success",
      data: createProduct,
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/:id", async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({
        status: "success",
        msg: 'deleted'
    })
  } catch (error) {
    res.status(400).json({
        status: "fail",
        msg: error.message
    })
  }
});

app.listen(4000, () => {
  console.log("server is running at port 4000");
});
