const { createClient } = require("redis")
const client = createClient();

client.on("error", (err) => {
    console.error(err.message)
})

module.exports = client;