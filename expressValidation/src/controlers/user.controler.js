const express = require("express")
const { body, validationResult } = require("express-validator")
const User = require("../models/user.models")

const router = express.Router();
router.post("/", body("first_name").trim().not().isEmpty().withMessage("please check your first Name"), body("last_name").trim().not().isEmpty().withMessage("please check your last Name"), body("email").isEmail().custom(async(value) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) {
            return (true)
        }
        alert("You have entered an invalid email address!")
        return (false)

    }), body("pincode").not().isEmpty().withMessage("pin code required").custom((val) => {
        if ("^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$")
            return true;
        alert("you enter in valid pincode")
    }), body("age")
    .not()
    .isEmpty()
    .withMessage("Age cannot be empty")
    .isNumeric()
    .withMessage("Age must be a number between 1 and 120")
    .custom((val) => {
        if (val < 1 || val > 120) {
            throw new Error("Incorrect age provided");
        }
        return true;
    }),
    async(req, res) => {
        try {
            console.log(body("first_name"));
            const errors = validationResult(req);
            console.log({ errors });
            if (!errors.isEmpty()) {
                return res.status(400).send({ errors: errors.array() });
            }

            const user = await User.create(req.body);

            return res.status(201).send(user);
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }
    });
module.exports = router;