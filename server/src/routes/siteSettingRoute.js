const express = require("express");
const router = express.Router();
const siteSettingController = require("../controllers/siteSettingController");

// "/site/setting"

router.post("/", siteSettingController.createNewSetting);
router.get("/", siteSettingController.getAllSiteSetting);
router.get("/:siteId", siteSettingController.getSiteSettingBySiteId);
router.get("/:siteId/func/:funcId", siteSettingController.getSiteSettingBySiteIdFuncId);
router.get("/func/:funcId", siteSettingController.getSiteSettingByFuncId);
router.put("/:siteId/func/:funcId", siteSettingController.updateSiteSettingByIds);
router.delete("/:siteId/func/:funcId", siteSettingController.deleteSiteSettingByIds);

module.exports = router;
