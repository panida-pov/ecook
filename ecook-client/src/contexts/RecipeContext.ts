import { createContext } from "react";
import { RecipeDto, sampleRecipe } from "../utils/data";

export const enum RECIPE_ACTIONS {
  LOAD_SUCCESS,
  UPDATE_RECIPE_NAME,
  UPDATE_LABELS,
  UPDATE_SERVINGS,
  ADD_NEW_INGREDIENT,
  REMOVE_INGREDIENT_LIST,
  UPDATE_INGREDIENT_AMOUNT,
  UPDATE_INGREDIENT_UNIT,
  UPDATE_INGREDIENT_NAME,
  ADD_NEW_METHOD,
  REMOVE_METHOD,
  UPDATE_METHOD,
}

type LOAD_SUCCESS = { type: RECIPE_ACTIONS.LOAD_SUCCESS; payload: RecipeDto };
type UPDATE_RECIPE_NAME = {
  type: RECIPE_ACTIONS.UPDATE_RECIPE_NAME;
  payload: string;
};
type UPDATE_LABELS = { type: RECIPE_ACTIONS.UPDATE_LABELS; payload: string };
type UPDATE_SERVINGS = {
  type: RECIPE_ACTIONS.UPDATE_SERVINGS;
  payload: number;
};
type ADD_NEW_INGREDIENT = { type: RECIPE_ACTIONS.ADD_NEW_INGREDIENT };
type REMOVE_INGREDIENT_LIST = {
  type: RECIPE_ACTIONS.REMOVE_INGREDIENT_LIST;
  payload: number;
};
type UPDATE_INGREDIENT_AMOUNT = {
  type: RECIPE_ACTIONS.UPDATE_INGREDIENT_AMOUNT;
  payload: { id: number; payload: number };
};
type UPDATE_INGREDIENT_UNIT = {
  type: RECIPE_ACTIONS.UPDATE_INGREDIENT_UNIT;
  payload: { id: number; payload: string };
};
type UPDATE_INGREDIENT_NAME = {
  type: RECIPE_ACTIONS.UPDATE_INGREDIENT_NAME;
  payload: { id: number; payload: string };
};
type ADD_NEW_METHOD = { type: RECIPE_ACTIONS.ADD_NEW_METHOD };
type REMOVE_METHOD = { type: RECIPE_ACTIONS.REMOVE_METHOD; payload: number };
type UPDATE_METHOD = {
  type: RECIPE_ACTIONS.UPDATE_METHOD;
  payload: { id: number; method: string };
};

export type RecipeAction =
  | LOAD_SUCCESS
  | UPDATE_RECIPE_NAME
  | UPDATE_LABELS
  | UPDATE_SERVINGS
  | ADD_NEW_INGREDIENT
  | REMOVE_INGREDIENT_LIST
  | UPDATE_INGREDIENT_AMOUNT
  | UPDATE_INGREDIENT_UNIT
  | UPDATE_INGREDIENT_NAME
  | ADD_NEW_METHOD
  | REMOVE_METHOD
  | UPDATE_METHOD;

export type RecipeState = {
  isLoading: boolean;
  error: string;
  recipe: RecipeDto;
};

export const recipeReducer = (
  recipeState: RecipeState,
  action: RecipeAction
) => {
  switch (action.type) {
    case RECIPE_ACTIONS.LOAD_SUCCESS: {
      return { ...recipeState, isLoading: false, recipe: action.payload };
    }

    case RECIPE_ACTIONS.UPDATE_RECIPE_NAME: {
      return {
        ...recipeState,
        recipe: { ...recipeState.recipe, name: action.payload },
      };
    }

    case RECIPE_ACTIONS.UPDATE_LABELS: {
      if (recipeState.recipe.labels.includes(action.payload)) {
        const newLabels = recipeState.recipe.labels.filter(
          (label) => label !== action.payload
        );
        return {
          ...recipeState,
          recipe: {
            ...recipeState.recipe,
            labels: newLabels,
          },
        };
      }
      return {
        ...recipeState,
        recipe: {
          ...recipeState.recipe,
          labels: [...recipeState.recipe.labels, action.payload],
        },
      };
    }

    case RECIPE_ACTIONS.UPDATE_SERVINGS: {
      return {
        ...recipeState,
        recipe: { ...recipeState.recipe, servings: action.payload },
      };
    }

    default:
      return recipeState;
  }
};

export const recipeInitialState = {
  isLoading: true,
  error: "",
  recipe: {} as RecipeDto,
};

export const recipeSampleState = {
  isLoading: false,
  error: "",
  recipe: sampleRecipe,
};

export const RecipeContext = createContext<{
  recipeState: RecipeState;
  dispatch: React.Dispatch<RecipeAction>;
}>({ recipeState: recipeInitialState, dispatch: () => {} });
