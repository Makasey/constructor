"use strict";

const attributesOrderRule = require("./template/attributes-order");
const noRoundParenthesesRule = require("./code-rules/no-round-parentheses");

module.exports = {
    rules: {
        ["attributes-order"]: attributesOrderRule,
        ["no-round-parentheses"]: noRoundParenthesesRule,
    },
};
