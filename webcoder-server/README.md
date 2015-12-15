# Watch-based compilation

* One-time: `mkdir dist && cp -r src/bin dist/`
* ES6 to ES5: `babel ./src/ --watch --out-dir ./dist/`
* Node `DEBUG=webcoder-server:* supervisor dist/bin/www`
