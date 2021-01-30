require("dotenv").config();
const express = require("express");
const bookRoute = require("./api/book/book");
const authRoute = require("./api/auth/auth");
const categoryRoute = require("./api/category/category")
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var cors = require('cors')


const port = 7000;
var app = express();

//configure bodyparser to hande the post requests
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors())
// connect database
const mongo = mongoose.connect("mongodb://127.0.0.1:27017/newbie", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongo.then(
  () => {
    console.log("connected");
  },
  (error) => {
    console.log(error, "error");
  }
);

app.use("/api", bookRoute);
app.use("/api/category", categoryRoute);
app.use("", authRoute);

app.listen(port, function () {
  console.log(`Example index listening at http://localhost:${port}`);
});
