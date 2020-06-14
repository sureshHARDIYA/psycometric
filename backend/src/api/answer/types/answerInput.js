const schema = `
  input AnswerInput {
    score: Int
    title: String!
    type: AnswerType
    questionnaire: String!
  }

  input AnswerUpdateInput {
    score: Int
    title: String!
    type: AnswerType
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
