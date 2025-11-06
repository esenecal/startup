const port = process.argv.length > 2 ? process.argv[2] : 4000;

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');      // Use cookieparser.
const uuid = require('uuid');           
const bcrypt = require('bcryptjs');     // Encrypting

const authCookieName = 'token';

// Some middleware
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json());

// Contains the two potential api endpoint calls.
const urls = ["https://thereportoftheweekapi.com/api/v1/reports/?category=Running%20On%20Empty", "https://thereportoftheweekapi.com/api/v1/reports/?category=Drink%20Review"];
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// To complete:
// endpoint for creating a new user
// endpoint for logging in.

// Mock database. Each type of tag has its own "collection". When entering
// This may be changed, as also for now it stands in as our database mockup.
let recipes_HOT = [
    {
        title: "Rice",
        text: "Boil the water!!",
        tag: "HOT"
    }, 
    {
        title: "Goulash",
        text: "Boil Pasta",
        tag: "HOT"
    }];
let recipes_COLD = [{
        title: "Jello",
        text: "Boil some water and let it cool",
        tag: "COLD"
    }];
let recipes_BREAKFAST = [];
let recipes_LUNCH = [];
let recipes_DINNER = [];


// ENDPOINTS FOR LOGIN. ---------------------------------------------------------------------------------

// Debugging middleware.
app.use((req, res, next) => {
  console.log("----------");
  console.log(req.method);
  console.log(req.originalUrl);
  console.log(req.body);
  console.log(users);
  next();
});

// Create a user. Check to see if they exist, and if they do not, then create them.
app.post('/api/auth', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// logging in. Get the hashed password, compare it to provided password, then save authorization token in a cookie.
app.put('/api/auth', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// Logout.
app.delete('/api/auth', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Get.
app.get('/api/user/me', async (req, res) => {
  const token = req.cookies['token'];
  const user = await getUser('token', token);
  if (user) {
    res.send({ email: user.email });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

const users = [];

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  users.push(user);

  return user;
}

function getUser(field, value) {
    if (value) {
        return users.find((user) => user[field] === value);
    }
    return null;
}

const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// -------------------------------------------------------------------------------------------------------

// ENDPOINTS FOR RECIPE SENDING AND FETCHING. ------------------------------------------------------------

// Endpoint to send a recipe to a server.
apiRouter.post('/sendRecipe', verifyAuth, (req, res) => {
    console.log("Sending Recipe");
    console.log(req.body);
    sendRecipe(req.body);       // Give the recipe object to sendRecipe. Place it in the correct collection.
    res.send(req.body);         // Check if you need to do anything here to send this to a specific collection.
});

// Endpoint to retrieve a recipe according to a tag.
apiRouter.get('/getRandomRecipe/:id', (req, res) => {
    console.log("Request received");
    let tagValue = req.params.id;
    let recipeArray;        // Where we will put the recipe "collection"
    switch (tagValue) {     // Check the tag value and get the corres. collection.
        case "HOT":
            recipeArray = recipes_HOT;
            break;
        case "COLD":
            recipeArray = recipes_COLD;
            break;
        case "BREAKFAST":
            recipeArray = recipes_BREAKFAST;
            break;
        case "LUNCH":
            recipeArray = recipes_LUNCH;
            break;
        case "DINNER":
            recipeArray = recipes_DINNER;
            break;
        default:        // If there is no match, then say so.
            console.log("NO VALID TAG");
    }

    // Check if it is empty.
    if (recipeArray.length === 0) {
        // Create a "recipe" that simply says we don't have any recipes of that type.
        random = {
            title: `No Recipe of type ${tagValue}`,
            text: "Sorry!",
            tag: null,
        };
    } else {
        // Get a random recipe in the selected recipe collection.
        random = recipeArray[getRandomInt(0, recipeArray.length)];
    }
    
    console.log(tagValue + " " + random.tag);

    res.send(random);
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

// function to get a random int between min and max, including min but NOT including max.
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function sendRecipe(recipe) {   // recipe is a recipe object.
    switch (recipe.tag) {     // Check the tag value and add to the corres. array.
        case "HOT":
            recipes_HOT.push(recipe);
            console.log(recipes_HOT);
            break;
        case "COLD":
            recipes_COLD.push(recipe);
            console.log(recipes_COLD);
            break;
        case "BREAKFAST":
            recipes_BREAKFAST.push(recipe);
            console.log(recipes_BREAKFAST);
            break;
        case "LUNCH":
            recipes_LUNCH.push(recipe);
            console.log(recipes_LUNCH);
            break;
        case "DINNER":
            recipes_DINNER.push(recipe);
            console.log(recipes_DINNER);
            break;
        default:        // If there is no match, then say so.
            console.log("NO VALID TAG");
    }
}

// ------------------------------------------------------------------------------------------------------------------

async function findUser(field, value) {
  if (!value) return null;

  return users.find((u) => u[field] === value);
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}


app.listen(port, function () {                          // Tells us which port we are listening on.
    console.log(`Listening on port ${port}`);
});