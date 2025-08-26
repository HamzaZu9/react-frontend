import './Card.css';
import { useState } from "react";
export default function Card(props) {
    const [inputValue, setInputValue] = useState("");
    const [removingIndex, setRemovingIndex] = useState(null);
    const [recipe, setRecipe] = useState('');
    const [loading, setLoading] = useState(false);

    const addIngredient = () => {
        if (inputValue.trim() === "") return;
        props.setIngredients([...props.ingredients, inputValue.trim()]);
        setInputValue("");
    }
    const removeItem = (index) => {
        setRemovingIndex(index);
        setTimeout(() => {

            props.setIngredients(props.ingredients.filter((_, i) => i !== index));
            setRemovingIndex(null);
        }, 300);
    }
    const generateRecipe = async () => {
        const apiUrl = 'https://backend-render-f1nq.onrender.com/api/chat';
        setRecipe('');
        setLoading(true);
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ingredients: props.ingredients }),
            });
            const data = await response.json();
            setRecipe(data.reply);
        } catch (error) {
            console.error('Error generating recipe:', error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <main>
            <div className="card">
                <input
                    className="input"
                    type="text"
                    placeholder="Add Ingredient (e.g., chicken)"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <div className="button-wrapper">
                    <button
                        className="add-button"
                        onClick={addIngredient}>
                        Add Ingredient
                    </button>
                </div>
                <div className="ingredients-list">
                    {props.ingredients.map((ingredient, index) => (
                        <span
                            key={index}
                            className={`ingredient-item ${removingIndex === index ? "removing" : ""}`}
                        >
                            {ingredient}
                            <span
                                className="remove-icon"
                                onClick={() => removeItem(index)}
                            >×</span>
                        </span>
                    ))}
                </div>
                {props.ingredients.length >= 3 && (
                    <button
                        className="generate-recipe"
                        onClick={generateRecipe}
                    >
                        {recipe ? "Get Another Recipe" : "Generate Recipe"}
                    </button>
                )}
                {loading && <div className="spinner"></div>}
                {recipe && (
                    <div className="recipe-section">
                        <h2>Generated Recipe:</h2>
                        {recipe.split('\n').map((line, index) => (
                            <p key={index} className="recipe-text">{line}</p>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}