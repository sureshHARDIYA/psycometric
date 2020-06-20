const schema = `
  enum ReminderOrderByEnum {
    id_ASC
    id_DESC
    title_ASC
    title_DESC
    message_ASC
    message_DESC
    createdAt_ASC
    createdAt_DESC
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
