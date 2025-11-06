import React from "react";
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';  // Importing bootstrap components.
import "./find.css"     // page css file.

// import { RecipeOutput } from "./display-recipe";    // For whatever reason, this must be uppercase.

// Contains the two potential api endpoint calls.

// refreshes because all the functions and whatnot are 

const defaultClickRecipe = {
    title: "Simple Rice",
    text: "Measure out rice (example: 1 cup). Add to pot. Wash rice thoroughly. Measure out twice as much water as rice (example: 2 cups). Add to pot. Bring to boil uncovered. Once boiling, cover and put on low heat. Cook until soft. Some experimentation needed. For an easier time, buy a rice cooker.",
    tag: "HOT"
};

// This is a some mock local storage for recipes.
// localStorage.setItem("recipeTitle", "How to make...");
// localStorage.setItem("recipeText", "First, take...");
// localStorage.setItem("tagDropdown", "COLD");

let tags = ["HOT", "COLD", "BREAKFAST", "LUNCH", "DINNER"];
// let foods = ["Bread", "Pasta", "Fried Chicken", "Steak", "Salad"];      // Mock function for demonstrating clickFood functionality.

export function Find() {
    const [clickRecipeTitle, updateClickRecipeTitle] = React.useState(defaultClickRecipe.title);     // State for recipe title. 
    const [clickRecipeText, updateClickRecipeText] = React.useState(defaultClickRecipe.text);     // State for recipe text.
    const [clickRecipeTag, updateClickRecipeTag] = React.useState(defaultClickRecipe.tag);     // State for recipe tag.
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

    // When the Find Recipe button, this updates clickRecipeTitle to a recipe from getRecipe.
    function ClickRecipe() {

        async function onClicked() {
            if (show == false) {     // Random food displays when show is false. So, only change it if show is true.
                updateShow(!show);
            }
            let tagValue = document.getElementById("tagDropdown").value;      // Get the current value of the tag.
            console.log(tagValue);
            // console.log(clickRecipeTitle);

            try {
                const newRecipe = await getRecipe(tagValue);    // get recipe object
                console.log(newRecipe);                       // This is a recipe object.
                updateClickRecipeTitle(newRecipe.title);      // Set updateClickRecipeTitle to a recipe
                updateClickRecipeText(newRecipe.text);
                updateClickRecipeTag(newRecipe.tag);
            } catch (err) {
                console.log("Error: " + err);
            }
            
        }

        return(<button type="button" className="btn btn-secondary" onClick={onClicked}>Find Recipe</button>);
    }

    // Function that gets recipes from database. Right now we are using localstorage.
    async function getRecipe(tagValue) {
        
        console.log("Getting Recipe");
        try {
            const response = await fetch(`/api/getRandomRecipe/${tagValue}`);   // response. Send with the tagValue
            const randomRecipePromise = response.json()                          // promise
            console.log(randomRecipePromise);
            return randomRecipePromise
        } catch (err) {
            console.log("Error: " + err);
        }
    
    }


    // Displays clickRecipeTitle
    function DisplayRecipe() {

        if (show) {
            return(
                <div>
                    <h2>{clickRecipeTitle}</h2>
                    <blockquote>
                        {clickRecipeText}
                    </blockquote>
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
    // Clickfood updates every render as this is inside the render function, from what I can tell.
    function ClickFood() {

        // run when button is clicked.
        async function onClicked() {
            if (show == true) {     // Random food displays when show is false. So, only change it if show is true.
                updateShow(!show);
            }

            // console.log("ClickFood clicked");
            try {
                const food = await getRandomFood();     // This is resolving the promise from getRandomFood.
                console.log(food);
                updateRandomFood(food.product);      // Updates clickFood to a random food name string returned by getRandomFood
            } catch (err) {
                console.log(err);
            } finally {
                console.log("DONE");
            }
            
        }
        console.log("clickFood set to " + clickFood);

        return(<button type="button" className="btn btn-secondary" onClick={onClicked}>Random Food</button>);
    }

    // Gets a random food from an API and returns it as a string.
    async function getRandomFood() {
        try {
            const response = await fetch("/api/randomFood");        // Retrieve a response
            // console.log("1 " + response);
            const food = response.json();                           // Parse that response into a promise.
            // console.log("2 " + food);
            return food;                                            // Return the promise.
        } catch (err) {
            console.log(err);
        }

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
                    <p>Select a tag to randomly search for recipes or a random food.</p>
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