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

* Break up index.js
* Write some tests for react code in jest
* ES6-ify react code
* Add flux support
* Query server for folder contents

## License

This project uses the MIT license. See the `LICENSE` file for the details.
