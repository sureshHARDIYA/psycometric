const schema = `
  type Rule {
    id: String!
    min: Int
    max: Int
    message: String!
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
