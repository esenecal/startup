import React from "react";
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';  // Importing bootstrap components.
// import "/src/app.css"    // main css file
import "./find.css"     // page css file.

export function Find() {
    return(
        <div className="body">
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
                    <button type="submit" class="btn btn-secondary">Find Recipe</button>
                    <button type="submit" class="btn btn-secondary">Random Food</button>
                </div>
                
                <div id="text-retrieved">

                    <div id="recipe-output">
                        {/* <!--Recipe Text will be here. The below is a sample recipe text.-->
                        <!--The blockquote is to show how this text should be indented. CSS can be used to implement this.-->
                        <!--If the user instead selects Random Food, then a random food name will be displayed instead.-->

                        <!--This is a placeholder for the third-party API access.--> */}
                        <h3>Example Random Food: Goulash</h3>

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

                    {/* <!--Notification Alert. Ideally, this will be off to the side, so CSS will be needed to place this in the correct place.-->
                    <!--Sample Notification alert.--> */}
                    <p id="user-alert" class="form-control border-3 border-success">User 2 just uploaded a COLD recipe!</p>

                </div>

            </main>

        </div>
    );
}