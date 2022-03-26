const express = require("express")
const router = express.Router()

const Evaluation = require("../model/evaluation.model")

router.post("", async(req, res) => {
    try {
        const evaluation = await Evaluation.create(req.body)
        return res.status(201).send(evaluation);
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

router.get("/:id", async(req, res) => {
    try {

        const evaluation = await Evaluation.findById(req.params.id).lean().exec()
        return res.status(200).send(evaluation)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})
router.get("", async(req, res) => {
    try {

        const evaluation = await Evaluation.find().lean().exec()
        return res.status(200).send(evaluation)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

module.exports = router;