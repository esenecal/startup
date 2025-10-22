import React from "react";
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';  // Importing bootstrap components.
import "./find.css"     // page css file.

// import { RecipeOutput } from "./display-recipe";    // For whatever reason, this must be uppercase.

let defaultClickRecipe = (
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

// These are some mock local storage for recipes.
localStorage.setItem("RecipeTitle", "How to Cook Rice!");
localStorage.setItem("Recipe1", "Instructions:");

export function Find() {
    const [clickRecipe, updateRecipe] = React.useState(defaultClickRecipe);
    const [clickFood, updateRandomFood] = React.useState("Bread");  // State for the random food. Default is bread.

    return(
        <div className="body">

            <header>
                <div id="header-text">
                    <h3>Find</h3>
                    <p>Select a tag to randomly search by or a random food</p>
                </div>
            </header>


            <main>
                <div id="find-input">
                    <label htmlFor="tagDropdown">Tag:</label>
                    <select id="tagDropdown" className="form-control mb-3">
                        <option>HOT</option>
                        <option>COLD</option>
                        <option>BREAKFAST</option>
                        <option>LUNCH</option>
                        <option>DINNER</option>
                    </select>
                    <ClickRecipe clickRecipe={clickRecipe} updateRecipe={updateRecipe} />
                    <ClickFood clickFood={clickFood} updateRandomFood={updateRandomFood} />
                </div>
                
                
                <div id="text-retrieved">

                    <div id="recipe-output">

                        <DisplayFood clickFood={clickFood} />
                        <DisplayRecipe clickRecipe={clickRecipe} />

                    </div>

                    
                    {/* <!--Notification Alert. Ideally, this will be off to the side, so CSS will be needed to place this in the correct place.-->
                    <!--Sample Notification alert.--> */}

                    <p id="user-notification" className="form-control border-3 border-success">User 2 just uploaded a COLD recipe!</p>  

                </div>

                

            </main>

        </div>
    );
}

// Create a useEffect for the notification?

// FUNCTIONS FOR FIND RECIPE

// When the Find Recipe button, this updates clickRecipe to a recipe from getRecipe.
function ClickRecipe({clickRecipe, updateRecipe}) {

    function onClicked() {
        const tagValue = document.getElementById("tagDropdown").value;      // Get the current value of the tag.
        // console.log(tagValue);
        updateRecipe(getRecipe(tagValue));      // Set updateRecipe to a recipe
        console.log("Set clickRecipe to new clickRecipe");
    }

    return(<button type="submit" className="btn btn-secondary" onClick={onClicked}>Find Recipe</button>);
}

// Function that gets recipes from database. Right now we are using localstorage.
function getRecipe(tagValue) {

    console.log(TagValue);

    // Code to get a recipe with the correct tag using tagValue. Use an object! recipename: tag?

    let recipeTitle = localStorage.getItem("RecipeTitle");
    let recipeText = localStorage.getItem("Recipe1");
    return (
        <div>
            <h2>{recipeTitle}</h2>
            <blockquote>
                {recipeText}
            </blockquote>
        </div>
    );
}


// Displays clickRecipe
function DisplayRecipe({ clickRecipe }) {
    return(
        <div>
            {clickRecipe}
        </div>
    );
}

// FUNCTIONS FOR RANDOM FOOD

// Function for the button for Random Food
function ClickFood({clickFood, updateRandomFood}) {

    // run when button is clicked.
    function onClicked() {
        console.log("ClickFood clicked");
        updateRandomFood(getRandomFood());      // Updates clickFood to a random food name string returned by getRandomFood
        console.log("clickFood set to " + clickFood);
    }

    return(<button type="submit" className="btn btn-secondary" onClick={onClicked}>Random Food</button>);
}

// MOCK FUNCTION. Gets a random food from an API and returns it as a string.
function getRandomFood() {
    // This is a mock function that will return a random food from an API. This random food will be passed into 
    // updateRandomFood. For now, I am just adding a random number generator to show it's basic funcitonality.

    // Imagine this is returning a random food instead of a random number.
    return Math.random();
}

// This function works to display the random food. We are using a function in case we want to add more functionality.
function DisplayFood({clickFood}) {
    // clickFood contains a string variable containing a random food.
    return (
        <div>
            <h3>{clickFood}</h3>
        </div>
    );
}