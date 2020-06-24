const schema = `
  input QuizRecordInput {
    total: Int
    score: Int
    caption: String
    duration: Float
    questionnaire: String!
    randomizeQuestion: Boolean
    questions: [QuestionRecordInput]!
  }

  input QuestionRecordInput {
    id: String!
    title: String!
    answered: AnswerRecordInput!
  }

  input AnswerRecordInput {
    id: String!
    title: String!
    score: Int
    type: String
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
