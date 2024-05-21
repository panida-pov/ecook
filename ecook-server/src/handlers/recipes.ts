import { Request, Response } from "express-serve-static-core";
import { CreateRecipeDto } from "../dtos/CreateRecipe.dto";
import { Recipelist } from "../types/Recipelist";
import { Recipe } from "../types/Recipe";
import { UpdateRecipeDto } from "../dtos/UpdateRecipe.dto";
import { UpdateFavoriteDto } from "../dtos/UpdateFavorite.dto";

export function getRecipes(req: Request, res: Response<Array<Recipelist>>) {
  res.status(200);
}

export function createRecipe(
  req: Request<unknown, unknown, CreateRecipeDto>,
  res: Response<Recipe>
) {
  res.status(201);
}

export function getRecipeById(
  req: Request<{ id: number }>,
  res: Response<Recipe>
) {
  res.status(200);
}

export function updateRecipeById(
  req: Request<{ id: number }, unknown, UpdateRecipeDto>,
  res: Response<Recipe>
) {
  res.status(200);
}

export function deleteRecipeById(req: Request<{ id: number }>, res: Response) {
  res.status(200);
}

export function updateFavorite(
  req: Request<{ id: number }, unknown, UpdateFavoriteDto>,
  res: Response
) {
  res.status(200);
}
