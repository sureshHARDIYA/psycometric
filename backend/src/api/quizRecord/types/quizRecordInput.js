const schema = `
  input QuizRecordInput {
    kind: String!
    duration: Float
    questionnaire: String!
    randomizeQuestion: Boolean
    questions: [QuestionRecordInput]!
  }

  input QuestionRecordInput {
    question: String!,
    answers: [String]!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
