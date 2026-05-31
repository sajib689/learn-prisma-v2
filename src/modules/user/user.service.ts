import { prisma } from "../../config/db";

const createUserService = async (payload: any) => {
  const createdUser = await prisma.user.create({
    data: payload,
  });
  return createdUser;
};

export const userService = {
  createUserService,
};
