import "./RecipeList.css";
import { useState } from "react";
import { Recipe } from "../Recipe/Recipe";
import { Searchbar } from "../Searchbar/Searchbar";
import { RecipeListDto } from "../../pages/RecipesPage/type";

type RecipeListProps = {
  recipes: Array<RecipeListDto>;
  placeHolder: string;
};

export const RecipeList = (props: RecipeListProps) => {
  const searchParams = new URLSearchParams(window.location.search);
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || ""
  );

  return (
    <>
      <div className="search-recipe">
        <Searchbar
          search={search}
          setSearch={setSearch}
          placeHolder={props.placeHolder}
        />
      </div>
      <div className="recipe-list">
        {props.recipes
          .filter((recipe) => recipe.name.toLowerCase().includes(search))
          .map((recipe) => {
            return <Recipe key={recipe.id} recipe={recipe}></Recipe>;
          })}
      </div>
    </>
  );
};
