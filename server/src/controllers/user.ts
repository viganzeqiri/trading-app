import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import { User } from "../models/User";

const getUser = async (
  request: Request<{ userId: string }>,
  response: Response
) => {
  try {
    const { userId } = request.params;

    const user = await User.findById(userId);

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { privateKey, ...userData } = user.toObject();

    response.status(200).json({ user: userData });
  } catch (error) {
    console.error("Error fetching user:", error);
    response.status(500).json({ error: "Server error" });
  }
};

const login = async (
  request: Request<object, object, { publicKey: string; privateKey: string }>,
  response: Response
) => {
  try {
    const { publicKey, privateKey } = request.body;

    const user = await User.findOne({ publicKey });

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    if (user.privateKey !== privateKey) {
      return response.status(401).json({ error: "Invalid private key" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string
    );

    response.status(200).json({ user, token });
  } catch (error) {
    console.error("Error logging in:", error);
    response.status(500).json({ error: "Server error" });
  }
};

const register = async (
  request: Request<object, object, { publicKey: string; privateKey: string }>,
  response: Response
) => {
  try {
    const { publicKey, privateKey } = request.body;

    const existingUser = await User.findOne({ publicKey });

    if (existingUser) {
      return response.status(400).json({ error: "User already exists" });
    }

    const user = new User({ publicKey, privateKey });
    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string
    );

    response.status(201).json({ user, token });
  } catch (error) {
    console.error("Error registering user:", error);
    response.status(500).json({ error: "Server error" });
  }
};

export { getUser, register, login };
