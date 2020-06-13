const schema = `
  input CategoryInput {
    name: String!
    description: String
    featuredImage: [FileInput!]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
