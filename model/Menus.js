const { Schema, model } = require("mongoose");

const Menus = new Schema({
  Type: {
    type: String,
  },
  CategoryName: {
    type: String,
    unique:true,
  },
  SubCategory: [
    {
      Name:{
        type: String,
        unique:true,
        dropDups:true,
      },
      topCategory:Boolean
    }
  ],
  topCategory:Boolean,
});
module.exports = model("Menus", Menus);
