const fs = require('fs');
const express = require("express");


const app = express();

const port = 3000;

app.use(express.json());            // middleware to parse req.body

// ? ==============================
// * Read the data from file
const wizards = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/db.json`));


// ? ==============================

// * GET METHOD / root , to fetch all the data
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

// ? =================================

app.post("/api/v1/wizards", (req, res) => {

    // const newId = wizards[wizards.length - 1] + 1;
    // const newWizard = Object.assign({id: newId}, req.body);

    console.log("body", req.body);

    wizards.push(req.body);         

    // ? write the udpated list of wizards in file

    fs.writeFile(`${__dirname}/dev-data/data/db.json`, JSON.stringify(wizards), () => {
        res.status(200).json({
            status: "success",
            data: {
                newMember: req.body
            }
        });
    });

});



app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});