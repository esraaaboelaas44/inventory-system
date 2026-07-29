const express = require("express");
const stockRouter = express.Router();
const {getStock,addStock,updateStock,deleteStock} = require("../controller/stock.controller");

stockRouter.get("/", getStock);
stockRouter.put("/:id", updateStock);
stockRouter.delete("/:id", deleteStock);
stockRouter.post("/", addStock);

module.exports = { stockRouter };
