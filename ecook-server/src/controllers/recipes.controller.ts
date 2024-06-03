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
      result.labels = recipe.recipeLabels.map(
        (recipeLabel) => recipeLabel.label.name
      );
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

    // check if provided labels are valid
    const allLabels = await myDataSource.getRepository(LabelEntity).find();
    const labelIds: number[] = labels.map((label) => {
      const found = allLabels.find((item) => item.name === label);

      if (!found) {
        throw new CustomError("Labels provided do not exist!", 404);
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
      .save({ recipeId: newRecipe.id, method: methods.join("\n") });

    const result = new RecipeResponse();
    result.id = newRecipe.id;
    result.name = newRecipe.name;
    result.favorite = newRecipe.favorite;
    result.labels = labels;
    result.servings = newRecipe.servings;
    result.ingredients = newIngredients.map((ingredient) => {
      return {
        amount: ingredient.amount,
        unit: ingredient.unit,
        name: ingredient.name,
      };
    });
    result.methods = newMethod.method ? newMethod.method.split("\n") : [];

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
    // check if recipe id provided is valid
    const { id } = req.params;
    const recipe = await myDataSource.getRepository(RecipeEntity).findOne({
      relations: {
        recipeLabels: { label: true },
        ingredients: true,
        method: true,
      },
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
    result.labels = recipe.recipeLabels.map(
      (recipeLabel) => recipeLabel.label.name
    );
    result.servings = recipe.servings;
    result.ingredients = recipe.ingredients.map((ingredient) => {
      return {
        amount: ingredient.amount,
        unit: ingredient.unit,
        name: ingredient.name,
      };
    });
    result.methods = recipe.method.method
      ? recipe.method.method.split("\n")
      : [];

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
}

// PUT: /api/recipes/:id
export async function updateRecipe(
  req: Request<{ id: number }, Record<string, never>, CreateRecipeDto>,
  res: Response<RecipeResponse>,
  next: NextFunction
) {
  try {
    // check if recipe id provided is valid
    const { id } = req.params;
    const recipe = await myDataSource.getRepository(RecipeEntity).findOne({
      relations: { recipeLabels: true, ingredients: true, method: true },
      where: { id: id },
    });

    if (!recipe) {
      return next(
        new CustomError(`Recipe with id = ${id} doesn't exist!`, 404)
      );
    }

    const { name, favorite, labels, servings, ingredients, methods } = req.body;

    // check if labels provided are valid
    const allLabels = await myDataSource.getRepository(LabelEntity).find();
    const labelIds: number[] = labels.map((label) => {
      const found = allLabels.find((item) => item.name === label);

      if (!found) {
        throw new CustomError("Labels provided do not exist!", 404);
      }

      return found.id;
    });

    // update recipes table if there are changes
    if (
      !(
        recipe.name === name &&
        recipe.favorite === favorite &&
        recipe.servings === servings
      )
    ) {
      await myDataSource
        .getRepository(RecipeEntity)
        .save({ ...recipe, name, favorite, servings });
    }

    // update recipe_label table if there are changes
    const recipeLabels = recipe.recipeLabels;
    while (recipeLabels.length !== 0) {
      const recipeLabel = recipeLabels.pop() as RecipeLabelEntity;
      const index = labelIds.indexOf(recipeLabel.labelId);
      if (index < 0) {
        await myDataSource.getRepository(RecipeLabelEntity).remove(recipeLabel);
      } else {
        labelIds.splice(index, 1);
      }
    }
    if (labelIds.length !== 0) {
      await Promise.all(
        labelIds.map((labelId) => {
          myDataSource
            .getRepository(RecipeLabelEntity)
            .save({ recipeId: id, labelId: labelId });
        })
      );
    }

    // update ingredients table if there are changes
    const dbIngredients = recipe.ingredients;
    while (dbIngredients.length !== 0) {
      const dbIngredient = dbIngredients.pop() as IngredientEntity;
      const index = ingredients.findIndex(
        ({ amount, unit, name }) =>
          amount === dbIngredient.amount &&
          unit === dbIngredient.unit &&
          name === dbIngredient.name
      );
      if (index < 0) {
        await myDataSource.getRepository(IngredientEntity).remove(dbIngredient);
      } else {
        ingredients.splice(index, 1);
      }
    }
    if (ingredients.length !== 0) {
      await Promise.all(
        ingredients.map((ingredient) => {
          myDataSource
            .getRepository(IngredientEntity)
            .save({ recipeId: id, ...ingredient });
        })
      );
    }

    // update methods table if there are changes
    const method = methods.join("\n");
    if (recipe.method.method !== method) {
      await myDataSource
        .getRepository(MethodEntity)
        .save({ ...recipe.method, method });
    }
    res.status(202).send();
  } catch (e) {
    next(e);
  }
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

    res.status(204).send();
  } catch (e) {
    next(e);
  }
}

// PATCH: /api/recipes/:id
export async function updateFavorite(
  req: Request<{ id: number }, Record<string, never>, UpdateFavoriteDto>,
  res: Response,
  next: NextFunction
) {
  try {
    // check if recipe id provided is valid
    const { id } = req.params;
    const recipe = await myDataSource.getRepository(RecipeEntity).findOne({
      where: { id: id },
    });

    if (!recipe) {
      return next(
        new CustomError(`Recipe with id = ${id} doesn't exist!`, 404)
      );
    }

    if (recipe.favorite !== req.body.favorite) {
      await myDataSource
        .getRepository(RecipeEntity)
        .save({ ...recipe, favorite: req.body.favorite });
    }
    res.status(202).send();
  } catch (e) {
    next(e);
  }
}
