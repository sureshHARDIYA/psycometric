const schema = `
  type Question {
    id: String!
    title: String
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
