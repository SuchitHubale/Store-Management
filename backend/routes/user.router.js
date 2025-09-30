import express from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
import { validateRegistration, validateLogin } from "../middleware/validation.js";

const UserRouter = express.Router();

UserRouter.post("/register", validateRegistration, registerUser);
UserRouter.post("/login", validateLogin, loginUser);

export default UserRouter;