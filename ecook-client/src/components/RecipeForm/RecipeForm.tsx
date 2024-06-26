import "./RecipeForm.css";
import { Ref, useContext, useReducer, useRef } from "react";
import { AddButton } from "../AddButton/AddButton";
import { RemoveButton } from "../RemoveButton/RemoveButton";
import { GiFruitBowl } from "react-icons/gi";
import { GiCampCookingPot } from "react-icons/gi";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { LabelsContext } from "../../contexts/LabelsContext";
import { Dropdown } from "../Dropdown/Dropdown";
import { FORM_ACTION, formReducer } from "./formReducer";
import { v4 as uuidv4 } from "uuid";
import { UniqueIngredient, UniqueMethod } from "./type";
import { RecipeDto } from "../../pages/RecipePage/type";

type RecipeFormProps = {
  formRef: Ref<HTMLFormElement>;
  recipe: RecipeDto;
  updateRecipe: (recipe: RecipeDto) => void;
};

export const RecipeForm = (props: RecipeFormProps) => {
  const { updateRecipe } = props;

  // Create unique id for each ingredient
  const uniqueIngredients: Array<UniqueIngredient> =
    props.recipe.ingredients.map((ingredient) => {
      return {
        id: uuidv4(),
        value: ingredient,
      };
    });
  // Create unique id for each method
  const uniqueMethods: Array<UniqueMethod> = props.recipe.methods.map(
    (method) => {
      return {
        id: uuidv4(),
        value: method,
      };
    }
  );
  // Initilize recipe (internal state)
  const [recipe, dispatch] = useReducer(formReducer, {
    ...props.recipe,
    ingredients: uniqueIngredients,
    methods: uniqueMethods,
  });

  // Dropdown callback for updating number of servings
  const updateServings = (servings: number) => {
    dispatch({ type: FORM_ACTION.UPDATE_SERVINGS, payload: servings });
  };

  // Ref to recipe name input
  const nameInputRef = useRef<HTMLInputElement>(null);
  // Ref to ingredient inputs
  type IngredientInputRef = {
    [id: string]: {
      amount: HTMLInputElement | null;
      unit: HTMLInputElement | null;
      name: HTMLInputElement | null;
    };
  };
  const ingredientInputRef = useRef<IngredientInputRef>({});
  // Ref to method textarea
  type MethodTextRef = {
    [id: string]: HTMLTextAreaElement | null;
  };
  const methodTextRef = useRef<MethodTextRef>({});

  // render label buttons
  const { labels } = useContext(LabelsContext);
  const renderLabels = () => {
    return labels
      .filter((label) => label !== "all")
      ?.map((label) => (
        <button
          key={label}
          type="button"
          className={
            recipe.labels?.includes(label)
              ? "label-button active"
              : "label-button"
          }
          onClick={() =>
            dispatch({ type: FORM_ACTION.UPDATE_LABELS, payload: label })
          }
        >
          {label}
        </button>
      ));
  };
  // render ingredient inputs
  const renderIngredients = () => {
    return recipe.ingredients?.map((ingredient) => {
      return (
        <div key={ingredient.id} className="ingredient-row">
          <input
            ref={(element) =>
              (ingredientInputRef.current[ingredient.id] = {
                ...ingredientInputRef.current[ingredient.id],
                amount: element,
              })
            }
            name="amount-input"
            className="amount"
            type="number"
            placeholder="amt"
            autoComplete="off"
            min="0.01"
            max="99999.99"
            defaultValue={ingredient.value.amount || ""}
            required={true}
            pattern="^\d*(\.\d{0,2})?$"
            step="0.01"
            title="Please enter the positive number with up to two decimal places"
          ></input>
          <input
            ref={(element) =>
              (ingredientInputRef.current[ingredient.id] = {
                ...ingredientInputRef.current[ingredient.id],
                unit: element,
              })
            }
            name="unit-input"
            className="unit"
            type="text"
            placeholder="unit"
            autoComplete="off"
            defaultValue={ingredient.value.unit}
            required={true}
            pattern="^(?!\s*$).+"
            maxLength={50}
            title="Please enter the unit within 50 characters"
          ></input>
          <input
            ref={(element) =>
              (ingredientInputRef.current[ingredient.id] = {
                ...ingredientInputRef.current[ingredient.id],
                name: element,
              })
            }
            name="name-input"
            className="ingredient"
            type="text"
            placeholder="ingredient"
            autoComplete="off"
            defaultValue={ingredient.value.name}
            required={true}
            pattern="^(?!\s*$).+"
            maxLength={50}
            title="Please enter the ingredient name within 50 characters"
          ></input>
          <RemoveButton
            onClick={() =>
              dispatch({
                type: FORM_ACTION.REMOVE_INGREDIENT,
                payload: ingredient.id,
              })
            }
            bgColor="#f4c90a"
          ></RemoveButton>
        </div>
      );
    });
  };
  // render method textareas
  const renderMethods = () => {
    return recipe.methods?.map((method, index) => (
      <div key={method.id} className="method-form">
        <h4 className="text-highlight">STEP {index + 1}</h4>
        <RemoveButton
          onClick={() =>
            dispatch({
              type: FORM_ACTION.REMOVE_METHOD,
              payload: method.id,
            })
          }
          bgColor="#f4c90a"
        ></RemoveButton>
        <textarea
          ref={(element) => (methodTextRef.current[method.id] = element)}
          className="method-input"
          defaultValue={method.value}
          placeholder="Enter a method"
          required={true}
          maxLength={200}
          title="Please enter the method within 200 characters"
        ></textarea>
      </div>
    ));
  };

  // update parent recipe state when submit a form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newIngredients = recipe.ingredients.map((ingredient) => {
      const amountInput =
        ingredientInputRef.current[ingredient.id]?.amount?.value;
      const unitInput = ingredientInputRef.current[ingredient.id]?.unit?.value;
      const nameInput = ingredientInputRef.current[ingredient.id]?.name?.value;

      return {
        amount: parseFloat(amountInput || "") || 0,
        unit: unitInput?.trim() || "-",
        name: nameInput?.trim() || "-",
      };
    });

    const newMethods = recipe.methods.map(
      (method) => methodTextRef.current[method.id]?.value || "-"
    );

    updateRecipe({
      ...props.recipe,
      name: nameInputRef.current?.value.trim() || "",
      favorite: recipe.favorite,
      labels: recipe.labels,
      servings: recipe.servings,
      ingredients: newIngredients,
      methods: newMethods,
    });
  };

  return (
    <form className="dialog" ref={props.formRef} onSubmit={handleSubmit}>
      <div className="recipe-header">
        <input
          ref={nameInputRef}
          className="recipe-name-input"
          placeholder="Enter recipe name"
          autoComplete="off"
          defaultValue={recipe.name}
          required={true}
          pattern="^(?!\s*$).+"
          maxLength={50}
          title="Please enter the recipe name within 50 characters"
        />
        <button
          type="button"
          className={recipe.favorite ? "active" : ""}
          onClick={() => dispatch({ type: FORM_ACTION.TOGGLE_FAV })}
        >
          {recipe.favorite ? (
            <FavoriteIcon style={{ color: "#f4c90a", fontSize: "1.2rem" }} />
          ) : (
            <FavoriteBorderIcon
              style={{ color: "#f4c90a", fontSize: "1.2rem" }}
            />
          )}
        </button>
      </div>

      <div className="labels-group">{renderLabels()}</div>
      <div className="dialog-container">
        <h3>
          <GiFruitBowl style={{ fontSize: "1.4rem" }} />
          &nbsp; Ingredients
        </h3>
        <div>
          For &nbsp;
          <Dropdown state={recipe.servings} setState={updateServings} />
          &nbsp; Servings
        </div>
        <div className="ingredient-table">
          <div className="ingredient-row">
            <span className="amount">Amt</span>
            <span className="unit">Unit</span>
            <span className="ingredient">Ingredient</span>
            <span style={{ visibility: "hidden" }}>
              <RemoveButton onClick={() => {}} />
            </span>
          </div>
          <div>{renderIngredients()}</div>
        </div>
        <AddButton
          onClick={() => dispatch({ type: FORM_ACTION.ADD_INGREDIENT })}
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
          onClick={() => dispatch({ type: FORM_ACTION.ADD_METHOD })}
          bgColor="#f4c90a"
          color="#5f5e5e"
        ></AddButton>
      </div>
    </form>
  );
};
