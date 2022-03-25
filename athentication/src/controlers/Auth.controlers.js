const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
require('dotenv').config()
const generateToken = (user) => {
    return jwt.sign({ user }, process.env.SECRET_KEY)
}
const register = async(req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })
            //checking email
        if (user) {
            return res.status(400).send("Email already register")
        }
        //if new user, creat it or allow to register
        user = await User.create(req.body);
        const token = generateToken(user)
        return ews.status(200).send({ user, token })

    } catch (err) {
        return res.status(500).send(err)
    }
}


const login = async(req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).send("Wrong email or Password")
        }
        //if email exit then che4ck the password
        const match = user.checkPassword(req.body.password)
        if (!match) {
            res.status(400).send("Wrong Email or Password")
        }
        //if it is match
        const token = generateToken(user)
        return res.status(200).send({ user, token })
    } catch (err) {
        return res.status(500).send(err.message)
    }
}

module.exports = { register, login }