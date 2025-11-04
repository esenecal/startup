const port = process.argv.length > 2 ? process.argv[2] : 4000;

const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');      // Use cookieparser.

app.use(cookieParser());

app.use(express.static('public'));

// Contains the two potential api endpoint calls.
const urls = ["https://thereportoftheweekapi.com/api/v1/reports/?category=Running%20On%20Empty", "https://thereportoftheweekapi.com/api/v1/reports/?category=Drink%20Review"];

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// To complete:
// endpoint for sending a recipe to a server. Includes recipe title, text, and tag.
// endpoint for retrieving a recipe from a server, according to the tag. A lot of this will be handled when the database is made.
// endpoint for creating a new user
// endpoint for logging in.


// function to get a random int between min and max, including min but NOT including max.
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// Endpoint to retrieve a recipe according to a tag.
apiRouter.get('/getRandomRecipe', (req, res) => {
    console.log("Request received");
    res.send({ recipe: "RECIPE" });
});

// Called by frontend to access the Report of the Week API.
apiRouter.get('/randomFood', (req, res) => {
    // Get a random url. This if statement is to even out the amount of calls (since drinks is smaller than running on empty)
    // So we tune how often we want one list to show up compared to the other.
    randomCall = getRandomInt(0, 4);        // Currently, about 1/4 chance to get the drink review.
    if (randomCall === 0) {
        randomURL = urls[1];
    } else {
        randomURL = urls[0];
    }

    fetch(randomURL)
    .then((x) => {
        // console.log(x)
        return x.json();        // This is a response that we got from the API. .json is turning it into a promise,
                                // Which when passed into the next .then will be ersolved to an object.
    })
    .then((response) => {
        // Reports is an object with key "reports" with a value of an array
        // console.log(response);          // The object with the array.
        // console.log(randomURL);         // Which endpoint was called
        reviews = response.reports;     // Get the array of reviews.
        // console.log(reviews.length);    // Get the array length
        randomReview = reviews[getRandomInt(0, reviews.length)]     // Get a random review from the review array.
        console.log(randomReview);
        
        res.send({ product: randomReview.product });     // send the product line
    });

});


app.listen(port, function () {                          // Tells us which port we are listening on.
    console.log(`Listening on port ${port}`);
});