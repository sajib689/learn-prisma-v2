import Router from "express";
import { postController } from "./post.controller";

const router = Router();

router.post("/", postController.createPostController);
router.get("/", postController.getAllPostsController);
router.get("/:id", postController.findPostByIdController);
router.delete("/:id", postController.deletePostByIdController);
router.put("/:id", postController.updatePostByIdController);

export const postRouter = router;
