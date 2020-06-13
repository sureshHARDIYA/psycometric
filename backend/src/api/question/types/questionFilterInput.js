const schema = `
  input QuestionFilterInput {
    id: String!
    title: String
    explainAnswer: String
    questionType: QuestionTypeEnum
    answers: [AnswerTypeInput]
    createdAtRange: [ DateTime ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
