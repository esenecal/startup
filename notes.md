# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)
- [AWS] (https://aws.amazon.com/)

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
## Simon Deployment
We deployed simon using this command from the SimonHTML repository: 
```bash
./deployFiles.sh -k <yourpemkey> -h <yourdomain> -s simon
```
If you look into deployFiles.sh, you'll see that it is set up to recursively remove the elements in Simon and make a new directory. Basically, by using that command, you are deploying the simon html to your simon.domainname.click.

## HTML

This was easy. I was careful to use the correct structural elements such as header, footer, main, nav, and form. The links between the three views work great using the `a` element.

The part I didn't like was the duplication of the header and footer code. This is messy, but it will get cleaned up when I get to React.

## CSS

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

This took a couple hours to get it how I wanted. It was important to make it responsive and Bootstrap helped with that. It looks great on all kinds of screen sizes.

Bootstrap seems a bit like magic. It styles things nicely, but is very opinionated. You either do, or you do not. There doesn't seem to be much in between.

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

## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

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
