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
userRouter.get("/auth-status", verifyToken, verifyUser);
userRouter.get("/logout", logoutUser);

export default userRouter;
