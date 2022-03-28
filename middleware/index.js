const express = require("express");
const app = express();

app.use(allBooks);

app.get("/books", (req, res) => {
    return res.send("fetching all books")
});

function allBooks(req, res, next) {
    console.log("fetching all books")
    next();
}

app.listen(5000, () => {
    console.log("i am in 5000");
});