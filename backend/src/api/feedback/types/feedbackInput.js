const schema = `
  input FeedbackInput {
    email: String!
    message: String!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
