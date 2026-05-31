import Router from "express";
import { postController } from "./post.controller";

const router = Router();

router.post("/", postController.createPostController);

export const postRouter = router;
