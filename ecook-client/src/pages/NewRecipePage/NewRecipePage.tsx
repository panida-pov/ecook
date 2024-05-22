import "./NewRecipePage.css";
import { useNavigate } from "react-router-dom";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { RecipeForm } from "../../components/RecipeForm/RecipeForm";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { useEffect, useRef, useState } from "react";
import { RecipeDto } from "../RecipePage/type";

export const NewRecipePage = () => {
  const navigate = useNavigate();
  const [newRecipe, setNewRecipe] = useState<RecipeDto>({
    name: "",
    favorite: false,
    labels: [],
    servings: 1,
    ingredients: [],
    methods: [],
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => console.log(newRecipe), [newRecipe]);

  return (
    <div className="outer-container recipe-page">
      <div className="button-container">
        <h2>
          <TipsAndUpdatesIcon />
          &nbsp; New Recipe
        </h2>
        <div className="button-group">
          <button className="button" onClick={() => navigate("/recipes/all")}>
            CANCEL
          </button>
          <button
            className="button"
            onClick={() => {
              formRef.current?.requestSubmit();
            }}
          >
            SAVE
            <SaveOutlinedIcon
              style={{ fontSize: "1.1rem", marginLeft: "0.2rem" }}
            />
          </button>
        </div>
      </div>
      <RecipeForm
        formRef={formRef}
        recipe={newRecipe}
        updateRecipe={setNewRecipe}
      />
    </div>
  );
};
