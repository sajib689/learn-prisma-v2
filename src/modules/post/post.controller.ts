import { Request, Response } from "express";
import { postService } from "./post.service";

// create post controller
const createPostController = async (req: Request, res: Response) => {
  try {
    const result = await postService.createPostService(req.body);
    res.status(201).json({
      message: "Post created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getAllPostsController = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await postService.getAllPostsService({
      page,
      limit,
    });
    res.status(200).json({
      message: "Posts fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
// find post by id controller
const findPostByIdController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      return res.status(400).json({
        message: "Post ID is required",
      });
    }
    const result = await postService.findPostByIdService(id);
    res.status(200).json({
      message: "Post fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
// delete post by id controller
const deletePostByIdController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      return res.status(400).json({
        message: "Post ID is required",
      });
    }
    const result = await postService.deletePostByIdService(id);
    res.status(200).json({
      message: "Post deleted successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
// update post by id controller
const updatePostByIdController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      return res.status(400).json({
        message: "Post ID is required",
      });
    }
    const result = await postService.updatePostByIdService(id, req.body);
    res.status(200).json({
      message: "Post updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const postController = {
  createPostController,
  getAllPostsController,
  findPostByIdController,
  deletePostByIdController,
  updatePostByIdController,
};
