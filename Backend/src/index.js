import app from "./app.js";
import { connectDB } from "./models/connect.js";
import User from "./models/user.js";

app.listen(process.env.PORT || 5000, () => {
  try {
    connectDB(process.env.MONGODB_URL);
    console.log("server is active");
  } catch (err) {
    console.log(err);
  }
});
