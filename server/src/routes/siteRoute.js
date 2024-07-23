const express = require("express");
const router = express.Router();
const siteController = require("../controllers/siteController.js");

//==============================================================//
//                    Sites Routes                              //
//==============================================================//
// GET /api/sites
// POST /api/sites
router.route("/")
  .post(siteController.createSite);

// GET /api/sites/:site_id
// PUT /api/sites/:site_id
// DELETE /api/sites/:site_id
router.route("/:site_id")
  .get(siteController.readSiteById)
  .put(siteController.updateSiteById)
  .delete(siteController.softDeleteSiteById);

// PUT /api/sites/:site_id/status  
router.route("/:site_id/status")
  .put(siteController.updateSiteStatus);

module.exports = router;
