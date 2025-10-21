import React from "react";
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';  // Importing bootstrap components.
import "./find.css"     // page css file.

import { RecipeOutput } from "./display-recipe";    // For whatever reason, this must be uppercase.

let bool = true;

export function ClickRecipe() {
    const [clicked, updateClicked] = React.useState(true)

    function onClicked() {
        updateClicked(!clicked);
        bool = clicked;
        console.log(bool);
        
    }

    return(<button type="submit" class="btn btn-secondary" onClick={onClicked}>Find Recipe</button>);
}

export function DisplayRecipe() {
    if (bool == true) {
        return (
            <div id="recipe-output">
                <p>hello</p>
                
            </div>
        );
    } else {
        return (
            <div id="recipe-output">
                <p>goodbye</p>
                
            </div>
        );
    }
    
}

export function Find() {
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
                    <label for="tagDropdown">Tag:</label>
                    <select id="tagDropdown" class="form-control mb-3">
                        <option selected>HOT</option>
                        <option>COLD</option>
                        <option>BREAKFAST</option>
                        <option>LUNCH</option>
                        <option>DINNER</option>
                    </select>
                    <ClickRecipe />
                    {/* <button type="submit" class="btn btn-secondary">Find Recipe</button> */}
                    <button type="submit" class="btn btn-secondary">Random Food</button>
                </div>
                
                
                <div id="text-retrieved">

                    <DisplayRecipe />
                    
                    {/* <!--Notification Alert. Ideally, this will be off to the side, so CSS will be needed to place this in the correct place.-->
                    <!--Sample Notification alert.--> */}
                    <p id="user-notification" class="form-control border-3 border-success">User 2 just uploaded a COLD recipe!</p>

                </div>

            </main>

        </div>
    );
}