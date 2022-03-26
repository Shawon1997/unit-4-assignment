const mongoose = require("mongoose")

module.exports = new mongoose.Schema({
    Batch_name: { type: String, required: true }

}, {
    timestamps: true,
    versionKey: false
})