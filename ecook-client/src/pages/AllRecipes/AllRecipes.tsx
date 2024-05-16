import { useContext } from "react";
import { AddButton } from "../../components/AddButton/AddButton";
import { RecipeList } from "../../components/RecipeList/RecipeList";
import "./AllRecipes.css";
import { RecipeListsContext } from "../../contexts/RecipeListsContext";
import { useNavigate } from "react-router-dom";

export const AllRecipes = () => {
  const { labeledRecipes } = useContext(RecipeListsContext);
  const navigate = useNavigate();

  return (
    <div className="recipe-content">
      <RecipeList
        recipes={labeledRecipes}
        placeHolder="Search in all recipes"
      />
      <div className="add-recipe">
        <AddButton
          onClick={(e) => navigate("/recipes/new")}
          bgColor="#949494"
        />
      </div>
    </div>
  );
};
