import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/users/login", { email, password });
  if (res.status == 400) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/users/signup", { name, email, password });
  if (res.status == 400) {
    throw new Error("Unable to create user!");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  try {
    const res = await axios.get("/users/auth-status");
    if (res.status !== 200) {
      throw new Error("Authentication failed");
    }
    const data = await res.data;
    return data;
  } catch (err) {
    console.log(err);
  }
};

//set up the gemini model for the controller
export const sendChatMessage = async (message: string) => {
  const res = await axios.post("/chats/new", { message });
  if (res.status !== 200) {
    throw new Error("Authentication failed");
  }
  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  const res = await axios.get("/users/logout");
  if (res.status !== 200) {
    throw new Error("Logging out Error");
  }
  const data = await res.data;
  return data;
};

export const chatting = async (message: any) => {
  console.log(message);
  const res = await axios.post("/chats/new", { message });
  console.log(res.data.chat);
  return res.data.chat;
};

export const fetchingAllChats = async () => {
  const res = await axios.get("/chats/all-chats");
  //@ts-ignore

  const formattedResult = res.data.chats.map((chat) => {
    return { role: chat.role, content: chat.parts[0].text };
  });
  return formattedResult;
};

export const deleteAllChats = async () => {
  const res = await axios.delete("/chats/delete-chats");
  return res;
};
