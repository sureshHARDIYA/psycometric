const schema = `
  input IamImportInput {
    email: String!
    firstName: String
    lastName: String
    postStatus: String
    avatars: [FileInput!]
    roles: [ String! ]!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
