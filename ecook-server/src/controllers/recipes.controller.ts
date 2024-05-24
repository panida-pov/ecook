import { Request, Response, NextFunction } from "express-serve-static-core";
import { CreateRecipeDto } from "../dto/recipes/CreateRecipe.dto";
import { UpdateFavoriteDto } from "../dto/recipes/UpdateFavorite.dto";
import { RecipelistResponse } from "../dto/recipes/RecipelistResponse.dto";
import { RecipeResponse } from "../dto/recipes/RecipeResponse.dto";
import { CustomError } from "../utils/CustomError";

// GET: /api/recipes
export function getRecipes(
  req: Request,
  res: Response<Array<RecipelistResponse>>,
  next: NextFunction
) {
  try {
    res.status(200).send([
      {
        id: 1,
        name: "Teriyaki chicken",
        favorite: false,
        labels: ["asian"],
      },
      {
        id: 2,
        name: "Gapao rice",
        favorite: true,
        labels: ["thai", "asian"],
      },
      {
        id: 3,
        name: "Spaghetti Bolognese",
        favorite: false,
        labels: ["western"],
      },
    ]);
    // const error = new CustomError("recipes not found", 404);
  } catch (e) {
    next(e);
  }
}

// POST: /api/recipes
export function createRecipe(
  req: Request<Record<string, never>, Record<string, never>, CreateRecipeDto>,
  res: Response<RecipeResponse>,
  next: NextFunction
) {
  res.status(201).send();
}

// GET: /api/recipes/:id
export function getRecipeById(
  req: Request<{ id: number }>,
  res: Response<RecipeResponse>,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    if (id === 1) {
      return res.status(200).send({
        id: 1,
        name: "Teriyaki chicken",
        favorite: true,
        labels: ["asian"],
        servings: 2,
        ingredients: [
          {
            name: "soy sauce",
            amount: 1 / 4,
            unit: "cup",
          },
        ],
        methods: ["first method", "second method"],
      });
    }
    next(new CustomError(`Can't find recipe with ID=${id}`, 404));
  } catch (e) {
    next(e);
  }
}

// PUT: /api/recipes/:id
export function updateRecipe(
  req: Request<{ id: number }, Record<string, never>, CreateRecipeDto>,
  res: Response<RecipeResponse>
) {
  res.status(202).send();
}

// DELETE: /api/recipes/:id
export function deleteRecipe(req: Request<{ id: number }>, res: Response) {
  res.status(204).send();
}

// PATCH: /api/recipes/:id
export function updateFavorite(
  req: Request<{ id: number }, Record<string, never>, UpdateFavoriteDto>,
  res: Response
) {
  res.status(202).send();
}
