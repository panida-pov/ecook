import "./FavRecipes.css";
import { RecipeList } from "../../components/RecipeList/RecipeList";
import { useContext } from "react";
import { RecipeListsContext } from "../../contexts/RecipeListsContext";

export const FavRecipes = () => {
  const { recipeListsState } = useContext(RecipeListsContext);

  return (
    <div className="recipe-content">
      <RecipeList
        recipes={recipeListsState.recipeLists.filter((list) => {
          if (recipeListsState.label === "all") {
            return list.favorite === true;
          }
          return (
            list.favorite === true &&
            list.labels.includes(recipeListsState.label)
          );
        })}
        placeHolder="Search in favorties"
      />
    </div>
  );
};
