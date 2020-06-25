const schema = `
  input UserProfileInput {
    firstName: String
    lastName: String
    avatars: [FileInput!]
    password: String
    newPassword: String
    notification: String
    intrestedCategories: [String]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
