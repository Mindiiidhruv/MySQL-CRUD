import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { validateUser } from "../validator/userValidation.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

router.post("/", validateRequest(validateUser), createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", validateRequest(validateUser), updateUser);
router.delete("/:id", deleteUser);

export default router;
