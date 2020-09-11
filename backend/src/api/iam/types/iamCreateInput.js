const schema = `
  input IamCreateInput {
    emails: [ String! ]!
    firstName: String
    lastName: String
    postStatus: String
    avatars: [FileInput!]
    roles: [ String! ]!
    settings: UserSettingsInput
    intrestedCategories: [String]
  }

  input UserSettingsInput {
    newQuestionnaireAlert: Boolean
    remindersAlert: Boolean
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
