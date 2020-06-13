const schema = `
  type QuestionnairePage {
    rows: [Questionnaire!]!
    count: Int!
    offset: Int
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
