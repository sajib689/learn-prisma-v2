import { Request, Response } from "express";
import { userService } from "./user.service";

// create user controller
const createUserController = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserService(req.body);
    res.status(201).json({
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get users list controller
const getUserController = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUserService();
    res.status(200).json({
      message: "Users fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// find user by id controller

const findUserByIdController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }
    const result = await userService.findUserByIdService(id);
    res.status(200).json({
      message: "User fetched successfully",
      data: result,
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const userController = {
  createUserController,
  getUserController,
  findUserByIdController
};
