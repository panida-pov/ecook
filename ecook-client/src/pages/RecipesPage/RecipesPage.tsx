import {
  NavLink,
  Outlet,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import "./RecipesPage.css";
import { useContext, useEffect, useState } from "react";
import { styles } from "../../utils/styles";
import { SampleRecipe, sampleRecipes } from "../../utils/data";
import { AllRecipesContext } from "./AllRecipesContext";
import { LabelsContext } from "../Root/LabelsContext";

// let counter = 0;
export const RecipesPage = () => {
  // console.log("counting re-renders", (counter += 1));
  const [searchParams, setSearchParams] = useSearchParams();
  const { labels } = useContext(LabelsContext);
  const [queryLabel, setQueryLabel] = useState<string>(
    searchParams.get("label") || "all"
  );
  const [theme, setTheme] = useState<number>(labels.indexOf(queryLabel));

  useEffect(() => {
    if (!labels.includes(queryLabel)) {
      setQueryLabel("all");
      setTheme(0);
      searchParams.set("label", "all");
      setSearchParams(searchParams);
    }
  }, [labels, queryLabel, searchParams, setSearchParams]);

  const [allRecipes, setAllRecipes] =
    useState<Array<SampleRecipe>>(sampleRecipes);

  const toggleFav = (id: number) => {
    const updatedRecipes = allRecipes.map((recipe) => {
      if (recipe.id === id) {
        return { ...recipe, favorite: !recipe.favorite };
      } else {
        return recipe;
      }
    });
    setAllRecipes(updatedRecipes);
  };

  const labeledRecipes: Array<SampleRecipe> =
    queryLabel === "all"
      ? allRecipes
      : allRecipes.filter((recipe) => recipe.labels.includes(queryLabel));

  return (
    <div className="outer-container">
      <div
        className="recipe-container"
        style={{
          backgroundColor: styles.bgColors[theme] || "rgba(215, 215, 215, 1)",
        }}
      >
        <div className="menu-container">
          <NavLink
            to={`/recipes/all?${createSearchParams({ label: queryLabel })}`}
            className={({ isActive }) =>
              isActive ? "menu menu-active" : "menu menu-inactive"
            }
          >
            RECIPES
          </NavLink>
          <NavLink
            to={`/recipes/fav?${createSearchParams({ label: queryLabel })}`}
            className={({ isActive }) =>
              isActive ? "menu menu-active" : "menu menu-inactive"
            }
          >
            FAVORITES
          </NavLink>
        </div>
        <AllRecipesContext.Provider
          value={{ labeledRecipes, toggleFav, theme }}
        >
          <Outlet />
        </AllRecipesContext.Provider>
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
                setQueryLabel(label);
                setTheme(index);
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
