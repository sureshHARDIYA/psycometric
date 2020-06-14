const schema = `
  type Answer {
    id: String!
    title: String
    score: Int
    type: AnswerType
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
