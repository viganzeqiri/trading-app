import express from "express";

import * as userController from "../controllers/user";
import { authorize } from "../middleware/auth";

const userRouter = express.Router();

userRouter.get("/:userId", authorize, userController.getUser);
userRouter.post("/login", userController.login);
userRouter.post("/register", userController.register);

export default userRouter;
