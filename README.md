# webcoder

Edit code on a remote server in your browser.

The goal of this project is to let you edit source code for projects living on a
remote server. You shouldn't need to install a bunch of tools on your computer just to 
edit code hosted on another server (DigitalOcean, AWS, etc.). Instead, wouldn't it be nice
if you could just visit a webpage and write some code?

There's still a lot of work to be done - right now there's just a Node/Express
server that will let you `ls`, though there isn't a front-end... yet.

## TODO

There's many more things to do, but here's the next steps:

* Add flux support (inital work done, but needs some cleanup)
* Add some tests for flux code
* ES6-ify react code (turn Filetype into a class, etc.)
* Query server for folder contents
* Get eslint working on frontend
* Figure out jsdoc (or something like it)
* Make setting up the localsettings.js file part of install flow

## License

This project uses the MIT license. See the `LICENSE` file for the details.
