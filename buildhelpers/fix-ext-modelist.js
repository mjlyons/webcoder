"use strict";
const FILENAME = 'ext-modelist.js';
const INPUT_PATH = './thirdparty/ace-builds/src';
const OUTPUT_PATH = './build';

const fs = require('fs');
const path = require('path');

const extModelistSrc = fs.readFileSync(path.resolve(INPUT_PATH, FILENAME), 'utf8');

// Get first {
const firstOpenBracketIndex = extModelistSrc.indexOf('{');

// Find matching }
let bracketLevel = 1;
let closeBracketIndex = -1;
for (let i = firstOpenBracketIndex + 1; closeBracketIndex === -1 && i < extModelistSrc.length; i++) {
  const currChar = extModelistSrc.charAt(i);
  switch (currChar) {
    case '{':
      bracketLevel += 1;
      break;
    case '}':
      bracketLevel -= 1;
      if (bracketLevel === 0) {
        closeBracketIndex = i;
      }
      break;
  }
}
// Remove AMD wrapper
const noAmdCode = extModelistSrc.substring(firstOpenBracketIndex + 1, closeBracketIndex).replace('"use strict";', '');

// Write resulting js
fs.mkdirSync(OUTPUT_PATH);
fs.writeFileSync(path.resolve(OUTPUT_PATH, FILENAME), noAmdCode);
