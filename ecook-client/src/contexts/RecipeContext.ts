import { createContext } from "react";
import { RecipeDto, sampleRecipe } from "../utils/data";

export const enum RECIPE_ACTIONS {
  LOAD_BEGIN,
  LOAD_SUCCESS,
  UPDATE_RECIPE,
}

type LOAD_BEGIN = { type: RECIPE_ACTIONS.LOAD_BEGIN };
type LOAD_SUCCESS = { type: RECIPE_ACTIONS.LOAD_SUCCESS; payload: RecipeDto };
type UPDATE_RECIPE = { type: RECIPE_ACTIONS.UPDATE_RECIPE; payload: RecipeDto };

export type RecipeAction = LOAD_BEGIN | LOAD_SUCCESS | UPDATE_RECIPE;

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
    case RECIPE_ACTIONS.LOAD_BEGIN: {
      return { ...recipeState, isLoading: true };
    }

    case RECIPE_ACTIONS.LOAD_SUCCESS: {
      return { ...recipeState, isLoading: false, recipe: action.payload };
    }

    case RECIPE_ACTIONS.UPDATE_RECIPE: {
      return { ...recipeState, recipe: action.payload };
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
