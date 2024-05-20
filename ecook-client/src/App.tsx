import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";

import { NewRecipePage } from "./pages/NewRecipePage/NewRecipePage";
import { RecipePage } from "./pages/RecipePage/RecipePage";
import { Root } from "./pages/Root/Root";
import { RecipesPage } from "./pages/RecipesPage/RecipesPage";
import { AllRecipes } from "./pages/AllRecipes/AllRecipes";
import { FavRecipes } from "./pages/FavRecipes/FavRecipes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Navigate to="/recipes" />} />
      <Route path="/recipes" element={<RecipesPage />}>
        <Route index element={<Navigate to="/recipes/all" />} />
        <Route path="/recipes/all" element={<AllRecipes />} />
        <Route path="/recipes/fav" element={<FavRecipes />} />
      </Route>
      <Route path="/recipes/new" element={<NewRecipePage />} />
      <Route path="/recipes/:id" element={<RecipePage />} />
      <Route path="*" element={<Navigate to="/recipes" />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
