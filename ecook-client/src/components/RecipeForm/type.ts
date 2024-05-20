import { Ingredient } from "../../pages/RecipePage/type";

export type UniqueIngredient = {
  id: string;
  value: Ingredient;
};

export type UniqueMethod = {
  id: string;
  value: string;
};

export type FormRecipe = {
  id?: number;
  name: string;
  favorite: boolean;
  labels: string[];
  servings: number;
  ingredients: Array<UniqueIngredient>;
  methods: Array<UniqueMethod>;
};
