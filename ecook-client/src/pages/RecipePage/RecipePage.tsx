import "./RecipePage.css";
import { IoCaretBack } from "react-icons/io5";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SampleSingleRecipe, sampleSingleRecipe } from "../../utils/data";

export const RecipePage = () => {
  type RecipeParams = {
    id: string;
  };
  const { id } = useParams<RecipeParams>();

  const recipe: SampleSingleRecipe = sampleSingleRecipe; //sample data

  const navigate = useNavigate();
  const [servings, setServings] = useState<number>(recipe.servings);

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

  const renderMethods = () => {
    return recipe.methods.map((method, index) => {
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
          <button className="button">
            DELETE
            <DeleteOutlineOutlinedIcon style={{ fontSize: "1.1rem" }} />
          </button>
          <button className="button">
            EDIT
            <ModeEditOutlinedIcon style={{ fontSize: "1.1rem" }} />
          </button>
        </div>
      </div>
      <h2 className="recipe-name">{recipe.name.toUpperCase()}</h2>
      <div className="ingredient-method">
        <div className="ingredient-container">
          <h3>Ingredients</h3>
          <div>
            For &nbsp;
            <div className="dropdown">
              <button className="dropbtn">{servings}</button>
              <ul className="dropdown-content">{renderServings(10)}</ul>
            </div>
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
    </div>
  );
};
