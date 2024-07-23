// Import Prisma Client
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//==============================================================//
//                    Sites Model                               //
//==============================================================//

// Get Site by ID
module.exports.getSiteByID = async (id) => {
    const site = await prisma.umSite.findUnique({
        where: { siteId: parseInt(id) }
    });

    return site;
}

// Prima ORM query to create new parent functionality
// !!!!!!!!! have not put who will own the site yet!!!!!!!!!
module.exports.createSite = async (siteData) => {
    const {
      siteName,
      siteDescription,
      siteApiKey,
      statusId
    } = siteData;
  
    const newSite = await prisma.umSite.create({
      data: {
        siteName,
        siteDescription,
        siteApiKey,
        statusId
      },
    });
  
    return newSite;
};

// Prima ORM query to read site by siteId
module.exports.readSiteById = async (siteId) => {
    const site = await prisma.umSite.findUnique({
      where: {
        siteId: parseInt(siteId, 10),
      },
    });
  
    return site;
};

module.exports.updateSiteById = async (siteId, siteData) => {
    const { siteName, siteDescription, siteApiKey, statusId, updatedAt } = siteData;
  
    const updatedSite = await prisma.umSite.update({
      where: {
        siteId: parseInt(siteId, 10),
      },
      data: {
        siteName,
        siteDescription,
        siteApiKey,
        statusId,
        updatedAt, // Set updatedAt to the current timestamp
      },
    });
  
    return updatedSite;
};


module.exports.softDeleteSiteById = async (siteId) => {
    // soft delete must retrieve from other teams
    const deletedStatusId = 2; // example status ID 
  
    const updatedSite = await prisma.umSite.update({
      where: {
        siteId: parseInt(siteId, 10),
      },
      data: {
        statusId: deletedStatusId,
        updatedAt: new Date(), 
      },
    });
  
    return updatedSite;
};

module.exports.updateSiteStatusById = async (siteId, statusId) => {
    const updatedSite = await prisma.umSite.update({
      where: {
        siteId: parseInt(siteId, 10),
      },
      data: {
        statusId,
        updatedAt: new Date(), // Ensure updatedAt reflects the current timestamp
      },
    });
  
    return updatedSite;
};