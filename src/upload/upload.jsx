import React from "react";
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';  // Importing bootstrap components.
import "./upload.css"; // page css file

// localStorage.clear();   

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

    // In the case that we get the 
    function CreateID() {
        function onClick() {
            sendLoginData();
            updateUserAuth(true);       // When we create an ID, we assume they are also signing in.
        }

        return <button type="button" className="btn btn-secondary" onClick={onClick}>Create ID</button>
    }

    function SubmitID() {

        function onClick() {
            verifyID(userAuth, updateUserAuth);
            console.log(userAuth);
            printLocalStorage();

        }

        return <button type="button" className="btn btn-primary" onClick={onClick}>Submit ID</button>;

    }

    // This is a mock function for login services--this would be replaced by a system to check the login.
    function verifyID() {
        // Here, we have code that interacts with the server to ensure that we have a correct login.
        // Here, what we will do is make sure that the user credentials submitted by SubmitID equal
        // the credentials submitted by CreateID.
        
        // Since we are working with localStorage, the credentials will be overwritten everytime CreateID is clicked,
        // But that is unfortunately the limitations of the mockup.

        // Save submitted user information to temporary localStorage. Then check it with the localStorage created by 
        // CreateID.
        const form = document.getElementById("loginData");
        const formData = new FormData(form);
        let formValues = formData.entries();
        // console.log(formValues);

        for (let pair of formValues) {      // Write each of the key/value pairs to local storage WITH a -temp added to the key.
            // console.log(pair[0] + " " + pair[1]);
            localStorage.setItem(pair[0] + "-temp", pair[1]);
        }

        let tempUserID = localStorage.getItem("userID-temp");
        let tempPassword = localStorage.getItem("password-temp");
        let userID = localStorage.getItem("userID");
        let password = localStorage.getItem("password");

        // Update the state.
        if (tempUserID == "" && tempPassword == "") {   // if the credentials are blank, even if they match, it's false. 
            updateUserAuth(false);
        } else if (tempUserID == userID && tempPassword == password) {
            updateUserAuth(true);
        } else {
            updateUserAuth(false);
        }
        
    }

    function DisplayAuthMessage() {
        console.log("updated");
        console.log(userAuth);

        // If it is updated and userAuth is changed, set the output to that.
        // This gets the user
        let userID = localStorage.getItem("userID");
        // console.log(userID); 
        
        if (userAuth == null) {        // At the start, this is blank.
            return <div></div>;
        } else if (userAuth === true) {
            return <p id="user-alert" className="form-control border-3 border-success">ID submitted! Welcome <strong>{`${userID}`}</strong>!</p>;
        } else {
            return <p id="user-alert" className="form-control border-3 border-danger">Incorrect login</p>;
        }  
    }

    // Mock function for sending login data to the server.
    // Write now, we are just writing each value to a key that describes it. Of course, this means we only get
    // One set of data, but this is good enough for our mockup.
    function sendLoginData() {
        const form = document.getElementById("loginData");
        const formData = new FormData(form);
        let formValues = formData.entries();
        console.log(formValues);

        // console.log(formValues);
        for (let pair of formValues) {      // Write each of the key/value pairs to localStorage

            // console.log(pair[0] + " " + pair[1]);
            localStorage.setItem(pair[0], pair[1]);
        }
    }

    // This function gets the recipe title, recipe text, and tag and sends it to the database.
    // We will use local data for now.
    function sendRecipeData() {

        if (!userAuth) {        // If the user has not logged in, then we will not send the recipe data.
            return;
        }

        const form = document.getElementById("recipeData");
        const formData = new FormData(form);
        let formValues = formData.entries();
        // console.log(formValues);
        
        for (let pair of formValues) {      // Write each of the key/value pairs to localStorage.
            console.log(pair[0] + " " + pair[1]);
            localStorage.setItem(pair[0], pair[1]);
        }

        // Now we write that object into localstorage, thus allowing us to access it.
        // For this mockup, we are just going to use the title and the text of the recipe.
        printLocalStorage();
    }

    // function for checking what is in local storage. Debugging.
    function printLocalStorage() {
        console.log("LOCAL STORAGE ---------------------------");
        for (let i = 0; i < localStorage.length; i++) {
            console.log(localStorage.key(i) + ": " + localStorage.getItem(localStorage.key(i)));
        }
        console.log("-----------------------------------------");
    }

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
                            <input id="userID" className="form-control" type="text" name="userID" required/>
                        </div>

                        <label htmlFor="password">&ensp;Password</label> 
                        <div className="col-2">
                            <input id="password" className="form-control" type="password" name="password" required/>
                        </div>

                        <SubmitID />
                        <CreateID />

                        <DisplayAuthMessage />

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
                        <button id="submitRecipeData" type="submit" className="btn btn-primary">Submit</button>
                        <button type="reset" className="btn btn-secondary">Clear</button>
                    </div>
                </form>
            </main>
        </div>
    );
}