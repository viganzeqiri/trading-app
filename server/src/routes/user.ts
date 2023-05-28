import express from "express";

import * as userController from "../controllers/user";

const userRouter = express.Router();

userRouter.get("/:userId", userController.getUser);
userRouter.post("/login", userController.login);
userRouter.post("/register", userController.register);

export default userRouter;
