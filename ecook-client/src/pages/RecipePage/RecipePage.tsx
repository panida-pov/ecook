import "./RecipePage.css";
import { useEffect, useReducer, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { RecipeForm } from "../../components/RecipeForm/RecipeForm";
import {
  RECIPE_ACTIONS,
  recipeReducer,
  recipeInitialState,
} from "./recipeReducer";
import { IoCaretBack } from "react-icons/io5";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { deleteRecipe, getRecipe, updateRecipe } from "../../utils/api";
import { isAxiosError } from "axios";
import { capitalize } from "../../utils/helper";
import { Modal } from "../../components/Modal/Modal";
import { Loading } from "../../components/Loading/Loading";

type RecipeParams = {
  id: string;
};

export const RecipePage = () => {
  const { id } = useParams<RecipeParams>();
  const navigate = useNavigate();

  const [recipeState, dispatch] = useReducer(recipeReducer, recipeInitialState);
  const [servings, setServings] = useState<number>(1);
  //Call API to load recipe during the first render
  useEffect(() => {
    dispatch({ type: RECIPE_ACTIONS.LOAD_BEGIN });
    getRecipe(parseInt(id ?? "0"))
      .then((data) => {
        dispatch({ type: RECIPE_ACTIONS.LOAD_SUCCESS, payload: data });
        setServings(data.servings);
      })
      .catch((e) => console.error(isAxiosError(e) ? e.response?.data : e));
  }, []);

  // Call API to update the recipe when recipe state is updated
  const { recipe, isEditing, save, isSaving, modal } = recipeState;
  useEffect(() => {
    if (save) {
      dispatch({ type: RECIPE_ACTIONS.SAVE_BEGIN });
      updateRecipe(parseInt(id ?? "0"), recipe)
        .then(() => {
          dispatch({ type: RECIPE_ACTIONS.SAVE_SUCCESS });
          dispatch({ type: RECIPE_ACTIONS.SET_EDIT_MODE, payload: false });
          setServings(recipe.servings);
        })
        .catch((e) => console.error(isAxiosError(e) ? e.response?.data : e));
    }
  }, [recipe]);

  // Call API to delete recipe
  const handleDeleteRecipe = () => {
    deleteRecipe(parseInt(id ?? "0"))
      .then(() => navigate("recipes/all"))
      .catch((e) => console.error(isAxiosError(e) ? e.response?.data : e));
  };

  // Trigger form submit in RecipeForm (child component)
  const formRef = useRef<HTMLFormElement>(null);
  const handleSaveRecipe = () => {
    formRef.current?.requestSubmit();
    dispatch({ type: RECIPE_ACTIONS.SET_SAVE });
  };

  const renderMethods = () => {
    return recipeState.recipe.methods?.map((method, index) => {
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
      {recipeState.isLoading ? (
        <Loading color="#fff" />
      ) : isSaving ? (
        <Loading color="#fff" message="Saving" />
      ) : (
        <>
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
                    onClick={() =>
                      dispatch({ type: RECIPE_ACTIONS.OPEN_MODAL })
                    }
                  >
                    SAVE
                    <SaveOutlinedIcon
                      style={{ fontSize: "1.1rem", marginLeft: "0.2rem" }}
                    />
                  </button>
                  {modal && (
                    <Modal
                      closeModal={() =>
                        dispatch({ type: RECIPE_ACTIONS.CLOSE_MODAL })
                      }
                      handleConfirm={handleSaveRecipe}
                      message="save changes"
                    />
                  )}
                </>
              ) : (
                <>
                  <button
                    className="button"
                    onClick={() =>
                      dispatch({ type: RECIPE_ACTIONS.OPEN_MODAL })
                    }
                  >
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
                  {modal && (
                    <Modal
                      closeModal={() =>
                        dispatch({ type: RECIPE_ACTIONS.CLOSE_MODAL })
                      }
                      handleConfirm={handleDeleteRecipe}
                      message="delete this recipe"
                    />
                  )}
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
              <h2 className="recipe-name">{recipe.name?.toUpperCase()}</h2>
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
                      {recipe.ingredients?.map(({ amount, unit, name }) => {
                        return (
                          <tr key={name}>
                            <td className="text-highlight">
                              {((amount / recipe.servings) * servings)
                                .toFixed(2)
                                .replace(/[.,]00$/, "")}
                              &nbsp; &nbsp;
                              {unit}
                            </td>
                            <td>{capitalize(name)}</td>
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
        </>
      )}
    </div>
  );
};
