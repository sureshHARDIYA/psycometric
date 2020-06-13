const schema = `
  input CategoryFilterInput {
    id: String
    name: String
    createdAtRange: [ DateTime ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
