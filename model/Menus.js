const { Schema, model } = require("mongoose");

const Menus = new Schema({
  Type: {
    type: String,
  },
  CategoryName: String,
  SubCategory: Array,
  topCategory:Boolean,
});
module.exports = model("Menus", Menus);
