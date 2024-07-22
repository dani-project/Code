const express = require("express");
const router = express.Router();
const featureController = require("../controllers/featureController");

//==============================================================//
//                    Feature Routes                        //
//==============================================================//

// GET /api/feature
router.get("/", featureController.readAllFeatures);
// GET /api/feature/id
router.get("/:feature_id", featureController.readFeatureById);
// POST /api/feature
router.post("/", featureController.createFeature);
// PUT /api/feature/id
router.put("/:feature_id", featureController.updateFeatureById);
// DELETE /api/feature/id
router.delete("/:feature_id", featureController.deleteFeatureById);


module.exports = router;
