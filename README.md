# webcoder

Edit code on a remote server in your browser.

[![Build Status](https://travis-ci.org/mjlyons/webcoder.svg?branch=master)](https://travis-ci.org/mjlyons/webcoder)
[![Coverage Status](https://coveralls.io/repos/mjlyons/webcoder/badge.svg?branch=master&service=github)](https://coveralls.io/github/mjlyons/webcoder?branch=master)

The goal of this project is to let you edit source code for projects living on a
remote server. You shouldn't need to install a bunch of tools on your computer just to 
edit code hosted on another server (DigitalOcean, AWS, etc.). Instead, wouldn't it be nice
if you could just visit a webpage and write some code?

There's still a lot of work to be done - right now you can just browse through your
source file system - open folders and see what files are in them. You can't view/edit
the contents of files yet.

![Folder Browser only screencast](https://www.dropbox.com/s/2a4tndwo4fvf8pb/folder-browser-only.gif?raw=1)

The backend is a Node/Express server. Right now it just responds to /ls/<PATH> with a JSON
blob describing the (shallow) contents of the file.

The front-end is React/Flux, and use the /ls/ endpoint to implement a "Folder Browser" - you can
see the files and folders inside your source directory, though you can't open them yet.

## TODO

There's many more things to do, but here's the next steps:

* Figure out jsdoc (or something like it)
* Display contents of text/source files in editor (Ace? CodeMirror?)

## License

This project uses the MIT license. See the `LICENSE` file for the details.
