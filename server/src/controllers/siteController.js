const siteModel = require("../models/siteModel");

//==============================================================//
//                    Sites Controller                          //
//==============================================================//

// Controller to create a new site
module.exports.createSite = async (req, res) => {
    const { siteName, siteDescription, siteApiKey, statusId } = req.body;
  
    if (!siteName || siteName.trim() === "") {
      res.status(400).json({ message: "siteName is undefined." });
      return;
    }
  
    try {
      const newSite = await siteModel.createSite({
        siteName,
        siteDescription,
        siteApiKey,
        statusId
      });
      res.status(201).json(newSite);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// Controller to read site by siteId  
module.exports.readSiteById = async (req, res) => {
  const { site_id } = req.params;

  if (!site_id) {
    res.status(400).json({ message: "site_id is required." });
    return;
  }

  try {
    const site = await siteModel.readSiteById(site_id);

    if (!site) {
      res.status(404).json({ message: "Site not found." });
      return;
    }

    res.status(200).json(site);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update site by siteId  
module.exports.updateSiteById = async (req, res) => {
    const { site_id } = req.params;
    const { siteName, siteDescription, siteApiKey, statusId } = req.body;
  
    if (!site_id) {
      res.status(400).json({ message: "site_id is required." });
      return;
    }
  
    if (!siteName || siteName.trim() === "") {
      res.status(400).json({ message: "siteName is required." });
      return;
    }
  
    try {
      const updatedSite = await siteModel.updateSiteById(site_id, {
        siteName,
        siteDescription,
        siteApiKey,
        statusId,
        updatedAt: new Date(), // Set updatedAt to current timestamp
      });
  
      if (!updatedSite) {
        res.status(404).json({ message: "Site not found." });
        return;
      }
  
      res.status(200).json(updatedSite);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

module.exports.softDeleteSiteById = async (req, res) => {
    const { site_id } = req.params;
  
    if (!site_id) {
      res.status(400).json({ message: "site_id is required." });
      return;
    }
  
    try {
      const updatedSite = await siteModel.softDeleteSiteById(site_id);
  
      if (!updatedSite) {
        res.status(404).json({ message: "Site not found." });
        return;
      }
  
      res.status(200).json({ message: "Site successfully marked as deleted." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

module.exports.updateSiteStatus = async (req, res) => {
    const { site_id } = req.params;
    const { statusId } = req.body;
  
    if (!site_id || !statusId) {
      res.status(400).json({ message: "site_id and statusId are required." });
      return;
    }
  
    try {
      const updatedSite = await siteModel.updateSiteStatusById(site_id, statusId);
  
      if (!updatedSite) {
        res.status(404).json({ message: "Site not found." });
        return;
      }
  
      res.status(200).json(updatedSite);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};