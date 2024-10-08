import { Router } from "express";
import {
  getAllUsers,
  login,
  logoutUser,
  signup,
  verifyUser,
} from "../controllers/user.js";
import {
  loginValidator,
  signupValidator,
  validate,
} from "../middleware/validator.js";
import { verifyToken } from "../utils/token-manager.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", validate(signupValidator), signup);
userRouter.post("/login", validate(loginValidator), login);
userRouter.post("/auth-status", verifyToken, verifyUser);
userRouter.post("/logout", verifyToken, logoutUser);

export default userRouter;
