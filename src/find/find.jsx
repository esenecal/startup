import React from "react";
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';  // Importing bootstrap components.
import "./find.css"     // page css file.

import { RecipeOutput } from "./display-recipe";    // For whatever reason, this must be uppercase.

export function Find() {
    const [clicked, updateClicked] = React.useState(true);
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
                        <option selected>HOT</option>
                        <option>COLD</option>
                        <option>BREAKFAST</option>
                        <option>LUNCH</option>
                        <option>DINNER</option>
                    </select>
                    <ClickRecipe clicked={clicked} updateClicked={updateClicked} />
                    <ClickFood clickFood={clickFood} updateRandomFood={updateRandomFood} />
                </div>
                
                
                <div id="text-retrieved">

                    <div id="recipe-output">
                        <DisplayFood clickFood={clickFood}/>

                        <RecipeOutput />

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

// Function for the button for Random Food
function ClickFood({clickFood, updateRandomFood}) {

    function onClicked() {
        console.log("ClickFood clicked");
        updateRandomFood(getRandomFood());
        console.log("clickFood set to " + clickFood);
    }


    return(<button type="submit" className="btn btn-secondary" onClick={onClicked}>Random Food</button>);
}

function getRandomFood() {
    // This is a mock function that will return a random food from an API. This random food will be passed into 
    // updateRandomFood. For now, I am just adding a random number generator to show it's basic funcitonality.

    return Math.random();
}

// This function works to display the random food.
function DisplayFood({clickFood}) {
    return (
        <div>
            <h3>{`${clickFood}`}</h3>
        </div>
    );
}