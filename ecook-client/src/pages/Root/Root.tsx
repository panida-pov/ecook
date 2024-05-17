import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import "./Root.css";
import { LabelsContext } from "../../contexts/LabelsContext";
import {
  RecipeContext,
  recipeInitialState,
  recipeReducer,
} from "../../contexts/RecipeContext";
import { useEffect, useReducer, useState } from "react";
import { sampleLabels } from "../../utils/data";

export const Root = () => {
  const [labels, setLabels] = useState<Array<string>>([]);
  const [recipeState, dispatch] = useReducer(recipeReducer, recipeInitialState);

  useEffect(() => setLabels(sampleLabels), []);

  return (
    <div className="root">
      <Header />
      <LabelsContext.Provider value={{ labels }}>
        <RecipeContext.Provider value={{ recipeState, dispatch }}>
          <Outlet />
        </RecipeContext.Provider>
      </LabelsContext.Provider>
    </div>
  );
};
