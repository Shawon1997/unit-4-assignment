const express = require("express")

const connect = require("./configs/db")

const app = express();
//console.log("hey")
app.use(express.json())
const productController = require("../../AuthenticationAss/src/controlers/productcontroler")
    //const User = require("./models/user.model")

const userControlers = require("../../AuthenticationAss/src/controlers/user.controlers");
const { register, login } = require("../../AuthenticationAss/src/controlers/Auth.controlers")
const registers = require("../../AuthenticationAss/src/controlers/get")

app.use("users", userControlers)
app.post("/register", register)
app.get("/registers", registers)
app.post("/login", login)
app.use("/products", productController)

app.listen(5333, async() => {
        try {
            await connect();
            console.log("i am in port no 5333")
        } catch (err) {
            console.log(err)
        }
    })
    //yes