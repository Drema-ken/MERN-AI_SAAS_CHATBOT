// Make sure to include these imports:
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const sendMessage = async (message) => {
  const chatHistory = [];
  //structure = role : parts:[{text:message}]
  const chat = await model.startChat({ history: chatHistory });
  const result = await chat.sendMessage(message);
  const response = await result.response.text();
  return response;
};

export default sendMessage;
