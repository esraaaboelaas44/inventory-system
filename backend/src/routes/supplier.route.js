const express = require("express");
const SupplierRouter = express.Router();

const {
  getSupplier,
  addSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplier.controller");

//GET POST PUT DELETE
SupplierRouter.get("/", getSupplier);
SupplierRouter.post("/", addSupplier);
SupplierRouter.put("/:id", updateSupplier);
SupplierRouter.delete("/:id", deleteSupplier);

//View supplier products and orders
// SupplierRouter.get("/", getSupplierProducts);

module.exports = SupplierRouter;
