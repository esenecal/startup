const port = process.argv.length > 2 ? process.argv[2] : 4000;

const express = require('express');
const app = express();

app.use(express.static('public'));

const url = "https://api.github.com/users/octocat";

app.get('/login', (req, res, next) => {
    fetch(url)
    .then((x) => {
        console.log(typeof(x) + " " + x);       // x is first a response.
        y = x.json();
        console.log(typeof(y) + " " + y);       // Now it is a promise after calling .json
        return y;                               // We return that promise, and the next .then will handle it.
    })
    .then((response) => {
        console.log(typeof(response));          // Now this got the promise from y and turned it into an object.
        console.log(response);          // This gets the json from the api and prints out the object in the vscode console.
        res.send({ login: response.login });     // This line prints in response to a curl request in the console. (the actual call?)
    });

    
});


app.listen(port, function () {                          // Tells us which port we are listening on.
    console.log(`Listening on port ${port}`);
});