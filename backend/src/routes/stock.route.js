const express = require("express");
const stockRouter = express.Router();
const {getStock,getStockId,getLowStockProducts,getAdd,getRemove,getUpdate,findStock} = require("../controllers/stock.controller");
const { protect, authorize } = require('../middleware/auth');

//route
stockRouter.get("/",protect, authorize("Admin","Manager"),getStock);
stockRouter.get("/:id",protect, authorize("Admin","Manager"), getStockId);
stockRouter.get("/low",protect, authorize("Admin","Manager"), getLowStockProducts);   
stockRouter.get("/add",protect, authorize("Admin","Manager"), getAdd);
stockRouter.get("/update",protect, authorize("Admin","Manager"), getUpdate);
stockRouter.get("/remove",protect, authorize("Admin","Manager"), getRemove);
stockRouter.get("/find",protect, authorize("Admin","Manager"), findStock);


module.exports = { stockRouter };
