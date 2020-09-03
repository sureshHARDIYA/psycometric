const schema = `
  input QuestionnaireInput {
    name: String!
    description: String
    status: QuestionnaireStatusEnum

    schedule: String
    test: String
    audience: Audience
    audienceList: [String]
    frequency: Frequency
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
