import "./RecipeForm.css";
import { useContext, useEffect, useState } from "react";
import { AddButton } from "../../components/AddButton/AddButton";
import { RemoveButton } from "../../components/RemoveButton/RemoveButton";
import { GiFruitBowl } from "react-icons/gi";
import { GiCampCookingPot } from "react-icons/gi";
import { RECIPE_ACTIONS, RecipeContext } from "../../contexts/RecipeContext";
import { LabelsContext } from "../../contexts/LabelsContext";
import { Dropdown } from "../Dropdown/Dropdown";

export const RecipeForm = () => {
  const { recipeState, dispatch } = useContext(RecipeContext);
  const { recipe } = recipeState;
  const { labels } = useContext(LabelsContext);

  console.log("from rendered");

  const [servings, setServings] = useState<number>(recipe.servings);
  useEffect(
    () => dispatch({ type: RECIPE_ACTIONS.UPDATE_SERVINGS, payload: servings }),
    [servings]
  );

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
          onClick={() => console.log("click")}
          bgColor="#f4c90a"
        ></RemoveButton>
      </div>
    ));
  };

  const renderLabels = () => {
    return labels
      .filter((label) => label !== "all")
      .map((label) => (
        <button
          key={label}
          className={
            recipe.labels.includes(label)
              ? "label-button active"
              : "label-button"
          }
          onClick={() => {
            dispatch({ type: RECIPE_ACTIONS.UPDATE_LABELS, payload: label });
          }}
        >
          {label}
        </button>
      ));
  };

  const renderMethods = () => {
    return recipe.methods.map((method, index) => (
      <div key={index} className="method">
        <h4 className="text-highlight">STEP {index + 1}</h4>
        <textarea className="method-input">{method}</textarea>
      </div>
    ));
  };
  return (
    <div className="dialog">
      <input
        className="recipe-name-input"
        placeholder="Enter recipe name"
        value={recipe.name}
        onChange={(e) =>
          dispatch({
            type: RECIPE_ACTIONS.UPDATE_RECIPE_NAME,
            payload: e.target.value,
          })
        }
      />
      <div className="labels-group">{renderLabels()}</div>
      <div className="dialog-container">
        <h3>
          <GiFruitBowl style={{ fontSize: "1.4rem" }} />
          &nbsp; Ingredients
        </h3>
        <div>
          For &nbsp;
          <Dropdown state={recipe.servings ?? 1} setState={setServings} />
          &nbsp; Servings
        </div>
        <div className="ingredient-table">
          <div className="ingredient-row">
            <span className="amount">Amt</span>
            <span className="unit">Unit</span>
            <span className="ingredient">Ingredient</span>
          </div>
          <div>{renderIngredients()}</div>
        </div>
        <AddButton
          onClick={() => {}}
          bgColor="#f4c90a"
          color="#5f5e5e"
        ></AddButton>
      </div>

      <div className="dialog-container">
        <h3>
          <GiCampCookingPot style={{ fontSize: "1.4rem" }} />
          &nbsp;Methods
        </h3>
        <div>{renderMethods()}</div>
        <AddButton
          onClick={() => {}}
          bgColor="#f4c90a"
          color="#5f5e5e"
        ></AddButton>
      </div>
    </div>
  );
};
