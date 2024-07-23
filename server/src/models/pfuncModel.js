const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//==============================================================//
//                    Parent Functionalities Model                         //
//==============================================================//

// Prima ORM query to get all parent functionalities
module.exports.getAllParentFunctionalities = async () => {
    const pfuncs = await prisma.umParentFunctionalities.findMany();
    return pfuncs;
};

// Prima ORM query to get parent functionality by id
module.exports.getParentFunctionalityById = async (pfunc_id) => {
    const pfunc = await prisma.umParentFunctionalities.findUnique({
        where: { pfuncId: parseInt(pfunc_id) },
    });
    return pfunc;
};

// Prima ORM query to create new parent functionality
module.exports.createParentFunctionality = async (pfunc_name) => {
    const newParentFunc = await prisma.umParentFunctionalities.create({
        data: { pfuncName: pfunc_name },
    });
    return newParentFunc;
};

// Prima ORM query to update parent functionality by id
module.exports.updateParentFunctionality = async (pfunc_id, pfunc_name) => {
    const updatedParentFunc = await prisma.umParentFunctionalities.update({
        where: { pfuncId: parseInt(pfunc_id) },
        data: { pfuncName: pfunc_name },
    });
    return updatedParentFunc;
};

// Prima ORM query to delete parent functionality by id
module.exports.deleteParentFunctionalityById = async (pfunc_id) => {
    await prisma.umParentFunctionalities.delete({
        where: { pfuncId: parseInt(pfunc_id) },
    });
};

// Prima ORM query to get parent functionality by id
module.exports.getALLParentFunctionalitiesByFeatureId = async (feature_id) => {
    const pfuncs = await prisma.umParentFunctionalities.findMany({
        where: { featureId: parseInt(feature_id) },
    });
    return pfuncs;
};