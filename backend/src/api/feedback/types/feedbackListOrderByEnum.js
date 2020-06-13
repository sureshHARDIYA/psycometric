const schema = `
  enum FeedbackListOrderByEnum {
    id_ASC
    id_DESC
    email_ASC
    email_DESC
    message_ASC
    message_DESC
    createdAt_ASC
    createdAt_DESC
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
