const mongoose = require("mongoose")


const productSchemas = new mongoose.Schema({
    productName: { type: String, required: true },
    productdetail: { type: String, required: true },
    mfgDate: { type: Date, required: true },
    exeDate: { type: Date, required: true }
})

module.exports = mongoose.model("product", productSchemas)