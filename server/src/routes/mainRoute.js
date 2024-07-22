const express = require('express');
const router = express.Router();
const userRoute = require("./userRoute");
const featureRoute = require("./featureRoute");
const pfuncRoute = require("./pfuncRoute");
//==============================================================//
//                    Main Routes                        //
//==============================================================//

// Feature Routes
router.use("/feature", featureRoute);
// Parent Functionalities Routes
router.use("/pfunc", pfuncRoute);

module.exports = router;