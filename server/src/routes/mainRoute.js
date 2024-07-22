const express = require('express');
const router = express.Router();
const featureRoute = require("./featureRoute");
const pfuncRoute = require("./pfuncRoute");
const paymentRoute = require("./paymentRoute");
const functionalitiesRoute = require("./functionalitiesRoute");
const settingRoute = require("./siteSettingRoute");

//==============================================================//
//                    Main Routes                        //
//==============================================================//
// Feature Routes
router.use("/feature", featureRoute);
// Parent Functionalities Routes
router.use("/pfunc", pfuncRoute);
// Payment Routes
router.use("/payment", paymentRoute);
// Functionalities Routes
router.use("/functionalities", functionalitiesRoute);
// Site Setting Routes
router.use("/setting", settingRoute);

module.exports = router;