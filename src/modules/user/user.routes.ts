import Router from "express";
import { userController } from "./user.contoller";

const router = Router();

router.post("/", userController.createUserController);

export const userRouter = router;
