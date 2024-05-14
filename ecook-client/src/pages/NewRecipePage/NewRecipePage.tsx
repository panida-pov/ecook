import "./NewRecipePage.css";
import { IoCaretBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useState } from "react";
import { SampleSingleRecipe, sampleSingleRecipe } from "../../utils/data";
import { AddButton } from "../../components/AddButton/AddButton";
import { RemoveButton } from "../../components/RemoveButton/RemoveButton";

export const NewRecipePage = () => {
  const navigate = useNavigate();

  //(repeated) calculate the correct servings
  const [servings, setServings] = useState<number>(1);

  const renderServings = (range: number) => {
    const lists = [];
    for (let i = 1; i <= range; i++) {
      lists.push(
        <li key={i} onClick={() => setServings(i)}>
          {i}
        </li>
      );
    }
    return lists;
  };

  const [recipe, setRecipe] = useState<SampleSingleRecipe>(sampleSingleRecipe);

  const renderIngredients = () => {
    return recipe?.ingredients.map((ingredient) => (
      <div key={ingredient.name} className="ingredient-row">
        <input
          className="amount"
          type="number"
          placeholder="amt"
          value={ingredient.amount}
        ></input>
        <input
          className="unit"
          type="text"
          placeholder="unit"
          value={ingredient.unit}
        ></input>
        <input
          className="ingredient"
          type="text"
          placeholder="ingredient"
          value={ingredient.name}
        ></input>
        <RemoveButton
          type="button"
          onClick={() => console.log("click")}
        ></RemoveButton>
      </div>
    ));
  };

  const labels = ["all", "thai", "asian", "western", "dessert", "others"];

  const renderLabels = () => {
    return labels.map((label) => <button>{label}</button>);
  };

  const renderMethods = () => {
    return recipe.methods.map((method, index) => (
      <div key={index} className="method">
        <h4 className="text-highlight">STEP {index + 1}</h4>
        <div>{method}</div>
      </div>
    ));
  };

  return (
    <form className="outer-container recipe-page">
      <div className="button-container">
        <button className="button" onClick={() => navigate("/recipes/all")}>
          <IoCaretBack style={{ fontSize: "1.1rem" }} />
          BACK TO RECIPES
        </button>
        <div className="button-group">
          <button className="button">CANCEL</button>
          <button className="button">
            SAVE
            <SaveOutlinedIcon
              style={{ fontSize: "1.1rem", marginLeft: "0.2rem" }}
            />
          </button>
        </div>
      </div>
      <div className="dialog">
        <input className="recipe-name-input" placeholder="Enter recipe name" />
        <div>{renderLabels()}</div>

        <div className="dialog-container">
          <h3>Ingredients</h3>
          <div>
            For &nbsp;
            <div className="dropdown">
              <button className="dropbtn">{servings}</button>
              <ul className="dropdown-content">{renderServings(10)}</ul>
            </div>
            &nbsp; Servings
          </div>
          <div className="ingredient-row">
            <span className="amount">Amt</span>
            <span className="unit">Unit</span>
            <span className="ingredient">Ingredient</span>
          </div>
          <div>{renderIngredients()}</div>
          <AddButton
            onClick={() =>
              setRecipe({
                ...recipe,
                ingredients: [
                  ...recipe.ingredients,
                  { name: "", amount: 1, unit: "" },
                ],
              })
            }
          ></AddButton>
        </div>

        <div className="dialog-container">
          <h3>Methods</h3>
          <div className="methods">{renderMethods()}</div>
          <AddButton onClick={() => {}}></AddButton>
        </div>
      </div>
    </form>
  );
};
