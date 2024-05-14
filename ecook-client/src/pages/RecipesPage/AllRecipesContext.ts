import { createContext } from "react";
import { SampleRecipe, sampleRecipes } from "../../utils/data";

export const AllRecipesContext = createContext<{
  labeledRecipes: Array<SampleRecipe>;
  toggleFav: (id: number) => void;
  theme: number;
}>({ labeledRecipes: sampleRecipes, toggleFav: () => {}, theme: 0 });
