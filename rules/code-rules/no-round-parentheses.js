function checkStartWithParentheses(node, sourceCode, variableName) {
  return sourceCode.getText(node).startsWith(`(${variableName})`);
}

function findErrorExpression(node, sourceCode) {
  if (!node.params || node.params.length !== 1) {
    return null;
  }
  const param = node.params[0];
  const isIdentifierWithoutType = param.type === 'Identifier' && !param.typeAnnotation;

  if (isIdentifierWithoutType && checkStartWithParentheses(node, sourceCode, param.name)) {
    return param;
  }
  return null;
}

function createRuleFunction() {
  return context => {
    return {
      ArrowFunctionExpression(node) {
        const sourceCode = context.getSourceCode();
        const identifierNode = findErrorExpression(node, sourceCode);
        if (identifierNode) {
          context.report({
            node: identifierNode,
            message: "Unnecessary parentheses for '{{ identifier }}' in ArrowFunctionExpression",
            data: {
              identifier: identifierNode.name,
            },
            fix(fixer) {
              return fixer.replaceTextRange([identifierNode.range[0] - 1, identifierNode.range[1] + 1], identifierNode.name);
            },
          });
        }
      },
    };
  };
}

module.exports = {
  meta: {
    type: 'layout',
    docs: {
      description: "Don't use parentheses with one argument in ArrowFunctionExpression",
      recommended: true,
      suggestion: false,
    },
    schema: [],
    fixable: 'code',
  },
  create: createRuleFunction(),
};
