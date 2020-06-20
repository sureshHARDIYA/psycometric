const mongoose = require('mongoose');

const schema = `
  type User {
    id: String!
    fullName: String
    firstName: String
    lastName: String
    phoneNumber: String
    email: String!
    avatars: [File!]
    roles: [String]
    authenticationUid: String
    emailVerified: Boolean
    disabled: Boolean
    createdAt: DateTime
    updatedAt: DateTime
    favourites: [Questionnaire]
    playedQuizes: [QuizRecord]
    settings: SettingsType
  }

  type SettingsType {
    newQuestionnaireAlert: Boolean
    remindersAlert: Boolean
  }
`;

const resolver = {
  User: {
    roles: (instance) =>
      !instance.roles || !instance.roles.length
        ? ['learner']
        : instance.roles,
  },
};

exports.schema = schema;
exports.resolver = resolver;
