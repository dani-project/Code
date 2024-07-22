const express = require('express');
const router = express.Router();

const paymentRoute = require("./paymentRoute");
const functionalitiesRoute = require("./functionalitiesRoute");
const settingRoute = require("./siteSettingRoute");

//==============================================================//
//                          Routes                              //
//==============================================================//

// Payment Routes
router.use("/payment", paymentRoute);
// Functionalities Routes
router.use("/functionalities", functionalitiesRoute);
// Site Setting Routes
router.use("/setting", settingRoute);

module.exports = router;