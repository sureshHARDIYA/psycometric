const schema = `
  type Feedback {
    id: String!
    email: String!
    message: String!
    createdAt: DateTime
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
