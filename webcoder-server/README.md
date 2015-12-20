# Usage

* Rebuild: `gulp`
* Run tests: `node test`
* Run server: `node start`

# Watch-based compilation

* One-time: `mkdir dist && cp -r src/bin dist/`
* ES6 to ES5: `babel ./src/ --watch --out-dir ./dist/`
* Node `DEBUG=webcoder-server:* supervisor dist/bin/www`

## Watch commands

Rebuild: `gulp watch`
Run Tests: `cd build && nodemon --watch build --delay 1 --exec "npm test"`
Run Server: `cd build && nodemon --delay 1 bin/www`
