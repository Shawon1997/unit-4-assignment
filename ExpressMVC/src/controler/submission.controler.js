const express = require("express")
const router = express.Router()

const Submission = require("../model/submission.model")

router.post("", async(req, res) => {
    try {
        const submission = await Submission.create(req.body)
        return res.status(201).send(submission);
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

router.get("/:id", async(req, res) => {
    try {

        const submission = await Submission.findById(req.params.id).lean().exec()
        return res.status(200).send(submission)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})
router.get("", async(req, res) => {
    try {

        const submission = await Submission.find().populate({ path: "evaluation_id" }).lean().exec()

        let max_marks = 0;


        for (let i = 0; i < submission.length; i++) {
            if (submission[i].marks > max_marks) {
                max_marks = submission[i].marks

            }
        }
        return res.status(200).send(max_marks)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

module.exports = router;