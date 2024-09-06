import User from "../models/user.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils/token-manager.js";

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

    if (req.cookies.auth_token) {
      res.clearCookie("auth_token", {
        path: "/",
        domain: "localhost",
        httpOnly: true,
        secure: true,
        signed: true,
      });
    }

    //creating token for user
    const token = createToken(newUser._id.toString(), email, "7d");

    //sending token as cookie
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie("auth_token", token, {
      path: "/",
      domain: "web.app",
      httpOnly: true,
      secure: true,
      expires,
      signed: true,
    });

    return res.status(200).json({
      message: "User successfully created",
      name: newUser.name,
      email: newUser.email,
      token: token,
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
      return res.status(401).json({ message: "No such User" });
    }
    const passwordMatch = bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credential" });
    }

    //if user relogins , old token is cleared

    if (req.cookies.auth_token) {
      res.clearCookie("auth_token", {
        path: "/",
        domain: "localhost",
        httpOnly: true,
        secure: true,
        signed: true,
      });
    }

    //creating token for user
    const token = createToken(user._id.toString(), email, "7d");

    //sending token as cookie
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie("auth_token", token, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      secure: true,
      expires,
      signed: true,
    });

    return res.status(201).json({
      message: "OK",
      name: user.name,
      email: user.email,
      token: token,
    });
  } catch (error) {
    res.status(400).json({ status: "Error", message: error.message });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not registered or token malfunctioned!" });
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(400).json({ message: "Permissions did not match" });
    }
    return res.status(200).json({ name: user.name, email: user.email });
  } catch (error) {
    return res.status(400).json({ message: "Error", status: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not registered or token malfunctioned!" });
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(400).json({ message: "Permissions did not match" });
    }
    res.clearCookie("auth_token", {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      secure: true,
      signed: true,
    });
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Error", status: error.message });
  }
};
