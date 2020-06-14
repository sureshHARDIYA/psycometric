const schema = `
  type AnswerPage {
    rows: [Answer!]!
    count: Int!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
