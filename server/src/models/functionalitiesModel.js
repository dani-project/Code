// Import Prisma Client
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//to create new functionality
module.exports.createFunctionality = async (data) => {
  try {
    const newFunctionality = await prisma.umFunctionalities.create({
      data: {
        funcName: data.funcName,
        endpointUrl: data.endpointUrl,
        pfuncId: data.pfuncId
      }
    });
    return newFunctionality;
  } catch (error) {
    throw new Error(`Error creating functionality: ${error.message}`);
  }
};

//to get all functionalities
module.exports.getAllFunctionalities = async () => {
  const functionalities = await prisma.umFunctionalities.findMany();
  return functionalities;
}

//to get functionality by func_id 
//also used as a model for middleware - checking functionality exists
module.exports.getFunctionalityById = async (funcId) => {
  const functionality = await prisma.umFunctionalities.findUnique({
    where: { funcId },
  });
  return functionality;
}

//to get pfunc by pfunc_id >> to use in middleware - checking pfunc exists
module.exports.getPfuncByPfuncId = async (pfuncId) => {
  const pfunc = await prisma.umParentFunctionalities.findUnique({
    where: { pfuncId },
  });
  return pfunc;
}

//to get all functionalities by parent functionality id
module.exports.getFunctionalitiesByPfuncId = async (pfuncId) => {
  // const pfunc = await prisma.umParentFunctionalities.findUnique({
  //   where: { pfuncId },
  //   select: { pfuncId: true }
  // });

  // if (!pfunc) {
  //   throw new Error("Parent Functionality Not Found");
  // }

  const functionalities = await prisma.umFunctionalities.findMany({
    where: { pfuncId },
  });
  return functionalities;
}

//to get all functionalities by pfuncName
module.exports.getAllFunctionalitiesByPfuncName = async (pfuncName) => {
  const pfunc = await prisma.umParentFunctionalities.findFirst({
    where: { pfuncName: pfuncName },
    select: { pfuncId: true },
  });
  if (!pfunc) {
    throw new Error("Parent Functionality Not Found");
  }
  const functionalities = await prisma.umFunctionalities.findMany({
    where: { pfuncId: pfunc.pfuncId },
  });
  return functionalities;
}

//to update a functionality by funcId
module.exports.updateFunctionality = async (funcId, updateData) => {
  // const functionality = await prisma.umFunctionalities.findUnique({
  //   where: { funcId },
  // });
  // if (!functionality) {
  //   throw new Error("Functionality not found");
  // }

  const updatedFunctionality = await prisma.umFunctionalities.update({
    where: { funcId },
    data: updateData,
  });
  return updatedFunctionality;
};

//to delete a functionality by funcId
module.exports.deleteFunctionality = async (funcId) => {
  // const functionality = await prisma.umFunctionalities.findUnique({
  //   where: { funcId },
  // });
  // if (!functionality) {
  //   throw new Error("Functionality not found");
  // }

  await prisma.umFunctionalities.delete({
    where: { funcId },
  });
  return { message: "Functionality deleted successfully" };
};
