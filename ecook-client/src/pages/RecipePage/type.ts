export type Ingredient = { amount: number; unit: string; name: string };

export type RecipeDto = {
  id?: number;
  name: string;
  favorite: boolean;
  labels: string[];
  servings: number;
  ingredients: Array<Ingredient>;
  methods: string[];
};
