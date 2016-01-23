# webcoder

Edit code on a remote server in your browser.

[![Build Status](https://travis-ci.org/mjlyons/webcoder.svg?branch=master)](https://travis-ci.org/mjlyons/webcoder)
[![Coverage Status](https://coveralls.io/repos/mjlyons/webcoder/badge.svg?branch=master&service=github)](https://coveralls.io/github/mjlyons/webcoder?branch=master)

The goal of this project is to let you edit source code for projects living on a
remote server. You shouldn't need to install a bunch of tools on your computer just to 
edit code hosted on another server (DigitalOcean, AWS, etc.). Instead, wouldn't it be nice
if you could just visit a webpage and write some code?



## Architecture

### Client: React/Flux

* Renders the editor in the browser

### Server: Node/Express

* Serves the front-end html/javascript
* Responds to filesystem requests from the client (load/save files, ls, fast-filename-search, etc.)
* Authentication

## TODO

There's many more things to do, but here's [the next steps](https://paper.dropbox.com/doc/Webcoder-todo-tBEymxvwsMrI8GkaaAeHj)


## License

This project uses the MIT license. See the `LICENSE` file for the details.
