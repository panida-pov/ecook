import { Request, Response, NextFunction } from "express-serve-static-core";
import { CreateRecipeDto } from "../dto/recipes/CreateRecipe.dto";
import { UpdateFavoriteDto } from "../dto/recipes/UpdateFavorite.dto";
import { RecipelistResponse } from "../dto/recipes/RecipelistResponse.dto";
import { RecipeResponse } from "../dto/recipes/RecipeResponse.dto";
import { CustomError } from "../utils/CustomError";
import { myDataSource } from "../data-source";
import { RecipeEntity } from "../entity/recipe.entity";
import { MethodEntity } from "../entity/method.entity";
import { IngredientEntity } from "../entity/ingredient.entity";
import { RecipeLabelEntity } from "../entity/recipeLabel.entity";
import { LabelEntity } from "../entity/label.entity";

// GET: /api/recipes
export async function getRecipes(
  req: Request,
  res: Response<Array<RecipelistResponse>>,
  next: NextFunction
) {
  try {
    const recipes = await myDataSource.getRepository(RecipeEntity).find({
      relations: { recipeLabels: { label: true } },
    });

    const results = recipes.map((recipe) => {
      const result = new RecipelistResponse();
      result.id = recipe.id;
      result.name = recipe.name;
      result.favorite = recipe.favorite;
      result.labels = recipe.recipeLabels.map((label) => label.label.name);
      return result;
    });

    res.status(200).send(results);
  } catch (e) {
    next(e);
  }
}

// POST: /api/recipes
export async function createRecipe(
  req: Request<Record<string, never>, Record<string, never>, CreateRecipeDto>,
  res: Response<RecipeResponse>,
  next: NextFunction
) {
  try {
    const { name, favorite, labels, servings, ingredients, methods } = req.body;

    const allLabels = await myDataSource.getRepository(LabelEntity).find();
    const labelIds: number[] = labels.map((label) => {
      const found = allLabels.find((item) => item.name === label);

      if (!found) {
        throw new CustomError("Labels provided do not exist!", 400);
      }

      return found.id;
    });

    const newRecipe = await myDataSource
      .getRepository(RecipeEntity)
      .save({ name, favorite, servings });

    await Promise.all(
      labelIds.map((labelId) =>
        myDataSource
          .getRepository(RecipeLabelEntity)
          .save({ recipeId: newRecipe.id, labelId: labelId })
      )
    );

    const newIngredients = await Promise.all(
      ingredients.map((ingredient) => {
        return myDataSource.getRepository(IngredientEntity).save({
          recipeId: newRecipe.id,
          amount: ingredient.amount,
          unit: ingredient.unit,
          name: ingredient.name,
        });
      })
    );

    const newMethod = await myDataSource
      .getRepository(MethodEntity)
      .save({ method: methods.join("\n") });

    const result = new RecipeResponse();
    result.id = newRecipe.id;
    result.name = newRecipe.name;
    result.favorite = newRecipe.favorite;
    result.labels = labels;
    result.ingredients = newIngredients.map((ingredient) => {
      return {
        amount: ingredient.amount,
        unit: ingredient.unit,
        name: ingredient.name,
      };
    });
    result.methods = newMethod.method.split("\n");

    res.status(201).send(result);
  } catch (e) {
    next(e);
  }
}

// GET: /api/recipes/:id
export async function getRecipeById(
  req: Request<{ id: number }>,
  res: Response<RecipeResponse>,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const recipe = await myDataSource.getRepository(RecipeEntity).findOne({
      relations: { ingredients: true, method: true },
      where: { id: id },
    });

    if (!recipe) {
      return next(
        new CustomError(`Recipe with id = ${id} doesn't exist!`, 404)
      );
    }

    const result = new RecipeResponse();
    result.id = recipe.id;
    result.name = recipe.name;
    result.favorite = recipe.favorite;
    result.servings = recipe.servings;
    result.ingredients = recipe.ingredients.map((ingredient) => {
      return {
        amount: ingredient.amount,
        unit: ingredient.unit,
        name: ingredient.name,
      };
    });
    result.methods = recipe.method.method.split("\n");

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
}

// PUT: /api/recipes/:id
export function updateRecipe(
  req: Request<{ id: number }, Record<string, never>, CreateRecipeDto>,
  res: Response<RecipeResponse>,
  next: NextFunction
) {
  res.status(202).send();
}

// DELETE: /api/recipes/:id
export async function deleteRecipe(
  req: Request<{ id: number }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { affected } = await myDataSource
      .getRepository(RecipeEntity)
      .delete(req.params.id);
    if (!affected) {
      return next(new CustomError("No recipe to delete!", 404));
    }
    return res.status(204).send();
  } catch (e) {
    next(e);
  }
}

// PATCH: /api/recipes/:id
export function updateFavorite(
  req: Request<{ id: number }, Record<string, never>, UpdateFavoriteDto>,
  res: Response,
  next: NextFunction
) {
  res.status(202).send();
}
