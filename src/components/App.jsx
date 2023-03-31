import React, { useEffect, useState } from "react";
import RecipeList from "./RecipeList";
import { v4 as uuidv4 } from "uuid";
import "../CSS/App.css";
import RecipeEdit from "./RecipeEdit";

export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = "recipesReactApp";

function App() {
  const [selectedRecipeId, setSelectedrecipeId] = useState();

  const [recipes, setRecipes] = useState(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (recipeJSON == null) {
      return sampleRecipes;
    } else {
      return JSON.parse(recipeJSON);
    }
  });
  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeId
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = () => {
    const newRecipe = {
      id: uuidv4(),
      name: "",
      servings: 1,
      cookTime: "",
      instructions: "",
      ingredients: [
        {
          id: uuidv4(),
          name: "",
          amount: "",
        },
      ],
    };
    setRecipes([...recipes, newRecipe]);
    handleRecipeSelect(newRecipe.id);
  };

  const deleteRecipe = (id) => {
    if (selectedRecipeId != null && selectedRecipeId === id) {
      setSelectedrecipeId(undefined);
    }
    const newArray = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(newArray);
  };

  const handleRecipeSelect = (id) => {
    setSelectedrecipeId(id);
  };

  const handleRecipeChange = (id, recipe) => {
    const newRecipes = [...recipes];
    const index = newRecipes.findIndex((r) => r.id === id);
    newRecipes[index] = recipe;
    setRecipes(newRecipes);
  };

  const recipeContextValue = {
    addRecipe,
    deleteRecipe,
    handleRecipeSelect,
    handleRecipeChange,
  };
  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  );
}
// Default recipes
const sampleRecipes = [
  {
    id: uuidv4(),
    name: "Spicy Chicken",
    servings: 3,
    cookTime: "1:45",
    instructions:
      "1. Put salt on Chicken\n2. Put chicken in oven\n3. Eat chicken",
    ingredients: [
      {
        id: uuidv4(),
        name: "chicken",
        amount: "600g.",
      },
      {
        id: uuidv4(),
        name: "salt",
        amount: "2 Tbs",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Paprika Pork",
    servings: 4,
    cookTime: "1:00",
    instructions: "1. Put paprika on Pork\n2. Put pork in oven\n3. Eat pork",
    ingredients: [
      {
        id: uuidv4(),
        name: "pork",
        amount: "850g.",
      },
      {
        id: uuidv4(),
        name: "paprika",
        amount: "3 Tbs",
      },
    ],
  },
];

export default App;
