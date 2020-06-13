const schema = `
  input QuestionnaireInput {
    name: String!
    description: String
    status: QuestionnaireStatusEnum
    level: LevelEnum
    category: String!
    type: QuestionnaireType
  }

  enum QuestionnaireType {
    QUIZ
    PSYCOMETRIC
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
