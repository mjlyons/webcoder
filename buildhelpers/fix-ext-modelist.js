"use strict";

/**
 * This file cleans up ext-modelist.js, which comes with the Ace editor.
 * The figures out the Ace filetype mode that corresponds to a filename's extension.
 * The file uses AMD RequireJS, which is incompatible with the rest of webcoder,
 * which uses CommonJS.
 *
 * This file cleans up ext-modelist.js by doing the following
 * - Removing the AMD wrapper
 * - Removing the "use strict"; command at the top
 *
 * The result is stored in the build/ directory and is used when building webcoder.
 */

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
try {
  fs.mkdirSync(OUTPUT_PATH);
} catch (ex) {
  // Probably folder already exists
}
fs.writeFileSync(path.resolve(OUTPUT_PATH, FILENAME), noAmdCode);
