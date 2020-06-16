const schema = `
  type QuizRecord {
    id: String!
    title: String
    score: Int
    total: Int
    randomizeQuestion: String
    questionnaire: String
    questions: [QuestionRecord]
    candidate: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type QuestionRecord {
    id: String
    title: String!
    answered: AnswerRecord
  }

  type AnswerRecord {
    id: String!
    title: String!
    score: Int
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
