/*
Automatically update stock
Record stock movement
*/
const express = require("express");
const orderRouter = express.Router();

const {
  addOrder,
  getOrders,
  getOrderDetails,
  deleteOrder,
  getSupplierOrders,
} = require("../controllers/order.controller");

orderRouter.get("/", getOrders);
orderRouter.get("/app-detailed-order/:id", getOrderDetails);
orderRouter.post("/", addOrder);
orderRouter.delete("/app-detailed-order/:id", deleteOrder);

orderRouter.get("/supplier/:supplierId", getSupplierOrders);
module.exports = orderRouter;
