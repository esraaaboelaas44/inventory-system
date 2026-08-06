const express = require("express");
const stockRouter = express.Router();
const {getStock,getLowStockProducts,deleteStock} = require("../controllers/stock.controller");
const { protect, authorize } = require('../middleware/auth');

//route
stockRouter.get("/",protect, authorize("admin","manager"),getStock);
stockRouter.get("/low",protect, authorize("admin","manager"), getLowStockProducts);  
stockRouter.delete("/:id",protect, authorize("admin","manager"), deleteStock);  
 

module.exports = { stockRouter };

