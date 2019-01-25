'use strict';

const RuleTester = require('eslint').RuleTester;
RuleTester.setDefaultConfig({
    parser: 'babel-eslint'
});
const tester = new RuleTester();

const ruleName = 'detect-non-literal-new-func';


tester.run(ruleName, require(`../rules/${ruleName}`), {
  valid: [
    { code: 'new Function(\'a\', \'b\', \'return a + b\')' },
    { code: 'new Function(\`a\`, \`b\`, \'return a + b\')' }
  ],
  invalid: [
    {
      code: 'new Function(\'a\', c)',
      errors: [{ message: 'Found non-literal argument in new Function' }]
    },
    {
      code: 'new Function(\`a\`, \`This is a function ${c}\`)',
      errors: [{ message: 'Found non-literal argument in new Function' }]
    }
  ]
});
