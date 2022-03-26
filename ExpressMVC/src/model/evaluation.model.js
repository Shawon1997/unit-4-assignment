const mongoose = require("mongoose")

module.exports = new mongoose.Schema({
    date_of_evaluation: { type: String, required: true },
    batchId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "batch" },
    instructor: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" }
}, {
    timestamps: true,
    versionKey: false
})