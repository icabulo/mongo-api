import express, { Router } from "express";
import {
  create,
  getAll,
  getOne,
  update,
  deleteOne,
  find,
} from "../controllers/RecipeControllers";

const router = express.Router();
router
  .post("/", create)
  .get("/", getAll)
  .get("/:key/:value", find, getOne)
  .delete("/:key/:value", find, deleteOne)
  .put("/:key/:value", find, update);

export default router;
