const express = require("express");
const stockRouter = express.Router();
const {getStock,addStock,updateStock,deleteStock,getStockId} = require("../controller/stock.controller");

//route
stockRouter.post("/", addStock);
stockRouter.get("/", getStock);
stockRouter.get("/:id", getStockId);
stockRouter.put("/:id", updateStock);
stockRouter.delete("/:id", deleteStock);


module.exports = { stockRouter };
