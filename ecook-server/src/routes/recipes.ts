import { Router } from "express";
import {
  createRecipe,
  deleteRecipeById,
  getRecipeById,
  getRecipes,
  updateFavorite,
  updateRecipeById,
} from "../handlers/recipes";

const recipesRouter = Router();

recipesRouter.get("/", getRecipes);
recipesRouter.post("/", createRecipe);
recipesRouter.get("/:id", getRecipeById);
recipesRouter.put("/:id", updateRecipeById);
recipesRouter.delete("/:id", deleteRecipeById);
recipesRouter.put("/:id/update-fav", updateFavorite);

export default recipesRouter;
