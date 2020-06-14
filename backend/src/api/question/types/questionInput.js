const schema = `
  input QuestionInput {
    title: String!
    questionnaire: String!
  }

  input QuestionUpdateInput {
    title: String!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
