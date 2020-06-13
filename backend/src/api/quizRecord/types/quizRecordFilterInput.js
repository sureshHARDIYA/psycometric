const schema = `
  input QuizRecordFilterInput {
    id: String
    title: String
    kind: String
    randomizeQuestion: String
    randomizeOptions: String
    questionnaire: String
    candidate: String
    createdAtRange: [ DateTime ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
