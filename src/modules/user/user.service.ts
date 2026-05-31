import { prisma } from "../../config/db";
import { Prisma, User } from "@prisma/client";

// create user service
const createUserService = async (
  payload: Prisma.UserCreateInput,
): Promise<User> => {
  const createdUser = await prisma.user.create({
    data: payload,
  });
  return createdUser;
};

// get users list service
const getUserService = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      phone: true,
      picture: true,
      status: true,
      isVerified: true, 
    },
  });
  return users;
};

// find user by id service

const findUserByIdService = async (id: number): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
};

export const userService = {
  createUserService,
  getUserService,
  findUserByIdService,
};
