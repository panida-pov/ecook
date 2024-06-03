import { RecipeDto } from "./type";

export const enum RECIPE_ACTIONS {
  LOAD_BEGIN,
  LOAD_SUCCESS,
  UPDATE_RECIPE,
  SET_EDIT_MODE,
  SET_SAVE,
  SAVE_BEGIN,
  SAVE_SUCCESS,
  OPEN_MODAL,
  CLOSE_MODAL,
}

type LOAD_BEGIN = { type: RECIPE_ACTIONS.LOAD_BEGIN };
type LOAD_SUCCESS = { type: RECIPE_ACTIONS.LOAD_SUCCESS; payload: RecipeDto };
type SET_EDIT_MODE = { type: RECIPE_ACTIONS.SET_EDIT_MODE; payload: boolean };
type UPDATE_RECIPE = { type: RECIPE_ACTIONS.UPDATE_RECIPE; payload: RecipeDto };
type SET_SAVE = { type: RECIPE_ACTIONS.SET_SAVE };
type SAVE_BEGIN = { type: RECIPE_ACTIONS.SAVE_BEGIN };
type SAVE_SUCCESS = { type: RECIPE_ACTIONS.SAVE_SUCCESS };
type OPEN_MODAL = { type: RECIPE_ACTIONS.OPEN_MODAL };
type CLOSE_MODAL = { type: RECIPE_ACTIONS.CLOSE_MODAL };

export type RecipeAction =
  | LOAD_BEGIN
  | LOAD_SUCCESS
  | SET_EDIT_MODE
  | UPDATE_RECIPE
  | SET_SAVE
  | SAVE_BEGIN
  | SAVE_SUCCESS
  | OPEN_MODAL
  | CLOSE_MODAL;

export type RecipeState = {
  isLoading: boolean;
  error: string;
  isEditing: boolean;
  recipe: RecipeDto;
  save: boolean;
  isSaving: boolean;
  modal: boolean;
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

    case RECIPE_ACTIONS.UPDATE_RECIPE: {
      return { ...recipeState, recipe: action.payload };
    }

    case RECIPE_ACTIONS.SET_SAVE: {
      return { ...recipeState, save: true };
    }

    case RECIPE_ACTIONS.SAVE_BEGIN: {
      return { ...recipeState, isSaving: true };
    }

    case RECIPE_ACTIONS.SAVE_SUCCESS: {
      return { ...recipeState, isSaving: false, save: false };
    }

    case RECIPE_ACTIONS.OPEN_MODAL: {
      return { ...recipeState, modal: true };
    }

    case RECIPE_ACTIONS.CLOSE_MODAL: {
      return { ...recipeState, modal: false };
    }

    default:
      return recipeState;
  }
};

export const recipeInitialState = {
  isLoading: false,
  error: "",
  isEditing: false,
  recipe: {} as RecipeDto,
  save: false,
  isSaving: false,
  modal: false,
};
