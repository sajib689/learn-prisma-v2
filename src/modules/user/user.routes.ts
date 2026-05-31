import Router from "express";
import { userController } from "./user.contoller";

const router = Router();

router.post("/", userController.createUserController);
router.get("/", userController.getUserController);
router.get("/:id", userController.findUserByIdController);

export const userRouter = router;
