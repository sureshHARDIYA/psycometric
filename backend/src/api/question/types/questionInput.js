const schema = `
  input QuestionInput {
    title: String!
    questionnaire: String!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
