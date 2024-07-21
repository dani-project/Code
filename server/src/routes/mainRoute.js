const express = require('express');
const router = express.Router();

const paymentRoute = require("./paymentRoute");

//==============================================================//
//                          Routes                              //
//==============================================================//

// Payment Routes
router.use("/payment", paymentRoute);


module.exports = router;