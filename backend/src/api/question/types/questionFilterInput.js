const schema = `
  input QuestionFilterInput {
    id: String
    title: String
    createdAtRange: [ DateTime ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
