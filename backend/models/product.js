const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, "Please enter a product name"],
    trim: true,
  },
  seller: {
    type: String,
    trim: true,
  },
  sellerRating: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "Please enter a product name"],
    trim: true,
  },
  description: [
    {
      key: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    },
  ],
  price: {
    type: Number,
    required: [true, "Please enter a product price"],
    maxLength: [8, "Price cannot be exceed 8 characters"],
  },
  mrp: {
    type: Number,
    maxLength: [8, "Price cannot be exceed 8 characters"],
  },
  discount: {
    type: Number,
    maxLength: [8, "Price cannot be exceed 3 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  sizes: [
    {
      size: { type: String, required: true },
    },
  ],
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter a product category"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter a stock quantity"],
    maxLength: [4, "stock cannot exceed 4 characters"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  isFeatured: {
    type:Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
