import "./RecipesPage.css";
import {
  NavLink,
  Outlet,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import { useContext, useEffect, useReducer } from "react";
import { styles } from "../../utils/styles";
import { LabelsContext } from "../Root/LabelsContext";
import {
  RECIPE_LISTS_ACTIONS,
  RecipeListsContext,
  recipeListsInitialState,
  recipeListsReducer,
} from "./RecipeListsContext";

export const RecipesPage = () => {
  const { labels } = useContext(LabelsContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [recipeListsState, dispatch] = useReducer(
    recipeListsReducer,
    recipeListsInitialState
  );

  useEffect(() => {
    const qLabel = searchParams.get("label") || "all";
    const indexLabel = labels.indexOf(qLabel);
    if (indexLabel >= 0) {
      dispatch({ type: RECIPE_LISTS_ACTIONS.SET_LABEL, payload: qLabel });
      dispatch({ type: RECIPE_LISTS_ACTIONS.SET_THEME, payload: indexLabel });
    } else {
      searchParams.set("label", "all");
      setSearchParams(searchParams);
    }
  }, [labels]);

  return (
    <div className="outer-container">
      <div
        className="recipe-container"
        style={{
          backgroundColor:
            styles.bgColors[recipeListsState.theme] || "rgba(215, 215, 215, 1)",
        }}
      >
        <div className="menu-container">
          <NavLink
            to={`/recipes/all?${createSearchParams({
              label: recipeListsState.label,
            })}`}
            className={({ isActive }) =>
              isActive ? "menu menu-active" : "menu menu-inactive"
            }
          >
            RECIPES
          </NavLink>
          <NavLink
            to={`/recipes/fav?${createSearchParams({
              label: recipeListsState.label,
            })}`}
            className={({ isActive }) =>
              isActive ? "menu menu-active" : "menu menu-inactive"
            }
          >
            FAVORITES
          </NavLink>
        </div>
        <RecipeListsContext.Provider value={{ recipeListsState, dispatch }}>
          <Outlet />
        </RecipeListsContext.Provider>
      </div>
      <div className="labels-container">
        {labels.map((label, index) => {
          return (
            <button
              key={index}
              className="label"
              style={{
                backgroundColor:
                  styles.bgColors[index] || "rgba(215, 215, 215, 1)",
              }}
              onClick={() => {
                dispatch({
                  type: RECIPE_LISTS_ACTIONS.SET_LABEL,
                  payload: label,
                });
                dispatch({
                  type: RECIPE_LISTS_ACTIONS.SET_THEME,
                  payload: index,
                });
                searchParams.set("label", label);
                setSearchParams(searchParams);
              }}
            >
              {label.toUpperCase()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
