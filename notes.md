# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

Domain name: hstart260.click

to add:
- http requests (and how to implement)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)
- [AWS] (https://aws.amazon.com/)

## Table of Contents:
- [Git and Github](#git-and-github)
- [README](#readme)
- [General Web Things](#general-web-things)
  - [Ports](#ports)
  - [HTTPS](#https)
  - [Domains](#domains)
  - [DNS](#dns)
- [AWS](#aws)
- [The Console](#the-console)
- [Caddy](#caddy)
- [Deployment](#deployment)
- [HTML](#html)
  - [Basics](#basics)
  - [Structural Elements](#structural-elements)
  - [Input Elements](#input-elements)
  - [Media](#media)
  - [Document Object Model](#document-object-model)
- [CSS](#css)
  - [Implementing CSS in HTML](#implementing-css-in-html)
  - [CSS Basics](#css-basics)
  - [The Box Model](#the-box-model)
  - [Flexbox](#flexbox)
  - [Frameworks(Bootstrap)](#frameworks-bootstrap)
- [React Part 1: Routing](#react-part-1-routing)
  - [Files the Way Vite Likes](#files-the-way-that-vite-likes)
  - [Properties](#properties)
  - [States](#states)
  - [Hooks](#hooks)
  - [Deploying React](#deploying-react)
- [React Part 2: Reactivity](#react-part-2-reactivity)
- [JSON Files](#json-files)
- [Javascript](#javascript)
  - [Node.js](#nodejs)
  - [Syntax](#syntax)
  - [Functions](#functions)
  - [Object and Classes](#objects-and-classes)
  - [Promises and Async](#promises-and-async)
- [Database](#database)

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

## General Web Things

### Ports

Ports are essentially numbers associated with certain protocols. You need an IP address and a port number to connect to a device on the internet. This allows the device to support multiple protocols. 

These are some common ports:
- 22: Shell secure (SSH). Connecting to remote devices.
- 80: HTTP for web
- 443:  HTTPS--secure web requests.

We use different port numbers for our subdomains. Caddy listens on port 80 and 443 (and redirects 80 to 443 to ensure a secure connection), and then looks at the path. If the path matches a definition, the Caddy will make a connectoin to a service's port--for example, 3000 or 4000. We have assigned a subdomain to each.

### HTTPS

See Caddy for more information. HTTPS is HTTP with a secure connection--all data is encrypted using TLS. The server and the computer use a web certificate to ensure that a connection is legit.

### Domains

An IP address can be referenced using a domain. Domains have a naming convention.

This is the convention for domain names:
```subdomain.secondary.top```
secondary.top is the **root domain**. The **top level domain** is something like ```com``` or ```edu```. A root domain would be, for example, ```hstart260.click```.

There can be any number of subdomains built off of the root. We have two--```simon``` and ```startup```. Each subdomain can resolve to a different IP address. We could have ```simon.startup.hstart260.click```, for example, if we wanted to.

### DNS

DNS stands for **domain name system**. A domain name can be listed with a DNS server and then associated with an IP address. There are some DNS servers called **authoritative name servers** that every DNS server references.

There are DNS records called ```address (A)``` records and ```canonical name (CNAME)``` records.

A records are mappings from a domain name to an IP address--just a straight mapping. 

CNAME records map a domain name to another domain name. This allows you to map something like byu.com to the same IP as byu.edu.

This is how a DNS works:
1. You enter in a domain name into a browser. The browser checks to see if it has the name in a cache.
2. If not, the browser contacts a DNS server and gets the IP address associated with the domain.
3. The DNS server has a cache of names. If the domain is not in the cache, then the DNS will contact an authoritative name server. 
4. If the authority doesn't know the name, then there is an unknown domain name error.
5. If the process resolves, the browser connects to the IP address.

The levels in name caching allows for performance, but there can be issues with updating because of this.

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

## The Console

- cd: change directory. Place directory you wish to go to next.
- chmod: change file permissions.
- pwd: present working directory. See which directory you are in.
- ls: list files in directory.
  - add ```-la``` parameter to see hidden files and long format.
- man: manual. Look up a command there.
- mkdir: make a directory.
- mv: Move a file. Provide file name and new dir.
- nano: Open  a file in nano editor
- ps: view currently running processes.
- rm: remove file(s)
- ssh: create secure shell on remote computer
- sudo: run command as superuser
- vim: open file in vim editor.
- wget: download file from web. Provide a URL.

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

### Basics

HTML is the foundational content structure for web applications. It can be used with CSS and JS.

HTML elements are enclosed in tags. These tags can contain other attributes in them. This is a paragraph tag with an id attribute:

```html
<p id="this is the id">wow html</p>
```

The basic structure of an html page looks something like this:
```html
<!DOCTYPE html>
<!--This tells the browser about the document--the type and version.-->
<!--You should always include it.-->

<!--This wraps the entire html program.-->
<html>

    <!--This contains metadata about the title and page.-->
    <head>
        <title>Title</title> <!--Title fo the page.-->
    </head>

    <!--This contains content structure--headers, footers, main, navigation, etc.-->
    <body>
        <!--Each of these--header, main, footer--can contain their own structural content.-->

        <!--This is the header.-->
        <header></header>

        <!--This contains main content structure-->
        <main>
            <!--Insert content here.-->
        </main>

        <footer></footer>
    </body>
</html>
```

Class and id elements are used to distinguish elements from each other, giving greater functionality especially when paired with CSS and JS.

Oftentimes, the filename ```index.html``` will be used as the default file to display.

### Structural Elements

There are a lot of different structural elements. But, you should know the difference between **inline** and **block** elements.

Block elements are "blocks" in the flow of a content structure, whereas an inline element goes with a line of a block element. In other words, you stick inline elements in a line, while block elements create a whole new section.

Some block elements include ```div``` and ```p```, while ```span``` and ```b``` are inline.

Here are some good elements to know:

- ```html```: page container
- ```head```: header info
- ```title```: page title.
- ```script```: JS reference
- ```body```: entire content
- ```nav```: nav inputs
- ```section```: section of content
- ```div```: a block division in the content. Super common.
- ```span```: inline span of content.
- ```h<1-9>```: heading.
- ```table```: Table.
  - ```tr```: table row
  - ```th```: table header
  - ```td```: table data
- ```ol/ul```: ordered or unordered list.
  - ```li```: list item
- ```a```: anchor text to a link

Example of ```a```:
```html
<a href="https://google.com">Google link</a>
```

Example of table:
```html
<table>
    <tr>
        <!--Note that this row contains headers-->
        <th></th>
        <th></th>
    </tr>
    <tr>
        <!--Note that this is DATA-->
        <td></td>
        <td></td>
    </tr>
</table>
```

Example of Ordered/Unordered lists:
```html
<ul>
    <li></li>
    <li></li>
</ul>

<ol>
    <li></li>
    <li></li>
</ol>
```

### Input Elements

There are a lot of types of input elements--```form```, ```fieldset```, ```select```, ```optgroup```, ```option```... ```input``` is common.

Using the ```input``` element, you can make various forms of input by giving it certain attributes. You would give the input tag a type attribute and place the type of input there. Here are some notable ones:

- ```text```: single line of text
- ```password```: obscured password
- ```url```: it's a url.
- ```number```: please don't make me explain this.
- ```checkbox```: inclusive selection
- ```radio```: exclusive selection
- ```color```: guess what it is!?
- ```file```: local file
- ```submit```: button to submit
- ```range```: limited range of numbers.

ex:
```html
<label for="box">box1</label> <input type="checkbox" name="checkBox" value="box" checked />
```

Note the label. These are common to place before input elements.

Some other common attributes:
- ```name```: it's... the name of the input.
- ```disabled```: disables the input
- ```value```: initial value of the input
- ```required```: required to be filled out.

Other input elements:
- ```option```: Gives options.
- ```optgroup```: Gives options in a group.
- ```textarea```: input in multi lines.
- ```output```: Actually not input, it's output of input.
- ```select```: selection dropdown.

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

### Document Object Model

The DOM is a representation of HTML elements. It's a structural concept that is used to represent HTML files, and code can be used using this structural concept to manipulate an HTML file.

A DOM is basically an inverted tree. Each element is a node on the tree. The html element may be the root, then body. Then, the body may have multiple children, like paragraphs and headers, and those may have children of text or span or div, etc. Each node also has CSS data.

The ```document``` variable points to the root element of a DOM.

The **DOM Element Interface** allows you to iterate through child elements and manipulate an element's attributes. For example, by starting at root (```document```), you use the .children attribute and a for loop to iterate through the child elements of the document.

Various functions can be used to alter, delete, or insert elements into the DOM. By calling .appendChild to an element (for example, use queryselector(#word) to select all those elements), you can create a new child.

```.innerHTML = insert html here``` is a simple way to insert HTML, but this is also a source of potential attacks.

All DOM elements have the ability to attatch a function that is called when an event occurs on the element called an **event listener**. For example:

```js
const submitDataEl = document.querySelector('submitData');
submitDataEl.addEventListener('click', function (event) {
  console.log(event.type);
});
```

```html
<button onclick='alert("clicked")'>click</button>
```

This is called when an element gets clicked.

These are some common events:
- Clipboard: cut, copied, pasted
- Focus: an element gets focus
- keyboard: keys pressed
- mouse: click events.
- text selection: when text is selected.

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

### CSS Basics

You can use CSS selectors to alter all of a specific element:
```css
body {
  blah blah blah.
}
```

```*``` could be used to select all elements. It's the wildcard.

Combinators can be used to alter values that are descendants of others.
```css
body h1 {
  body section. Changes any section that is a descendant of a body.
}
body > p {
  child--alters direct children. In this case, any p that is a direct child of body.
}
div ~ p {
  Gets a list of siblings. This is any p that has a div sibling.
}
div + p {
  This gets a list of adjacent siblings--so any p with an adjacent div sibling.
}
```

Classes are selected by doing:
```css
.classname {
  blah blah blah.
}
p.classname{
  This would select all paragraphs with the sumamry class
}
```

Id are similar.
```css
#idname {
  blah blah blah
}
```

Attribute selection too!
```css
p[class='classname']{
  blah blah blah
}
```

### The Box Model

This is a bit more under the hood of how CSS works.

Everything in CSS is defined as a box. When a style is applied, it is applied to a region of the display that is a rectangle--a box. Inside each box are MORE boxes.

So, from inside->out:
- content: text, image.
  - Padding: inherits background color
    - Border: color, thickness, line style.
      - margin: external to actual styling of the box. Just whitespace.

By default, an element's width and height is defined by the width and height of the inner content box. Changing the CSS property box-sizing can redefine the size to include the padding and border, which will get you closer to it's actual size.
    
      

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
npm install vite@latest -D
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

### Files the way that Vite likes

There are a few things that you need to be aware of with files and how the project is set up. Vite expects things to be a certain way.

- A ```public``` folder holds all the images, sounds, etc.
- ```src``` is the directory where all the React code is. It contains folders for each view component.

Rename main.css to app.css.



The way that React works is that there is an ```index.html``` file. This file has a ```<div>``` with a root ID. ```index.jsx``` will then get that element and run this fun little function where it creates a root and render the ```App.jsx```. What is ```App.jsx```? We'll get to that. Inside the ```App.jsx``` is the code that is to be rendered.

```npm run dev``` is a good way to live test your page. Use ```npm run build``` to bundle it for deployment. It'll create a subdirectory named dist that will have a bunch of weird looking files, since it packaged up all your files.

Within the ```App.jsx``` file is a component. It looks like a function, and you can call it with ```<App />```. The component returns what looks like HTML. That is passed up to ```index.jsx```, which then connects it and ```index.html``` and renders it. Simple?

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

### Hooks

Hooks allow class style functionality for react components.

useEffect allows for lifecycle events--running a function every time a compenent renders, for example.

```js
function UseEffectHookDemo() {
  React.useEffect(() => {
    console.log('rendered');
  });

  return <div>useEffectExample</div>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<UseEffectHookDemo />);
```

The function is the logic for the effect. Dependencies are reactive values referenced in the first parameter (the function).

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
## JSON files

JSON stands for Javascript Object Notation. It's basically a simple way to store and share data, and can easily be converted to a JS object (or from one).

Typically, a JSON doc will contain an object, which itself has 0+ key value pairs. They key is a string, and the value is a JSON data type.

Here is an example:

```json
{
  "Cat": {
    "title": "Jeffery",
    "description": "He's very nice"
  },
  "Dogs": ["James", "Jordan", "puppy"],
  "other": null
}
```

JSON.parse and JSON.stringify are used to convert JSON to and from JS, respectively. Stringify is JS->JSON, parse is JSON->JS.

## Javascript
A simple way to add javascript to your html file is to add a ```script``` tag in the ```head``` section.
```html
<body>
  <script src="index.js"></script>
</body>
```

You can also directly include it into the HTML within a ```script``` element, or put it inline as part of an event attribute handler.

### Node.js

Node.js is for deploying JS outside of a browser. You can run ```node``` in the command line to open a JS interpreter.

To install node, run these commands:

```bash
➜  mkdir npmtest
➜  cd npmtest
➜  npm init -y
```

> [!NOTE]
> It's a good idea to add it to the bottom of, say, your body section, as it will act on whatever is loaded--and you want everything to be loaded before you start executing Javascript.

### Syntax

Here's some basic JS syntax.

It is good practice to end your lines in ;

VARIABLES:
You can use ```let``` or ```const```. ```const``` just means that the value should not be changed.

IF/ELSE:
```javascript
if (conditional) {
  statement;
} else if {
  statement;
} else {
  statement;
}
```

FOR:
```javascript
for (exp 1; exp 2; exp 3) {}
for (let i = 0; i < 5; i++) {}
```
exp 1: executed before execution of block of code.
exp 2: defines condition for executing code
exp 3: executed after code block has been executed.

WHILE:
```javascript
while (condition) {}
```

SWITCH:
```javascript
switch(expression) {    // Expression is evaluated once.
  case x:
    break;
  case y:
    break;
  default:
    // code
}
```
switch is evaluated once, and it's value is compared to each case. The associated block of code is run, and if there is none, then no code is executed (unless there is a default case, which is optional and is run if there is no match).

ARRAYS:
Arrays are used to store objects and primitives in a sequence.

Creating an array:
```js
const arr = [0, 1, 2];
```
arr.length can be used to get the length. There are also a few other functions that are useful:

- push: add item to end of array.
- pop: remove item from end of array.
- sort: run function to sort an array.
- values: creates an iterator, allows you to use for ```for (i of arr.values()) {}```
- map: run a funciton to map array to another array. ```arr.map(i => i+i)```


### Functions

Functions are first class objects in JS--they can be assigned a name, passed as a parameter, returned as a result, referenced from an object or an array--like a variable.

```js
function func(value = 0) {
  return value + 2;
}
```

#### Anonymous Functions

Functions are often assigned to a variable, allowing it to be passed as a paramemter to other functions or stored as properties.

```js
const add = function (a, b) {
  return a - b;
}
```

Arrow syntax can be used to write an anonymous function:
```js
() => 3
```

Here is an anonymous function with it's (almost) equivalent alternative:
```js
sort(
  function (v1, v2) {
    return v1-v2;
  }
);

sort((v1, v2) => v1-v2);
```

In arrow anonymous functions, return is optional if no curly braces are given and there is one expression--for example, ```() => 3;```. This returns 3. ```() => {3;}``` is undefined, while ```() => {return 3;}``` is 3.

### Objects and Classes

An object is a collection of name value pairs (properties). The name is a string or symbol, and then a value of any type.

This is now to create an object:
```javascript
const obj = new Object({name:value});
```

Constructors are objects that return an object.

```javascript
function object(value) {
  return {
    name: value,
  };
}

const o = new Object("wow");
console.log(o);
// Output will be the name value pair.
```

### Promises and Async

Promises are kind of weird.

Promises are a way to ansychronously run code--when a promise is create, it starts running whatever is in it alongside whatever code may be running.

A promise has 3 states:
- pending: currently running asynchronously.
- fulfilled: completed successfully.
- rejected: failed to complete.

Here's an example promise:

```js
const coinToss = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.1) {
      resolve(Math.random() > 0.5 ? 'heads' : 'tails');
    } else {
      reject('fell off table');
    }
  }, 10000);
});
```

When this is created, we are immediately creating a promise. *The promise immediately executes the code within it*. Then, you will notice that we have two functions--resolve and reject. These are built in. Basically, when you run the code, you can call resolve to set the promise to its fulfilled state, or reject to its rejected state.

We can use then, catch, and finally to then handle the results of the promise.

```js
coinToss
  .then((result) => console.log(`Coin toss result: ${result}`))
  .catch((err) => console.log(`Error: ${err}`))
  .finally(() => console.log('Toss completed'));
```

then runs when it is resolved. catch runs when it is rejected. finally runs when the process is complete.

So, something neat--You can chain then statements together. For example:

```js
function pickupPizza() {
  const order = createOrder();

  // Promise
  placeOrder(order)
    .then((order) => createPizza(order))
    .then((order) => serveOrder(order))
    .catch((order) => {
      orderFailure(order);
    });
}
```

PlaceOrder calls a promise. When it is resolved, then it moves to the first then. This funciton calls createPizza, which, incidentally, also returns a promise. When that one is resolved, Javascript automatically kicks it into the nexxt then, which calls serveOrder. Pretty neat.

Async and await are ways to make this easier.

An await keyword wraps the execution of a promise. It will block the execution of the code until the promise is fulfilled, or throw an exception if it is rejected. So, you can use a try catch statement instead of chaining then and catch:

```js
try{
  const p = await functionThatReturnsAPromise();
  // The code here will NOT run until funcitonThatReturnsAPromise is fulfilled.
} catch (err) {
  // If the promise was rejected
} finally {
  // final code
}
```

await cannot be called unless it is at the top level of JS or in a function defined with async. If a function is defined with async, the function returns the return statement as a promise. Note: if you define an async function to return a promise manually, it will just return a promise, not a promise of a promise.

So, for example,

```js
async function foo() {
  return "wow";
}
```

This would return a function with the fufilled state as "wow"

Then we could do this:

```js
async function foo() {
  return new Promise((resolve) => {
    resolve("wow");
  });
}
```

This gives us more control. This one and the previous function are not identical--the promise's resolution is a bit different on execution. In order to get the resolve for the latter one, we would need to call await foo(). Thus, console.log(await foo()); would give us wow, but console.log(foo()) wouldn't--it would give us some pending promise stuff.

## Database

We are using MongoDB, which is a database made up of collection. Each collection contains JSON documents. So think of a collection as an array of Javascript objects, each with a unique ID assigned.

In order to use MongoDB, we need to put credentials in our code. Place these credentials (the hostname, username, and password) in a ```dbConfig.json``` file, and add it to gitignore.

To use MongoDB, make sure you:

1. install MongoDB to your application.
```bash
npm init -y
npm install mongodb
```

2. Import your credentials and use the MongoDBClient 

example:

```js
const { MongoClient } = require('mongodb'); // require mongodb
const config = require('./dbConfig.json');  // import dbConfig

// The url of our server, with our credentials
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

// get client
const client = new MongoClient(url);
const db = client.db('rental');   // create a new database of the name db
const collection = db.collection('house');  // create a new collection in that database named house.
```

3. This code checks your connection to the database
```js
async function main() {
  try {
    // Test that you can connect to the database
    await db.command({ ping: 1 });
    console.log(`DB connected to ${config.hostname}`);
  } catch (ex) {
    console.log(`Connection failed to ${url} because ${ex.message}`);
    process.exit(1);
  }
}
```




For testing with the backend, you should run the index.js file (through node or vscode) and then also run npm run dev or test with curl. You are essentially running the backend simultaneously.


  function onClicked() {
    console.log("button")
    fetch('/api/click', {
      method: "post",     // You need to clarify what method it is.
    }) 
    .then(() => {
      console.log("clicked 2");
    });
    console.log("end button");
  }

  clarify the method.