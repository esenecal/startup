import React from "react";
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';  // Importing bootstrap components.
import "./upload.css"; // page css file


/* Some things to change:
    Change the main header so that it has one picture. Place the page buttons on this header, so that this will not change.

    Then, for a smaller header, you can use the smaller title that describes the page.
*/


/*
Basic flow of use:
A user logs in. They cannot submit the page unless they are authorized (userAuth is true).
When they are logged in, then they can submit the page.
 */
export function Upload() {
    // State for handling the authentication message.
    const [userAuth, updateUserAuth] = React.useState(null);
    const [createUser, updateCreateUser] = React.useState(null);

    return(
        <div className="body">

            <header>

                <div id="header-text">
                    <h3>Upload Recipe</h3>
                    <p>Upload your favorite recipe below!</p>
                </div>

            </header>


            <main>
                {/* Action here runs this function when the form is submitted. */}
                <form id="loginData">
                    <div id="login" className="mb-3">

                        <label htmlFor="userID">User ID</label> 
                        <div className="col-2">
                            <input id="userID" className="form-control" type="text" name="userID" />
                        </div>

                        <label htmlFor="password">&ensp;Password</label> 
                        <div className="col-2">
                            <input id="password" className="form-control" type="password" name="password" />
                        </div>

                        <SubmitID userAuth={userAuth} updateUserAuth={updateUserAuth} />
                        <CreateID createUser={createUser} updateCreateUser={updateCreateUser} />

                        <DisplayAuthMessage userAuth={userAuth} />

                    </div>
                </form>

                    {/* <!--This is example text for when they submit their user credentials, so they know they can proceed--> */}
                    
                <form id="recipeData" action={sendRecipeData}>
                    <div id="recipe-title-input" className="mb-3">
                        <label htmlFor="recipeTitle">Recipe Title&ensp;</label>
                        <div className="col-3">
                            <input id="recipeTitle" className="form-control" type="text" name="recipeTitle" required/>
                        </div>
                    </div>
                    
                    <p>Enter recipe text below. Add a tag that relates to the recipe.</p>

                    <label htmlFor="recipeText"></label>
                    <textarea id="recipeText" className="form-control mb-2" name="recipeText" required>Enter text here...</textarea>

                    {/* <!--Tags will be submitted via a drop down menu--> */}
                    <label htmlFor="tagDropdown">Tag:</label>
                    <select id="tagDropdown" className="form-control mb-3" name="tagDropdown">
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

// In the case that we get the 
function CreateID({userAuth, createUser, updateUserAuth}) {

    let userID;
    function onClick() {
        createNewID();  // All we are doing here is getting the new login data on the click.
    }

    return <button type="button" className="btn btn-secondary" onClick={onClick}>Create ID</button>
}

function SubmitID({userAuth, updateUserAuth}) {

    let userID;
    function onClick() {
        verifyID(userAuth, updateUserAuth);
        console.log("userAuth: " + !userAuth);
    }

    return <button type="button" className="btn btn-primary" onClick={onClick}>Submit ID</button>;

}

// Create a new ID.
function createNewID() {
    sendLoginData();
}

// This is a mock function for login services--this would be replaced by a system to check the login.
function verifyID(userAuth, updateUserAuth) {
    // Sending the data to the server--in actuality, this would be done, then we would hear back if this was correct or not. But it works well enough now.
    sendLoginData();

    // Updates the state.
    let newUserAuth = !userAuth
    updateUserAuth(newUserAuth);    // This would re
}

function DisplayAuthMessage({userAuth}) {
    console.log("updated");
    // If it is updated and userAuth is changed, set the output to that.
    let userID = localStorage.getItem("a");
    console.log(userID);
    
    if (userAuth === null) {
        return <div></div>;
    } else if (userAuth) {
        return <p id="user-alert" className="form-control border-3 border-success">ID submitted! Welcome <strong>{`${userID}`}</strong>!</p>;
    } else {
        return <p id="user-alert" className="form-control border-3 border-danger">Incorrect login</p>;
    }  
}

// Mock function for sending login data to the server.
function sendLoginData() {
    const form = document.getElementById("loginData");
    const formData = new FormData(form);
    let formValues = formData.entries();
    console.log(formValues);
    let formPairs = new Object({});
    for (let pair of formValues) {      // Write each of the key/value pairs to an object.
        console.log(pair[0] + " " + pair[1]);
        formPairs[pair[0]] = pair[1];
    }

    console.log(formPairs);
    // Now we write that object into localstorage, thus allowing us to access it.
    // For this mockup, we are just going to use the  and the text of the recipe.
    localStorage.setItem(formPairs.userID, formPairs.password);
    console.log(localStorage.getItem(formPairs.userID));
}

// This function gets the recipe title, recipe text, and tag and sends it to the database.
// We will use local data for now.
function sendRecipeData() {
    const form = document.getElementById("recipeData");
    const formData = new FormData(form);
    let formValues = formData.entries();
    console.log(formValues);
    let formPairs = new Object({});
    for (let pair of formValues) {      // Write each of the key/value pairs to an object.
        console.log(pair[0] + " " + pair[1]);
        formPairs[pair[0]] = pair[1];
    }

    console.log(formPairs);

    // Now we write that object into localstorage, thus allowing us to access it.
    // For this mockup, we are just going to use the title and the text of the recipe.
    localStorage.setItem(formPairs.recipeTitle, formPairs.recipeText);
    // console.log(localStorage.getItem(formPairs.recipeTitle));
}