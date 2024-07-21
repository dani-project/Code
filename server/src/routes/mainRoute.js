const express = require('express');
const router = express.Router();

const paymentRoute = require("./paymentRoute");
const functionalitiesRoute = require("./functionalitiesRoute");

//==============================================================//
//                          Routes                              //
//==============================================================//

// Payment Routes
router.use("/payment", paymentRoute);
// Functionalities Routes
router.use("/functionalities", functionalitiesRoute);

module.exports = router;