import { RecipeList } from "../../components/RecipeList/RecipeList";
import "./FavRecipes.css";
import { useContext } from "react";
import { AllRecipesContext } from "../RecipesPage/AllRecipesContext";
export const FavRecipes = () => {
  const { labeledRecipes } = useContext(AllRecipesContext);

  return (
    <div className="recipe-content">
      <RecipeList
        recipes={labeledRecipes.filter((recipe) => recipe.favorite === true)}
        placeHolder="Search in favorties"
      />
    </div>
  );
};
