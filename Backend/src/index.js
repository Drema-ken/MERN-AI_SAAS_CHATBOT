import app from "./app.js";
import { connectDB } from "./models/connect.js";

app.listen(process.env.PORT || 5000, () => {
  try {
    //console.log(process.env.PORT);
    connectDB(process.env.MONGODB_URL);
    console.log("server is active", process.env.PORT);
  } catch (err) {
    console.log(err);
  }
});
