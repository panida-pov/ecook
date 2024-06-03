import { RecipeDto } from "../RecipePage/type";

export const enum NEW_RECIPE_ACTIONS {
  UPDATE_RECIPE,
  SET_SAVE,
  SAVE_BEGIN,
  SAVE_SUCCESS,
  OPEN_MODAL,
  CLOSE_MODAL,
}

type UPDATE_RECIPE = {
  type: NEW_RECIPE_ACTIONS.UPDATE_RECIPE;
  payload: RecipeDto;
};
type SET_SAVE = { type: NEW_RECIPE_ACTIONS.SET_SAVE };
type SAVE_BEGIN = { type: NEW_RECIPE_ACTIONS.SAVE_BEGIN };
type SAVE_SUCCESS = { type: NEW_RECIPE_ACTIONS.SAVE_SUCCESS };
type OPEN_MODAL = { type: NEW_RECIPE_ACTIONS.OPEN_MODAL };
type CLOSE_MODAL = { type: NEW_RECIPE_ACTIONS.CLOSE_MODAL };

export type NewRecipeAction =
  | UPDATE_RECIPE
  | SET_SAVE
  | SAVE_BEGIN
  | SAVE_SUCCESS
  | OPEN_MODAL
  | CLOSE_MODAL;

export type NewRecipeState = {
  newRecipe: RecipeDto;
  save: boolean;
  isSaving: boolean;
  modal: boolean;
};

export const newRecipeReducer = (
  newRecipeState: NewRecipeState,
  action: NewRecipeAction
) => {
  switch (action.type) {
    case NEW_RECIPE_ACTIONS.UPDATE_RECIPE: {
      return { ...newRecipeState, newRecipe: action.payload };
    }

    case NEW_RECIPE_ACTIONS.SET_SAVE: {
      return { ...newRecipeState, save: true };
    }

    case NEW_RECIPE_ACTIONS.SAVE_BEGIN: {
      return { ...newRecipeState, isSaving: true };
    }

    case NEW_RECIPE_ACTIONS.SAVE_SUCCESS: {
      return { ...newRecipeState, isSaving: false, save: false };
    }

    case NEW_RECIPE_ACTIONS.OPEN_MODAL: {
      return { ...newRecipeState, modal: true };
    }

    case NEW_RECIPE_ACTIONS.CLOSE_MODAL: {
      return { ...newRecipeState, modal: false };
    }

    default:
      return newRecipeState;
  }
};

export const newRecipeInitialState = {
  newRecipe: {
    name: "",
    favorite: false,
    labels: [],
    servings: 1,
    ingredients: [],
    methods: [],
  },
  save: false,
  isSaving: false,
  modal: false,
};
