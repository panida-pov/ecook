import { createContext } from "react";
import { RecipeListDto, sampleRecipeLists } from "../utils/data";

export const RecipeListsContext = createContext<{
  labeledRecipes: Array<RecipeListDto>;
  toggleFav: (id: number) => void;
  theme: number;
}>({ labeledRecipes: sampleRecipeLists, toggleFav: () => {}, theme: 0 });
