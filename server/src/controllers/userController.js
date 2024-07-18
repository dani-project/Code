const userModel = require("../models/userModel");

//==============================================================//
//                    Sample User Controller                    //
//==============================================================//

// Controller to get all users
module.exports.readAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    if (users.length === 0) {
      res.status(404).json({ message: "No users found" });
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
