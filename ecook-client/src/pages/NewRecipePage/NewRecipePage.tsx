import "./NewRecipePage.css";
import { useNavigate } from "react-router-dom";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { RecipeForm } from "../../components/RecipeForm/RecipeForm";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { useEffect, useReducer, useRef } from "react";
import {
  NEW_RECIPE_ACTIONS,
  newRecipeInitialState,
  newRecipeReducer,
} from "./newRecipeReducer";
import { addRecipe } from "../../utils/api";
import { isAxiosError } from "axios";
import { Modal } from "../../components/Modal/Modal";
import { Loading } from "../../components/Loading/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NewRecipePage = () => {
  const navigate = useNavigate();
  const [newRecipeState, dispatch] = useReducer(
    newRecipeReducer,
    newRecipeInitialState
  );
  const { newRecipe, save, isSaving, modal } = newRecipeState;

  // Call API to create a new recipe
  useEffect(() => {
    if (save) {
      dispatch({ type: NEW_RECIPE_ACTIONS.SAVE_BEGIN });
      addRecipe(newRecipe)
        .then((data) => {
          toast.success("Successfully created the recipe!", {
            position: "top-right",
            autoClose: 1000,
          });
          setTimeout(() => {
            navigate(`/recipes/${data.id}`);
          }, 500);
        })
        .catch((e) => {
          dispatch({ type: NEW_RECIPE_ACTIONS.SAVE_END });
          toast.error("Error: Cannot create the recipe!", {
            position: "top-right",
            autoClose: false,
          });
          console.error(isAxiosError(e) ? e.response?.data : e);
        });
    }
  }, [newRecipe]);

  // Trigger form submit in RecipeForm
  const formRef = useRef<HTMLFormElement>(null);
  const handleCreateRecipe = () => {
    formRef.current?.requestSubmit();
    dispatch({ type: NEW_RECIPE_ACTIONS.SET_SAVE });
  };

  return (
    <div className="outer-container recipe-page">
      {isSaving ? (
        <Loading color="#fff" message="Creating" />
      ) : (
        <>
          <div className="button-container">
            <h2>
              <TipsAndUpdatesIcon />
              &nbsp; New Recipe
            </h2>
            <div className="button-group">
              <button
                className="button"
                onClick={() =>
                  dispatch({ type: NEW_RECIPE_ACTIONS.OPEN_MODAL })
                }
              >
                SAVE
                <SaveOutlinedIcon
                  style={{ fontSize: "1.1rem", marginLeft: "0.2rem" }}
                />
              </button>
              <button
                className="button"
                onClick={() => navigate("/recipes/all")}
              >
                CANCEL
              </button>
            </div>
          </div>
          <RecipeForm
            formRef={formRef}
            recipe={newRecipe}
            updateRecipe={(newRecipe) =>
              dispatch({
                type: NEW_RECIPE_ACTIONS.UPDATE_RECIPE,
                payload: newRecipe,
              })
            }
          />
          <div className="button-container bottom-button-container">
            <button
              className="button bottom-button"
              onClick={() => dispatch({ type: NEW_RECIPE_ACTIONS.OPEN_MODAL })}
            >
              SAVE
              <SaveOutlinedIcon
                style={{ fontSize: "1.1rem", marginLeft: "0.2rem" }}
              />
            </button>
            <button
              className="button bottom-button"
              onClick={() => navigate("/recipes/all")}
            >
              CANCEL
            </button>
          </div>
        </>
      )}
      {modal && (
        <Modal
          closeModal={() => dispatch({ type: NEW_RECIPE_ACTIONS.CLOSE_MODAL })}
          handleConfirm={handleCreateRecipe}
          message="create a new recipe"
        />
      )}
      <ToastContainer />
    </div>
  );
};
