const express = require('express');

// * wizController , imported from controller file
// * will provide all the callback handler of the routes
const wizController = require('./../controller/wizController');

const router = express.Router();    // * Router middleware provided by express

router.param("id", wizController.checkId);  // * Param middleware, applied only where id is passed in request


// * ======== Routes =============
router.get("/", wizController.getAllData);

router.get("/:name", wizController.getWizard);

router.post("/", wizController.checkBody, wizController.createWizard);

router.patch("/:id/:alive", wizController.updateWizard);

router.delete("/:id", wizController.deleteWizard);



module.exports = router;