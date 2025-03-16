require("dotenv").config();
const mongoose = require("mongoose");

const URL = process.env.MONGO_URL;
const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("Connected to mongo database");
  } catch (error) {
    console.error("Failed to connect database", error.message);
  }
};

module.exports = connectDB;
