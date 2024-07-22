// Import Prisma Client
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get Site by ID
module.exports.getSiteByID = async (id) => {
    const site = await prisma.umSite.findUnique({
        where: { siteId: parseInt(id) }
    });

    return site;
}