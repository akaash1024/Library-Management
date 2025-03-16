


const User = require("../models/user.model");

// ! User Handling
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No Users Found" });
    }
    return res.status(200).json({ success: true, users });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("this si aksh looking for id", id);

    const data = await User.findById(id).select("-password");

    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};



const deleteUserbyId = async (req, res, next) => {
  try {
    const { id } = req.params;
    //console.log("akash testing id", id);


    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    next(error);
  }
};


const updateUserbyId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedUserData = req.body;

    const updatedData = await User.findByIdAndUpdate(id, updatedUserData, { new: true });

    if (!updatedData) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(updatedData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  deleteUserbyId,
  getUserById,
  updateUserbyId
};


