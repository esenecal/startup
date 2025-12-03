const port = process.argv.length > 2 ? process.argv[2] : 4000;

const { WebSocketServer } = require('ws');  // websocket.
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');      // Use cookieparser.
const uuid = require('uuid');           
const bcrypt = require('bcryptjs');     // Encrypting
const DB = require('./database.js');

const authCookieName = 'token';

// Some middleware
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json());

// Contains the two potential api endpoint calls.
const urls = ["https://thereportoftheweekapi.com/api/v1/reports/?category=Running%20On%20Empty", "https://thereportoftheweekapi.com/api/v1/reports/?category=Drink%20Review"];
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// server for websocket
server = app.listen(port, () => {
  console.log(`Listening on ${port}`);
});


// ENDPOINTS FOR LOGIN. ---------------------------------------------------------------------------------

// Debugging middleware.
app.use((req, res, next) => {
  console.log("----------");
  console.log(req.method);
  console.log(req.originalUrl);
  // console.log(req.body);
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
      await DB.updateUser(user);
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
    DB.updateUser(user);
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

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await DB.addUser(user);

  return user;
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
apiRouter.post('/sendRecipe', verifyAuth, async (req, res) => {
    console.log("Sending Recipe");
    console.log(req.body);
    await DB.addRecipe(req.body);       // Give the recipe object to sendRecipe. Place it in the correct collection.
    res.send(req.body);         // Check if you need to do anything here to send this to a specific collection.
});

// Endpoint to retrieve a recipe according to a tag.
apiRouter.get('/getRandomRecipe/:id', async (req, res) => {
    console.log("Request received");
    let tagValue = req.params.id;   // Get the tag value.
    randomRecipe = await DB.getRecipe(tagValue);    // Get a random recipe from the database by this database.js call.
    console.log(randomRecipe);    // debugging--print the received recipe and check that the tags are the same.
    console.log(tagValue + " " + randomRecipe.tag);

    res.send(randomRecipe); // Send it.
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

// WEBSOCKET ------------------------------------------------------------------------------

// Create websocket object
const socketServer = new WebSocketServer({ server });

socketServer.on('connection', (socket) => {
  socket.isAlive = true;

  // send notification to all clients.
  socket.on('notification', function notification(data) {
    socketServer.clients.forEach(function each(client) {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  // Respond to the ping by setting the socket as alive.
  socket.on('pong', () => {
    socket.isAlive = true;
  });

});


// Check connection by sending out pings
setInterval(() => {
  socketServer.clients.forEach(function each(client) {
    if (client.isAlive === false) return client.terminate();

    client.isAlive = false;
    client.ping();
  });
});

// ------------------------------------------------------------------------------------

// function to get a random int between min and max, including min but NOT including max.
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


// ------------------------------------------------------------------------------------------------------------------

async function findUser(field, value) {
  if (!value) return null;

  if (field === 'token') {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value);
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