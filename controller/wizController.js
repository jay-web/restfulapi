const fs = require('fs');

// * Read the data from file
const wizards = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/db.json`));

//* ==========CALLBACKS==============

exports.getAllData =  (req, res) => {

    res
        .status(200)
        .json({
            status: "success",
            results : wizards.length,
            data: {
                wizards: wizards
            }
        });
    
};

exports.getWizard = (req, res) =>  {

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
}

exports.createWizard = (req, res) => {

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

}

exports.updateWizard = (req, res) => {
    console.log(req.params);

    if(req.params.id > wizards.length){             // * If id is greater than list.length
        res.status(404).json({
            status: "failed",
            message: "invalid id"
        })
        return;
    }

    const wiz = wizards.find((e) => {
        return e.id == req.params.id;
    });

    if(!wiz){                                       // * If id is not available
        res.status(404).json({
            status: "failed",
            message: "invalid id"
        })
        return;
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
}

exports.deleteWizard = (req, res) => {

    const requestId = req.params.id * 1;

    const UpdatedWiz = wizards.filter((e) => {
        return e.id !== requestId;
    });

    console.log(UpdatedWiz);

    if(!UpdatedWiz){
        res.status(404).json({
            status: "failed",
            message: "Invalid id"
        })
        return;
    }

    fs.writeFile(`${__dirname}/dev-data/data/db.json`, JSON.stringify(UpdatedWiz), () => {
        res.status(200).json({
            status: "Success",
            data: UpdatedWiz
        });
    } );
   
}
