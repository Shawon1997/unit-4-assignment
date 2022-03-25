const express = require("express")
const router = express.Router()
const authenticate = require("../middileware/authenticate")
const User = require("../models/user.model")
router.post("", authenticate, async(req, res) => {
    req.body.user_id = req.userID;
    try {
        const user = await User.create(req.body)
        return res.status(200).send(user)
    } catch (err) {
        return res.status(400).send({ message: err.message })
    }
})


router.get("", async(req, res) => {

    try {
        const user = await User.find().lean().exec()
        return res.status(200).send(user)
    } catch (err) {
        return res.status(400).send({ message: err.message })
    }
})



router.patch("", authenticate, async(req, res) => {
    req.body.user_id = req.userID;
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).send(user)
    } catch (err) {
        return res.status(400).send({ message: err.message })
    }
})
module.exports = router;