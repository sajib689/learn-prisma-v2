import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

// create post service
const createPostService = async (payload: Prisma.PostCreateInput) => {
  const result = await prisma.post.create({
    data: payload,
  });
  return result;
};

// get all posts service
const getAllPostsService = async () => {
  const posts = await prisma.post.findMany();
  return posts;
};

// find post by id service
const findPostByIdService = async (id: number) => {
  const result = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return result;
};

// delete post by id service
const deletePostByIdService = async (id: number) => {
  const result = await prisma.post.delete({
    where: {
      id,
    },
  });
  return result;
};

// update post by id service
const updatePostByIdService = async (
  id: number,
  payload: Prisma.PostUpdateInput,
) => {
  const result = await prisma.post.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const postService = {
  createPostService,
  getAllPostsService,
  findPostByIdService,
  deletePostByIdService,
  updatePostByIdService,
};
