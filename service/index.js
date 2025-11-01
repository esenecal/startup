const port = process.argv.length > 2 ? process.argv[2] : 4000;

const express = require('express');
const app = express();

app.use(express.static('public'));

const url = "https://thereportoftheweekapi.com/api/v1/reports/?category=Running%20On%20Empty";

// These are food reviews. This is my idea:
// On a call to the api, concatenate a random category. (running on empty or drink review.)
// Then load up a list containing all of those objects, and then print one.

// function to get a random int between min and max, including min but NOT including max.
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

app.get('/get', (req, res, next) => {
    fetch(url)
    .then((x) => {
        // console.log(x)
        return x.json();        // This is a response that we got from the API. .json is turning it into a promise,
                                // Which when passed into the next .then will be ersolved to an object.
    })
    .then((response) => {
        // Reports is an object with key "reports" with a value of an array
        reviews = response.reports;     // Get the array of reviews.
        console.log(reviews.length);
        randomReview = reviews[getRandomInt(0, reviews.length)]     // Get a random review from the review array.
        console.log(randomReview);
        res.send({ product: randomReview.product });     // send the product line
    });

    
});


app.listen(port, function () {                          // Tells us which port we are listening on.
    console.log(`Listening on port ${port}`);
});