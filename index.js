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
    const products = req.body;
    let data = {};

    const checkIfData = await Product.findOne({});

    if (!checkIfData) {
      const createProduct = new Product({ products });
      data = await createProduct.save();
    } else {
      checkIfData.products.push(...req.body);
      data = await checkIfData.save();
    }

    return res.status(201).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      msg: error,
    });
  }
});

app.delete("/:id/:productId", async (req, res) => {
  try {
    // await Product.deleteOne({ _id: req.params.id });

    if (!req.params.id) {
      return res.status(400).json({
        status: "fail",
        msg: "please input the correct Id",
      });
    }
    const data = await Product.findOne({ _id: req.params.id });

    if (!data) {
      return res.status(404).json({
        status: "fail",
        msg: "No data not found with this Id!",
      });
    }

    if (!req.params.productId) {
      return res.status(400).json({
        status: "fail",
        msg: "please enter the Id of the product to be deleted",
      });
    }

    const dataToBeDeleted = data.products.find(
      (item) => item.productId === Number(req.params.productId)
    );

    if(!dataToBeDeleted){
      return res.status(400).json({
        status:'fail',
        msg: 'please enter a valid product Id'
      })
    }

    const index = data.products.indexOf(dataToBeDeleted);

    data.products.splice(index, 1);

    await data.save();

    return res.status(200).json({
      status: "success",
      msg: "deleted",
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      msg: error,
    });
  }
});

app.listen(4000, () => {
  console.log("server is running at http://localhost:4000");
});
