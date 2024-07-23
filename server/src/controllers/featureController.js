const featureModel = require("../models/featureModel");

//==============================================================//
//                    Feature Controller                        //
//==============================================================//

// Controller to check feature by id
module.exports.chkFeatureExists = async (req, res) => {
    const { feature_id } = req.params;
    if (!feature_id) {
        res.status(400).json({ message: "feature_id is undefined." });
        return;
    }
    try {
        const feature = await pfuncModel.getFeatureById(pfunc_id);
        if (!feature) {
            res.status(404).json({ message: "No feature found" });
        } else {
            next();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Controller to get all features
module.exports.readAllFeatures = async (req, res) => {
    try {
        const features = await featureModel.getAllFeatures();
        if (features.length === 0) {
            res.status(404).json({ message: "No feature found" });
        } else {
            res.status(200).json(features);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to get feature by id
module.exports.readFeatureById = async (req, res) => {
    const { feature_id } = req.params;
    try {
        const feature = await featureModel.getFeatureById(feature_id);
        if (!feature) {
            res.status(404).json({ message: "No feature found" });
        } else {
            res.status(200).json(feature);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to get create new feature
module.exports.createFeature = async (req, res) => {
    const { feature_name } = req.body;
    if (!feature_name || feature_name.trim() === "") {
        res.status(400).json({ message: "feature_name is undefined." });
        return;
    }
    try {
        const newFeature = await featureModel.createFeature(feature_name);
        res.status(201).json(newFeature);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to update feature by id
module.exports.updateFeatureById = async (req, res) => {
    const { feature_id } = req.params;
    const { feature_name } = req.body;
    if (!feature_name || feature_name.trim() === "") {
        res.status(400).json({ message: "feature_name is undefined." });
        return;
    }
    try {
        const updatedFeature = await featureModel.updateFeature(feature_id, feature_name);
        res.status(200).json(updatedFeature);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to delete feature by id
module.exports.deleteFeatureById = async (req, res) => {
    const { feature_id } = req.params;
    try {
        await featureModel.deleteFeatureById(feature_id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
