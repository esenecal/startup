import React from "react";
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';  // Importing bootstrap components.
import "./find.css"     // page css file.

import { RecipeOutput } from "./display-recipe";    // For whatever reason, this must be uppercase.

export function Find() {
    const [clicked, updateClicked] = React.useState(true)

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
                        <option selected>HOT</option>
                        <option>COLD</option>
                        <option>BREAKFAST</option>
                        <option>LUNCH</option>
                        <option>DINNER</option>
                    </select>
                    <ClickRecipe clicked={clicked} updateClicked={updateClicked} />
                    {/* <button type="submit" class="btn btn-secondary">Find Recipe</button> */}
                    <button type="submit" className="btn btn-secondary">Random Food</button>
                </div>
                
                
                <div id="text-retrieved">

                    <div id="recipe-output">
                        <DisplayFood clicked={clicked}/>

                        <DisplayRecipe clicked={clicked} />

                    </div>

                    
                    {/* <!--Notification Alert. Ideally, this will be off to the side, so CSS will be needed to place this in the correct place.-->
                    <!--Sample Notification alert.--> */}

                    <p id="user-notification" className="form-control border-3 border-success">User 2 just uploaded a COLD recipe!</p>  

                </div>

                

            </main>

        </div>
    );
}

// this function handles the button click for Find Recipe.
function ClickRecipe({clicked, updateClicked}) {

    function onClicked() {
        updateClicked(!clicked);
        console.log(clicked);
    }

    return(<button type="submit" className="btn btn-secondary" onClick={onClicked}>Find Recipe</button>);
}

// This function works to display the random food.
function DisplayFood({clicked}) {
    if (clicked == true) {
        return(<div></div>);
    } else {
        return(
            <div>
                <h3>Example Random Food: Goulash</h3>
            </div>
        );
    }
    
}

// This function works to display recipe.
function DisplayRecipe({clicked}) {
    if (clicked == true) {
        return (
            <div>
                
                {/* <!--Recipe Text will be here. The below is a sample recipe text.-->
                <!--The blockquote is to show how this text should be indented. CSS can be used to implement this.-->
                <!--If the user instead selects Random Food, then a random food name will be displayed instead.-->

                <!--This is a placeholder for the third-party API access.--> */}

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
    } else {
        return (
            <p>goodbye</p>   
        );
    }
    
}