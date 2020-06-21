const schema = `
  type QuizRecord {
    id: String!
    title: String
    score: Int
    total: Int
    duration: Float
    randomizeQuestion: String
    questions: [QuestionRecord]
    candidate: String
    createdAt: DateTime
    updatedAt: DateTime
    questionnaire: Questionnaire
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
