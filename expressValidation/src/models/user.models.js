const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    pincode: { type: Number, required: true },
    age: { type: Number, required: true },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        Default: "Male",
        required: true
    },
}, {
    versionKey: false,
    timeseries: true
});
module.exports = mongoose.model("user", userSchema);