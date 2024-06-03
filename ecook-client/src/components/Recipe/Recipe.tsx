import "./Recipe.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { LuChefHat } from "react-icons/lu";
import { styles } from "../../utils/styles";
import { useContext } from "react";
import {
  RECIPE_LISTS_ACTIONS,
  RecipeListsContext,
} from "../../contexts/RecipeListsContext";
import { useNavigate } from "react-router-dom";
import { RecipeListDto } from "../../pages/RecipesPage/type";
import { updateFavorite } from "../../utils/api";

type RecipeProps = {
  recipe: RecipeListDto;
};

export const Recipe = (props: RecipeProps) => {
  const { recipeListsState, dispatch } = useContext(RecipeListsContext);
  const navigate = useNavigate();

  return (
    <div className="recipe">
      <LuChefHat style={{ fontSize: "1.5rem" }} />
      <span onClick={() => navigate(`/recipes/${props.recipe.id}`)}>
        {props.recipe.name}
      </span>
      <button
        onClick={() => {
          dispatch({
            type: RECIPE_LISTS_ACTIONS.TOGGLE_FAV,
            payload: props.recipe.id,
          });
          updateFavorite(props.recipe.id, { favorite: !props.recipe.favorite });
        }}
      >
        {props.recipe.favorite ? (
          <FavoriteIcon
            style={{
              color: styles.heartColors[recipeListsState.theme] || "#747474",
            }}
          />
        ) : (
          <FavoriteBorderIcon style={{ color: "#747474" }} />
        )}
      </button>
    </div>
  );
};
