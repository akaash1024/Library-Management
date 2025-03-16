const User = require("../models/user.model");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const isUserExit = await User.findOne({ email });
    if (isUserExit) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already registerd" });
    }

    const newUser = await User.create({ email, name, password });

    const newUserDetails = {
      token: await newUser.generateToken(),
      userId: newUser._id.toString(),
    };

    return res.status(201).json({
      success: true,
      message: "Successfully Created",
      newUserDetails,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isUserExist = await User.findOne({ email })

    if (!isUserExist) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const isPasswordValid = await isUserExist.comparePassword(password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const userDetails = {
      token: await isUserExist.generateToken(),
      userId: isUserExist._id.toString(),
    };

    return res.status(200).json({
      success: true,
      message: "Login Successful backend",
      data: userDetails,
    });
  } catch (error) {
    next(error);
  }
};


const user = async (req, res, next) => {
  try {
    const userData = req.user;
    return res.status(200).json({
      success: true,
      message: "User details fetched successfully.",
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};



module.exports = { register, login, user };
