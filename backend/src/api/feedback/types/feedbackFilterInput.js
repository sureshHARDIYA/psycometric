const schema = `
  input FeedbackFilterInput {
    id: String
    email: String
    createdAtRange: [ DateTime ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
