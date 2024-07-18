const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//==============================================================//
//                    Sample User Routes                        //
//==============================================================//

// GET /api/users
router.get("/", userController.readAllUsers);

module.exports = router;
