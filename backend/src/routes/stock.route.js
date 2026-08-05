const express = require("express");
const stockRouter = express.Router();
const {getStock,getStockId,getLowStockProducts,getAdd,getRemove,getUpdate,findStock} = require("../controllers/stock.controller");
const { protect, authorize } = require('../middleware/auth');

//route
stockRouter.get("/",protect, authorize("admin","manager"),getStock);
stockRouter.get("/low",protect, authorize("admin","manager"), getLowStockProducts);   
stockRouter.get("/add",protect, authorize("admin","manager"), getAdd);
stockRouter.get("/update",protect, authorize("admin","manager"), getUpdate);
stockRouter.get("/remove",protect, authorize("admin","manager"), getRemove);
stockRouter.get("/find",protect, authorize("admin","manager"), findStock);
stockRouter.get("/:id",protect, authorize("admin","manager"), getStockId);


module.exports = { stockRouter };
