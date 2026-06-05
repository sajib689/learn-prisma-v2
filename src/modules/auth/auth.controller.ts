import { Request, Response } from "express";
import { authService } from "./auth.service";

const loginControllerWithEmailAndPassword = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = await authService.loginServiceWithEmailAndPassword(
      req.body.email,
      req.body.password,
    );

    res.status(200).json({
      message: "Login successful",
      data: result,
    });
    
  } catch (error: any) {
    console.error("Error during login:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const authController = {
  loginControllerWithEmailAndPassword,
};
