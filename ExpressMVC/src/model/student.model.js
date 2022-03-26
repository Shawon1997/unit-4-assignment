const mongoose = require("mongoose")

module.exports = new mongoose.Schema({
    rollId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
    currentBatch: { type: String, required: true }

}, {
    timestamps: true,
    versionKey: false
})