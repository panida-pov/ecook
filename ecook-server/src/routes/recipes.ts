import { Router } from "express";
import { checkSchema } from "express-validator";
import {
  validateRecipeIdSchema,
  createRecipeSchema,
  updateFavoriteSchema,
} from "../utils/ValidationSchemas";
import { validationHandler } from "../middlewares/validationHandler";
import {
  getRecipes,
  createRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  updateFavorite,
} from "../controllers/recipes.controller";

export const recipesRouter = Router();

recipesRouter.get("/", getRecipes);

recipesRouter.post(
  "/",
  checkSchema(createRecipeSchema),
  validationHandler,
  createRecipe
);

recipesRouter.get(
  "/:id",
  checkSchema(validateRecipeIdSchema),
  validationHandler,
  getRecipeById
);

recipesRouter.put(
  "/:id",
  checkSchema(validateRecipeIdSchema),
  checkSchema(createRecipeSchema),
  validationHandler,
  updateRecipe
);

recipesRouter.delete(
  "/:id",
  checkSchema(validateRecipeIdSchema),
  validationHandler,
  deleteRecipe
);

recipesRouter.patch(
  "/:id/update-fav",
  checkSchema(validateRecipeIdSchema),
  checkSchema(updateFavoriteSchema),
  validationHandler,
  updateFavorite
);
