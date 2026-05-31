import Router from "express";
import { userController } from "./user.contoller";

const router = Router();

router.post("/", userController.createUserController);
router.get("/", userController.getUserController);
router.get("/:id", userController.findUserByIdController);
router.delete("/:id", userController.deleteUserByIdController);
router.put("/:id", userController.updateUserByIdController);

export const userRouter = router;
