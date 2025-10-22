import React from "react";
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';  // Importing bootstrap components.
import "./upload.css"; // page css file


/* Some things to change:
    Change the main header so that it has one picture. Place the page buttons on this header, so that this will not change.

    Then, for a smaller header, you can use the smaller title that describes the page.
*/

export function Upload() {
    return(
        <div className="body">

            <header>

                <div id="header-text">
                    <h3>Upload Recipe</h3>
                    <p>Upload your favorite recipe below!</p>
                </div>

            </header>


            <main>
                <form>
                    <div id="login" className="mb-3">

                        <label htmlFor="userID">User ID</label> 
                        <div className="col-2">
                            <input id="userID" className="form-control" type="text" name="userID" required/>
                        </div>

                        <label htmlFor="password">&ensp;Password</label> 
                        <div className="col-2">
                            <input id="password" className="form-control" type="password" name="password" required/>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit ID</button>
                        <button type="submit" className="btn btn-secondary">Create ID</button>


                        <p id="user-alert" className="form-control border-3 border-success">ID submitted! Welcome <strong>USER1</strong>!</p>
                        <p id="user-alert" className="form-control border-3 border-danger">Incorrect login</p>

                    </div>

                    {/* <!--This is example text for when they submit their user credentials, so they know they can proceed--> */}
                    
                    


                    
                    <div id="recipe-title-input" className="mb-3">
                        <label htmlFor="recipeTitle">Recipe Title&ensp;</label>
                        <div className="col-3">
                            <input id="recipeTitle" className="form-control" type="text" name="recipeTitle" required/>
                        </div>
                    </div>
                    
                    <p>Enter recipe text below. Add a tag that relates to the recipe.</p>

                    <label htmlFor="recipeText"></label>
                    <textarea id="recipeText" className="form-control mb-2" required>Enter text here...</textarea>

                    {/* <!--Tags will be submitted via a drop down menu--> */}
                    <label htmlFor="tagDropdown">Tag:</label>
                    <select id="tagDropdown" className="form-control mb-3">
                        <option selected>HOT</option>
                        <option>COLD</option>
                        <option>BREAKFAST</option>
                        <option>LUNCH</option>
                        <option>DINNER</option>
                    </select>

                    <div id="submit-buttons">
                    {/* <!--Submit will submit the text to the server. Reset will clear it.--> */}
                        {/* The clear button can remain--it does its job. */}
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button type="reset" className="btn btn-secondary">Clear</button>
                    </div>
                </form>
            </main>
        </div>
    );
}