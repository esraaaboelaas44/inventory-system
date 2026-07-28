const express = require("express");
const SupplierRouter = express.Router();
const fr = require("fs");

const {
  getSupplier,
  addSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplier.controller");

//GET POST PUT DELETE
SupplierRouter.get("/", getSupplier);
SupplierRouter.post("/", addSupplier);
SupplierRouter.put("/", updateSupplier);
SupplierRouter.delete("/", deleteSupplier);

module.exports = { SupplierRouter };
