const User = require("../models/user.model")
const register = async(req, res) => {
    try {
        const user = await User.find().lean().exec()
        res.send(user)
    } catch (err) {
        console.log(err)
    }
}
module.exports = register