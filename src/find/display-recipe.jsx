import React from "react";
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';  // Importing bootstrap components.
import "./find.css"     // page css file.

export function RecipeOutput({ recipe }) {
    return(
        <div>
            <h2>Simple Rice</h2>
            <blockquote>
                <p>Ingredients:</p>
                <ul>
                    <li>Rice</li>
                    <li>Water</li>
                </ul>
                <p>Directions:</p>
                <ol>
                    <li>Measure out rice (example: 1 cup). Add to pot.</li>
                    <li>Wash rice thoroughly.</li>
                    <li>Measure out twice as much water as rice (example: 2 cups). Add to pot.</li>
                    <li>Bring to boil uncovered. Once boiling, cover and put on low heat. Cook until soft.</li>
                    <li>Some experimentation needed.</li>
                    <li>For an easier time, buy a rice cooker.</li>
                </ol>
            </blockquote>
        </div>
    );
}