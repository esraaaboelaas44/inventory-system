const express = require("express");
const stockRouter = express.Router();
const {getStock,getStockId} = require("../controllers/stock.controller");
const { protect, authorize } = require('../middleware/auth');

//route
// stockRouter.post("/", addStock);
stockRouter.get("/",protect, authorize('admin'), getStock);
stockRouter.get("/:id",protect, authorize('admin'), getStockId);
// stockRouter.put("/:id", updateStock);
// stockRouter.delete("/:id", deleteStock);
// stockRouter.delete("/", deleteAllStock);


module.exports = { stockRouter };
