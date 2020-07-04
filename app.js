const fs = require('fs');
const express = require("express");


const app = express();
const port = 3000;

// * Read the data from file
const wizards = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/db.json`));


app.get("/api/v1/wizards", (req, res) => {

    res
        .status(200)
        .json({
            status: "success",
            results : wizards.length,
            data: {
                wizards: wizards
            }
        });
    
});


app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});