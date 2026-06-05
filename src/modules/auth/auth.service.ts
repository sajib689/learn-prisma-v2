import { prisma } from "../../config/db";
import { authController } from "./auth.controller";

// login service
const loginServiceWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }
    if (user.password !== password) {
      throw new Error("Invalid email or password");
    }
    if (user.password === password) {
      return user;
    }
    
  } catch (error: any) {
    console.error("Error during login:", error);
    throw new Error(error.message);
  }
};

export const authService = {
  loginServiceWithEmailAndPassword,
};
