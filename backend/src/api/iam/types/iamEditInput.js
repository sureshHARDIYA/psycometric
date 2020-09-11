const schema = `
  input IamEditInput {
    id: String!
    firstName: String
    lastName: String
    postStatus: String
    avatars: [FileInput!]
    roles: [ String! ]!
    settings: UserSettingsInput
    intrestedCategories: [String]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
