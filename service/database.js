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

// Test the connection.
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
    // Clear the clickCollection collection.
    clickCollection.deleteMany();
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();