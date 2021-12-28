const Order = require("../model/Order");
const {
  verifyToken,
  verifyAdmin,
  verfiyTokenAndAuthorization,
} = require("./verifyToken");

const router = require("express").Router();

// Make Order
router.post("/order", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  console.log(newOrder);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// findOrder for specific User
router.get("/findSingleOrder/:userId", verifyToken, async (req, res) => {
  console.log(req.params.userId);
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(403).json("You are not allowed");
  }
});

router.delete("/deleteOrder/:orderId", verifyToken, async (req, res) => {
  try {
    const orderId = { orderId: req.params.orderId };
    console.log(orderId);
    const deleteOrder = await Order.findByIdAndDelete(req.params.orderId);
    console.log(deleteOrder);
    res.status(200).json(deleteOrder);
  } catch (err) {
    res.status(403).json("You are not allowed");
  }
});

// get all order
router.get("/allOrder", verifyAdmin, async (req, res) => {
  try {
    const allOrder = await Order.find();
    res.status(200).json(allOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
