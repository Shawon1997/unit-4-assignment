const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport")
const { v4: uuidv4 } = require('uuid');

const User = require("../model/user.model")

require("dotenv").config()

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback",
        passReqToCallback: true
    },
    async function(resquest, accessToken, refreshToken, profile, cb) {
        const email = profile ? _json ? email



        let user = await User.findOne({ email: email }).lean().exec()

        if (!user) {
            user = await User.create({
                email: email,
                password: uuidv4(),
                role: ["customer"]
            })
        }

        console.log(user)
        return cb(null, user);
    }
));

module.exports = passport;