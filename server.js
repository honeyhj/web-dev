const express = require("express");
const app = express();
const bp = require("body-parser");
const cor = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

// mongoose.connect("mongodb://localhost:27017/trippledev", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose
  .connect('mongodb+srv://amrfirstlearning:977amrfirstlearning977.@cluster0.qulux.mongodb.ne' +
    't/amrprsnldatabase?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
  .then(() => {
    console.log('database connected');
  });

app.use(bp.json());
app.use(cor());
app.use(require("./routes/users"));
app.use(require("./routes/product"));
app.use(require("./routes/menu"));
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("database connected");
});
app.use("/uploads", express.static("uploads"));

app.listen(7000, () => {
  console.log("server is running at 7000");
});