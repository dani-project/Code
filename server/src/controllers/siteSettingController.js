const siteSettingModel = require("../models/siteSettingModel");

//middleware to check site exists by site_id
module.exports.chkSiteExistsById = async (req, res, next) => {
  try {
    const { siteId } = req.params;
    const site = await siteSettingModel.chkSiteBySiteId(parseInt(siteId));
    if (!site) {
      res.status(404).json({ message: "Requested Site Not Found" });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//middleware to check siteSetting exists by siteId_funcId
module.exports.chkSiteSettingExistsByIds = async (req, res, next) => {
  try {
    const { siteId, funcId } = req.params;
    const siteSetting = await siteSettingModel.chkSiteSettingByIds(parseInt(siteId), parseInt(funcId));
    if (!siteSetting) {
      res.status(404).json({ message: "Site setting not found" });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//to create new setting
module.exports.createNewSetting = async (req, res) => {
  try {
    const { siteId, funcId, isEnabled = true } = req.body;
    if (!siteId || !funcId) {
      return res.status(400).json({ message: "siteId and funcId is required" });
    }

    const newSetting = await siteSettingModel.createNewSetting({ siteId, funcId, isEnabled });
    res.status(201).json(newSetting);
  } catch (error) {
    if (error.message === "A site setting with this funcId and siteId already exists.") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

//to get all site setting
module.exports.getAllSiteSetting = async (req, res) => {
  try {
    const settings = await siteSettingModel.getAllSiteSetting();
    if (settings.length === 0) {
      res.status(404).json({ message: "No Setting Found" });
    } else {
      res.status(200).json(settings);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//to get site setting by site_id
module.exports.getSiteSettingBySiteId = async (req, res) => {
  try {
    const { siteId } = req.params;
    const siteSetting = await siteSettingModel.getSiteSettingBySiteId(parseInt(siteId));
    if (!siteSetting) {
      res.status(404).json({ message: "Site Setting Not Found" });
    } else {
      res.status(200).json(siteSetting);
    }
  } catch (error) {
    // if (error.message === "Requested Site Not Found") {
    //   res.status(404).json({ message: error.message });
    // } else {
      res.status(500).json({ message: error.message });
    //}
  }
};

//to get site setting by site_id and func_id
module.exports.getSiteSettingBySiteIdFuncId = async (req, res) => {
  try {
    const { siteId, funcId } = req.params;
    const siteSetting = await siteSettingModel.getSiteSettingBySiteIdFuncId(parseInt(siteId), parseInt(funcId));
    if (!siteSetting || siteSetting.length === 0) {
      res.status(404).json({ message: "Site Setting Not Found" });
    } else {
      res.status(200).json(siteSetting);
    }
  } catch (error) {
    // if (error.message === "Requested Site Not Found" || error.message === "Functionality Not Found") {
    //   res.status(404).json({ message: error.message });
    // } else {
      res.status(500).json({ message: error.message });
    //  }
  }
};

//to get site setting by func_id
module.exports.getSiteSettingByFuncId = async (req, res) => {
  try {
    const { funcId } = req.params;
    const siteSetting = await siteSettingModel.getSiteSettingByFuncId(parseInt(funcId));
    if (!siteSetting || siteSetting.length === 0) {
      res.status(404).json({ message: "Site Setting of requested Functionality Not Found" });
    } else {
      res.status(200).json(siteSetting);
    }
  } catch (error) {
    // if (error.message === "Functionality Not Found") {
    //   res.status(404).json({ message: error.message });
    // } else {
      res.status(500).json({ message: error.message });
    //}
  }
};

//to update isEnabled status of an API setting
module.exports.updateSiteSettingByIds = async (req, res) => {
  try {
    const { siteId, funcId } = req.params;
    const { isEnabled } = req.body;

    if (typeof isEnabled === 'undefined' ) {
      return res.status(400).json({ message: "isEnabled status is required" });
    }

    const updatedSiteSetting = await siteSettingModel.updateSiteSettingByIds(parseInt(siteId), parseInt(funcId), isEnabled);
    res.status(200).json(updatedSiteSetting);
  } catch (error) {
    // if (error.message === "Site setting not found") {
    //   res.status(404).json({ message: error.message });
    // } else {
      res.status(500).json({ message: error.message });
    //}
  }
};

//to delete site setting by site_id and func_id
module.exports.deleteSiteSettingByIds = async (req, res) => {
  try {
    const { siteId, funcId } = req.params;
    const result = await siteSettingModel.deleteSiteSettingByIds(parseInt(siteId), parseInt(funcId));
    res.status(200).json(result);
  } catch (error) {
    // if (error.message === "Site setting not found") {
    //   res.status(404).json({ message: error.message });
    // } else {
      res.status(500).json({ message: error.message });
    //}
  }
};