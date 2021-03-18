const express = require("express");
const {
  fetchOrders,
  fetchOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  fetchTotalSales,
  fetchOrdersCount,
  fetchUserOrders,
} = require("../controllers/orders");
const router = express.Router();

router.get(`/`, fetchOrders);

router.get(`/:id`, fetchOrder);

router.post("/", createOrder);

router.put("/:id", updateOrder);

router.delete("/:id", deleteOrder);

router.get("/get/totalsales", fetchTotalSales);

router.get(`/get/count`, fetchOrdersCount);

router.get(`/get/userorders/:userid`, fetchUserOrders);

module.exports = router;
