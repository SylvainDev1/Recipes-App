import { useContext } from "react";
import Recipe from "./Recipe";
import { RecipeContext } from "./App";

export default function RecipeList({ recipes }) {
  const { addRecipe } = useContext(RecipeContext);

  return (
    <div className="recipe-list">
      <div>
        {recipes.map((recipe) => {
          return <Recipe key={recipe.id} {...recipe} />;
        })}
      </div>
      <div className="btn-add-container">
        <button className=" btn btn-add" onClick={addRecipe}>
          Add recipe
        </button>
      </div>
    </div>
  );
}
