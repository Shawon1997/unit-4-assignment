require("dotenv").config();

const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) return reject(err)

            return resolve(decoded)
        });
    })

}


const auth = async(req, res, next) => {
    if (!req.headers.authorization) {
        return res.send("Authorization token not fund")
    }
    if (!req.headers.authorization.startsWith("Bearer "))
        return res.status(400).send("Authorization token not found or incorrect")



    const token = req.headers.authorization.trim().split(" ")[1]

    let decoded;
    try {
        decoded = await verifyToken(token)
    } catch (err) {
        console.log(err)
        return res.status(400).send("Authorization token not found or incorrect")
    }

    req.user = decoded.user;

    return next();
};



module.exports = auth