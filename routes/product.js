const Product = require("../model/Product");
const {
  verfiyTokenAndAuthorization,
  verifyToken,
  verifyAdmin,
} = require("./verifyToken");

const router = require("express").Router();

router.post("/products/:id", verfiyTokenAndAuthorization, (req, res) => {
  res.status(200).json("it's good");
});

// Upload products to database
router.post("/uploadProducts", verifyAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    if (!newProduct) {
      return res.status(400).json("You have to be fill all the input");
    }
    console.log("saveProduct");
    const saveProduct = await newProduct.save();

    res.status(200).json(saveProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete Products
router.delete("/deleteProduct/:id", verifyAdmin, async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find product by id

router.get("/findUserProduct/:id", verifyToken, async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// findAllProduct
router.get("/findAllProduct", async (req, res) => {
  try {
    const allProduct = await Product.find();
    res.status(200).json(allProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
