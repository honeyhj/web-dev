const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    
    feature: Boolean,
    trend: Boolean,
  },
  { timestamps: true }
);

productSchema.index(
  {
    title: "text",
    description: "text",
  },
  {
    weights: {
      title: 5,
      description: 1,
    },
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = { Product };
