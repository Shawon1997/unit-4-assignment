const app = require("./index.js");

const connect = require("./config/db.js")
const userController = require("./controler/user.controler");

const { register, login, generateToken } = require("./controler/auth.controler")

const productController = require("./controler/product.controler")

const passport = require("./config/google")


app.use("/users", userController)

app.post("/register", register)

app.post("/login", login)

app.use("/products", productController)

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));


app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),

    function(req, res) {
        const token = generateToken(req.user)
        return res.status(200).send({ user: req.user, token })
    }
)

app.listen(4999, async() => {
    try {
        await connect();
        console.log("i am ready to go in port no 4999")
    } catch (err) {
        console.error(err.message)
    }
});