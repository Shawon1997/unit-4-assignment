const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "f96a48ec9ec629", // generated ethereal user
        pass: "5a91d141c1b5f3", // generated ethereal password
    },
});

module.exports = transporter;