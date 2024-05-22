import "./RecipePage.css";
import { useEffect, useReducer, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { RecipeForm } from "../../components/RecipeForm/RecipeForm";
import {
  RECIPE_ACTIONS,
  recipeReducer,
  recipeSampleState,
} from "./recipeReducer";
import { IoCaretBack } from "react-icons/io5";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

type RecipeParams = {
  id: string;
};

export const RecipePage = () => {
  const { id } = useParams<RecipeParams>();
  const [recipeState, dispatch] = useReducer(recipeReducer, recipeSampleState);
  const { recipe, isEditing } = recipeState;
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => console.log(recipeState), [recipeState]);

  const navigate = useNavigate();
  const [servings, setServings] = useState<number>(recipe.servings);

  const renderMethods = () => {
    return recipeState.recipe.methods.map((method, index) => {
      return (
        <div key={index} className="method">
          <h4 className="text-highlight">STEP {index + 1}</h4>
          <li key={index}>{method}</li>
        </div>
      );
    });
  };

  return (
    <div className="outer-container recipe-page">
      <div className="button-container">
        <button className="button" onClick={() => navigate("/recipes/all")}>
          <IoCaretBack style={{ fontSize: "1.1rem" }} />
          BACK TO RECIPES
        </button>
        <div className="button-group">
          {isEditing ? (
            <>
              <button
                className="button"
                onClick={() =>
                  dispatch({
                    type: RECIPE_ACTIONS.SET_EDIT_MODE,
                    payload: false,
                  })
                }
              >
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
            </>
          ) : (
            <>
              <button className="button">
                DELETE
                <DeleteOutlineOutlinedIcon style={{ fontSize: "1.1rem" }} />
              </button>
              <button
                className="button"
                onClick={() =>
                  dispatch({
                    type: RECIPE_ACTIONS.SET_EDIT_MODE,
                    payload: true,
                  })
                }
              >
                EDIT
                <ModeEditOutlinedIcon style={{ fontSize: "1.1rem" }} />
              </button>
            </>
          )}
        </div>
      </div>
      {isEditing ? (
        <>
          <RecipeForm
            formRef={formRef}
            recipe={recipe}
            updateRecipe={(newRecipe) =>
              dispatch({
                type: RECIPE_ACTIONS.UPDATE_RECIPE,
                payload: newRecipe,
              })
            }
          ></RecipeForm>
        </>
      ) : (
        <>
          <h2 className="recipe-name">{recipe.name.toUpperCase()}</h2>
          <div className="ingredient-method">
            <div className="ingredient-container">
              <h3>Ingredients</h3>
              <div>
                For &nbsp;
                <Dropdown state={servings} setState={setServings} />
                &nbsp; Servings
              </div>
              <table>
                <tbody>
                  {recipe.ingredients.map(({ amount, unit, name }) => {
                    return (
                      <tr key={name}>
                        <td className="text-highlight">
                          {((amount / recipe.servings) * servings)
                            .toFixed(2)
                            .replace(/[.,]00$/, "")}
                          &nbsp; &nbsp;
                          {unit}
                        </td>
                        <td>{name.charAt(0).toUpperCase() + name.slice(1)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="method-container">
              <h3>Methods</h3>
              <ol className="methods">{renderMethods()}</ol>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
