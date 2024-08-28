import run from "../../Api/config";
import User from "../models/user";

export const generateChat = async (req, res, next) => {
  try {
    const { message } = req.body; //the guy did a validator for this but i think frontend will handle this
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered or token malfunctioned" });
    }

    //grabbing chats of user
    const chats = user.chats.map(({ role, content }) => ({ role, content }));
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    //send all chats with new chats to gemini api
    const chatResponse = await run(message); //watch the freecodecamp vid so i will understand how to better set they chat so it is contextual
    user.chats.push({ content: chatResponse, role: "system" }); //check if this is how gemini config the ai response

    await user.save();
    return res.json(200).json({ chats: user.chats });
    //get latest response
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
