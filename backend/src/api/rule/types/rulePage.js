const schema = `
  type RulePage {
    rows: [Rule!]!
    count: Int!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
