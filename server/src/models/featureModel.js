const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//==============================================================//
//                    Feature Model                         //
//==============================================================//

// Prima ORM query to get all features
module.exports.getAllFeatures = async () => {
    const features = await prisma.umFeature.findMany();
    return features;
};

// Prima ORM query to get feature by id
module.exports.getFeatureById = async (feature_id) => {
    const feature = await prisma.umFeature.findUnique({
        where: { featureId: parseInt(feature_id) },
    });
    return feature;
};

// Prima ORM query to create new feature
module.exports.createFeature = async (feature_name) => {
    const newFeature = await prisma.umFeature.create({
        data: { featureName: feature_name },
    });
    return newFeature;
};

// Prima ORM query to update feature by id
module.exports.updateFeature = async (feature_id, feature_name) => {
    const updatedFeature = await prisma.umFeature.update({
        where: { featureId: parseInt(feature_id) },
        data: { featureName: feature_name },
    });
    return updatedFeature;
};

// Prima ORM query to delete feature by id
module.exports.deleteFeatureById = async (feature_id) => {
    await prisma.umFeature.delete({
        where: { featureId: parseInt(feature_id) },
    });
};