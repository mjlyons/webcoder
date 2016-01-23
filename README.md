# webcoder

Edit code on a remote server in your browser.

[![Build Status](https://travis-ci.org/mjlyons/webcoder.svg?branch=master)](https://travis-ci.org/mjlyons/webcoder)
[![Coverage Status](https://coveralls.io/repos/mjlyons/webcoder/badge.svg?branch=master&service=github)](https://coveralls.io/github/mjlyons/webcoder?branch=master)

The goal of this project is to let you edit source code for projects living on a
remote server. You shouldn't need to install a bunch of tools on your computer just to 
edit code hosted on another server (DigitalOcean, AWS, etc.). Instead, wouldn't it be nice
if you could just visit a webpage and write some code?

## Install instructions

* [Install Node 4 or higher](https://nodejs.org/en/) if you haven't already
* Clone the repository: `git clone git@github.com:mjlyons/webcoder.git`
* Navigate to the repository: `cd webcoder`
* Clone the submodules (Ace editor): `git submodule init && git submodule upgrade`
* Install the required node modules: `npm install`
* Create and configure `localsettings.js` (for an example, check out `localsettings.ci_mode.js`)
  * Use `passhash.js` to create password hashes for each user
* Start the server: `npm run build && npm start`

## Usage

* Make sure the server is running: `npm run build && npm start` (you can just do `npm start` if you haven't changed localsettings.js or pulled/changed the webcoder source).
* In your web browser, navigate to the server hostname (defined in your `localsettings.js` file). It'll look something like https://example.com:3000 or http://localhost:3000.

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
