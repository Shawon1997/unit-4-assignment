const app = require("./index")

const connect = require("./config/db")

const batchControler = require("./controler/batch.controler")
const evaluationControler = require("./controler/evaluation.controler")
const studentControler = require("./controler/student.controler")
const submissionControler = require("./controler/submission.controler")
const userControler = require("./controler/user.controler")


app.use("/batch", batchControler)
app.use("/evaluation", evaluationControler)
app.use("/student", studentControler)
app.use("/submission", submissionControler)
app.use("/users", userControler)
app.listen(3999, async() => {
    try {
        await connect()
        console.log("i connected with you and server")
    } catch (err) {
        console.log(err.message)
    }
})