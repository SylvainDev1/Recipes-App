export default function RecipeIngredientEdit(props) {
  const { ingredient, handleIngredientChange, handleIngredientDel } = props;

  function handleChange(changes) {
    handleIngredientChange(ingredient.id, { ...ingredient, ...changes });
  }

  return (
    <>
      <input
        className="recipe-edit-input"
        type="text"
        onChange={(e) => handleChange({ name: e.target.value })}
        value={ingredient.name}
      />
      <input
        className="recipe-edit-input"
        type="text"
        onChange={(e) => handleChange({ amount: e.target.value })}
        value={ingredient.amount}
      />
      <button
        className="btn btn-delete"
        onClick={() => handleIngredientDel(ingredient.id)}
      >
        &times;
      </button>
    </>
  );
}
