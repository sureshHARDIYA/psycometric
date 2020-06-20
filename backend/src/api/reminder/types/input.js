const schema = `
  input ReminderInput {
    title: String!
    message: String!
    schedule: String
    audience: Audience
    audienceList: [String]
    frequency: Frequency
    questionnaire: String!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
