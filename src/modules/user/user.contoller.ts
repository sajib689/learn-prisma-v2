import { Request, Response } from "express";
import { userService } from "./user.service";

const createUserController = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserService();
    res.status(201).json({
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const userController = {
  createUserController,
};
