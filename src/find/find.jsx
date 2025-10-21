import React from "react";
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';  // Importing bootstrap components.
import "./find.css"     // page css file.

import { RecipeOutput } from "./display-recipe";    // For whatever reason, this must be uppercase.

export function Find() {
    const [clicked, updateClicked] = React.useState(true)

    function DisplayRecipe() {
    if (clicked == true) {
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

                    <DisplayRecipe />
                    
                    {/* <!--Notification Alert. Ideally, this will be off to the side, so CSS will be needed to place this in the correct place.-->
                    <!--Sample Notification alert.--> */}
                    <p id="user-notification" className="form-control border-3 border-success">User 2 just uploaded a COLD recipe!</p>

                </div>

            </main>

        </div>
    );
}

function ClickRecipe({clicked, updateClicked}) {

    function onClicked() {
        updateClicked(!clicked);
        console.log(clicked);
    }

    return(<button type="submit" className="btn btn-secondary" onClick={onClicked}>Find Recipe</button>);
}