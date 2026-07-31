const { orderModel } = require("../models/order.model");

const getOrders = (req, res) => {
  orderModel.find().then((orders) => {
    res
      .status(200)
      .json({
        msg: "Got all orders successfully",
        data: orders,
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Can't find all orders");
      });
  });
};

const addOrder = (req, res) => {};
// const getOrderDetails
// const deleteOrder
