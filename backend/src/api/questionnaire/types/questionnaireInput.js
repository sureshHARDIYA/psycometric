const schema = `
  input QuestionnaireInput {
    name: String!
    level: LevelEnum
    description: String
    frequency: Frequency
    status: QuestionnaireStatusEnum
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
