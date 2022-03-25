const express = require("express");
const app = express();
app.use(express.json())
const productcontroler = require("./controlers/controler")
app.use("/products", productcontroler)
module.exports = app;