const express = require("express");
const router = express.Router();
const functionalitiesController = require("../controllers/functionalitiesController");

// "/site"
router.post("/", functionalitiesController.createFunctionality);
router.get("/", functionalitiesController.getAllFunctionalities);
router.get("/:funcId", functionalitiesController.getFunctionalityById);
router.get("/pfunc/:pfuncId", functionalitiesController.getFunctionalitiesByPfuncId);
router.get("/pfuncName/:pfuncName", functionalitiesController.getAllFunctionalitiesByPfuncName);
router.put("/:funcId", functionalitiesController.updateFunctionality);
router.delete("/:funcId", functionalitiesController.deleteFunctionality);

module.exports = router;
