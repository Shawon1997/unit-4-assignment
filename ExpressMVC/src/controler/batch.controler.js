const express = require("express")
const router = express.Router()

const User = require("../model/user.model")

router.post("", async(req, res) => {
    try {
        const batch = await User.create(req.body)
        return res.status(201).send(batch);
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

router.get("/:id", async(req, res) => {
    try {

        const batch = await User.findById(req.params.id).lean().exec()
        return res.status(200).send(batch)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

module.exports = router;