const express = require("express")

const User = require("../model/user.model")

const transporter = require("../config/email")

const router = express.Router()

router.post("", async(req, res) => {
    try {
        await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>"


        })
        return res.status(201).send("sucessful")
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

router.get("/", async(req, res) => {
    try {
        const page = req.query.page || 1
        const pagesize = req.query.pagesize || 10
        const skip = (page - 1) * pagesize
        const user = await User.find().skip(skip).limit(pagesize).lean().exec()
        const totalpage = Math.ceil((await User.find().countDocuments()) / pagesize)
        return res.status(201).send({ user, totalpage })
    } catch (err) {
        return res.status(500).send(err.message)
    }
})
module.exports = router;