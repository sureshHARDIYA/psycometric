const schema = `
  input QuestionnaireInput {
    name: String!
    description: String
    status: QuestionnaireStatusEnum
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
