import { Request, Response } from "express";

const loginControllerWithEmailAndPassword = async (
  req: Request,
  res: Response,
) => {
  try {
    
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const authController = {
  loginControllerWithEmailAndPassword,
};
