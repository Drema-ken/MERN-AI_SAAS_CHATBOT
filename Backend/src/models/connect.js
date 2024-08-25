import { connect, disconnect } from "mongoose";

export const connectDB = async (connectStr) => {
  await connect(connectStr)
    .then(console.log("connected to DB"))
    .catch((err) => console.log(err));
};

export const disconnectDB = async () => {
  try {
    await disconnect().then(console.log("disconnected"));
  } catch (error) {
    console.log(error);
  }
};
