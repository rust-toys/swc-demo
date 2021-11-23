const Visitor = require('@swc/core/Visitor').default;
const { transformSync } = require('@swc/core');

class ConsoleStripper extends Visitor {
  visitCallExpression(expression) {
    if (expression.callee.type !== 'MemberExpression') {
      return expression;
    }

    if (
      expression.callee.object.type === 'Identifier' &&
      expression.callee.object.value === 'console'
    ) {
      if (expression.callee.property.type === 'Identifier') {
        return {
          type: 'UnaryExpression',
          span: expression.span,
          operator: 'void',
          argument: {
            type: 'NumericLiteral',
            span: expression.span,
            value: 0,
          },
        };
      }
    }

    return expression;
  }
}

const out = transformSync(
  `
if (foo) {
    console.log("Foo")
} else {
    console.log("Bar")
}`,
  {
    plugin: (m) => new ConsoleStripper().visitProgram(m),
  }
);
console.log(out.code);

module.exports = ConsoleStripper;
d;
