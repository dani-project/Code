const express = require('express');
const router = express.Router();
const userRoute = require("./userRoute");

//==============================================================//
//                    Sample Main Routes                        //
//==============================================================//

// User Route
router.use("/users", userRoute);

module.exports = router;