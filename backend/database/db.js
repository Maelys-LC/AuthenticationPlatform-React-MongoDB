const mongoose = require("mongoose")

let connection = mongoose.connect("mongodb://localhost/AuthenticationReact", {useNewUrlParser: true, useUnifiedTopology: true});


// connection.connect()

module.exports = connection
