const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;       // get database URL

const client = new MongoClient(url);    // get client.
const db = client.db("recipes")    // recipe databases

// Collections for different types of recipes.
const hotRecipes = db.collection("HOT");
const coldRecipes = db.collection("COLD ");
const breakfastRecipes = db.collection("BREAKFAST");
const lunchRecipes = db.collection("LUNCH");
const dinnerRecipes = db.collection("DINNER");

/*
A recipe object:
{
    title: "title",
    text: "recipe text",
    tag: "tag type",
}
*/

// to complete:
// write out functions for adding and getting recipes
// replace backend functions with database ones.
// Set up user database

// Test the connection.
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

// Check to see if you should use await or return.
// Add a recipe to the proper database
async function addRecipe(recipe) {
    switch(recipe.tag) {        // According to the value of the tag, place in the proper collection.
        case "HOT":
            await hotRecipes.insertOne(recipe);
            break;
        case "COLD":
            await coldRecipes.insertOne(recipe);
            break;
        case "BREAKFAST":
            await breakfastRecipes.insertOne(recipe);
            break;
        case "LUNCH":
            await lunchRecipes.insertOne(recipe);
            break;
        case "DINNER":
            await dinnerRecipes.insertOne(recipe);
            break;
        default:        // If there is no match, then say so.
            console.log("NOT VALID TAG");
    }
}

// return a promise--the current implementation we have in find expects a promise.
async function getRecipe(tag) {       // tag is the selected tag value.
    let recipeCollection;

    // Assign recipeCollection to a specific collection depending on tag.
    switch (tag) {
        case "HOT":
            recipeCollection = hotRecipes;
            break;
        case "COLD":
            recipeCollection = coldRecipes;
            break;
        case "BREAKFAST":
            recipeCollection = breakfastRecipes;
            break;
        case "LUNCH":
            recipeCollection = lunchRecipes;
            break;
        case "DINNER":
            recipeCollection = dinnerRecipes;
            break;
        default:        // If there is no match, then say so.
            console.log("NOT VALID TAG");
    }

    // Check if the current collection is empty.
    if (await recipeCollection.countDocuments() === 0) {
         // Create a "recipe" that simply says we don't have any recipes of that type.
        random = [{
            title: `No Recipe of type ${tagValue}`,
            text: "Sorry!",
            tag: null,
        }];
    } else {
        // Get a random recipe in the selected recipe collection.
        random = await recipeCollection.aggregate({ $sample: {size: 1 }}).toArray()
    }

    console.log(random);

    return random[0]

}

module.exports = {
    addRecipe,
    getRecipe,
}