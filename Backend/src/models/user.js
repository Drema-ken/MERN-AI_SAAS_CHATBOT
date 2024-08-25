import mongoose from "mongoose";

const dataType = {
  type: String,
  required: true,
};

const chatSchema = new mongoose.Schema({
  role: dataType,
  content: dataType,
});

const userSchema = new mongoose.Schema({
  name: dataType,
  email: {
    ...dataType,
    unique: true,
  },
  password: dataType,
  chats: [chatSchema],
});

export default mongoose.model("users", userSchema);
