const schema = `
  type Reminder {
    id: String!
    title: String!
    message: String!
    schedule: String
    frequency: Frequency
    audience: Audience
    audienceList: [User]
    questionnaire: Questionnaire
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
