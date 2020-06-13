const schema = `
  type QuizRecordPage {
    rows: [QuizRecord!]!
    count: Int!
    max: Int!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
