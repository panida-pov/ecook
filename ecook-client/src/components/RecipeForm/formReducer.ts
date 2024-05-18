import { RecipeForm } from "../../utils/data";
import { v4 as uuidv4 } from "uuid";

export const enum FORM_ACTION {
  TOGGLE_FAV,
  UPDATE_LABELS,
  UPDATE_SERVINGS,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
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
type REMOVE_INGREDIENT = {
  type: FORM_ACTION.REMOVE_INGREDIENT;
  payload: string;
};
type ADD_METHOD = { type: FORM_ACTION.ADD_METHOD };
type REMOVE_METHOD = { type: FORM_ACTION.REMOVE_METHOD; payload: string };

export type FormAction =
  | TOGGLE_FAV
  | UPDATE_LABELS
  | UPDATE_SERVINGS
  | ADD_INGREDIENT
  | REMOVE_INGREDIENT
  | ADD_METHOD
  | REMOVE_METHOD;

export const formReducer = (recipe: RecipeForm, action: FormAction) => {
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
          {
            id: uuidv4(),
            value: { name: "", amount: null, unit: "" },
          },
        ],
      };
    }

    case FORM_ACTION.REMOVE_INGREDIENT: {
      const newIngredients = recipe.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
      return { ...recipe, ingredients: newIngredients };
    }

    case FORM_ACTION.ADD_METHOD: {
      return {
        ...recipe,
        methods: [
          ...recipe.methods,
          {
            id: uuidv4(),
            value: "",
          },
        ],
      };
    }

    case FORM_ACTION.REMOVE_METHOD: {
      const newMethods = recipe.methods.filter(
        (method) => method.id !== action.payload
      );
      return { ...recipe, methods: newMethods };
    }

    default:
      return recipe;
  }
};
