# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

Domain name: hstart260.click

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)
- [AWS] (https://aws.amazon.com/)

## Table of Contents:
- [Git and Github](#git-and-github)
- [README](#readme)
- [AWS](#aws)
- [Caddy](#caddy)
- [Deployment](#deployment)
- [HTML](#html)
  - [Media](#media)
- [CSS](#css)
  - [Implementing CSS in HTML](#implementing-css-in-html)
  - [Flexbox](#flexbox)
  - [Frameworks(Bootstrap)](#frameworks-bootstrap)
- [React Part 1: Routing](#react-part-1-routing)
  - [Properties](#properties)
  - [States](#states)
  - [Deploying React](#deploying-react)
- [React Part 2: Reactivity](#react-part-2-reactivity)
- [Javascript](#javascript)

## Git and Github

You can access Git and push code to Github via the command line or the VSCode GUI. You should:
- Always commit! You need to frequently commit your code to ensure that you have back ups.

Forking is where you create a copy of a repository. You can then edit it and request a pull request to merge it with the original. This allows for people to work together. Branches are similar, and allow you to experiment with your code.

The process of making changes with git:
1. Get the latest code via "git pull"
2. Add, test, etc. your code.
3. Commit with "git commit" and then "git push" (push "pushes" the code to Github)
4. Repeat!!

## README

From the README on it's purpose:
> [!NOTE]
>  This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

## AWS

My IP address is: 35.168.46.138
Domain name: hstart260.click
Launching my AMI I initially put it on a private subnet. Even though it had a public IP address and the security group was right, I wasn't able to connect to it.

You use Route 53 Hosted zones to connect your IP address and domain name. * allows for there to be subdomains.

To run it in ssh:
```bash
ssh -i [key pair file] ubuntu@[ip address]
```

This command changes your pem file permissions:
```bash
chmod  600 yourkeypairfile.pem
```

The `exit` command will exit the remote shell.

The elastic IP allows you to keep the same IP address if you stop your instance.

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

Caddy is a gateway/reverse proxy that basically helps manage http requests. It "sits in front of the servers" and manages the client's requests to internal servers. It also has the ability to help with getting a web certificate from Let's Encrypt.

Basically, when a user accesses a domain, if the domain is not recognized by Caddy it will start talking to Let's Encrypt. Let's Encrypt will send a http request to the domain to verify that it is legit; Caddy will respond, and Let's Encrypt will issue the certificate, having now verified the domain. The certificate has public and private keys. The private keys are kept on the server while Caddy sends the public key back to the user. The public key can then be used to securely communicate between the user and the server, as the private key can decrypt the user's information.

We enabled HTTPS on our domain by editing the Caddyfile and replacing the :80 port with our domain name. This makes Caddy handle requests to our domain name instead of port 80 (http). Since the port is now not specified, any request to http (80) is instead sent to 430 (https). Then the certificate process proceeds.

After altering the caddy file, use this command to restart it, ensuring your changes are applied.
```bash
sudo service caddy restart
```
## Deployment
We deployed simon using this command from the SimonHTML repository: 

```bash
./deployFiles.sh -k <yourpemkey> -h <yourdomain> -s simon

./deployReact.sh
```
If you look into deployFiles.sh, you'll see that it is set up to recursively remove the elements in Simon and make a new directory. Basically, by using that command, you are deploying the simon html to your simon.domainname.click.

You can do this for startup, just change the command to take startup.

## HTML

This was easy. I was careful to use the correct structural elements such as header, footer, main, nav, and form. The links between the three views work great using the `a` element.

The part I didn't like was the duplication of the header and footer code. This is messy, but it will get cleaned up when I get to React.

### Media

#### To add an image:
```html
<img alt="pie" src="pie.png" width="100"/>
```
You can always add a height option as well. The src can be a local path or a url. Be careful to make sure you get the path right.

#### To add audio:
```html
<audio controls src="audio.mp3"></audio>
```
```controls``` provides the users with a way to control the audio. ```autoplay``` and ```loop``` do what you think they do--autoplay when the audio loads and loop the audio. Warning: be careful, as some people don't like these.

#### To add video:
```html
<video controls width="100" crossorigin="anonymous">
  <source src="video.mp4" />
</video>
```
Video shares the same crontrols and autoplay attributes as audio, but you may need to add the ```crossorigin="anonymous``` attribute from other domains. Why? Not sure.

#### SVG and Canvas

These help you create your own graphics, which can even be animated! SVGs are made with the ```svg``` tag and attributes, and canvas uses the ```canvas``` tag and scripting.


## CSS

### Implementing CSS in HTML
CSS is used to style HTML elements. This can be done in several ways:

1. The ```style``` attribute
    - Assign declarations within an HTML element.
    ```html
    <p style="color:blue;background-color:red">Text</p>
    ```
2. HTML ```style``` element
    - Define CSS rules within the HTML document. Should be in the ```head``` element of document. This will have all the rules apply to all elements within the document.
    ```html
    <head>
        <style>
          p {
            background-color:red;
            font-family:sans-serif;
          }
        </style>
    </head>
    ```
3. HTML ```link``` element to an external CSS file.
    - ```link``` element in the ```head``` element of the HTML document
    ```html
    <link rel="stylesheet" href="styles.css" />
    ```
    Then in ```styles.css```:
    ```css
    p {
      color:red;
      background-color:green;
    }
    ```

> [!NOTE]
> The ```link``` element is the preferred method.


### Flexbox

Flex is used to make a webpage responsive to movement and resizing. Very useful. This is a simple, straightforward way to implement it:

```css
body {
  display: flex;
  flex-direction: column;
  margin: 0;
  height: 100vh;
}
```

```display``` tells css to make this section a flexbox section. The ```direction``` tells it how to orient the elements within the block--in this case, as a column, stacked on top of each other. ```height``` is self explanatory, but notice that it is set to 100% of the viewport height.

Note these examples:
```css
header {
  flex: 0 80px;
}

footer {
  flex: 0 30px;
}

main {
  flex: 1;
  display: flex;
  flex-direction: row;
}
```

The only things that are flex items to a flex container are the direct children. This is why, if you look in main.css, you'll see how there are multiple parent-child sets. Nesting them allows better funcitonality. This is also why all other things inside the header container can have flex: 1 and not interfere with footer and main. header and main are children of body, and so separate from what is inside header.

```header``` and ```footer``` here do NOT flex (that's what the 0 means) and have set heights. ```main``` will flex, as the 1 says. Then we give it appropriate settings for the flexbox.

I did like the navbar it made it super easy to build a responsive header.

```html
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand">
            <img src="logo.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
            Calmer
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" href="play.html">Play</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="index.html">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
```

I also used SVG to make the icon and logo for the app. This turned out to be a piece of cake.

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="#0066aa" rx="10" ry="10" />
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="72" font-family="Arial" fill="white">C</text>
</svg>
```

### Frameworks (Bootstrap)

Frameworks are essentially ways to import styling into CSS with premade protocols. Bootstrap is one of the most common, and probably a safe bet on starting off.

To import Bootstrap:

```html
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous" />
</head>

<body>
  ...

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
</body>
```

You get a link from their website. The [CDN links](https://getbootstrap.com/docs/5.3/getting-started/introduction/#cdn-links) are updated, so if needed navigate to the new version's page.

The integrity is to determine the integrity of the files. You can get the hash for the link [here](https://www.srihash.org/).

Add the corssorigin thing too.

You need the Javascript link if you plan to use components that use JS.

You can read their documentation [here](https://getbootstrap.com/). Good luck!

## React Part 1: Routing

Some definitions: JSX is a way for us to put HTML in JS. Use JSX.

Okay.

To create a basic Vite React template project:

```bash
npm create vite@latest demoVite -- --template react
cd demoVite
npm install
npm run dev
```

```npm init``` creates a ```package.json``` file. ```npm install``` installs React stuff.

Or, in the root directory:

```bash
npm init-y
npm install vite@latest-D
```

Open the package.json file (creaetd by ```npm init```). Replace the ```scripts``` section with this:

```
 "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
```

ADD node_modules TO .gitignore SO YOU DON'T COMMIT THEM.

You'll also probably want to use the React version of Bootstrap.

```bash
npm install bootstrap react-bootstrap
```

Then you can import the Bootstrap styles using ```import 'bootstrap/dist/css/bootstrap.min.css';```

This enables react:

```bash
npm install react react-dom react-router-dom
```

The way that React works is that there is an ```index.html``` file. This file has a ```<div>``` with a root ID. ```main.jsx``` will then get that element and run this fun little function where it creates a root and render the ```App.jsx```. What is ```App.jsx```? We'll get to that. Inside the ```App.jsx``` is the code that is to be rendered.

```npm run dev``` is a good way to live test your page. Use ```npm run build``` to bundle it for deployment. It'll create a subdirectory named dist that will have a bunch of weird looking files, since it packaged up all your files.

Within the ```App.jsx``` file is a component. It looks like a function, and you can call it with ```<App />```. The component returns what looks like HTML. That is passed up to ```main.jsx```, which then connects it and ```index.html``` and renders it. Simple?

You can use inline CSS or link a CSS file to a ```.jsx``` file. Keep in mind that some conventions will change. For example, as ```class``` is a keyword in JS, ```className``` replaces the HTML class attribute. A lot of CSS elements such as ```background-color``` become ```backgroundColor``` to better align with JS conventions. Be aware.

Also, you can have components within components--as in, within the ```App``` component, you could then reference another component named ```app2```.

### Properties

These are a little weird. Here's an example:
JSX:

```jsx

function App(props) {
  return <p> Print out the input: {props.input} </p>;
}

<div> Component: <App input="hello!"/> </div>
```

Just note what matches with what.

### States

Oh goody these are fun.

A component can have an internal state. Listen closely. Here's some example code:

```jsx
function App() {
  const [clicked, updateClicked] = React.useState(false);
  
  function onClicked() {
    updateClicked(!clicked);
  }

  return <p onClick={onClicked}>clicked: {`${clicked}`}</p>;
}
// render app etc etc.
```

Okay.

See ```onClick```? This is an ***event handler***.

```onClick``` is a built-in HTML attribute. What it's doing is listening to the HTML and noticing when the HTML element generates an event. So, when it notices a click, it calls the ```onClicked``` function.

Back up to ```const [clicked, updateClicked] = React.useState(false);```. Here we are creating *two* things. A useState function returns a *variable with the current state* (this variable can contain anything!) and a *function that will update the state*.

So, here, we create a ```clicked``` variable that has a value ```false```. We also created a function ```updateClicked``` that will change ```clicked```. Instead of calling this function directly, we create a nice little ```onClicked``` function. Look inside, and you see that, by passing ```!clicked``` into ```updateClicked```, we are changing the value of ```clicked``` to ```!clicked``` (flipping it).

Now that we have a way to change the state ```clicked```, we can use ```onClicked``` to change ```clicked```, then use the value of ```clicked``` to do whatever.

### Deploying React

Using vite does require some different deployment. 

Delete the ```deployFiles.sh``` script, create a ```deployReact.sh```.

In it, add:

```
while getopts k:h:s: flag
do
    case "${flag}" in
        k) key=${OPTARG};;
        h) hostname=${OPTARG};;
        s) service=${OPTARG};;
    esac
done

if [[ -z "$key" || -z "$hostname" || -z "$service" ]]; then
    printf "\nMissing required parameter.\n"
    printf "  syntax: deployReact.sh -k <pem key file> -h <hostname> -s <service>\n\n"
    exit 1
fi

printf "\n----> Deploying React bundle $service to $hostname with $key\n"

# Step 1
printf "\n----> Build the distribution package\n"
rm -rf build
mkdir build
npm install # make sure vite is installed so that we can bundle
npm run build # build the React front end
cp -rf dist/* build # move the React front end to the target distribution

# Step 2
printf "\n----> Clearing out previous distribution on the target\n"
ssh -i "$key" ubuntu@$hostname << ENDSSH
rm -rf services/${service}/public
mkdir -p services/${service}/public
ENDSSH

# Step 3
printf "\n----> Copy the distribution package to the target\n"
scp -r -i "$key" build/* ubuntu@$hostname:services/$service/public

# Step 5
printf "\n----> Removing local copy of the distribution package\n"
rm -rf build
rm -rf dist
```

You can now deploy it using the same command as normal, just with ```deployReact.sh```.

This is an example of function and app in jsx. We are ignoring a bit of code.

Note the subcomponent function and the subcomponent tag within the App function. This essentially takes that div in the subcomponent function and renders it in the App function.

```jsx
function SubComponent() {
  return <div>Sub Component</div>
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Hello
        </p>
        <SubComponent/>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

```

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```


## Javascript
A simple way to add javascript to your html file is to add a ```script``` tag in the ```head``` section.
```html
<body>
  <script src="index.js"></script>
</body>
```

> [!NOTE]
> It's a good idea to add it to the bottom of, say, your body section, as it will act on whatever is loaded--and you want everything to be loaded before you start executing Javascript.