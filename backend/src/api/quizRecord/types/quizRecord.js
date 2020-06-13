const schema = `
  type QuizRecord {
    id: String!
    title: String
    level: String
    kind: String
    score: Int
    totalScore: Int
    passed: Boolean
    randomizeQuestion: String
    randomizeOptions: String
    questionnaire: String
    questions: [QuestionRecordType]
    candidate: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type QuestionRecordType {
    id: String
    score: Int!
    question: String!
    questionText: String!
    answers: [AnswerRecordType]!
  }

  type AnswerRecordType {
    title: String!
    score: Int!
    selected: Boolean
    isCorrect: Boolean
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
