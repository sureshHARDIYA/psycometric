const mongoose = require('mongoose')

const schema = `
  type User {
    id: String!
    fullName: String
    firstName: String
    lastName: String
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
    emotion: [Emotion]
    settings: SettingsType
    notification: String
  }

  type SettingsType {
    newQuestionnaireAlert: Boolean
    remindersAlert: Boolean
  }
`

const resolver = {
  User: {
    roles: instance =>
      !instance.roles || !instance.roles.length
        ? [ 'patient' ]
        : instance.roles,
    fullName: instance =>
      [ instance.firstName || '', instance.lastName || '' ].join(' ').trim()
  }
}

exports.schema = schema
exports.resolver = resolver
