import { useNavigate } from "react-router-dom";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { RecipeForm } from "../../components/RecipeForm/RecipeForm";

import "./NewRecipePage.css";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { useEffect, useState } from "react";
import { RecipeDto } from "../../utils/data";

export const NewRecipePage = () => {
  const navigate = useNavigate();
  const [newRecipe, setNewRecipe] = useState<RecipeDto>({
    name: "",
    favorite: false,
    labels: [],
    servings: 1,
    ingredients: [
      {
        name: "soy sauce",
        amount: 1 / 4,
        unit: "cup",
      },
      {
        name: "brown sugar",
        amount: 3,
        unit: "tbsp",
      },
      {
        name: "boil water",
        amount: 1,
        unit: "tbsp",
      },
    ],
    methods: ["Boil the water", "Chop garlics"],
  });

  const [saving, setSaving] = useState<boolean>(false);

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
          <button className="button" onClick={() => setSaving(!saving)}>
            SAVE
            <SaveOutlinedIcon
              style={{ fontSize: "1.1rem", marginLeft: "0.2rem" }}
            />
          </button>
        </div>
      </div>
      <RecipeForm
        saving={saving}
        recipe={newRecipe}
        updateRecipe={setNewRecipe}
      />
    </div>
  );
};
