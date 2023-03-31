import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import { RecipeContext } from "./App";

export default function RecipeEdit({ recipe }) {
  const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext);

  function handleChange(changes) {
    handleRecipeChange(recipe.id, { ...recipe, ...changes });
  }

  function handleIngredientChange(id, ingredient) {
    const newIngredients = [...recipe.ingredients];
    const index = newIngredients.findIndex((i) => i.id === id);
    newIngredients[index] = ingredient;
    handleChange({ ingredients: newIngredients });
  }

  function handleIngredientAdd() {
    const newIngredient = {
      id: uuidv4(),
      name: "",
      amount: "",
    };
    handleChange({ ingredients: [...recipe.ingredients, newIngredient] });
  }

  function handleIngredientDel(id) {
    handleChange({
      ingredients: recipe.ingredients.filter((i) => i.id !== id),
    });
  }
  return (
    <div className="recipe-edit  ">
      <div className="recipe-edit-remove">
        <button
          className="btn recipe-edit-remove-button"
          onClick={() => handleRecipeSelect(undefined)}
        >
          &times;
        </button>
      </div>
      <div className="recipe-edit-details-grid">
        <label htmlFor="name" className="recipe-edit-label">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={recipe.name}
          onChange={(e) => handleChange({ name: e.target.value })}
          className="recipe-edit-input"
        />
        <label htmlFor="cooktime" className="recipe-edit-label">
          Cook Time
        </label>
        <input
          type="text"
          name="cooktime"
          id="cooktime"
          value={recipe.cookTime}
          onChange={(e) => handleChange({ cookTime: e.target.value })}
          className="recipe-edit-input"
        />
        <label htmlFor="Servings" className="recipe-edit-label">
          Servings
        </label>
        <input
          type="number"
          min="1"
          name="servings"
          id="servings"
          value={recipe.servings}
          onChange={(e) =>
            handleChange({ servings: e.target.valueAsNumber || "" })
          }
          className="recipe-edit-input"
        />
        <label htmlFor="instructions" className="recipe-edit-label">
          Instructions
        </label>
        <textarea
          name="instructions"
          className="recipe-edit-input"
          id="instructions"
          onChange={(e) => handleChange({ instructions: e.target.value })}
          value={recipe.instructions}
        />
      </div>

      <br />
      <label className="recipe-edit-label">Ingredients</label>
      <div className="recipe-edit-ingredient-grid">
        <div>Name</div>
        <div>Amount</div>
        <div></div>
        {recipe.ingredients.map((ingredient) => (
          <RecipeIngredientEdit
            key={ingredient.id}
            ingredient={ingredient}
            handleIngredientChange={handleIngredientChange}
            handleIngredientDel={handleIngredientDel}
          />
        ))}
      </div>

      <div className="recipe-edit-add-ingredient-btn-container">
        <button className="btn btn-add" onClick={() => handleIngredientAdd()}>
          Add Ingredient
        </button>
      </div>
    </div>
  );
}
