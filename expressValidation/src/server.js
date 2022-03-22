const app = require("./index")
const connect = require("./config/db")


app.listen(2222, async() => {
    try {
        await connect();
        console.log("i am in port no 2222")
    } catch (err) {
        console.log(err)
    }
});