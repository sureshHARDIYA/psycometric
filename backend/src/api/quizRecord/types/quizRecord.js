const schema = `
  type QuizRecord {
    id: String!
    title: String
    score: Int
    total: Int
    caption: String
    duration: Float
    randomizeQuestion: String
    questions: [QuestionRecord]
    candidate: User
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
