const SYNTAX = 'Syntax:  passhash.js <password>';

/**
 * Given a password, returns the hashed value to store in localsettings.js
 */

const bcrypt = require('bcrypt-nodejs');

if (process.argv.length < 3) {
  console.error(SYNTAX);
  process.exit(1);
}
const passhash = bcrypt.hashSync(process.argv[2], bcrypt.genSaltSync());
console.log(passhash);
