const mongoose = require("mongoose");

const connect = () => {
    return mongoose.connect("mongodb+srv://Shawon1997:jaya1997@cluster0.4qkrr.mongodb.net/product")
}

module.exports = connect;