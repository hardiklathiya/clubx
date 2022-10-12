const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const Product = require("../models/product");
const { auth, authRoles } = require("../middleware/auth");

//*Create new Order
router.post("/order/new", auth, async (req, res) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({ success: true, order });
});

//*get single order details
router.get("/order/:id", auth, authRoles("admin"), async (req, res) => {
  try {
    //*here populate method goes to user model and fetch the matching name and email address of user id
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) {
      res.status(404).json({ success: false, message: "Order not found." });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//*logged in user's orders
router.get("/orders/me", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//*get all orders --admin
router.get("/admin/orders", auth, authRoles("admin"), async (req, res) => {
  try {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
    res.status(200).json({ success: true, orders, totalAmount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//*update order status --admin
router.put(
  "/admin/order/status/:id",
  auth,
  authRoles("admin"),
  async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        res.status(404).json({ success: false, message: "Order not found." });
      }
      if (order.orderStatus === "Delivered") {
        res
          .status(404)
          .json({ message: "You have already delivered this order" });
      }

      order.orderItems.forEach(async (item) => {
        await updateStock(item.product, item.quantity);
      });
      console.log(order.orderItems);
      order.orderStatus = req.body.status;
      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
      }
      await order.save({ validateBeforeSave: false });
      res.status(200).json({ success: true, order });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);
async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

//* delete the order
router.delete("/admin/order/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);
  await order.remove();
  res.status(200).json({ success: true });
});

module.exports = router;
