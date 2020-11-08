const schema = `
  type Reminder {
    id: String!
    title: String!
    message: String!
    schedule: DateTime
    frequency: Frequency
    audience: Audience
    test: String
    audienceList: [String]
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
