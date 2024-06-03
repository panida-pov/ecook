import React, { createContext } from "react";
import { RecipeListDto } from "../pages/RecipesPage/type";

export type RecipeListsState = {
  isLoading: boolean;
  error: string;
  recipeLists: Array<RecipeListDto>;
  label: string;
  theme: number;
};

export const enum RECIPE_LISTS_ACTIONS {
  LOAD_BEGIN,
  LOAD_SUCCESS,
  TOGGLE_FAV,
  SET_LABEL,
  SET_THEME,
}

type LOAD_BEGIN = { type: RECIPE_LISTS_ACTIONS.LOAD_BEGIN };
type LOAD_SUCCESS = {
  type: RECIPE_LISTS_ACTIONS.LOAD_SUCCESS;
  payload: Array<RecipeListDto>;
};
type TOGGLE_FAV = { type: RECIPE_LISTS_ACTIONS.TOGGLE_FAV; payload: number };
type SET_LABEL = { type: RECIPE_LISTS_ACTIONS.SET_LABEL; payload: string };
type SET_THEME = { type: RECIPE_LISTS_ACTIONS.SET_THEME; payload: number };
type RecipeListsAction =
  | LOAD_BEGIN
  | LOAD_SUCCESS
  | TOGGLE_FAV
  | SET_LABEL
  | SET_THEME;

export const recipeListsReducer = (
  recipeListsState: RecipeListsState,
  action: RecipeListsAction
) => {
  switch (action.type) {
    case RECIPE_LISTS_ACTIONS.LOAD_BEGIN: {
      return { ...recipeListsState, isLoading: true };
    }

    case RECIPE_LISTS_ACTIONS.LOAD_SUCCESS: {
      return {
        ...recipeListsState,
        isLoading: false,
        recipeLists: action.payload,
      };
    }

    case RECIPE_LISTS_ACTIONS.TOGGLE_FAV: {
      const newRecipeLists = recipeListsState.recipeLists.map((list) => {
        return list.id === action.payload
          ? { ...list, favorite: !list.favorite }
          : list;
      });
      return { ...recipeListsState, recipeLists: newRecipeLists };
    }

    case RECIPE_LISTS_ACTIONS.SET_LABEL: {
      return { ...recipeListsState, label: action.payload };
    }

    case RECIPE_LISTS_ACTIONS.SET_THEME: {
      return { ...recipeListsState, theme: action.payload };
    }

    default:
      return recipeListsState;
  }
};

export const recipeListsInitialState = {
  isLoading: false,
  error: "",
  recipeLists: [],
  label: "all",
  theme: 0,
};

export const RecipeListsContext = createContext<{
  recipeListsState: RecipeListsState;
  dispatch: React.Dispatch<RecipeListsAction>;
}>({ recipeListsState: recipeListsInitialState, dispatch: () => {} });
