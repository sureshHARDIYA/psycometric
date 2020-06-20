const schema = `
  type ReminderPage {
    rows: [Reminder!]!
    count: Int!
    offset: Int
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
