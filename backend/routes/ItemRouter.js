import express from "express";
import {
  createItem,
  deleteItem,
  getItemById,
  getItems,
  updateItem,
} from "../controllers/ItemController.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";
import { validateItem } from "../middleware/validation.js";

const itemRouter = express.Router();

itemRouter.get("/", getItems);
itemRouter.get("/:id", getItemById);

itemRouter.post("/", verifyToken, isAdmin, validateItem, createItem);
itemRouter.put("/:id", verifyToken, isAdmin, validateItem, updateItem);
itemRouter.delete("/:id", verifyToken, isAdmin, deleteItem);

export default itemRouter;