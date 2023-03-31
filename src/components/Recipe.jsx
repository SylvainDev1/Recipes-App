import IngredientList from "./IngredientList";
import { useContext } from "react";
import { RecipeContext } from "./App";
import image from "../../images/plate.png";

export default function Recipe(props) {
  const { deleteRecipe, handleRecipeSelect } = useContext(RecipeContext);

  const { id, name, servings, cookTime, instructions, ingredients } = props;

  return (
    <section className="recipe">
      <div className="recipe-header">
        <h2 className="recipe-title">{name}</h2>

        <div>
          <button
            onClick={() => handleRecipeSelect(id)}
            className="btn btn-edit"
          >
            Edit
          </button>
          <button onClick={() => deleteRecipe(id)} className="btn btn-delete">
            Delete
          </button>
        </div>
      </div>

      <div className="plateimg">
        <img src="images/plate.png" className="plate" alt="plate" />
      </div>

      <div className="recipe-row">
        <div>
          <span className="recipe-label">Cook Time: </span>
          <span className="recipe-value">{cookTime}</span>
        </div>
        <div>
          <span className="recipe-label">Servings: </span>
          <span className="recipe-value">{servings}</span>
        </div>

        <div className="recipe-row">
          <span className="recipe-label">Instructions:</span>
          <div className="recipe-value recipe-indented instructions">
            {instructions}
          </div>
        </div>
        <div className="recipe-row">
          <span className="recipe-label">Ingredients:</span>
          <div className="recipe-value recipe-indented">
            <IngredientList ingredients={ingredients} />
          </div>
        </div>
      </div>
    </section>
  );
}
