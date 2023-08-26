const express = require("express");
const router = express.Router();
const Product = require("../models/productModel.js");

router.get("/", (req, res) => {
    Musical.find({})
      .then((products) => {
        return res.end(JSON.stringify(products));
      })
      .catch((e) => {
        console.log(e);
        res.end();
      });
  });
  
  module.exports = router;