import { RecipeDto } from "./type";
import { sampleRecipe } from "../../utils/data";

export const enum RECIPE_ACTIONS {
  LOAD_BEGIN,
  LOAD_SUCCESS,
  UPDATE_RECIPE,
  SET_EDIT_MODE,
  SET_SAVING,
}

type LOAD_BEGIN = { type: RECIPE_ACTIONS.LOAD_BEGIN };
type LOAD_SUCCESS = { type: RECIPE_ACTIONS.LOAD_SUCCESS; payload: RecipeDto };
type SET_EDIT_MODE = { type: RECIPE_ACTIONS.SET_EDIT_MODE; payload: boolean };
type SET_SAVING = { type: RECIPE_ACTIONS.SET_SAVING; payload: boolean };
type UPDATE_RECIPE = { type: RECIPE_ACTIONS.UPDATE_RECIPE; payload: RecipeDto };

export type RecipeAction =
  | LOAD_BEGIN
  | LOAD_SUCCESS
  | SET_EDIT_MODE
  | SET_SAVING
  | UPDATE_RECIPE;

export type RecipeState = {
  isLoading: boolean;
  error: string;
  isEditing: boolean;
  isSaving: boolean;
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

    case RECIPE_ACTIONS.SET_EDIT_MODE: {
      return { ...recipeState, isEditing: action.payload };
    }

    case RECIPE_ACTIONS.SET_SAVING: {
      return { ...recipeState, isSaving: action.payload };
    }

    case RECIPE_ACTIONS.UPDATE_RECIPE: {
      return { ...recipeState, recipe: action.payload };
    }

    default:
      return recipeState;
  }
};

export const recipeSampleState = {
  isLoading: false,
  error: "",
  isEditing: false,
  isSaving: false,
  recipe: sampleRecipe,
};
