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
      posts: true,
    },
  });
  return users;
};

// find user by id service

const findUserByIdService = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
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
      posts: true,
    },
  });
  return user;
};

// delete user by id service
const deleteUserByIdService = async (id: number) => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};


// update user by id service
const updateUserByIdService = async (
  id: number,
  payload: Prisma.UserUpdateInput,
) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};


export const userService = {
  createUserService,
  getUserService,
  findUserByIdService,
  deleteUserByIdService,
  updateUserByIdService,
};
