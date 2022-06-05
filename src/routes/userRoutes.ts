import express from "express";
import { userController } from "../controllers/userController";
const router = express.Router();

// Crud Via Entity Manager

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .get("/:id", userController.getUser)
  .patch("/:id", userController.updateUser)
  .delete("/:id", userController.deleteUser);
export default router;
