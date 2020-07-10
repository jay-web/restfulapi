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

// ? ================================

// * GET METHOD , to get the data as per search keyword

app.get("/api/v1/wizards/:name", (req, res) => {

    let keyword = req.params.name;
    let wiz = wizards.filter((e) => {
        return e.name.toLowerCase().includes(keyword.toLowerCase());
    });

    if(!wiz){
        return res.status(404).json({
            status: "failed",
            message: "No match found"
        })
    }
    res
        .status(200)
        .json({
            status: "success",
            data: {
                wizard: wiz
            }
        })
});

// ? =================================

app.post("/api/v1/wizards", (req, res) => {

    const newId = wizards.length + 1;              // * Just to create id for new object
    const newWizard = Object.assign({id: newId}, req.body);     // * Add new id with new data
    // console.log("body", req.body);

    wizards.push(newWizard);         

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

// ? ================================

app.patch("/api/v1/wizards/:id/:alive", (req, res) => {
    console.log(req.params);

    if(req.params.id > wizards.length){             // * If id is greater than list.length
        res.status(404).json({
            status: "failed",
            message: "invalid id"
        })
    }

    const wiz = wizards.find((e) => {
        return e.id == req.params.id;
    });

    if(!wiz){                                       // * If id is not available
        res.status(404).json({
            status: "failed",
            message: "invalid id"
        })
    }

    const updatedWiz = wizards.map((e) => {
         if(e.id == req.params.id){
                e.alive = req.params.alive;
        }
        return e; 
    });

    console.log(updatedWiz);

    fs.writeFile(`${__dirname}/dev-data/data/db.json`, JSON.stringify(updatedWiz), () => {
        res.status(200).json({
            status: "success",
            data: {
                wizards: wiz 
            }
        })
    })

    

  
});



app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});