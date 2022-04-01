const express = require("express");
const router = express.Router();

const midleware = require("../middleware/auth")

const Product = require("../model/product");

const rolecheck = require("../middleware/check")

router.post("", midleware, async(req, res) => {

    req.body.user_id = req.user._id;

    try {
        const product = await Product.create(req.body)
        return res.send(product)
    } catch (err) {

        return res.status(400).send({ message: err.message })

    }
});


router.patch("/:id", midleware, rolecheck(["admin", "seller"]), async(req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.send(product)
    } catch (err) {
        return res.status(400).send({ message: err.message })

    }
});


router.delete("/:id", midleware, rolecheck(["admin", "seller"]), async(req, res) => {
    try {
        const product = await Product.findByIdAndDelete()
        return res.send(product)
    } catch (err) {
        return res.status(400).send({ message: err.message })

    }
});



router.get("", async(req, res) => {
    try {
        const product = await Product.find()
        return res.status(200).send(product)
    } catch (err) {
        return res.status(400).send({ message: err.message })
    }
})


module.exports = router;