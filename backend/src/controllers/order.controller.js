// Automatically update stock
// Record stock movement

const orderModel = require("../models/order.model");
const getOrders = (req, res) => {
  orderModel
    .find()
    .then((orders) => {
      res.status(200).json({
        msg: "Got all orders successfully",
        data: orders,
      });
    })
    .catch((err) => {
      console.log(err);
      console.err(err);
      res.status(500).json({
        msg: "Can't find all orders",
        data: err.message,
      });
    });
};

const addOrder = (req, res) => {
  const jsData = req.body;
  console.log(jsData);

  orderModel
    .create(jsData)
    .then(() => {
      res.status(200).json({ msg: "order added successfully", data: jsData });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Error! Order not added.", data: err });
    });
};

const getOrderDetails = (req, res) => {
  const orderId = req.params.id;
  console.log("Order ID: ", orderId);

  orderModel
    .findById(orderId)
    .then((order) => {
      if (!order) {
        return res.status(404).json({ msg: "Order not found.", data: null });
      }
      res
        .status(200)
        .json({ msg: `found order details ${orderId}`, data: order });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Error fetching order details" });
    });
};
const deleteOrder = (req, res) => {
  const orderId = req.params.id;
  console.log(orderId);

  orderModel
    .findByIdAndDelete(orderId)
    .then((deletedOrder) => {
      if (!deletedOrder) {
        return res.status(404).json({ msg: "order not found.", data: null });
      }
      return res
        .status(200)
        .json({ msg: "Order deleted successfully!", data: deletedOrder });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error deleting order");
    });
};

const getSupplierOrders = (req, res) => {
  const supplierId = req.params.supplierId;
  console.log("Getting orders for supplier ID:", supplierId);

  orderModel
    .find({ supplier: supplierId })
    .populate("supplier", "name email")
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 })
    .then((orders) => {
      if (!orders || orders.length === 0) {
        return res.status(404).json({
          msg: "No orders found for this supplier",
          data: [],
        });
      }

      res.status(200).json({
        msg: `Found ${orders.length} orders for supplier`,
        data: orders,
      });
    })
    .catch((err) => {
      console.error("Error in getSupplierOrders:", err);
      res.status(500).json({
        msg: "Error fetching supplier orders",
        data: err.message,
      });
    });
};
module.exports = {
  getOrders,
  addOrder,
  getOrderDetails,
  deleteOrder,
  getSupplierOrders,
};
