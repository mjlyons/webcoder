module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react"
    ],
    "env": {
      "jest": true,
    },
    "rules": {
      "no-unused-vars": [2, { "argsIgnorePattern": "^_" }],
      "new-cap": [2, {"capIsNewExceptions": ["Router"]}]
    }
};
