export class CreateRecipeDto {
  name: string;
  favorite: boolean;
  labels: string[];
  servings: number;
  ingredients: { amount: number; unit: string; name: string }[];
  methods: string[];
}
