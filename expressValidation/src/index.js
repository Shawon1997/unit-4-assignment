const express = require("express")
const usersController = require("./controlers/user.controler")
const app = express();

app.use(express.json());
app.use("/users", usersController);
module.exports = app;