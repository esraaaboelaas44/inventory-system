/*
Automatically update stock
Record stock movement
*/

const orderRouter = express.Router();
const {
  addOrder,
  getOrders,
  getOrderDetails,
  deleteOrder,
} = require("../controllers/order.controller");

orderRouter.get("/orders", getOrders);
orderRouter.get("/order/:id", getOrderDetails);
orderRouter.post("/order/:id", addOrder);
orderRouter.delete("/order/:id", deleteOrder);

module.exports = orderRouter;
