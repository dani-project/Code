const express = require("express");
const router = express.Router();
const pfuncController = require("../controllers/pfuncController.js");

//==============================================================//
//                    Feature Routes                        //
//==============================================================//

// GET /api/pfunc
router.get("/", pfuncController.readAllParentFunctionalities);
// GET /api/pfunc/id
router.get("/:pfunc_id", pfuncController.readParentFunctionalityById);
// POST /api/pfunc
router.post("/", pfuncController.createParentFunctionality);
// PUT /api/pfunc/id
router.put("/:pfunc_id", pfuncController.updateParentFunctionalityById);
// DELETE /api/pfunc/id
router.delete("/:pfunc_id", pfuncController.deleteParentFunctionalityById);


module.exports = router;
