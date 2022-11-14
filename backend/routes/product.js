const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const ApiFeatures = require("../utils/ApiFeatures");
const { auth, authRoles } = require("../middleware/auth");
//* create a new product - Admin
router
  .route("/admin/product/new")
  .post(auth, authRoles("admin"), async (req, res) => {
    try {
      req.body.user = req.user.id;
      const product = await Product.create(req.body);
      res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });

//* get all products
router.get("/products/", async (req, res) => {
  try {
    let resultPerPage = 20;
    const productCount = await Product.countDocuments();

    let apiFeatures = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    let products = await apiFeatures.query;
    let NewArrival = await Product.find().sort("-createdAt");
    //*this isn't useful for now because Product.find() searches for all the products in the database
    // const getProducts = await Product.find();
    res.status(200).json({
      products,
      productCount,
      resultPerPage,
      NewArrival,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//*get single  product details by id
router.get("/product/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json([product]);
  } catch (error) {
    res.status(500).send(error);
  }
});

//* search by post request later i will implement
// .post((req, res) => {
//   const payload = req.body.payload;
//   console.log(payload);
// });

//*update product by id
router.put("/admin/product/:id", auth, authRoles("admin"), async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product not found",
      });
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//*delete product by id
router.delete(
  "/admin/product/:id",
  auth,
  authRoles("admin"),
  async (req, res) => {
    try {
      let product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(500).json({
          success: false,
          message: "Product not found",
        });
      }
      await product.remove();
      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

//*get single  product details by id
router.get("/admin/product/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//*Create review
router.put("/review", auth, async (req, res) => {
  try {
    const { rating, comment, productId } = req.body;
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString()) {
          (rev.rating = rating), (rev.comment = comment);
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
    let avg = 0;
    product.reviews.forEach((rev) => {
      avg = avg + rev.rating;
    });
    product.ratings = (avg / product.reviews.length).toFixed(1);
    await product.save({
      validateBeforeSave: false,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//*get all reviews of a product
router.get("/reviews", async (req, res) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
  }
  const { reviews } = product;
  res.status(200).json({ success: true, reviews });
});

//*delete review of a product
router.delete("/reviews", auth, async (req, res) => {
  try {
    //* req.query.productId is equal to product id which you want to delete
    const product = await Product.findById(req.query.productId);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
    //* req.query.id is a product's review's id
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
    let avg = 0;
    reviews.forEach((rev) => {
      avg = avg + rev.rating;
    });
    const ratings = avg / reviews.length;
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
