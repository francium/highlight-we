module.exports = {
    "extends": "airbnb",
    rules: {
      "no-underscore-dangle": [ "error", { "allowAfterThis": true } ],
      "padded-blocks": [
        "error",
        { "classes": "always" }
      ],
      "max-len": ["error", 90],
      "no-multi-spaces": [ "error", { "ignoreEOLComments": true } ]
    }
};
