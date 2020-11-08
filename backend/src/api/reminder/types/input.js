const schema = `
  input ReminderInput {
    title: String!
    message: String!
    schedule: String
    audience: Audience
    test: String
    audienceList: [String]
    frequency: Frequency
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
