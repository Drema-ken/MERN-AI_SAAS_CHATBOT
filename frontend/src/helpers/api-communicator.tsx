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

export const checkAuthStatus = async (token: string) => {
  try {
    const res = await axios.post("/users/auth-status", { token });
    if (res.status !== 200) {
      throw new Error("Authentication failed");
    }
    const data = await res.data;
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const logoutUser = async (token: string) => {
  const res = await axios.post("/users/logout", { token });
  console.log(token);
  if (res.status !== 200) {
    throw new Error("Logging out Error");
  }
  const data = await res.data;
  return data;
};

//set up the gemini model for the controller
export const chatting = async (message: any, token: string) => {
  const res = await axios.post("/chats/new", { message, token });
  return res.data.chat;
};

export const fetchingAllChats = async (token: string) => {
  const res = await axios.post("/chats/all-chats", { token });
  //@ts-ignore

  const formattedResult = res.data.chats.map((chat) => {
    return { role: chat.role, content: chat.parts[0].text };
  });
  return formattedResult;
};

export const deleteAllChats = async (token: string) => {
  const res = await axios.delete("/chats/delete-chats", {
    data: { token },
  });
  return res;
};
