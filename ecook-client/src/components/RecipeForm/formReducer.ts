import { Ingredient, RecipeDto } from "../../utils/data";

export const enum FORM_ACTION {
  TOGGLE_FAV,
  UPDATE_LABELS,
  UPDATE_SERVINGS,
  ADD_INGREDIENT,
  UPDATE_INGREDIENT,
  REMOVE_INGREDIENT,
  REMOVE,
  ADD_METHOD,
  REMOVE_METHOD,
}

type TOGGLE_FAV = { type: FORM_ACTION.TOGGLE_FAV };
type UPDATE_LABELS = { type: FORM_ACTION.UPDATE_LABELS; payload: string };
type UPDATE_SERVINGS = {
  type: FORM_ACTION.UPDATE_SERVINGS;
  payload: number;
};
type ADD_INGREDIENT = { type: FORM_ACTION.ADD_INGREDIENT };
type UPDATE_INGREDIENT = {
  type: FORM_ACTION.UPDATE_INGREDIENT;
  payload: Array<Ingredient>;
};
type REMOVE_INGREDIENT = {
  type: FORM_ACTION.REMOVE_INGREDIENT;
  payload: { index: number; ingredients: Array<Ingredient> };
};

type ADD_METHOD = { type: FORM_ACTION.ADD_METHOD };
type REMOVE_METHOD = { type: FORM_ACTION.REMOVE_METHOD; payload: number };

export type FormAction =
  | TOGGLE_FAV
  | UPDATE_LABELS
  | UPDATE_SERVINGS
  | ADD_INGREDIENT
  | UPDATE_INGREDIENT
  | REMOVE_INGREDIENT
  | ADD_METHOD
  | REMOVE_METHOD;

export const formReducer = (recipe: RecipeDto, action: FormAction) => {
  switch (action.type) {
    case FORM_ACTION.TOGGLE_FAV: {
      return { ...recipe, favorite: !recipe.favorite };
    }

    case FORM_ACTION.UPDATE_LABELS: {
      if (recipe.labels.includes(action.payload)) {
        const newLabels = recipe.labels.filter(
          (label) => label !== action.payload
        );
        return {
          ...recipe,
          labels: newLabels,
        };
      }
      return {
        ...recipe,
        labels: [...recipe.labels, action.payload],
      };
    }

    case FORM_ACTION.UPDATE_SERVINGS: {
      return {
        ...recipe,
        servings: action.payload,
      };
    }

    case FORM_ACTION.ADD_INGREDIENT: {
      return {
        ...recipe,
        ingredients: [
          ...recipe.ingredients,
          { name: "", amount: null, unit: "" },
        ],
      };
    }

    case FORM_ACTION.UPDATE_INGREDIENT: {
      return {
        ...recipe,
        ingredients: [...action.payload],
      };
    }

    case FORM_ACTION.REMOVE_INGREDIENT: {
      const newIngredients = [
        ...action.payload.ingredients.slice(0, action.payload.index),
        ...action.payload.ingredients.slice(action.payload.index + 1),
      ];
      return { ...recipe, ingredients: newIngredients };
    }

    default:
      return recipe;
  }
};
