const schema = `
  input QuestionInput {
    title: String!
    explainAnswer: String!
    answers: [AnswerTypeInput]
    questionnaire: String!
  }

  input AnswerTypeInput {
    id: String
    score: Int
    title: String!
    isCorrect: Boolean
    answerType: AnswerTypeEnum
  }

  input AnswerInput {
    id: String
    score: Int
    title: String!
    isCorrect: Boolean
    answerType: AnswerTypeEnum
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
