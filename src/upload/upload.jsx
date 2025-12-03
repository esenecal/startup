import React from "react";
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';  // Importing bootstrap components.
import "./upload.css"; // page css file

export function Upload({ webSocket }) {
    
    // State for handling the authentication message.
    const [email, setEmail] = React.useState('');       // State and state functions for login.
    const [password, setPassword] = React.useState('');
    const [userInfo, setUserInfo] = React.useState(false);

    // state for the notification (websocket)
    const [notif, setNotif] = React.useState('');

    function sendNotif(tag) {
        webSocket.sendNotification(email, tag);
        setNotif('');
    }

    function CreateID() {
        function onClick() {
            if(email === '' || password === '') {
                alert("Please enter valid credentials.");
                return;
            } else {
                createAuth('POST');
            }
            
        }

        return <button type="button" className="btn btn-secondary" onClick={onClick}>Create ID</button>
    }

    function SubmitID() {

        async function onClick() {
            if(email === '' || password === ''){
                alert("Please enter valid credentials.");
                return;
            } else {
                createAuth('PUT');
            }
            
        }

        return <button type="button" className="btn btn-primary" onClick={onClick}>Submit ID</button>;

    }

    function handleLogout() {
        setUserInfo(false);
        fetch('api/auth', {
            method: 'DELETE',
        });
    }

    // Function for creating authentication and logging in.
    async function createAuth(method) {
        const res = await fetch('api/auth', {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        await res.json();
        if (res.ok) {
            console.log("yay");
            setUserInfo(email);
        } else {
            alert('Authentication failed');
        }
    }

    function DisplayAuthMessage() {

        // React.useEffect(() => {
        //     (async () => {
        //     const res = await fetch('api/user/me');
        //     const data = await res.json();
        //     setUserInfo(data);
        //     })();
        // }, []);
        
        // If the get gets the unauthorized value, this is a set value that means
        // That the user have not been authenticated, and they should not be notified of a 
        // login.

        if (!userInfo) {        // At the start, this is blank.
            return <div></div>;
        } else {

            return (
                <div>
                    <p id="user-alert" className="form-control border-3 border-success">ID submitted! Welcome <strong>{userInfo}</strong>!</p>
                </div>
            );
        }
    }

    // This function gets the recipe title, recipe text, and tag and sends it to the database.
    async function sendRecipeData() {

        const form = document.getElementById("recipeData");
        const formData = new FormData(form);
        let formValues = formData.entries();
        console.log(formValues);
        
        const infoArray = []
        for (let pair of formValues) {      // Write each of the key/value pairs to an array
            console.log(pair[0] + " " + pair[1]);
            infoArray.push(pair[1]);
        }
        console.log(infoArray);

        // use the array to populate the recipe information.
        const recipe = {
            title: infoArray[0],
            text: infoArray[1],
            tag: infoArray[2],
        }
        console.log(recipe);
        console.log(JSON.stringify(recipe));
        
        // websocket stuff.
        sendNotif(recipe.tag);

        // backend call to push to server.
        await fetch('/api/sendRecipe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recipe),
        });
    }

    return(
        <div className="body">

            <header>

                <div id="header-text">
                    <h3>Upload Recipe</h3>
                    <p>Upload recipes below! You will remain logged in and able to submit recipes until you click Logout, even if you navigate to another page.</p>
                </div>

            </header>


            <main>
                {/* Action here runs this function when the form is submitted. */}
                <form id="loginData">
                    <div id="login" className="mb-3">

                        <label htmlFor="userID">User ID</label> 
                        <div className="col-2">
                            <input id="userID" className="form-control" type="text" name="userID" onChange={(e) => setEmail(e.target.value)} required/>
                        </div>

                        <label htmlFor="password">&ensp;Password</label> 
                        <div className="col-2">
                            <input id="password" className="form-control" type="password" name="password" onChange={(e) => setPassword(e.target.value)} required/>
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
                        <button type='button' className="btn btn-secondary" onClick={handleLogout}>Logout</button>
                    </div>
                </form>
            </main>
        </div>
    );
}