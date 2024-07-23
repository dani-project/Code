const functionalitiesModel = require("../models/functionalitiesModel");

//middleware to check functionality exists by func_id
module.exports.chkFunctionalityExistsById = async (req, res, next) => {
  try {
    const { funcId } = req.params;
    const functionality = await functionalitiesModel.getFunctionalityById(parseInt(funcId));
    if (!functionality) {
      res.status(404).json({ message: "Functionality Not Exists" });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//middleware to check pfunc exists by pfunc_id
module.exports.chkPfuncExistsById = async (req, res, next) => {
  try {
    const { pfuncId } = req.params;
    const pfunc = await functionalitiesModel.getPfuncByPfuncId(parseInt(pfuncId));
    if (!pfunc) {
      res.status(404).json({ message: "Parent Functionality Not Exists" });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//to create new functionality
module.exports.createFunctionality = async (req, res) => {
  try {
    const { funcName, endpointUrl, pfuncId } = req.body;
    if (!funcName || !endpointUrl) {
      return res.status(400).json({ message: "funcName and endpointUrl Required!" });
    }

    const newFunctionality = await functionalitiesModel.createFunctionality({
      funcName,
      endpointUrl,
      pfuncId
    });

    res.status(201).json(newFunctionality);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//to get all functionalities
module.exports.getAllFunctionalities = async (req, res) => {
  try {
    const functionalities = await functionalitiesModel.getAllFunctionalities();
    if (functionalities.length === 0) {
      res.status(404).json({ message: "No Functionality Found" });
    } else {
      res.status(200).json(functionalities);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//to get functionality by func_id
module.exports.getFunctionalityById = async (req, res) => {
  try {
    const { funcId } = req.params;
    const functionality = await functionalitiesModel.getFunctionalityById(parseInt(funcId));
    if (!functionality) {
      res.status(404).json({ message: "Functionality Not Found" });
    } else {
      res.status(200).json(functionality);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//to get all functionalities by parent functionality id
module.exports.getFunctionalitiesByPfuncId = async (req, res) => {
  try {
    const { pfuncId } = req.params;
    const functionalities = await functionalitiesModel.getFunctionalitiesByPfuncId(parseInt(pfuncId));
    if (functionalities.length === 0) {
      res.status(404).json({ message: "No Functionality Found Under this Parent functionality ID" });
    } else {
      res.status(200).json(functionalities);
    }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

//to get all functionalities by pfuncName
module.exports.getAllFunctionalitiesByPfuncName = async (req, res) => {
  try {
    const { pfuncName } = req.params;
    const functionalities = await functionalitiesModel.getAllFunctionalitiesByPfuncName(pfuncName);

    if (functionalities.length === 0) {
      res.status(404).json({ message: "No functionality Found under this parent functionality" });
    } else {
      res.status(200).json(functionalities);
    }
  } catch (error) {
    if (error.message === "Parent Functionality Not Found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

//to update a functionality by funcId
module.exports.updateFunctionality = async (req, res) => {
  try {
    const { funcId } = req.params;
    const updateData = req.body;

    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "funcName and endpointUrl Required!" });
    }

    const updatedFunctionality = await functionalitiesModel.updateFunctionality(parseInt(funcId), updateData);

    res.status(200).json(updatedFunctionality);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

//to delete a functionality by funcId
module.exports.deleteFunctionality = async (req, res) => {
  try {
    const { funcId } = req.params;
    const result = await functionalitiesModel.deleteFunctionality(parseInt(funcId));
    res.status(200).json(result);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

