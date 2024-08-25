import User from "../models/user.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res, next) => {
  //get all users from db
  try {
    const users = await User.find();
    res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "Error", message: error.message });
  }
};

export const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //MONGODB already handles making sure no two documents have same email check schema

    //creating new user
    const newUser = await new User({
      name,
      email,
      password: passwordHash,
    });
    await newUser.save();

    return res.status(200).json({
      message: "User successfully created",
      id: newUser._id.toString(),
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "Error", message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No such User" });
    }
    const passwordMatch = bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credential" });
    }

    return res.status(201).json({ message: "OK", user: user._id });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "Error", message: error.message });
  }
};
