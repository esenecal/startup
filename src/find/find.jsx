import React from "react";
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';  // Importing bootstrap components.
import "./find.css"     // page css file.

// import { RecipeOutput } from "./display-recipe";    // For whatever reason, this must be uppercase.

// Contains the two potential api endpoint calls.

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

// This is a some mock local storage for recipes.
// localStorage.setItem("recipeTitle", "How to make...");
// localStorage.setItem("recipeText", "First, take...");
// localStorage.setItem("tagDropdown", "COLD");

let tags = ["HOT", "COLD", "BREAKFAST", "LUNCH", "DINNER"];
// let foods = ["Bread", "Pasta", "Fried Chicken", "Steak", "Salad"];      // Mock function for demonstrating clickFood functionality.

export function Find() {
    const [clickRecipe, updateRecipe] = React.useState(defaultClickRecipe);     // State for random recipe. clickRecipe contains recipe text.
    const [clickFood, updateRandomFood] = React.useState("Chicken");  // State for the random food. Default is bread.
    const [username, updateUsername] = React.useState(1);       // State for notifications. username is a number standing in for a name that would be received by websocket.
    const [tag, updateTag] = React.useState(tags[0]);   // State for tags for notifications. tag is an element in the tags array.
    const [show, updateShow] = React.useState(true);    // State for controlling if recipe or food should be displayed.

    

    function printLocalStorage() {
        console.log("LOCAL STORAGE ---------------------------");
        for (let i = 0; i < localStorage.length; i++) {
            console.log(localStorage.key(i) + ": " + localStorage.getItem(localStorage.key(i)));
        }
        console.log("-----------------------------------------");
    }

    // What is happening here:
    // React us running on render. It says hey, run this interval. The interval runs the update funciton which 
    // updates username. useEffect says, wait a minute, username was updated! So it runs again.
    // Essentially, we are getting useEffect to run itself by having it update the very variable that it
    // is waiting to be updated.
    React.useEffect(() => {

        // This is the MOCK server pull. Obviously, when actually implemented, actual usernames will be given.
        // The random number generator is just to show that this is actually being updated.
            const intervalID = setInterval(() => {
                updateUsername(Math.trunc(Math.random()*10));
                updateTag(tags[Math.floor(Math.random() * (tags.length))]);        // get a random tag for display.
                // console.log(username);
            }, 10000);

            // console.log(random);

            return () => clearInterval(intervalID);
            
    }, [username]);

    function UserNotification() {
        return <p id="user-notification" className="form-control border-3 border-success"> User {`${username}`} just uploaded a {`${tag}`} recipe!</p>;
    }

    // FUNCTIONS FOR FIND RECIPE

    // When the Find Recipe button, this updates clickRecipe to a recipe from getRecipe.
    function ClickRecipe() {

        function onClicked() {
            if (show == false) {     // Random food displays when show is false. So, only change it if show is true.
                updateShow(!show);
            }
            let tagValue = document.getElementById("tagDropdown").value;      // Get the current value of the tag.
            console.log(tagValue);
            // console.log(clickRecipe)
            printLocalStorage();
            let newRecipe = getRecipe(tagValue);
            updateRecipe(newRecipe);      // Set updateRecipe to a recipe
            // console.log(clickRecipe);
        }

        return(<button type="button" className="btn btn-secondary" onClick={onClicked}>Find Recipe</button>);
    }

    // MOCK Function that gets recipes from database. Right now we are using localstorage.
    function getRecipe(tagValue) {

        // console.log(tagValue);

        // Code to get a recipe with the correct tag using tagValue. Use an object! recipename: tag?
        // console.log(localStorage.getItem("a")); //

        let recipeTitle = localStorage.getItem("recipeTitle");
        let recipeText = localStorage.getItem("recipeText");
        let recipeTag = localStorage.getItem("tagDropdown");

        // console.log(recipeTitle);
        // console.log(recipeText);
        // console.log(tagValue);
        // console.log(recipeTag);

        let output;
        // Check for the tag. In this case, we are assuming we want to get a COLD recipe in the database, so the recipe
        // will only display if a cold tag is selected, as that is what it will match.
        if (tagValue == recipeTag) {
            output = (
                <div>
                    <h2>{`${recipeTitle}`}</h2>
                    <blockquote>
                        <p>{`${recipeText}`}</p>
                    </blockquote>
                </div>
            );
        } else {
            output = (<div></div>);
        }

        return output
    }


    // Displays clickRecipe
    function DisplayRecipe() {

        if (show) {
            return(
                <div>
                    {clickRecipe}
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
        
    }

    // FUNCTIONS FOR RANDOM FOOD

    // Function for the button for Random Food
    function ClickFood() {

        // run when button is clicked.
        async function onClicked() {
            if (show == true) {     // Random food displays when show is false. So, only change it if show is true.
                updateShow(!show);
            }
            console.log("ClickFood clicked");
            try {
                const food = await getRandomFood()
                updateRandomFood(food);      // Updates clickFood to a random food name string returned by getRandomFood
                console.log("clickFood set to " + clickFood);
            } catch (err) {
                console.log(err);
            }
        }

        return(<button type="button" className="btn btn-secondary" onClick={onClicked}>Random Food</button>);
    }

    // MOCK FUNCTION. Gets a random food from an API and returns it as a string.
    async function getRandomFood() {
        fetch("/api/randomFood")
        .then((response) => response.json())
        .then((food) => {
            console.log(food);
            console.log(food.product);
            return new Promise((resolve) => {
                resolve(food.product);
            });
        });
    }

    // This function works to display the random food. We are using a function in case we want to add more functionality.
    function DisplayFood() {
        // clickFood contains a string variable containing a random food.
        if (!show) {
            return (
                <div>
                    <h3>{clickFood}</h3>
                </div>
            );
        } else {
            return (
                <div></div>
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
                        <option>HOT</option>
                        <option>COLD</option>
                        <option>BREAKFAST</option>
                        <option>LUNCH</option>
                        <option>DINNER</option>
                    </select>
                    <ClickRecipe />
                    <ClickFood />
                </div>
                
                
                <div id="text-retrieved">

                    <div id="recipe-output">

                        <DisplayFood />
                        <DisplayRecipe />

                    </div>

                    
                    {/* <!--Notification Alert. Ideally, this will be off to the side, so CSS will be needed to place this in the correct place.-->
                    <!--Sample Notification alert.--> */}

                    <UserNotification />

                </div>

            </main>

        </div>
    );
}