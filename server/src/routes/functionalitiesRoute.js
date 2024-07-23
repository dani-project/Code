const express = require("express");
const router = express.Router();
const functionalitiesController = require("../controllers/functionalitiesController");

// "/site/functionalities"

router.post("/", functionalitiesController.createFunctionality);
router.get("/", functionalitiesController.getAllFunctionalities);
router.get("/:funcId", functionalitiesController.getFunctionalityById);
router.get("/pfunc/:pfuncId", functionalitiesController.chkPfuncExistsById, functionalitiesController.getFunctionalitiesByPfuncId);
router.get("/pfuncName/:pfuncName", functionalitiesController.getAllFunctionalitiesByPfuncName);
router.put("/:funcId", functionalitiesController.chkFunctionalityExistsById, functionalitiesController.updateFunctionality);
router.delete("/:funcId", functionalitiesController.chkFunctionalityExistsById, functionalitiesController.deleteFunctionality);

module.exports = router;
