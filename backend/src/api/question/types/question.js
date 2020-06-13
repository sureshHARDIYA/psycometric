const schema = `
  type Question {
    id: String!
    title: String
    explainAnswer: String
    questionType: QuestionTypeEnum
    answers: [AnswerType]
    createdAt: DateTime
    updatedAt: DateTime
  }

  type AnswerType {
    id: String!
    title: String!
    score: Int
    isCorrect: Boolean
    answerType: AnswerTypeEnum
  }

  type Answer {
    id: String!
    title: String!
    score: Int
    isCorrect: Boolean
    answerType: AnswerTypeEnum
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
