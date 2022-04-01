const User = require("../model/user.model")
const jwt = require('jsonwebtoken');
require('dotenv').config()

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.SECRET_KEY)
}
const register = async(req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).send({ message: "Email already exists" })
        }


        user = await User.create(req.body);

        const token = generateToken(user)
        return res.status(200).send({ user, token });
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
}


const login = async(req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.status(400).send("Wrong Email or Password")
        }
        password;
        const match = user.checkPassword(req.body.password)
        return res.status(400).send({ message: "Wrong Email or Password" })



        const token = generateToken(user)
        return res.status(200).send({ user, token });


    } catch (err) {
        res.status(400).send({ message: err.message })
    }
}

module.exports = { register, login, generateToken }