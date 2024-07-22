const pfuncModel = require("../models/pfuncModel");

//==============================================================//
//                    Parent Functionalities Controller                    //
//==============================================================//

// Controller to get all parent functionalities
module.exports.readAllParentFunctionalities = async (req, res) => {
    try {
        const pfuncs = await pfuncModel.getAllParentFunctionalities();
        if (pfuncs.length === 0) {
            res.status(404).json({ message: "No parent functionality found" });
        } else {
            res.status(200).json(pfuncs);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to get parent functionality by id
module.exports.readParentFunctionalityById = async (req, res) => {
    const { pfunc_id } = req.params;
    try {
        const pfunc = await pfuncModel.getParentFunctionalityById(pfunc_id);
        if (!pfunc) {
            res.status(404).json({ message: "No parent functionality found" });
        } else {
            res.status(200).json(pfunc);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to get create new parent functionality
module.exports.createParentFunctionality = async (req, res) => {
    const { pfunc_name } = req.body;
    if (!pfunc_name || pfunc_name.trim() === "") {
        res.status(400).json({ message: "pfunc_name is undefined." });
        return;
    }
    try {
        const newParentFunc = await pfuncModel.createParentFunctionality(pfunc_name);
        res.status(201).json(newParentFunc);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to update parent functionality by id
module.exports.updateParentFunctionalityById = async (req, res) => {
    const { pfunc_id } = req.params;
    const { pfunc_name } = req.body;
    if (!pfunc_id) {
        res.status(400).json({ message: "pfunc_id is undefined." });
        return;
    }
    else if (!pfunc_name || pfunc_name.trim() === "") {
        res.status(400).json({ message: "pfunc_name is undefined." });
        return;
    }
    try {
        const updatedParentFunc = await pfuncModel.updateParentFunctionality(pfunc_id, pfunc_name);
        res.status(200).json(updatedParentFunc);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to delete parent functionality by id
module.exports.deleteParentFunctionalityById = async (req, res) => {
    const { pfunc_id } = req.params;
    if (!pfunc_id) {
        res.status(400).json({ message: "pfunc_id is undefined." });
        return;
    }
    try {
        await pfuncModel.deleteParentFunctionalityById(pfunc_id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
