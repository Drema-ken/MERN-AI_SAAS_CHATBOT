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
  const res = await axios.get("/users/auth-status");
  if (res.status !== 200) {
    throw new Error("Authentication failed");
  }
  const data = await res.data;
  return data;
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
