const schema = `
  type QuestionPage {
    rows: [Question!]!
    count: Int!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
