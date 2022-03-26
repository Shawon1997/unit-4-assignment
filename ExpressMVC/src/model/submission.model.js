const mongoose = require("mongoose")

module.exports = new mongoose.Schema({
    evaluationId: { type: mongoose.Schema.Types.ObjectId, ref: "evaluation", required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "student", required: true },
    marks: { type: Number, required: true }

}, {
    timestamps: true,
    versionKey: false
})