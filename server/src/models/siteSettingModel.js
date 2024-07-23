const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//to create new setting
module.exports.createNewSetting = async (data) => {
  try {
    const { siteId, funcId, isEnabled } = data;

    const site = await prisma.umSite.findUnique({
      where: { siteId },
    });
    if (!site) {
      throw new Error("Requested Site Not Found");
    }
    const func = await prisma.umFunctionalities.findUnique({
      where: { funcId },
    });
    if (!func) {
      throw new Error("Functionality Not Found");
    }

    const existingSetting = await prisma.umSiteSetting.findUnique({
      where: {
        funcId_siteId: {
          funcId: parseInt(funcId),
          siteId: parseInt(siteId),
        },
      },
    });
    if (existingSetting) {
      throw new Error("A site setting with this funcId and siteId already exists.");
    }

    const newSetting = await prisma.umSiteSetting.create({
      data: { siteId, funcId, isEnabled }
    });
    return newSetting;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

//to get all site setting
module.exports.getAllSiteSetting = async () => {
  const siteSettings = await prisma.$queryRaw`
  SELECT site_id, json_agg(json_build_object(
  'func_id', func_id,
  'is_enabled', is_enabled
  )) as settings
  FROM um_site_setting
  GROUP BY site_id
  ORDER BY site_id ASC;
`;
  return siteSettings;
}

//to get site setting by site_id
module.exports.getSiteSettingBySiteId = async (siteId) => {
  const site = await prisma.umSite.findUnique({
    where: { siteId },
  });
  if (!site) {
    throw new Error("Requested Site Not Found");
  }

  const siteSettings = await prisma.umSiteSetting.findMany({
    where: { siteId },
  });
  return siteSettings;
}

//to get site setting by site_id and func_id
module.exports.getSiteSettingBySiteIdFuncId = async (siteId, funcId) => {
  const site = await prisma.umSite.findUnique({
    where: { siteId },
  });
  if (!site) {
    throw new Error("Requested Site Not Found");
  }
  const func = await prisma.umFunctionalities.findUnique({
    where: { funcId },
  });
  if (!func) {
    throw new Error("Functionality Not Found");
  }

  const siteSettings = await prisma.umSiteSetting.findMany({
    where: {
      siteId: siteId,
      funcId: funcId,
    },
  });
  return siteSettings;
}

//to get site setting by func_id
module.exports.getSiteSettingByFuncId = async (funcId) => {
  const func = await prisma.umFunctionalities.findUnique({
    where: { funcId },
  });
  if (!func) {
    throw new Error("Functionality Not Found");
  }
  const siteSettings = await prisma.umSiteSetting.findMany({
    where: { funcId },
  });
  return siteSettings;
}

//to update isEnabled status of an API setting
module.exports.updateSiteSettingByIds = async (siteId, funcId, isEnabled) => {
  // const site = await prisma.umSite.findUnique({
  //   where: { siteId },
  // });
  // if (!site) {
  //   throw new Error("Requested Site Not Found");
  // }

  // const func = await prisma.umFunctionalities.findUnique({
  //   where: { funcId },
  // });
  // if (!func) {
  //   throw new Error("Functionality Not Found");
  // }

  // const existingSetting = await prisma.umSiteSetting.findUnique({
  //   where: {
  //     funcId_siteId: {
  //       funcId: parseInt(funcId),
  //       siteId: parseInt(siteId),
  //     },
  //   },
  // });
  // if (!existingSetting) {
  //   throw new Error("Site setting not found");
  // }

  // const updatedSetting = await prisma.umSiteSetting.update({
  //   where: {
  //     funcId_siteId: {
  //       funcId: parseInt(funcId),
  //       siteId: parseInt(siteId),
  //     },
  //   },
  //   data: { isEnabled },
  // });
  // return updatedSetting;

  try {
    await prisma.$executeRaw`
        CALL enable_functionality(${parseInt(siteId)}, ${parseInt(funcId)}, ${isEnabled});
    `;
    return { message: 'Site setting updated successfully' };
  } catch (error) {
    throw new Error(error.message);
  }
}

//to delete site setting by site_id and func_id
module.exports.deleteSiteSettingByIds = async (siteId, funcId) => {
  const site = await prisma.umSite.findUnique({
    where: { siteId },
  });
  if (!site) {
    throw new Error("Requested Site Not Found");
  }

  const func = await prisma.umFunctionalities.findUnique({
    where: { funcId },
  });
  if (!func) {
    throw new Error("Functionality Not Found");
  }

  const existingSetting = await prisma.umSiteSetting.findUnique({
    where: {
      funcId_siteId: {
        funcId: parseInt(funcId),
        siteId: parseInt(siteId),
      },
    },
  });
  if (!existingSetting) {
    throw new Error("Site setting not found");
  }

  await prisma.umSiteSetting.delete({
    where: {
      funcId_siteId: {
        funcId: parseInt(funcId),
        siteId: parseInt(siteId),
      },
    },
  });
  return { message: "Site Setting deleted successfully" };
}