'use strict';

const structureDirectives = ['ngIf', 'ngFor', 'ngSwitchCase', 'initVar', 'permission', 'permissionLink'];

// TODO:  учесть те, по которым уже прошлись
function findErrorAttribute(node) {
  const cacheNodesData = node.inputs.map(item => getAttributeElement(item));
  const attributes = [
    ...node.attributes.map(item => getAttributeElement(item)),
    ...cacheNodesData,
    ...node.outputs.map(item => getAttributeElement(item, cacheNodesData)),
    ...(node.templateAttrs ? node.templateAttrs.map(item => getAttributeElement(item)) : []),
    ...(node.references
      ? node.references.map(item => ({
          name: item.name,
          order: 0,
          position: item.sourceSpan.fullStart.offset,
          node: node,
        }))
      : []),
  ].filter(Boolean);

  const sorted = attributes.sort((a, b) => -b.position + a.position);
  return sorted.find((item, index) => {
    if (index !== 0) {
      return item.order < attributes[index - 1].order;
    } else if (attributes.length > 1) {
      return item.order > attributes[index + 1].order;
    }
    return false;
  });
}

function getAttributeElement(nodeElement, cacheNodeData = []) {
  if (!nodeElement || !nodeElement.name || !nodeElement.sourceSpan || !nodeElement.type) {
    return null;
  }
  switch (nodeElement.type) {
    case 'TextAttribute':
      return {
        name: nodeElement.name,
        order: isClassAttribute(nodeElement) ? 0 : 3,
        position: nodeElement.sourceSpan.fullStart.offset,
        node: nodeElement,
      };
    case 'BoundAttribute':
      let order = 3;
      const fileContent = nodeElement.sourceSpan.fullStart.file.content;
      const ruleSource = fileContent.substring(nodeElement.sourceSpan.start.offset, nodeElement.sourceSpan.end.offset);
      const isStandardStructureDirectives = structureDirectives.includes(nodeElement.name);
      if (isStandardStructureDirectives) {
        order = 1;
      } else if (isClassAttribute(nodeElement)) {
        order = 0;
      } else if (isTwoWayBindingAttribute(ruleSource)) {
        order = 5;
      } else if (isAnimationAttribute(ruleSource)) {
        order = 6;
      }
      return {
        name: nodeElement.name,
        order: order,
        position: nodeElement.sourceSpan.fullStart.offset,
        node: nodeElement,
      };
    case 'BoundEvent':
      if (cacheNodeData && cacheNodeData.some(value => nodeElement.position === value.position && nodeElement.name.startsWith(value.name))) {
        return null;
      }
      return {
        name: nodeElement.name,
        order: 7,
        position: nodeElement.sourceSpan.fullStart.offset,
        node: nodeElement,
      };
    default:
      return null;
  }
}

function isAnimationAttribute(ruleSource) {
  return ruleSource.includes('[@');
}

function isTwoWayBindingAttribute(ruleSource) {
  return ruleSource.includes('[(');
}

function isClassAttribute(node) {
  return node.name === 'class';
}

function attributesOrder() {
  return context => {
    return {
      Element(node) {
        const attributeNode = findErrorAttribute(node);
        if (attributeNode) {
          context.report({
            node: Object.assign({ loc: attributeNode.node.sourceSpan }, attributeNode.node),
            messageId: "Incorrect order '{{ attribute }}' in '{{ element }}' attributes. ",
            data: {
              element: node.name,
              attribute: attributeNode.name,
            },
          });
        }
      },
      Template(node) {
        const attributeNode = findErrorAttribute(node);
        if (attributeNode) {
          context.report({
            node: Object.assign({ loc: attributeNode.node.sourceSpan }, attributeNode.node),
            messageId: 'reportMessage',
            data: {
              element: node.tagName,
              attribute: attributeNode.name,
            },
          });
        }
      },
    };
  };
}

module.exports = {
  meta: {
    messages: {
      reportMessage: "Incorrect order '{{ attribute }}' in '{{ element }}' attributes. ",
    },
    type: 'layout',
    docs: {
      description: 'Attributes must be in order',
      recommended: true,
      suggestion: false,
    },
    schema: [],
  },
  create: attributesOrder(),
};
