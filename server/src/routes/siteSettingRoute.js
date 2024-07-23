const express = require("express");
const router = express.Router();
const siteSettingController = require("../controllers/siteSettingController");
const functionalitiesController = require("../controllers/functionalitiesController");

// "/site/setting"

router.post("/", siteSettingController.createNewSetting);
router.get("/", siteSettingController.getAllSiteSetting);

router.get("/:siteId", siteSettingController.chkSiteExistsById, siteSettingController.getSiteSettingBySiteId);
router.get("/:siteId/func/:funcId", siteSettingController.chkSiteExistsById, functionalitiesController.chkFunctionalityExistsById, siteSettingController.getSiteSettingBySiteIdFuncId);
router.get("/func/:funcId", functionalitiesController.chkFunctionalityExistsById, siteSettingController.getSiteSettingByFuncId);
//router.put("/:siteId/func/:funcId", siteSettingController.chkSiteExistsById, functionalitiesController.chkFunctionalityExistsById, siteSettingController.chkSiteSettingExistsByIds, siteSettingController.updateSiteSettingByIds);
router.delete("/:siteId/func/:funcId", siteSettingController.chkSiteExistsById, functionalitiesController.chkFunctionalityExistsById, siteSettingController.chkSiteSettingExistsByIds, siteSettingController.deleteSiteSettingByIds);

// PUT "api/:siteId/func/:funcId" to enable on/off functionalities
router.put("/:siteId/func/:funcId", siteSettingController.updateSiteSettingByIds);

module.exports = router;
