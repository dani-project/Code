const express = require('express');
const router = express.Router();
const siteRoute = require("./siteRoute");
const featureRoute = require("./featureRoute");
const pfuncRoute = require("./pfuncRoute");
const paymentRoute = require("./paymentRoute");
const functionalitiesRoute = require("./functionalitiesRoute");
const reportRoute = require("./reportRoute");

//==============================================================//
//                    Main Routes                        //
//==============================================================//
// Feature Routes
router.use("/sites", siteRoute);
// Feature Routes
router.use("/feature", featureRoute);
// Parent Functionalities Routes
router.use("/pfunc", pfuncRoute);
// Payment Routes
router.use("/payment", paymentRoute);
// Functionalities Routes
router.use("/functionalities", functionalitiesRoute);
// Reports Routes
router.use("/reports", reportRoute);

module.exports = router;