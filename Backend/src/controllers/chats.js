import run from "../../Api/config.js";
import sendMessage from "../ai/config.js";
import User from "../models/user.js";

export const generateChat = async (req, res, next) => {
  try {
    const { message } = req.body; //the guy did a validator for this but i think frontend will handle this
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered or token malfunctioned" });
    }

    //grabbing user chats
    const chats = user.chats;
    const response = await sendMessage(message);
    chats.push({ role: "user", parts: [{ text: message }] });
    chats.push({ role: "model", parts: [{ text: response }] });
    await user.save();

    res.status(200).json({ chat: chats });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error", status: err.message });
  }
};

export const getAllUserChats = async (req, res) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered or token malfunctioned" });
    }
    const chats = user.chats;
    res.status(200).json({ chats });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error", status: err.message });
  }
};

export const deleteAllChats = async (req, res) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered or token malfunctioned" });
    }
    user.chats = [];
    await user.save();
    res.status(200).json({ message: "chats deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
