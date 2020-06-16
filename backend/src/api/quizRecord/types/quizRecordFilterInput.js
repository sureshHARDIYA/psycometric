const schema = `
  input QuizRecordFilterInput {
    id: String
    title: String
    questionnaire: String
    candidate: String
    createdAtRange: [ DateTime ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
