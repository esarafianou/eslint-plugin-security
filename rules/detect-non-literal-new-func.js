/**
 * Tries to detect calls to new Function with non-literal argument
 * @author Eva Sarafianou
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    "use strict";

    return {
        "ExpressionStatement": function (node) {
            if (node.expression.type === 'NewExpression') {
            	if (node.expression.callee.name === 'Function') {
                    var args = node.expression.arguments;
                    if (args && args.length > 0) {
                        for (let i = 0; i < args.length; i++) {
                            if ((args[i].type === 'TemplateLiteral' && args[i].expressions.length > 0) ||
                                (args[i].type !== 'TemplateLiteral' && args[i].type !== 'Literal')) {
                                var token = context.getTokens(node)[0];
                                return context.report(node, 'Found non-literal argument in new Function');
                            }
                        }
                    }
                }
            }

        }

    };

};

