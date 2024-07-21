const express = require('express');
const router = express.Router();
const functionalitiesRoute = require("./functionalitiesRoute");

//==============================================================//
//                    Sample Main Routes                        //
//==============================================================//

// Functionalities Route
router.use("/functionalities", functionalitiesRoute);

module.exports = router;