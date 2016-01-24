# webcoder

Edit code on a remote server in your browser.

[![Build Status](https://travis-ci.org/mjlyons/webcoder.svg?branch=master)](https://travis-ci.org/mjlyons/webcoder)
[![Coverage Status](https://coveralls.io/repos/mjlyons/webcoder/badge.svg?branch=master&service=github)](https://coveralls.io/github/mjlyons/webcoder?branch=master)

The goal of this project is to let you edit source code for projects living on a
remote server. You shouldn't need to install a bunch of tools on your computer just to 
edit code hosted on another server (DigitalOcean, AWS, etc.). Instead, wouldn't it be nice
if you could just visit a webpage and write some code?

![Webcoder screenshot](https://www.dropbox.com/s/k7w4yljfgtfr0xc/Screenshot%202016-01-23%2021.01.20.png?raw=1)

## Features

* Edit code on another computer, VM, or AWS/DigitalOcean instance without latency issues
* All you need is a web browser to edit code - put that netbook in your closet to use!
* Self-hosted, open source, and free
* Authentication - you wouldn't want anyone editing your code!
* Fast File Search (Ctrl-P) - open a file anywhere in your source tree quickly
* Folder browser sidebar
* Code formatting and syntax highlighting (from the Ace editor) for many languages

## Install instructions

* [Install Node 4 or higher](https://nodejs.org/en/) if you haven't already
* Clone the repository: `git clone git@github.com:mjlyons/webcoder.git`
* Navigate to the repository: `cd webcoder`
* Clone the submodules (Ace editor): `git submodule init && git submodule update`
* Install the required node modules: `npm install`
* Create and configure `localsettings.js` (for an example, check out `localsettings.ci_mode.js`)
  * Use `passhash.js` to create password hashes for each user
* Start the server: `npm run build && npm start`

### Set up nginx (optional)

You may want to set up nginx (if you want to set up https, listen on port 80, etc.). [Check out this page](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-14-04) on setting this up. Use `bin/server/www` as your "app". For example: `pm2 start bin/server/www`.

## Usage

* Make sure the server is running: `npm run build && npm start` (you can just do `npm start` if you haven't changed localsettings.js or pulled/changed the webcoder source).
* In your web browser, navigate to the server hostname (defined in your `localsettings.js` file).

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
