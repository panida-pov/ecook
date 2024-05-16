import { RecipeList } from "../../components/RecipeList/RecipeList";
import "./FavRecipes.css";
import { useContext } from "react";
import { RecipeListsContext } from "../../contexts/RecipeListsContext";
export const FavRecipes = () => {
  const { labeledRecipes } = useContext(RecipeListsContext);

  return (
    <div className="recipe-content">
      <RecipeList
        recipes={labeledRecipes.filter((recipe) => recipe.favorite === true)}
        placeHolder="Search in favorties"
      />
    </div>
  );
};
