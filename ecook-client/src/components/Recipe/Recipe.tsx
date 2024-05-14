import "./Recipe.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { LuChefHat } from "react-icons/lu";
import { styles } from "../../utils/styles";
import { useContext } from "react";
import { AllRecipesContext } from "../../pages/RecipesPage/AllRecipesContext";
import { SampleRecipe } from "../../utils/data";
import { useNavigate } from "react-router-dom";

type RecipeProps = {
  recipe: SampleRecipe;
};

export const Recipe = (props: RecipeProps) => {
  const { toggleFav, theme } = useContext(AllRecipesContext);
  const navigate = useNavigate();

  return (
    <div className="recipe">
      <LuChefHat style={{ fontSize: "1.5rem" }} />
      <span onClick={() => navigate(`/recipes/${props.recipe.id}`)}>
        {props.recipe.name}
      </span>
      <button onClick={() => toggleFav(props.recipe.id)}>
        {props.recipe.favorite ? (
          <FavoriteIcon
            style={{ color: styles.heartColors[theme] || "#747474" }}
          />
        ) : (
          <FavoriteBorderIcon style={{ color: "#747474" }} />
        )}
      </button>
    </div>
  );
};
