const mongoose = require("mongoose")

module.exports = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    type: {
        type: String,
        enum: ["student", "admin", "instructer"],
        required: true
    },
}, {
    timestamps: true,
    versionKey: false
})