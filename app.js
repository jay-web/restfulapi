const express = require("express");

const app = express();

const wizRoutes = require("./routes/wizRoutes");


app.use(express.json());            //  * middleware to parse req.body


// * wizRoutes is the middleware imported at line 5
// * it will handle all the routes which render at "/api/v1/wizards"

app.use("/api/v1/wizards", wizRoutes);



module.exports = app;      